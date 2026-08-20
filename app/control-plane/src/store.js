const fs = require('node:fs');
const path = require('node:path');

class JsonlStore {
  constructor(dir) { this.dir = dir; fs.mkdirSync(dir, { recursive: true }); }
  append(name, value) { fs.appendFileSync(path.join(this.dir, `${name}.jsonl`), `${JSON.stringify(value)}\n`); }
  read(name) {
    try { return fs.readFileSync(path.join(this.dir, `${name}.jsonl`), 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse); }
    catch { return []; }
  }
}

module.exports = { JsonlStore };
