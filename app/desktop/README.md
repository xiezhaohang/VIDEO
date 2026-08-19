# AI Product Video Director — Commercial Alpha v0.1

Windows 本地 Electron Alpha。它把项目、拍摄脚本、素材证据、Script-Guided timeline、实验性无感转场、TTS 接口、QA、持久约束和任务历史放进一个中文桌面软件壳。

## 安装、启动与构建

要求 Windows 10/11、Node.js 20+，并确保 FFmpeg/ffprobe 在 PATH。

```powershell
cd app/desktop
npm install
npm run dev
npm test
npm run smoke
npm run dist
```

portable 产物位于 `dist/AI-Product-Video-Director-0.1.0-portable.exe`。默认 smoke 使用 `D:\8.19`，输出留在 `D:\8.19\edit\software_alpha_smoke`，不会复制或上传原始视频。

## 接入边界

- 真实接入：Electron UI、SQLite、ffprobe、统一 `workflowAdapter.runJob(jobConfig)`、既有 Action Unit/Coverage 读取、timeline、QA、FFmpeg render、Windows local TTS adapter。
- 实验性：Invisible Transition 目前生成 treatment plan；Script Engine 记录画面证据链但未获人工验证。
- 预留：OpenAI Speech、ElevenLabs。
- 隔离：Audio Relevant 只通过 `libraries/audio_material/` adapter 显式调用，不覆盖 Visual Workflow。

每个 job 记录 app/workflow/model 版本、输入输出、运行时、成本字段、重试、状态和人工结论。`.env` 与数据库只保存在本地。
