# Changelog

本文件只记录 `libraries/audio_material/` 的演进，不代表旧视觉规则或 `main` 已发生变化。

## 0.1.0 — 2026-08-18

- 建立完全隔离的有声素材工作流库。
- 定义最粗入口分流：`visual_only` / `audio_relevant`。
- 增加六个初版 audio role：`irrelevant`、`ambience`、`action_sfx`、`product_proof`、`music_demo`、`speech`。
- 定义 Audio Proof、Proof modality 与 VO Gap / Audio Proof Window。
- 明确 `product_proof` / `music_demo` 与 BGM、后加 SFX 包装层分离。
- 固化 Audio Branch 的显式进入、禁止反向覆盖与 Visual Workflow 回退边界。
- 本次仅为架构隔离，不是规则晋升；未修改当前 Blind Auto Edit Test 1 — Speaker。

