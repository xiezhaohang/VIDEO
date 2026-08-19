const fs=require('node:fs');const path=require('node:path');const {spawn}=require('node:child_process');
function run(cmd,args){return new Promise((resolve,reject)=>{const p=spawn(cmd,args,{windowsHide:true});let e='';p.stderr.on('data',d=>e+=d);p.on('close',c=>c?reject(new Error(e.slice(-4000))):resolve());});}
async function renderTimeline({clips,mediaDir,outputDir,outputName='preview.mp4'}){
  fs.mkdirSync(outputDir,{recursive:true});const segmentDir=path.join(outputDir,'segments');fs.mkdirSync(segmentDir,{recursive:true});const files=[];
  for(let i=0;i<clips.length;i++){const c=clips[i],out=path.join(segmentDir,`${String(i+1).padStart(3,'0')}.mp4`);await run(process.env.FFMPEG_PATH||'ffmpeg',['-y','-ss',String(c.source_range_s[0]),'-i',path.join(mediaDir,c.source),'-t',String(c.source_range_s[1]-c.source_range_s[0]),'-an','-vf','scale=540:960:force_original_aspect_ratio=decrease,pad=540:960:(ow-iw)/2:(oh-ih)/2','-r','30','-c:v','libx264','-preset','veryfast','-crf','25','-pix_fmt','yuv420p',out]);files.push(out);}
  const list=path.join(segmentDir,'concat.txt');fs.writeFileSync(list,files.map(f=>`file '${f.replaceAll("'","'\\''")}'`).join('\n'),'utf8');const output=path.join(outputDir,outputName);await run(process.env.FFMPEG_PATH||'ffmpeg',['-y','-f','concat','-safe','0','-i',list,'-f','lavfi','-i','anullsrc=r=48000:cl=stereo','-shortest','-c:v','copy','-c:a','aac','-b:a','128k',output]);return{output,segments:files,adapter:'ffmpeg-real-call-v0.1'};
}
module.exports={renderTimeline};
