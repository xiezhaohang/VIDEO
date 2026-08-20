const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createControlPlane } = require('../../control-plane/src/app');
const { StateStore } = require('../src/online/stateStore');
const { ControlPlaneClient } = require('../src/online/controlPlaneClient');
const { TelemetryQueue } = require('../src/online/telemetry');

test('desktop bootstraps, verifies workflow, reports metadata and falls back to cache', async t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'video-director-e2e-'));
  const server = createControlPlane({ dataDir: path.join(root, 'server'), licenseKey: 'alpha-key' });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const client = new ControlPlaneClient({
    baseUrl: `http://127.0.0.1:${server.address().port}`,
    device: { device_id: 'win-e2e', platform: 'win32', arch: 'x64' },
    userId: 'alpha-owner', licenseKey: 'alpha-key', channel: 'dev',
    store: new StateStore(path.join(root, 'client')),
  });
  const online = await client.bootstrap();
  assert.equal(online.connected, true);
  assert.equal(online.workflow.source, 'remote-verified');
  assert.ok(fs.existsSync(online.workflow.installed_path));
  const telemetry = new TelemetryQueue(path.join(root, 'client'), client);
  telemetry.enqueue({ event: 'job_completed', job_id: 'e2e', media_dir: 'D:\\private' });
  assert.deepEqual(await telemetry.flush(true), { sent: 1, queued: 0 });
  await client.postCost({ job_id: 'e2e', provider: 'local', model: 'visual', amount: 0, currency: 'USD' });
  client.baseUrl = 'http://127.0.0.1:1';
  const cached = await client.bootstrap();
  assert.equal(cached.connected, false);
  assert.equal(cached.source, 'cache');
});
