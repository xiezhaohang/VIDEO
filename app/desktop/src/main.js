const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { LocalDatabase } = require('./db');
const workflow = require('./adapters/workflowAdapter');
const versions = require('./versions');
const { getOrCreateDeviceIdentity } = require('./online/deviceIdentity');
const { StateStore } = require('./online/stateStore');
const { ControlPlaneClient } = require('./online/controlPlaneClient');
const { TelemetryQueue } = require('./online/telemetry');
const { UpdateManager } = require('./online/updateManager');
const { LicenseAdapter } = require('./online/licenseAdapter');

let db, controlPlane, telemetry, updater, onlineState;

function createWindow() {
  const window = new BrowserWindow({
    width: 1380, height: 900, minWidth: 1080, minHeight: 720, backgroundColor: '#f5f3ee',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false },
  });
  window.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

async function initializeOnline() {
  const dataDir = app.getPath('userData');
  const device = getOrCreateDeviceIdentity(dataDir);
  controlPlane = new ControlPlaneClient({
    baseUrl: process.env.CONTROL_PLANE_URL,
    device,
    userId: process.env.CONTROL_PLANE_USER_ID || 'alpha-owner',
    licenseKey: process.env.CONTROL_PLANE_LICENSE_KEY,
    channel: process.env.RELEASE_CHANNEL || 'dev',
    store: new StateStore(dataDir),
  });
  telemetry = new TelemetryQueue(dataDir, controlPlane);
  updater = new UpdateManager(dataDir, versions.app_version);
  onlineState = await controlPlane.bootstrap();
  try { await telemetry.flush(Boolean(onlineState.remote_config?.telemetry_enabled)); } catch {}
}

app.whenReady().then(async () => {
  db = new LocalDatabase(path.join(app.getPath('userData'), 'commercial-alpha.db'));
  await initializeOnline();
  setInterval(async () => { try { onlineState = await controlPlane.bootstrap(); } catch {} }, 15 * 60 * 1000).unref();
  registerIpc();
  createWindow();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

function registerIpc() {
  ipcMain.handle('dialog:folder', async () => { const result = await dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'] }); return result.canceled ? null : result.filePaths[0]; });
  ipcMain.handle('dialog:file', async (_, filters) => { const result = await dialog.showOpenDialog({ properties: ['openFile'], filters }); return result.canceled ? null : result.filePaths[0]; });
  ipcMain.handle('projects:list', () => db.listProjects());
  ipcMain.handle('projects:create', (_, project) => {
    const projectPath = project.project_path || path.join(app.getPath('documents'), 'AI Product Video Director', project.name);
    fs.mkdirSync(projectPath, { recursive: true });
    const created = db.createProject({ ...project, id: crypto.randomUUID(), project_path: projectPath, shot_plan: defaultPlan(), constraints: [] });
    persistProject(created); return created;
  });
  ipcMain.handle('projects:update', (_, id, patch) => { const project = db.updateProject(id, patch); persistProject(project); return project; });
  ipcMain.handle('workflow:run', async (_, config, render) => {
    const permission = new LicenseAdapter(onlineState.license).canRunLocalJobs();
    if (!permission.allowed) throw new Error('当前设备授权已撤销，无法开始新任务');
    const jobId = `pending-${Date.now()}`, started = Date.now();
    const selectedWorkflow = onlineState.workflow?.version || versions.visual_workflow_version;
    const selectedModel = onlineState.model_routing?.visual || versions.models.visual;
    db.startJob({ job_id: jobId, project_id: config.project_id, workflow_version: selectedWorkflow, model_provider: selectedModel, input: config });
    telemetry.enqueue({ event: 'job_started', job_id: jobId, project_id: config.project_id, workflow_version: selectedWorkflow, model: selectedModel });
    try {
      const output = await workflow.runJob({ ...config, runtime_versions: { workflow: selectedWorkflow, models: onlineState.model_routing } }, { render });
      const runtime = Date.now() - started;
      db.finishJob(jobId, output, runtime);
      telemetry.enqueue({ event: 'job_completed', job_id: jobId, project_id: config.project_id, status: 'completed', runtime_ms: runtime, workflow_version: selectedWorkflow, model: selectedModel });
      try { await telemetry.flush(Boolean(onlineState.remote_config?.telemetry_enabled)); } catch {}
      if (Number(output.api_cost || 0) > 0) try { await controlPlane.postCost({ job_id: jobId, provider: selectedModel, model: selectedModel, amount: output.api_cost, currency: 'USD' }); } catch {}
      return output;
    } catch (error) {
      db.finishJob(jobId, { error: error.message }, Date.now() - started, 'failed');
      telemetry.enqueue({ event: 'job_failed', job_id: jobId, project_id: config.project_id, status: 'failed', workflow_version: selectedWorkflow, model: selectedModel });
      throw error;
    }
  });
  ipcMain.handle('jobs:list', () => db.listJobs());
  ipcMain.handle('jobs:review', (_, id, review) => db.reviewJob(id, review));
  ipcMain.handle('shell:show', (_, file) => shell.showItemInFolder(file));
  ipcMain.handle('online:state', () => ({ ...onlineState, update_check: updater.check(onlineState.update) }));
  ipcMain.handle('online:refresh', async () => { onlineState = await controlPlane.bootstrap(); return { ...onlineState, update_check: updater.check(onlineState.update) }; });
  ipcMain.handle('online:download-update', async () => updater.download(onlineState.update));
  ipcMain.handle('online:install-update', async (_, file) => { if (!file || !fs.existsSync(file)) throw new Error('更新包不存在'); const error = await shell.openPath(file); if (error) throw new Error(error); return true; });
}

function persistProject(project) {
  fs.mkdirSync(project.project_path, { recursive: true });
  fs.writeFileSync(path.join(project.project_path, 'project.json'), JSON.stringify(project, null, 2));
  fs.writeFileSync(path.join(project.project_path, 'validated_edit_constraints.json'), JSON.stringify({ project_id: project.id, constraints: project.constraints || [] }, null, 2));
}

function defaultPlan() { return [
  { commercial_role: 'Hook / 产品识别', action: '打开包装或快速露出产品', result: '品牌与内容物清晰可见', hold: '至少 1 秒稳定确认', transition_intent: '动作中切入', benefit: '立即知道卖什么' },
  { commercial_role: '核心演示', action: '完整展示一次主要玩法', result: '结果可读且因果完整', hold: '至少 1.5 秒', transition_intent: '保持动作方向', benefit: '玩法一眼就懂' },
  { commercial_role: '价值证明', action: '展示内容丰富度或不同题目', result: '多个内容同时可见', hold: '至少 1 秒', transition_intent: '静态兼容可微叠化', benefit: '感知内容量' },
  { commercial_role: 'CTA / 收尾', action: '产品英雄全景', result: '完整包装与内容稳定呈现', hold: '2–3 秒', transition_intent: '自然停稳', benefit: '形成购买记忆点', cta: '根据渠道需要添加方向性 CTA' },
]; }
