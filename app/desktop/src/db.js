const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

class LocalDatabase {
  constructor(file) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    this.db = new DatabaseSync(file);
    this.db.exec('PRAGMA journal_mode = WAL');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, project_path TEXT NOT NULL,
        product_info_json TEXT NOT NULL, reference_video TEXT,
        shot_plan_json TEXT NOT NULL, script_text TEXT NOT NULL,
        media_dir TEXT, constraints_json TEXT NOT NULL,
        created_at TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS jobs (
        job_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, workflow_version TEXT NOT NULL,
        model_provider TEXT, input_json TEXT NOT NULL, output_json TEXT,
        runtime_ms INTEGER, api_cost REAL, retry_count INTEGER DEFAULT 0,
        final_status TEXT NOT NULL, human_review_json TEXT, created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS jobs_recent ON jobs(created_at DESC);
    `);
  }
  createProject(p) {
    const now = new Date().toISOString();
    this.db.prepare(`INSERT INTO projects VALUES (@id,@name,@project_path,@product_info_json,@reference_video,@shot_plan_json,@script_text,@media_dir,@constraints_json,@created_at,@updated_at)`).run({
      id:p.id, name:p.name, project_path:p.project_path, product_info_json:JSON.stringify(p.product_info||{}), reference_video:p.reference_video||null,
      shot_plan_json:JSON.stringify(p.shot_plan||[]), script_text:p.script_text||'', media_dir:p.media_dir||null,
      constraints_json:JSON.stringify(p.constraints||[]), created_at:now, updated_at:now
    });
    return this.getProject(p.id);
  }
  updateProject(id, patch) {
    const current = this.getProject(id); if (!current) throw new Error('项目不存在');
    const merged = {...current,...patch};
    this.db.prepare(`UPDATE projects SET name=?,project_path=?,product_info_json=?,reference_video=?,shot_plan_json=?,script_text=?,media_dir=?,constraints_json=?,updated_at=? WHERE id=?`).run(
      merged.name,merged.project_path,JSON.stringify(merged.product_info||{}),merged.reference_video||null,JSON.stringify(merged.shot_plan||[]),merged.script_text||'',merged.media_dir||null,JSON.stringify(merged.constraints||[]),new Date().toISOString(),id);
    return this.getProject(id);
  }
  getProject(id) { const r=this.db.prepare('SELECT * FROM projects WHERE id=?').get(id); return r&&this.decodeProject(r); }
  listProjects() { return this.db.prepare('SELECT * FROM projects ORDER BY updated_at DESC').all().map(r=>this.decodeProject(r)); }
  decodeProject(r) { return {...r,product_info:JSON.parse(r.product_info_json),shot_plan:JSON.parse(r.shot_plan_json),constraints:JSON.parse(r.constraints_json)}; }
  startJob(j) { this.db.prepare(`INSERT INTO jobs(job_id,project_id,workflow_version,model_provider,input_json,final_status,created_at) VALUES(?,?,?,?,?,?,?)`).run(j.job_id,j.project_id,j.workflow_version,j.model_provider||'',JSON.stringify(j.input),'running',new Date().toISOString()); }
  finishJob(id, output, runtime, status='completed') { this.db.prepare('UPDATE jobs SET output_json=?,runtime_ms=?,final_status=? WHERE job_id=?').run(JSON.stringify(output),runtime,status,id); }
  reviewJob(id, review) { this.db.prepare('UPDATE jobs SET human_review_json=? WHERE job_id=?').run(JSON.stringify(review),id); }
  listJobs() { return this.db.prepare('SELECT * FROM jobs ORDER BY created_at DESC LIMIT 50').all().map(r=>({...r,input:JSON.parse(r.input_json),output:r.output_json?JSON.parse(r.output_json):null,human_review:r.human_review_json?JSON.parse(r.human_review_json):null})); }
}
module.exports={LocalDatabase};
