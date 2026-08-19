const fs=require('node:fs');const {spawn}=require('node:child_process');
class TTSProvider{async synthesize(){throw new Error('Not implemented');}}
class WindowsLocalTTS extends TTSProvider{async synthesize({text,output}){const escaped=text.replaceAll("'","''"),out=output.replaceAll("'","''");const script=`Add-Type -AssemblyName System.Speech;$s=New-Object System.Speech.Synthesis.SpeechSynthesizer;$s.SetOutputToWaveFile('${out}');$s.Speak('${escaped}');$s.Dispose()`;await new Promise((res,rej)=>{const p=spawn('powershell',['-NoProfile','-Command',script],{windowsHide:true});let e='';p.stderr.on('data',d=>e+=d);p.on('close',c=>c?rej(new Error(e)):res());});return{output,bytes:fs.statSync(output).size,provider:'windows-local'};}}
class OpenAITTS extends TTSProvider{async synthesize(){throw new Error('OpenAI Speech adapter 已配置接口边界；Alpha UI 尚未启用网络调用。');}}
class ElevenLabsTTS extends TTSProvider{async synthesize(){throw new Error('ElevenLabs adapter 预留，尚未实现。');}}
module.exports={TTSProvider,WindowsLocalTTS,OpenAITTS,ElevenLabsTTS};
