# Experiment Report — AI Product Video Director Commercial Alpha v0.2 Control Plane

## Identity

- Run ID: `20260820-085831-commercial-alpha-v0-2-control-plane`
- Status: `passed_pending_handoff`
- Branch: `handoff`; `main` not modified
- Base commit: `25a5ee568ea86ff6eabe59b26adea117145d2fef`
- Completed at: `2026-08-20T09:05:00+08:00`
- Source: `app/desktop/` and `app/control-plane/`

## Objective

Turn the working local v0.1 client into the required local-client/online-control-plane architecture without uploading raw footage. Implement real Dev/Beta/Stable release channels, device identity, license adapter, remote config, versioned workflow distribution, model routing, telemetry, cost reporting, update manifests and Windows updater flow while preserving offline local editing.

## Technical validation

- Desktop unit/integration tests: `9/9 passed`.
- Control Plane API tests: `1/1 passed`.
- End-to-end path: server start → licensed bootstrap → Dev channel → SHA-256 workflow verification/install → telemetry batch → cost event → forced disconnect → cached offline fallback.
- Development UI launched and displayed: `DEV · 已连接`, workflow `0.2-dev`, license `active`, remote model routing and updater status.
- Portable EXE and NSIS installer both built successfully.
- Portable EXE created a real independent Windows application window.
- Raw-media upload guard: multipart payloads are rejected with HTTP 415; request bodies are limited to 256 KiB.
- Telemetry uses an allowlist and excludes media paths, product descriptions and source footage.

## Architecture delivered

- `app/control-plane/`: runnable Node.js JSON control plane for single-user Alpha.
- `app/desktop/src/online/`: device, state cache, license, remote workflow verification, telemetry queue, cost and update adapters.
- Release channels: `dev`, `beta`, `stable`.
- Workflow/app decoupling: verified remote JSON rules are cached independently from the Electron app.
- Offline behavior: most recently verified state or bundled defaults; local video jobs remain available unless a device is explicitly revoked.
- Updater: channel manifest lookup, semantic version check, installer download, SHA-256 verification and user-confirmed launch.

## Local-only artifacts

| Path | Size | SHA-256 | Reason |
|---|---:|---|---|
| `app/desktop/dist/AI-Product-Video-Director-0.2.0-portable.exe` | 83,798,013 | `ECE934F5C1C0840C3A0585CA1FCAA93F0728B842E3CCD680F0386E428F3E01F4` | Rebuildable binary, too large for repository |
| `app/desktop/dist/AI-Product-Video-Director-0.2.0-setup.exe` | 84,028,131 | `085E62E4B796E24C415ABCCF51C1F3E7AF09F0EC56FBA683612C86DACC178F74` | Rebuildable binary, too large for repository |
| Control Plane data, license key, device ID, SQLite DB and telemetry queue | varies | local runtime | Credentials and local user data |
| Raw videos and rendered media | unchanged | local/private | Privacy; no media was copied or uploaded |

## Limitations

- This is a deployable single-user Alpha control plane, not a public SaaS deployment. A public hostname, cloud account, managed database and production identity provider were not supplied.
- Update binaries are unsigned Alpha builds. Public Beta requires code signing, HTTPS/CDN and a signed update manifest.
- Server persistence is JSONL for Alpha; migrate to a managed database before multi-user Beta.
- Model-backed Shot Plan/AU inference, rendered transition treatments and complete external TTS timing remain the next product-engine priorities.
- No visual workflow rule was promoted to `main`.

## Conclusion

Commercial Alpha v0.2 passes the software and architecture acceptance criteria for a real local client connected to a runnable control plane with verified offline fallback. The heavy video path remains local and the AI/workflow brain can now evolve independently from the installed app.

