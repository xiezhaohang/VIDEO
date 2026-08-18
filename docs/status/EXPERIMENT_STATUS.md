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


