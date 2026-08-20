const fs = require('node:fs');
const path = require('node:path');

const ALLOWED_FIELDS = new Set(['event', 'job_id', 'project_id', 'status', 'runtime_ms', 'workflow_version', 'model', 'retry_count', 'created_at']);

function sanitize(event) {
  const safe = {};
  for (const [key, value] of Object.entries(event || {})) if (ALLOWED_FIELDS.has(key)) safe[key] = value;
  safe.created_at ||= new Date().toISOString();
  return safe;
}

class TelemetryQueue {
  constructor(dataDir, client) {
    this.file = path.join(dataDir, 'telemetry-queue.json');
    this.client = client;
  }
  read() { try { return JSON.parse(fs.readFileSync(this.file, 'utf8')); } catch { return []; } }
  write(items) { fs.writeFileSync(this.file, JSON.stringify(items.slice(-500), null, 2)); }
  enqueue(event) { const items = this.read(); items.push(sanitize(event)); this.write(items); }
  async flush(enabled) {
    const events = this.read();
    if (!enabled || !events.length) return { sent: 0, queued: events.length };
    await this.client.postTelemetry(events);
    this.write([]);
    return { sent: events.length, queued: 0 };
  }
}

module.exports = { TelemetryQueue, sanitize };
