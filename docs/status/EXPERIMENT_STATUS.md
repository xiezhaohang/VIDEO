# Experiment Status

此文件是实验状态台账。每个实验在启动、Human Sanity Gate、handoff 和状态变化时更新。不得只在聊天中报告状态。

## 当前状态

| run_id | experiment | status | branch | commit | artifacts | local_only | updated_at | next_step |
|---|---|---|---|---|---|---|---|---|
| `20260820-161555-8-19-strict-v2-voiced-baseline` | `8.19 Strict V2 Voiced Baseline` | `needs_human_review` | `handoff` | `pending` | `handoff/runs/20260820-161555-8-19-strict-v2-voiced-baseline/` | `MP4 and demux verification media` | `2026-08-20T16:17:00+08:00` | `Editor blind comparison against Preference-Guided v3` |
| `20260820-085831-commercial-alpha-v0-2-control-plane` | `Commercial Alpha v0.2 Control Plane` | `handed_off` | `handoff` | `20155af1c233d784dd91367b1c7358a33d35ab7f` | `app/desktop/, app/control-plane/, handoff/runs/20260820-085831-commercial-alpha-v0-2-control-plane/` | `portable EXE, installer, runtime credentials/data/media` | `2026-08-20T09:15:00+08:00` | `Model-backed Shot Plan/AU, baked transitions, real TTS timing` |
| `20260819-164702-script-guided-controlled-auto-edit-v2` | `8.19 Script-Guided Controlled Auto Edit v2` | `handed_off` | `handoff` | `95133b71afb0f31663aaadc7c5580ff8f0e7865e` | `handoff/runs/20260819-164702-script-guided-controlled-auto-edit-v2/` | `MP4, segments, verification images` | `2026-08-19T17:05:00+08:00` | `User full-watch review; no rule promotion` |
| `20260819-160424-ai-directed-controlled-auto-edit-v1` | `8.19 AI-Directed Footage Controlled Auto Edit v1` | `handed_off` | `handoff` | `0740a1330491e24797cf79282c3376aa9cec0ca4` | `handoff/runs/20260819-160424-ai-directed-controlled-auto-edit-v1/` | `MP4, segments, verification images` | `2026-08-19T16:20:00+08:00` | `Human review of the local-only main version; no dependent experiment started` |
| `20260819-160000-ai-directed-footage-review` | `8.19 AI-Directed Footage Review Handoff` | `handed_off` | `handoff` | `7d05d2c73a189e9d90a6867d6b37c4ca13261b7d` | `handoff/runs/20260819-160000-ai-directed-footage-review/` | `all source MP4 and review contact sheets` | `2026-08-19T16:00:00+08:00` | `Run controlled Auto Edit v1 from whitelisted and verified Action Units` |
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

## 20260819-160000-ai-directed-footage-review

- Experiment: 8.19 AI-Directed Footage Review Handoff
- Status: `blocked_handoff`
- Updated at: `2026-08-19T16:00:00+08:00`
- Owner: `Codex`
- Branch: `handoff`
- Handoff commit: `7d05d2c73a189e9d90a6867d6b37c4ca13261b7d`
- Canonical archive: `handoff/runs/20260819-160000-ai-directed-footage-review/`
- Inputs frozen: `yes`; inventory and Action Unit report are in the canonical archive.
- Published scope: JSON/MD/project.md text derivatives only.
- Local only: all 14 source MP4 files and all review contact-sheet images.
- Conclusion: footage conditionally passes AI-friendly review (68/100) and is authorized for a controlled Auto Edit using the clean-source whitelist and verified Action Unit boundaries.
- Next step: execute `8.19 AI-Directed Footage Controlled Auto Edit v1`; do not read any human edit, EDL, or ordering.

## 20260819-160424-ai-directed-controlled-auto-edit-v1

- Experiment: 8.19 AI-Directed Footage Controlled Auto Edit v1
- Status: `handed_off`
- Started at: `2026-08-19T16:04:24+08:00`
- Updated at: `2026-08-19T16:20:00+08:00`
- Owner: `Codex`
- Branch: `handoff`
- Base commit: `b5bf66c478f3c35f34ebd4577c1fc13ea667fd26`
- Handoff payload commit: `a591385b62096cb668c38c24a077e3a8b74fba75`
- Handoff commit: `0740a1330491e24797cf79282c3376aa9cec0ca4`
- Inputs frozen: `yes`; source inventory and Action Unit review are archived under `handoff/runs/20260819-160000-ai-directed-footage-review/`.
- Human Sanity Gate: `pass` (Codex visual/technical sanity review; final user acceptance remains pending)
- Hard failures:
  - visible motion loop: `false`
  - repeated motion fill: `false`
  - result not reached before cut: `false`
  - reset/replay without editorial purpose: `false`
