const {app,BrowserWindow,ipcMain,dialog,shell}=require('electron');const path=require('node:path');const fs=require('node:fs');const crypto=require('node:crypto');const {LocalDatabase}=require('./db');const workflow=require('./adapters/workflowAdapter');let db;
function window(){const w=new BrowserWindow({width:1380,height:900,minWidth:1080,minHeight:720,backgroundColor:'#f5f3ee',webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false}});w.loadFile(path.join(__dirname,'renderer','index.html'));}
app.whenReady().then(()=>{db=new LocalDatabase(path.join(app.getPath('userData'),'commercial-alpha.db'));register();window();app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)window();});});app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
function register(){
  ipcMain.handle('dialog:folder',async()=>{const r=await dialog.showOpenDialog({properties:['openDirectory','createDirectory']});return r.canceled?null:r.filePaths[0];});
  ipcMain.handle('dialog:file',async(_,filters)=>{const r=await dialog.showOpenDialog({properties:['openFile'],filters});return r.canceled?null:r.filePaths[0];});
  ipcMain.handle('projects:list',()=>db.listProjects());
  ipcMain.handle('projects:create',(_,p)=>{const project_path=p.project_path||path.join(app.getPath('documents'),'AI Product Video Director',p.name);fs.mkdirSync(project_path,{recursive:true});const project=db.createProject({...p,id:crypto.randomUUID(),project_path,shot_plan:defaultPlan(),constraints:[]});persistProject(project);return project;});
  ipcMain.handle('projects:update',(_,id,patch)=>{const p=db.updateProject(id,patch);persistProject(p);return p;});
  ipcMain.handle('workflow:run',async(_,cfg,render)=>{const jobId=`pending-${Date.now()}`,started=Date.now();db.startJob({job_id:jobId,project_id:cfg.project_id,workflow_version:'visual-handoff-adapter-0.1',model_provider:'local/existing-artifacts',input:cfg});try{const out=await workflow.runJob(cfg,{render});db.finishJob(jobId,out,Date.now()-started);return out;}catch(e){db.finishJob(jobId,{error:e.message},Date.now()-started,'failed');throw e;}});
  ipcMain.handle('jobs:list',()=>db.listJobs());ipcMain.handle('jobs:review',(_,id,review)=>db.reviewJob(id,review));ipcMain.handle('shell:show',(_,p)=>shell.showItemInFolder(p));
}
function persistProject(p){fs.mkdirSync(p.project_path,{recursive:true});fs.writeFileSync(path.join(p.project_path,'project.json'),JSON.stringify(p,null,2));fs.writeFileSync(path.join(p.project_path,'validated_edit_constraints.json'),JSON.stringify({project_id:p.id,constraints:p.constraints||[]},null,2));}
function defaultPlan(){return[
  {commercial_role:'Hook / 产品识别',action:'打开包装或快速露出产品',result:'品牌与内容物清晰可见',hold:'至少 1 秒稳定确认',transition_intent:'动作中切入',benefit:'立即知道卖什么'},
  {commercial_role:'核心演示',action:'完整展示一次主要玩法',result:'结果可读且因果完整',hold:'至少 1.5 秒',transition_intent:'保持动作方向',benefit:'玩法一眼就懂'},
  {commercial_role:'价值证明',action:'展示内容丰富度或不同题目',result:'多个内容同时可见',hold:'至少 1 秒',transition_intent:'静态兼容可微叠化',benefit:'感知内容量'},
  {commercial_role:'CTA / 收尾',action:'产品英雄全景',result:'完整包装与内容稳定呈现',hold:'2–3 秒',transition_intent:'自然停稳',benefit:'形成购买记忆点',cta:'根据渠道需要添加方向性 CTA'}
];}
