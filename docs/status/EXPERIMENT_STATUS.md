# Experiment Status

此文件是实验状态台账。每个实验在启动、Human Sanity Gate、handoff 和状态变化时更新。不得只在聊天中报告状态。

## 当前状态

| run_id | experiment | status | branch | commit | artifacts | local_only | updated_at | next_step |
|---|---|---|---|---|---|---|---|---|
| `<YYYYMMDD-HHMMSS>` | `<name>` | `<planned/running/needs_review/hard_fail/failed/passed_pending_handoff/blocked_handoff/handed_off/promoted>` | `handoff` | `<sha or pending>` | `<paths or pending>` | `<none or paths + reasons>` | `<ISO-8601>` | `<next action>` |

## 单次实验记录模板

### `<experiment_name>` — `<run_id>`

- Status: `<status>`
- Started at: `<ISO-8601>`
- Updated at: `<ISO-8601>`
- Owner: `<person/agent>`
- Branch: `handoff`
- Base commit: `<sha>`
- Handoff commit: `<sha or pending>`
- Inputs frozen: `<yes/no; manifest path>`
- Human Sanity Gate: `<pending/pass/hard_fail>`
- Hard failures:
  - visible motion loop: `<true/false>`
  - repeated motion fill: `<true/false>`
  - other: `<none or details>`
- Action Integrity: `<pending/pass/fail + evidence>`
- Proof Chain / Proof Ownership: `<pending/pass/fail + evidence>`
- Metrics summary: `<only evaluate after Human Sanity Gate>`
- Published artifacts:
  - `<repository path>` — `<sha256>`
- Local only:
  - `<local path>` — `<reason>`
- Report: `<repository path>`
- Manifest: `<repository path>`
- Conclusion: `<decision>`
- Next step: `<action; may start only after handed_off unless explicitly authorized>`

## 状态更新要求

1. 启动实验时新增记录并设为 `running`。
2. 产物生成后设为 `needs_review`，先执行 Human Sanity Gate。
3. 出现硬失败立即设为 `hard_fail`，不得用指标覆盖。
4. 通过质量门禁但尚未发布时设为 `passed_pending_handoff`。
5. GitHub handoff 失败时设为 `blocked_handoff`，记录原因和待发布清单。
6. 报告、manifest 和产物提交到 `handoff` 后，填写 commit SHA 并设为 `handed_off`。
7. 未达到 `handed_off`，不得启动依赖本结论的下一实验。



## 架构隔离记录

### Audio Material Library Bootstrap — 20260818-audio-material-bootstrap

- Status: `handed_off`
- Updated at: `2026-08-18T11:15:29+08:00`
- Owner: `Codex`
- Branch: `handoff`
- Base commit: `8163df1c1d06255da5eea7baf05f73be96cdcc4e`
- Handoff commit: `053883858dcbd8a67ddf228a02622f9975ea0634`
- Published artifacts: `libraries/audio_material/`
- Change type: `architecture_isolation`
- Rule promotion: `no`；本次不是规则晋升，也未写入 `main`
- Existing Visual Workflow: 未修改；旧无声/视觉规则库保持稳定基线
- Blind Auto Edit Test 1 — Speaker: 未中断、未修改；本记录不改变其运行状态
- Conclusion: 已建立完全隔离、显式进入且可回退的 Audio Branch
- Next step: 后续 `Audio Proof v1` 默认在 `libraries/audio_material/` 内单独立项实验


## 20260818-111927-blind-auto-edit-test1-speaker

- Experiment: Blind Auto Edit Test 1 — Speaker
- Status: `aborted_input_complexity`
- Termination: `cancelled_by_user_for_material_complexity` (user requested)
- Reason: 当前素材要求手机 UI / 界面级识别，不适合作为第一轮泛化验证素材。
- Classification: 不是 Visual Workflow 失败；不是 Audio Branch 规则失败。
- Retention: 仅作为高难度负样本 / 未来回归测试保留。
- Canonical archive: `libraries/audio_material/experiments/20260818-111927-blind-auto-edit-test1-speaker/`
- General handoff: `handoff/runs/20260818-111927-blind-auto-edit-test1-speaker/` 完整 payload 已删除；`handoff/latest/` 仅保留迁移指针。
- Local only: MP4 与大文件保持本地，索引见 canonical archive 的 `local_only_index.json`。
- Updated at: `2026-08-18T12:12:29+08:00`
- Next step: 本次未启动新素材；该素材不继续执行。
