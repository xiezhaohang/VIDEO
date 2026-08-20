const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createControlPlane } = require('../src/app');

test('bootstrap, telemetry and cost APIs work without accepting media', async t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'video-control-plane-'));
  const server = createControlPlane({ dataDir: dir, licenseKey: 'test-key' });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const base = `http://127.0.0.1:${server.address().port}`;
  const headers = { authorization: 'Bearer test-key', 'content-type': 'application/json' };
  const bootstrap = await fetch(`${base}/v1/bootstrap`, { method: 'POST', headers, body: JSON.stringify({ release_channel: 'beta', user_id: 'owner', device: { device_id: 'win-test' } }) });
  assert.equal(bootstrap.status, 200);
  const state = await bootstrap.json();
  assert.equal(state.release_channel, 'beta');
  assert.equal(state.license.status, 'active');
  assert.ok(state.workflow.sha256);
  assert.equal((await fetch(`${base}/v1/telemetry/batch`, { method: 'POST', headers, body: JSON.stringify({ events: [{ event: 'job_completed' }] }) })).status, 202);
  assert.equal((await fetch(`${base}/v1/costs`, { method: 'POST', headers, body: JSON.stringify({ job_id: '1', amount: 0.1 }) })).status, 202);
  assert.equal((await fetch(`${base}/v1/bootstrap`, { method: 'POST', headers: { ...headers, 'content-type': 'multipart/form-data' }, body: 'video' })).status, 415);
});
