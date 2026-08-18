# Experiment Status

此文件是实验状态台账。每个实验在启动、Human Sanity Gate、handoff 和状态变化时更新。不得只在聊天中报告状态。

## 当前状态

| run_id | experiment | status | branch | commit | artifacts | local_only | updated_at | next_step |
|---|---|---|---|---|---|---|---|---|
| `20260818-152613-slime-vo-transition-v1` | `Slime VO + Transition Experiment v1` | `needs_voice_generation` (superseded; do not resume) | `handoff` | `3b714cc296c395cc3c38a80b2b5abe59f1c275c5` | `handoff/runs/20260818-152613-slime-vo-transition-v1/` | `none; no audio/video generated` | `2026-08-18T16:00:00+08:00` | `No continuation; replaced by Slime VO Blind Alignment Test v2` |
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

## 20260818-143548-no-vo-blind-test1-slime

- Experiment: No-VO Blind Auto Edit Test 1 — Slime
- Status: `handed_off`
- Quality verdict after user review: `failed_human_comprehension_and_transition_flow`
- Started at: `2026-08-18T14:35:48+08:00`
- Updated at: `2026-08-18T15:13:00+08:00`
- Owner: `Codex`; final human reviewer: `user`
- Branch: `handoff`
- Base commit: `d799a8c88e4a436f443d0de8be70ef57fc7a3fe3`
- Handoff payload commit: `ef54b3597a6a884dc6f32952903e0333dacb2f7c`
- Inputs frozen: `yes`; manifest: `handoff/runs/20260818-143548-no-vo-blind-test1-slime/manifest.json`
- Machine/Codex sanity review: `pass`; this did not constitute final human acceptance.
- Final Human Sanity / commercial comprehension review: `fail` — user reported the finished video was "完全看不明白" because the five source clips appear to perform essentially the same action, so the timeline lacks an understandable narrative/semantic logic without VO.
- Final Human transition-flow review: `fail` — user reported that transitions between clips feel too stiff/abrupt. This is an inter-shot adjacency problem, not evidence that Action Units themselves are incomplete, and should not be papered over with decorative transition effects.
- Hard failures:
  - visible motion loop: `false`
  - repeated motion fill: `false`
  - result not reached before cut: `false`
  - reset/replay without editorial purpose: `false`
  - unexplained state regression: `false`
- Action Integrity: `pass`; all four selected units reach a visible result and readable hold.
- Proof Chain / Proof Ownership: `pass` at local action level, but this was insufficient to create an understandable full-video commercial narrative without VO.
- Commercial narrative / semantic differentiation: `fail`; visually similar squeeze/deformation actions do not provide enough semantic separation by themselves.
- Inter-shot transition compatibility: `fail`; cut adjacency did not sufficiently account for framing/scale change, subject position, motion direction/phase, and bridge-shot needs, resulting in visibly rigid joins.
- Metrics summary: 10.85 s visual duration; 4 selected Action Units; 4/5 source files used; 0 technical hard fails. These metrics do not override the user human-review failure.
- Published artifacts: `handoff/latest/` and `handoff/runs/20260818-143548-no-vo-blind-test1-slime/` (JSON/MD/HTML only).
- Local only:
  - `D:\\解压玩具史莱姆\\edit\\no_vo_blind_test1_slime_v1.mp4` — binary video retained locally by handoff policy.
  - `D:\\解压玩具史莱姆\\edit\\segments/` — rebuildable intermediate encodes.
  - `D:\\解压玩具史莱姆\\edit\\verify/` — rebuildable visual QA contact sheets.
- Report: `handoff/runs/20260818-143548-no-vo-blind-test1-slime/no_vo_blind_test1_slime_report.html`
- Conclusion: No-VO autonomous timeline is retained only as a diagnostic baseline. It is not accepted as the production path for this product type. The failures are narrative comprehension and inter-shot transition flow, not action extraction or loop safety.
- Next step: return to the production specification with VO. Run a controlled comparison on the same slime footage: A) blind-generated script, B) edit-aware script generated after material/Action Unit understanding; generate both through ElevenLabs first, then edit both with the same downstream workflow. Both A/B should share the same experimental Transition Compatibility layer so script generation remains the only A-vs-B variable while the known rigid-cut defect is addressed consistently.

## 20260818-152613-slime-vo-transition-v1

- Experiment: Slime VO + Transition Experiment v1
- Final status: `needs_voice_generation` / `blocked_voice_generation`
- Blocking reason: ElevenLabs credentials and a usable voice-generation interface were unavailable.
- Branch: `handoff`; no write to `main`.
- Canonical archive: `handoff/runs/20260818-152613-slime-vo-transition-v1/`
- Archive payload commit: `3b714cc296c395cc3c38a80b2b5abe59f1c275c5`
- Published scope: text-only A/B script drafts and failure-state metadata.
- A/B scripts: unfinished experiment drafts only; not completed VO assets and not accepted production scripts.
- Real VO: not generated; actual durations and sentence timelines do not exist.
- Editing: not started.
- Transition Compatibility: not executed.
- Sanity Gate: not executed; no PASS/FAIL result exists.
- MP4: not generated.
- Rule promotion: none; old Visual rules were not changed.
- Audio Material Library: not changed.
- `handoff/latest`: intentionally not changed.
- Superseded by: Slime VO Blind Alignment Test v2 using the user-provided real spoken-video input.
- Resume policy: do not resume this run, even if ElevenLabs later becomes available.
- Contamination guard: do not copy its draft scripts, predicted bindings, Action Unit references, or conclusions into the active Blind Alignment run; its files, run_id, and latest payload remain untouched.
