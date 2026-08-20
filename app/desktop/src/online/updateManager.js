const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function newer(candidate, current) {
  const a = String(candidate || '').split('.').map(Number), b = String(current || '').split('.').map(Number);
  for (let i = 0; i < 3; i += 1) if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0);
  return false;
}

class UpdateManager {
  constructor(dataDir, currentVersion) { this.dir = path.join(dataDir, 'updates'); this.currentVersion = currentVersion; }
  check(manifest) {
    if (!manifest?.version || !manifest?.url) return { available: false, reason: 'no_manifest' };
    return { available: newer(manifest.version, this.currentVersion), current_version: this.currentVersion, ...manifest };
  }
  async download(manifest) {
    const status = this.check(manifest);
    if (!status.available) return status;
    fs.mkdirSync(this.dir, { recursive: true });
    const response = await fetch(manifest.url);
    if (!response.ok) throw new Error(`更新下载失败：${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
    if (manifest.sha256 && sha256.toLowerCase() !== manifest.sha256.toLowerCase()) throw new Error('更新包 SHA-256 校验失败');
    const file = path.join(this.dir, `AI-Product-Video-Director-${manifest.version}-setup.exe`);
    fs.writeFileSync(file, bytes);
    return { ...status, downloaded: true, file, sha256 };
  }
}

module.exports = { UpdateManager, newer };
