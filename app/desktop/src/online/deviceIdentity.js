const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function getOrCreateDeviceIdentity(dataDir) {
  fs.mkdirSync(dataDir, { recursive: true });
  const file = path.join(dataDir, 'device.json');
  if (fs.existsSync(file)) {
    const saved = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (saved.device_id) return saved;
  }
  const identity = {
    device_id: `win-${crypto.randomUUID()}`,
    created_at: new Date().toISOString(),
    platform: process.platform,
    arch: process.arch,
  };
  fs.writeFileSync(file, JSON.stringify(identity, null, 2));
  return identity;
}

module.exports = { getOrCreateDeviceIdentity };
