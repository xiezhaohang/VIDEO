const versions = require('../versions');
const { WorkflowRegistry } = require('./workflowRegistry');

class ControlPlaneClient {
  constructor({ baseUrl, device, userId, licenseKey, channel, store, timeoutMs = 8000 }) {
    this.baseUrl = String(baseUrl || '').replace(/\/$/, '');
    this.device = device;
    this.userId = userId || 'alpha-owner';
    this.licenseKey = licenseKey || '';
    this.channel = ['dev', 'beta', 'stable'].includes(channel) ? channel : 'dev';
    this.store = store;
    this.workflows = new WorkflowRegistry(store.dataDir);
    this.timeoutMs = timeoutMs;
    this.state = store.read();
  }

  async request(route, init = {}) {
    if (!this.baseUrl) throw new Error('CONTROL_PLANE_URL 未配置');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const response = await fetch(`${this.baseUrl}${route}`, {
        ...init,
        signal: controller.signal,
        headers: {
          'content-type': 'application/json',
          'x-device-id': this.device.device_id,
          authorization: this.licenseKey ? `Bearer ${this.licenseKey}` : '',
          ...(init.headers || {}),
        },
      });
      if (!response.ok) throw new Error(`Control Plane ${response.status}: ${(await response.text()).slice(0, 300)}`);
      return response.json();
    } finally { clearTimeout(timer); }
  }

  async bootstrap() {
    try {
      const online = await this.request('/v1/bootstrap', {
        method: 'POST',
        body: JSON.stringify({
          device: this.device,
          user_id: this.userId,
          release_channel: this.channel,
          versions,
        }),
      });
      online.workflow = this.workflows.install(online.workflow);
      this.state = this.store.write({ ...online, fetched_at: new Date().toISOString(), source: 'online' });
      return this.publicState();
    } catch (error) {
      const cached = this.store.read();
      this.state = cached || this.offlineDefaults();
      return { ...this.publicState(), connected: false, source: cached ? 'cache' : 'offline-defaults', warning: error.message };
    }
  }

  offlineDefaults() {
    return {
      source: 'offline-defaults',
      release_channel: this.channel,
      license: { status: 'offline_grace', user_id: this.userId },
      remote_config: { visual_workflow_enabled: true, audio_branch_enabled: false, telemetry_enabled: false },
      workflow: { id: 'visual-local-baseline', version: versions.visual_workflow_version, source: 'bundled' },
      model_routing: versions.models,
      update: null,
    };
  }

  publicState() {
    const state = this.state || this.offlineDefaults();
    return {
      connected: state.source === 'online',
      source: state.source || 'cache',
      fetched_at: state.fetched_at || null,
      release_channel: state.release_channel || this.channel,
      device_id: this.device.device_id,
      user_id: state.license?.user_id || this.userId,
      license: state.license || { status: 'unknown' },
      remote_config: state.remote_config || {},
      workflow: state.workflow || null,
      model_routing: state.model_routing || {},
      update: state.update || null,
    };
  }

  async postTelemetry(events) { return this.request('/v1/telemetry/batch', { method: 'POST', body: JSON.stringify({ events }) }); }
  async postCost(cost) { return this.request('/v1/costs', { method: 'POST', body: JSON.stringify(cost) }); }
}

module.exports = { ControlPlaneClient };
