const fs=require('node:fs');const path=require('node:path');
function readJson(p){return fs.existsSync(p)?JSON.parse(fs.readFileSync(p,'utf8')):null;}
function loadExisting(mediaDir){const base=path.join(mediaDir,'edit');const latest=path.join(base,'runs','20260819-160424-ai-directed-controlled-auto-edit-v1');return{
  action_units:readJson(path.join(base,'action_units.json')),
  coverage:readJson(path.join(base,'coverage_report.json')),
  shooting_quality:readJson(path.join(base,'shooting_quality_review.json')),
  selected_action_units:readJson(path.join(latest,'selected_action_units.json')),
  director_plan:readJson(path.join(latest,'director_plan.json')),
  provenance:'existing-human-reviewed-artifacts', experimental:false
};}
module.exports={loadExisting};
