# AI Product Video Director — Commercial Alpha v0.2

Windows 本地优先桌面端：重视频、FFmpeg、Action Unit 缓存、项目数据库和成片始终留在本机；在线 Control Plane 只负责授权、发布通道、远程配置、工作流版本、模型路由、遥测、成本和更新清单。

## 启动

要求 Windows 10/11、Node.js 20+，并确保 FFmpeg/ffprobe 在 PATH。

```powershell
cd app/control-plane
$env:CONTROL_PLANE_LICENSE_KEY='本机私有密钥'
npm test
npm run dev

cd ../desktop
$env:CONTROL_PLANE_URL='http://127.0.0.1:4319'
$env:CONTROL_PLANE_LICENSE_KEY='本机私有密钥'
$env:RELEASE_CHANNEL='dev'
npm install
npm test
npm run dev
```

没有 Control Plane 时客户端继续使用内置工作流或最近一次已校验缓存，不会阻塞本地剪辑。

## 构建与更新

```powershell
npm run dist
```

构建同时产生 portable EXE 与 NSIS installer。客户端启动时读取当前通道的更新清单；发现新版本后可下载，必须通过 SHA-256 校验，并由用户点击后才启动安装程序。公开 Beta 前还需为更新清单增加非对称签名与 HTTPS/CDN。

## 上线能力

- `dev` / `beta` / `stable` 发布通道。
- 持久 Device ID、User ID 与 License Adapter，支持离线宽限缓存。
- Remote Config、Model Routing、远程 Workflow JSON 下载、SHA-256 验证与本地版本缓存。
- 遥测离线队列和成本上报；遥测使用字段白名单，不传媒体路径、产品资料或原始视频。
- 更新清单检查、下载、哈希校验与用户确认安装。
- SQLite 保存至少最近 50 个任务。

## 当前工作流边界

- 真实接入：Electron UI、SQLite、ffprobe、统一 `workflowAdapter.runJob(jobConfig)`、既有 Action Unit/Coverage、timeline、QA、FFmpeg render、Windows local TTS adapter、Control Plane 客户端。
- 实验性：Invisible Transition 仍主要生成 treatment plan；Script Engine 记录画面证据链但未获人工验证。
- 预留：OpenAI Speech、ElevenLabs。
- 隔离：Audio Relevant 只通过 `libraries/audio_material/` adapter 显式调用，不能覆盖 Visual Workflow。

`.env`、授权密钥、设备文件、数据库、遥测队列、工作流缓存、原始视频与构建产物都保持 local_only。
