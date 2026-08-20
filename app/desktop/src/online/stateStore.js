const fs = require('node:fs');
const path = require('node:path');

class StateStore {
  constructor(dataDir) {
    fs.mkdirSync(dataDir, { recursive: true });
    this.dataDir = dataDir;
    this.file = path.join(dataDir, 'control-plane-state.json');
  }
  read() {
    try { return JSON.parse(fs.readFileSync(this.file, 'utf8')); }
    catch { return null; }
  }
  write(state) {
    const temp = `${this.file}.tmp`;
    fs.writeFileSync(temp, JSON.stringify(state, null, 2));
    fs.renameSync(temp, this.file);
    return state;
  }
}

module.exports = { StateStore };
