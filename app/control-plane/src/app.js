const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { JsonlStore } = require('./store');

const MAX_BODY = 256 * 1024;

function readBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0, body = '';
    request.setEncoding('utf8');
    request.on('data', chunk => { size += Buffer.byteLength(chunk); if (size > MAX_BODY) { reject(Object.assign(new Error('payload_too_large'), { status: 413 })); request.destroy(); } else body += chunk; });
    request.on('end', () => { try { resolve(body ? JSON.parse(body) : {}); } catch { reject(Object.assign(new Error('invalid_json'), { status: 400 })); } });
    request.on('error', reject);
  });
}

function send(response, status, value) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  response.end(JSON.stringify(value));
}

function createControlPlane(options = {}) {
  const channels = options.channels || JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'channels.json'), 'utf8'));
  const licenseKey = options.licenseKey ?? process.env.CONTROL_PLANE_LICENSE_KEY ?? 'change-me-local-only';
  const store = options.store || new JsonlStore(options.dataDir || process.env.CONTROL_PLANE_DATA_DIR || path.join(__dirname, '..', 'data'));
  const updateBase = String(options.updateBase || process.env.PUBLIC_UPDATE_BASE_URL || '').replace(/\/$/, '');

  return http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://control-plane.local');
      if (request.method === 'GET' && url.pathname === '/health') return send(response, 200, { ok: true, service: 'video-director-control-plane' });
      if ((request.headers['content-type'] || '').includes('multipart/')) return send(response, 415, { error: 'raw_media_uploads_are_not_supported' });
      if (request.headers.authorization !== `Bearer ${licenseKey}`) return send(response, 401, { error: 'invalid_license' });

      if (request.method === 'POST' && url.pathname === '/v1/bootstrap') {
        const body = await readBody(request);
        const channelName = ['dev', 'beta', 'stable'].includes(body.release_channel) ? body.release_channel : 'dev';
        const selected = channels[channelName];
        const workflowPayload = JSON.stringify(selected.workflow);
        const result = {
          release_channel: channelName,
          license: { status: 'active', user_id: body.user_id || 'alpha-owner', device_id: body.device?.device_id, offline_grace_until: new Date(Date.now() + 7 * 86400000).toISOString() },
          remote_config: selected.remote_config,
          workflow: { ...selected.workflow, sha256: crypto.createHash('sha256').update(workflowPayload).digest('hex') },
          model_routing: selected.model_routing,
          update: updateBase ? { version: '0.2.0', url: `${updateBase}/${channelName}/AI-Product-Video-Director-0.2.0-setup.exe`, sha256: null } : null,
        };
        store.append('devices', { ...body.device, user_id: result.license.user_id, channel: channelName, seen_at: new Date().toISOString() });
        return send(response, 200, result);
      }
      if (request.method === 'POST' && url.pathname === '/v1/telemetry/batch') {
        const body = await readBody(request);
        for (const event of (body.events || []).slice(0, 500)) store.append('telemetry', { ...event, received_at: new Date().toISOString() });
        return send(response, 202, { accepted: Math.min((body.events || []).length, 500) });
      }
      if (request.method === 'POST' && url.pathname === '/v1/costs') {
        const body = await readBody(request);
        store.append('costs', { job_id: body.job_id, provider: body.provider, model: body.model, amount: Number(body.amount || 0), currency: body.currency || 'USD', received_at: new Date().toISOString() });
        return send(response, 202, { accepted: true });
      }
      return send(response, 404, { error: 'not_found' });
    } catch (error) { return send(response, error.status || 500, { error: error.message }); }
  });
}

module.exports = { createControlPlane, readBody, MAX_BODY };