- Action Integrity: `pass`; all four selected Action Units reach a visible result and hold before the cut.
- Proof Chain / Proof Ownership: `pass`; opening/identity → number-to-question mechanism → multi-card variety/quantity → product hero overview.
- Metrics summary: 19.500 s visual duration; 4 selected Action Units; 4 sources; 1170 frames; 0 technical hard fails.
- Published artifacts: `handoff/runs/20260819-160424-ai-directed-controlled-auto-edit-v1/` and `handoff/latest/` (JSON/MD/HTML only).
- Local only:
  - `D:\\8.19\\edit\\runs\\20260819-160424-ai-directed-controlled-auto-edit-v1\\8_19_controlled_auto_edit_v1.mp4` — private binary video.
  - `segments/` — rebuildable binary intermediates.
  - `verify/` — derived private review images.
- Report: `handoff/runs/20260819-160424-ai-directed-controlled-auto-edit-v1/report.html`
- Manifest: `handoff/runs/20260819-160424-ai-directed-controlled-auto-edit-v1/manifest.json`
- Conclusion: controlled visual-only Auto Edit passes the defined machine/Codex Sanity Gate with zero hard fails; strongest residual risk is the 0075→0077 scale/exposure jump and the absence of human emotional payoff or an explicit CTA plate.
- Next step: user reviews the local-only MP4; do not promote rules or start a dependent experiment automatically.


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

## 20260818-163253-slime-vo-blind-alignment-v2-1

- Experiment: Slime VO Blind Alignment v2.1 — Preserve Wins + CTA Fix
- Status: `handed_off`; quality status: `needs_human_review`
- Updated at: `2026-08-18T16:46:03+08:00`
- Branch: `handoff`; `main` not modified; `libraries/audio_material/` not modified
- Baseline: `20260818-160940-slime-vo-blind-alignment-v2`; no re-directing or full-timeline rebuild
- Handoff payload commit: `a7d8180a88628f324c9cef9c4be763f9f3be1d80`
- Publisher record commit: `7576e065445ad035340d91d08ab520eb04af0d2e`
- Canonical archive: `handoff/runs/20260818-163253-slime-vo-blind-alignment-v2-1/`
- CTA result: natural directional gesture restored from `DJI_20260813103012_0045_D.MP4`, Action Unit `AU45_CTA_POINT_1`, source `4.15–6.483333 s`, output `13.966667–16.3 s`
- Preservation proof: decoded frames 0–837 exactly match v2; complete decoded VO SHA-256 exactly matches v2; no pre-CTA boundary adjustment
- Validated constraints: count escalation A1–A5 is persisted as a hard cross-version constraint; CTA directional gesture is persisted as a conditional hard constraint
- Model preflight: pass; `validated_constraint_regression_count=0`; `directional_cta_missing_when_available=0`; `preserved_anchor_regression=0`; visible loop/repeated motion fill `0/0`
- Human Sanity Gate: pending user full viewing; no final human PASS is claimed
- Local only: final MP4, intermediate segments/master, visual QA frames, and frame-hash evidence remain local under the run output directory
- Next step: user reviews `slime_vo_blind_alignment_v2_1_final.mp4`; any later version must preserve the recorded hard constraints unless the user explicitly removes them


## 20260818-164844-earphone-case-visual-first-v1

- Experiment: Visual-First Blind Auto Edit Test — Earphone Case v1
- Status: `handed_off`; quality status: `needs_human_review`
- Updated at: `2026-08-18T17:30:00+08:00`
- Owner: `Codex`
- Branch: `handoff`; `main` not modified; `libraries/audio_material/` not modified
- Handoff payload commit: `8f12f165059f7c512461aba90df3d9702f942253`
- Canonical archive: `handoff/runs/20260818-164844-earphone-case-visual-first-v1/`
- Inputs frozen: `yes`; raw media count: `10`
- Codex Sanity Gate: `pass`; final user human acceptance remains pending
- Frozen visual master: local-only `D:\\耳机套\\edit\\earphone_case_visual_first_v1.mp4`
- Frozen visual SHA-256: `B07582526EAF7218893BB897ABDEF4B5141844A18099C9401B9BE1CC670437B5`
- Duration/spec: `17.65 s`; `1080x1920`; `60 fps`; H.264 yuv420p + AAC technical track
- Narration: timeline-aware English script generated only after visual freeze; ElevenLabs audio not generated
- Rule promotion: none
- Next step: user reviews the frozen local MP4; narration must adapt to the frozen timeline

