# Changelog

本文件只记录 `libraries/audio_material/` 的演进，不代表旧视觉规则或 `main` 已发生变化。

## 0.1.1 — 2026-08-18

- 终止 `Blind Auto Edit Test 1 — Speaker`（`20260818-111927-blind-auto-edit-test1-speaker`），最终状态为 `aborted_input_complexity`。
- 原因：素材需要手机 UI / 界面级识别，难度过高，不适合作为第一轮泛化验证素材。
- 该终止不代表 Visual Workflow 失败，也不代表 Audio Branch 规则失败。
- 将完整长期归档迁入 `libraries/audio_material/experiments/20260818-111927-blind-auto-edit-test1-speaker/`，仅作为高难度负样本 / 未来回归测试保留。
- 清理通用 `handoff/runs/` 与 `handoff/latest/` 的重复 payload；latest 仅保留最小迁移指针。
- MP4 与大文件继续保持 `local_only`；本次未启动新剪辑素材。

## 0.1.0 — 2026-08-18

- 建立完全隔离的有声素材工作流库。
- 定义最粗入口分流：`visual_only` / `audio_relevant`。
- 增加六个初版 audio role：`irrelevant`、`ambience`、`action_sfx`、`product_proof`、`music_demo`、`speech`。
- 定义 Audio Proof、Proof modality 与 VO Gap / Audio Proof Window。
- 明确 `product_proof` / `music_demo` 与 BGM、后加 SFX 包装层分离。
- 固化 Audio Branch 的显式进入、禁止反向覆盖与 Visual Workflow 回退边界。
- 本次仅为架构隔离，不是规则晋升；未修改当前 Blind Auto Edit Test 1 — Speaker。

