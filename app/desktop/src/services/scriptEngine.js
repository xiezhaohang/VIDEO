function makeScript(shotPlan=[]){return shotPlan.map((s,i)=>({
  visual_anchor:s.result||s.action||`镜头 ${i+1}`, benefit:s.benefit||'让核心卖点更容易理解', purchase_reason:s.purchase_reason||'信息清楚、使用门槛低', proof_support:s.proof_support||s.result||'待素材验证', voice_line:s.voice_line||'', time_window:s.time_window||null
}));}
function validate(lines){return lines.map((x,i)=>({index:i,ok:Boolean(x.visual_anchor&&x.benefit&&x.purchase_reason&&x.proof_support),warning:x.voice_line&&!x.proof_support?'旁白缺少画面证据':null}));}
module.exports={makeScript,validate,experimental:true};
