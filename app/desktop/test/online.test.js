const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { WorkflowRegistry } = require('../src/online/workflowRegistry');
const { LicenseAdapter } = require('../src/online/licenseAdapter');
const { sanitize } = require('../src/online/telemetry');
const { newer } = require('../src/online/updateManager');

test('remote workflow is hash verified before install', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'workflow-registry-'));
  const payload = { id: 'visual', version: '1.2.3', rules: { action_integrity_priority: true } };
  const sha256 = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  const installed = new WorkflowRegistry(dir).install({ ...payload, sha256 });
  assert.equal(installed.source, 'remote-verified');
  assert.ok(fs.existsSync(installed.installed_path));
  assert.throws(() => new WorkflowRegistry(dir).install({ ...payload, sha256: 'bad' }), /校验失败/);
});

test('license permits offline grace but denies revoked devices', () => {
  assert.equal(new LicenseAdapter({ status: 'offline_grace' }).canRunLocalJobs().allowed, true);
  assert.equal(new LicenseAdapter({ status: 'revoked' }).canRunLocalJobs().allowed, false);
});

test('telemetry strips paths and product data', () => {
  assert.deepEqual(sanitize({ event: 'job_completed', media_dir: 'D:\\private', product: 'secret' }).event, 'job_completed');
  assert.equal(sanitize({ media_dir: 'D:\\private' }).media_dir, undefined);
});

test('semantic update comparison is deterministic', () => {
  assert.equal(newer('0.2.0', '0.1.9'), true);
  assert.equal(newer('0.1.0', '0.1.0'), false);
});
