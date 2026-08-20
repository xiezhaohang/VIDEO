# AI Product Video Director Control Plane

用于 Commercial Alpha 的轻量在线控制面。它只接收小型 JSON 元数据，不提供原始视频上传接口。

```powershell
cd app/control-plane
$env:CONTROL_PLANE_LICENSE_KEY='本地许可密钥'
npm test
npm run dev
```

桌面端配置 `CONTROL_PLANE_URL=http://127.0.0.1:4319`、同一 `CONTROL_PLANE_LICENSE_KEY` 后，会读取 Dev/Beta/Stable 通道、授权状态、远程配置、工作流版本、模型路由和更新清单；离线时使用最近缓存并继续本地剪辑。

当前存储为 Alpha 级 JSONL，适合单用户服务。公开 Beta 前应迁移到受管数据库、HTTPS、正式账号系统和签名更新清单。