## 20260819-164702-script-guided-controlled-auto-edit-v2

- Experiment: 8.19 Script-Guided Controlled Auto Edit v2
- Status: `handed_off`; quality status: `needs_human_review`
- Started at: `2026-08-19T16:47:02+08:00`
- Updated at: `2026-08-19T17:05:00+08:00`
- Owner: `Codex`; final human reviewer: `user` (pending)
- Branch: `handoff`
- Base commit: `edac5bfb24e7eaddac9a9439b5af3f539b83c014`
- Baseline v1 handoff commit: `0740a1330491e24797cf79282c3376aa9cec0ca4`
- Handoff commit: `95133b71afb0f31663aaadc7c5580ff8f0e7865e`
- Inputs frozen: `yes`; original shooting script added as the only experimental reasoning variable.
- Codex Sanity Gate: `pass`; final user Human Sanity Gate remains pending.
- Hard failures: visible motion loop `false`; repeated motion fill `false`; result truncation `false`; decode error `false`.
- Action Integrity: `pass`; all four selected actions reach visible results and confirmation holds.
- Script coverage: `6/7` roles direct-or-merged, versus v1 `5/7`; strong-question focus restored; randomness remains missing/unusable.
- Selected Action Units: `AU-0068-01`, `AU-0075-02`, `AU-0078-01`, `AU-0081-01`.
- Metrics: 20.750 s; 1245 frames; 1080x1920 at 60 fps; H.264 yuv420p + AAC technical track; 0 hard fails.
- Published artifacts: `handoff/runs/20260819-164702-script-guided-controlled-auto-edit-v2/` and `handoff/latest/` (JSON/MD/HTML only).
- Local only: MP4, segments, and verification images under `D:\8.19\edit\runs\20260819-164702-script-guided-controlled-auto-edit-v2\`.
- Conclusion: script guidance restored one evidenced commercial role without forcing seven-shot coverage. Transition risk is slightly higher than v1. No rule promotion.
- Next step: user reviews the local-only MP4; no dependent rule promotion is authorized.

## 20260819-171433-invisible-transition-pass-v1

- Experiment: Invisible Transition Pass v1 — 8.19 Script-Guided v2
- Status: `handed_off`; quality status: `needs_human_review`
- Updated at: `2026-08-19T17:36:00+08:00`
- Owner: `Codex`; final human reviewer: `user` (pending full watch)
- Branch: `handoff`; `main` not modified; `libraries/audio_material/` not modified
- Base commit: `c55d6611083ddec9000ba8fea0b4352e094dabcb`
- Baseline run: `20260819-164702-script-guided-controlled-auto-edit-v2`; baseline handoff commit: `95133b71afb0f31663aaadc7c5580ff8f0e7865e`
- Handoff publisher commit: `98a66e005130388f1350256e5330e9eb163d4f1a`
- Canonical archive: `handoff/runs/20260819-171433-invisible-transition-pass-v1/`
- Single variable: Invisible Transition Layer v0.1 in `conservative` mode; Director structure, shot order, Action Units, source ranges, commercial chapters, semantic roles, duration, VO/subtitle/BGM/SFX state remained frozen.
- Cuts processed: `3/3`; cut 1 color/exposure micro-match; cut 2 color/exposure micro-match + 4% tiny scale recovery + native motion-phase cut; cut 3 color/exposure micro-match + native camera-motion cut.
- Result: cuts 1 and 3 clearly improved in Codex preflight; cut 2 improved in color continuity but retains a close-up-to-wide and hand-pose limitation.
- Technical gates: noticeable transition effect `false`; ghosting/double-image `false`; optical-flow warp `false`; action-boundary damage `false`; proof/readable-hold damage `false`.
- Action Integrity regression: `0`; source-boundary adjustment: `0`; frame/duration structure preserved at `1245` frames, `20.750 s`, `60 fps`.
- Local-only MP4: `D:\8.19\edit\runs\20260819-171433-invisible-transition-pass-v1\8_19_script_guided_v2_invisible_transition_v1.mp4` (`a6a92daea3c3304db61af109a0ff67d3ab5306cc0ffe47897623a342456861c9`).
- Published: JSON/MD/HTML/TXT reports plus experimental adapter source; MP4, processed segments, and QA images remain local.
- Rule promotion: none; adapter and rules remain handoff-only pending repeated human validation.
- Next step: user full-watch review of the local MP4.


## 20260819-172456-commercial-alpha-v0-1

- Experiment: AI Product Video Director — Commercial Alpha v0.1
- Status: `handed_off`; quality status: `needs_human_review`
- Updated at: `2026-08-19T17:50:00+08:00`
- Branch: `handoff`; `main` not modified; `libraries/audio_material/` not modified
- Base commit: `32ae8bf82e322830075091274481a5809dc42089`
- Handoff payload commit: `10b37cea7d7f3dce18a7dcb5a52440c2cc20bab1`
- Canonical archive: `handoff/runs/20260819-172456-commercial-alpha-v0-1/`
- Source: `app/desktop/`
- Validation: 4/4 tests; dev UI launch pass; project + SQLite job history pass; D:\\8.19 inventory 14 raw / 28 reviewed AU / 4 selected clips / 19.5 s; real FFmpeg render pass; portable EXE launch pass
- Local only: 83.7 MB portable EXE (size/rebuildable), D:\\8.19 raw media and smoke MP4 (privacy), smoke SQLite DB (local data)
- Rule promotion: none; Script Engine and Invisible Transition remain experimental
- Next step: human review, model-backed shot planning, rendered transition treatments, real TTS duration/timeline integration


## 20260820-085831-commercial-alpha-v0-2-control-plane

- Experiment: AI Product Video Director Commercial Alpha v0.2 Control Plane
- Status: `handed_off`
- Updated at: `2026-08-20T09:15:00+08:00`
- Branch: `handoff`; `main` not modified
- Base commit: `25a5ee568ea86ff6eabe59b26adea117145d2fef`
- Handoff payload commit: `20155af1c233d784dd91367b1c7358a33d35ab7f`
- Canonical archive: `handoff/runs/20260820-085831-commercial-alpha-v0-2-control-plane/`
- Source: `app/desktop/`, `app/control-plane/`
- Validation: desktop 9/9; control plane 1/1; online bootstrap, verified workflow install, telemetry/cost, offline cache; dev UI online; portable + NSIS build; portable process launch
- Privacy boundary: raw media upload unsupported; multipart rejected; telemetry allowlist excludes media paths and product data
- Local only: 83.8 MB portable EXE, 84.0 MB installer, credentials, device state, SQLite, telemetry queue, raw videos and renders
- Rule promotion: none; Script Engine and Invisible Transition remain experimental
- Next step: model-backed Shot Plan/AU analysis, baked Invisible Transition rendering, and real TTS duration/timeline integration

## 20260820-095912-earphone-case-full-production-v1

- Experiment: Earphone Case Full Production Pass v1
- Status: `handed_off`; quality status: `needs_human_review`
- Started at: `2026-08-20T09:59:12+08:00`
- Updated at: `2026-08-20T10:14:00+08:00`
- Owner: `Codex`; final human reviewer: `user` (pending full watch)
- Branch: `handoff`; `main` not modified; `libraries/audio_material/` not modified
- Base commit: `98a66e005130388f1350256e5330e9eb163d4f1a`
- Handoff payload commit: `d93159a8ac6514072fd03e6df1d77eb7719fef7d`
- Canonical archive: `handoff/runs/20260820-095912-earphone-case-full-production-v1/`
- Visual baseline: `20260818-164844-earphone-case-visual-first-v1`; validated Action Units, proof limits, causality, and 17.65 s timeline preserved.
- VO: English commercial benefit-led script; OpenAI `gpt-4o-mini-tts`, voice `marin`; actual accepted spoken duration `14.918 s`.
- Duration Budget: real timing drove two script compressions; only port line used slight `atempo=1.07`; dead-tail forcing `0`.
- Commercial structure: Hook/Identity -> Install/Access -> Closure -> Carry configuration -> Port access -> Hero/verbal CTA.
- Transition result: all 5 pairs reviewed conservatively; native hard cuts retained; no visible effect, ghosting, warp, or scale/color transform introduced.
- Codex/machine preflight: pass; hard fails `0`; visible loop `0`; repeated-motion fill `0`; incomplete action `0`; proof mismatch `0`; persistent-constraint regression `0`.
- Final Human Sanity Gate: pending user full viewing; machine PASS is not final human acceptance.
- Local only:
  - `D:\耳机套\edit\runs\20260820-095912-earphone-case-full-production-v1\earphone_case_full_production_v1.mp4` — private binary final video.
  - real VO WAV, TTS intermediates, and QA images under the same run directory — binary/private/rebuildable; excluded from GitHub.
- Published: JSON/MD/HTML/TXT reports only; no raw media, MP4, audio, or QA images.
- Rule promotion: none.
- Next step: user full-watch review of the single local-only MP4.

## 20260820-narrative-strategy-research-v1

- Experiment: Narrative Strategy Research v1
- Status: `handed_off`
- Updated at: `2026-08-20T15:01:48+08:00`
- Branch: `handoff`; `main` not modified
- Base commit: `c9699a1b494097f9e988df093d0f6b7337706816`
- Handoff payload commit: `7de0c068c42e07dade7399b31e7a7cacdb72d535`
- Local publisher record commit: `1b267f92363cc81a3191e74dc3a3db3e67f31d56`
- Canonical archive: `handoff/runs/20260820-narrative-strategy-research-v1/`
- Scope: research only; no software/UI/Electron/package/release work and no new video generation
- Inputs: four existing cases — magnetic power bank, earphone case, 8.19 cards, and slime — plus recorded human preference/reference feedback
- Decision: strategies are not mutually exclusive product categories. Use continuous Proof/Information/Emotion/Visual-Appeal demand and material-support scores, then emit primary + secondary strategy under independent hard constraints.
- Case placement: power bank Proof+Information; earphone case Visual Appeal+Proof; 8.19 cards Information+Emotion; slime Emotion/Sensory+Visual Appeal with sensory Proof as a hard support constraint.
- Validation labels are recorded explicitly in `report.md` and `narrative_strategy_rules_v0.json`; no candidate is promoted to `main`.
- Human Sanity Gate: not applicable because this run generated no new finished video.
- Prepared artifacts: report, machine-readable candidate rules, summary, and manifest only.
- Handoff publication: recovered and published after a clean scope audit; first recovered remote head `134ed1d66586b33a40486db0891eb1383d0e084b`.
- Local only: none.
- Next step: use the separately archived 8.19 Preference-Guided v3 controlled comparison for human preference review.

## 20260820-151742-8-19-preference-guided-v3

- Experiment: 8.19 Preference-Guided v3
- Status: `needs_human_review`
- Review state: `needs_human_review`
- Updated at: `2026-08-20T15:17:42+08:00`
- Branch: `handoff`; `main` not modified
- Strategy: Information primary + Emotion secondary
- Baseline: `20260819-164702-script-guided-controlled-auto-edit-v2` visual structure and `20260820-120248-8-19-full-production-v1` voiced final
- Local-only output root: `D:\8.19\edit\runs\20260820-151742-8-19-preference-guided-v3`
- Repository scope: research metadata, parameters, hashes, local-path descriptions, sanity/preference preflight, and comparison only; all video/audio/QA imagery remains local only
- Human Preference PASS: not evaluated; final state must remain `needs_human_review` until user/editor blind comparison
- Completed local-only outputs: 15.70 s silent master and 15.70 s English-VO/burned-subtitle final; hashes in `handoff/runs/20260820-151742-8-19-preference-guided-v3/local_only_index.json`
- Structural result: runtime 20.75 -> 15.70 s; effective shots 4 -> 8; commercial information states 7 -> 9; average effective shot length 5.19 -> 1.96 s; first silent-visible purchase meaning 4.00 -> 0.00 s; CTA audio start 15.60 -> 13.10 s
- Machine preflight: technical decode and hard constraints pass; Human Preference remains unevaluated
- Handoff payload commit: `a7622baa51d766f6baa04d8b953f57544b9231de`; published to `origin/handoff`

## 20260820-161555-8-19-strict-v2-voiced-baseline

- Experiment: 8.19 Strict V2 Voiced Baseline
- Status: `needs_human_review`
- Updated at: `2026-08-20T16:17:00+08:00`
- Branch: `handoff`; `main` not modified
- Lineage: `Script-Guided V2 visual + Full Production V1 audio`
- Local-only output: `D:\8.19\edit\runs\20260820-161555-8-19-strict-v2-voiced-baseline\8_19_strict_v2_voiced_baseline.mp4`
- Output SHA-256: `C413723DB3F26B3AFCC1D49AC745F4929473C2ADE42BBE2AAEF9517D1C9EC3DC`
- Video integrity: source and output demuxed H.264 bitstream SHA-256 both `E89DCECBED1F1B3763214F3622461E3DF573422F39ECA3419F90AE8F0930261B`; exact match.
- Audio integrity: source and output demuxed AAC bitstream SHA-256 both `03E3D5D897285854BFA046AA164579AEB3B66370BFCF15D101BF8E4262C19B1D`; exact match.
- Technical result: 20.75 s, 1080x1920, 60 fps, 1245 frames, AAC-LC 48 kHz stereo; full decode passed.
- Scope exclusions: no subtitle, transition, filter, video re-encoding, or media upload.
- Next step: editor blind comparison against Preference-Guided v3; human preference remains unevaluated.
