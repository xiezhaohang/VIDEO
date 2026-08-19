function planTransitions(clips,mode='conservative'){
  if(mode==='off')return[];
  return clips.slice(1).map((clip,i)=>({cut_index:i+1,from:clips[i].action_unit_id,to:clip.action_unit_id,
    checks:['exposure_white_balance_match','motion_direction','action_integrity'],
    treatment:mode==='auto'?['micro_match','cut_on_motion','motion_blur_3_frames_if_needed','tiny_scale_match','micro_dissolve_only_if_static_compatible']:['micro_match','cut_on_motion'],
    status:'planned_experimental',note:'只修视觉接缝；逻辑错误必须回到 Director。'}));
}
module.exports={planTransitions,experimental:true};
