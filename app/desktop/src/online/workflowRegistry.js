const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

class WorkflowRegistry {
  constructor(dataDir) { this.dir = path.join(dataDir, 'workflows'); fs.mkdirSync(this.dir, { recursive: true }); }
  install(workflow) {
    const { sha256, ...payload } = workflow || {};
    if (!payload.id || !payload.version || !sha256) throw new Error('远程工作流缺少 id/version/sha256');
    const serialized = JSON.stringify(payload);
    const actual = crypto.createHash('sha256').update(serialized).digest('hex');
    if (actual !== sha256.toLowerCase()) throw new Error('远程工作流 SHA-256 校验失败');
    const safeName = `${payload.id}-${payload.version}`.replace(/[^a-zA-Z0-9._-]/g, '_');
    const file = path.join(this.dir, `${safeName}.json`);
    fs.writeFileSync(file, JSON.stringify({ ...payload, sha256 }, null, 2));
    return { ...workflow, installed_path: file, source: 'remote-verified' };
  }
}

module.exports = { WorkflowRegistry };
