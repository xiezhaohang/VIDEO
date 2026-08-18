# 有声素材独立工作流库

状态：`handoff` 实验库（未晋升）  
根目录：`libraries/audio_material/`

本目录用于隔离音响、耳机、麦克风、机械声、产品原声等有声素材实验。它是可插拔的 Audio Branch，不替代、不覆盖、不移动现有无声/视觉剪辑规则库。

## 当前分流

- `visual_only`：无声，或原素材声音没有商业信息、证明或体验价值。继续使用稳定的 Visual Workflow。
- `audio_relevant`：原素材声音承担商业信息、证明或体验价值。只有显式 classifier 给出此结果时，才进入 Audio Branch。

“视频存在音轨”不等于 `audio_relevant`。环境底噪、碰撞杂音或无商业价值的录音可以仍归入 `visual_only`。

## 使用边界

1. 默认入口是 Visual Workflow。
2. 仅通过 `rules/integration_boundary.yaml` 定义的显式分流进入 Audio Branch。
3. Audio Branch 可以显式引用稳定视觉规则，但不得反向覆盖视觉库。
4. Audio Branch 判定失败、证据不足或声音无价值时，必须回退 Visual Workflow。
5. 有声实验与其规则、模板、报告默认写入本根目录；实验产物仍按项目 handoff 纪律归档。
6. 当前正在运行的 `Blind Auto Edit Test 1 — Speaker` 不因本库建立而中断或改写；后续 `Audio Proof v1` 才在本库内启动。

## 文件导航

- `PROJECT_RULES.md`：本库纪律与继承边界
- `docs/有声素材工作流架构.md`：最小架构说明
- `rules/audio_roles.yaml`：初版 audio role
- `rules/audio_proof_rules.yaml`：Audio Proof、Proof modality 与 VO Gap
- `rules/integration_boundary.yaml`：Visual Workflow / Audio Branch 边界与回退
- `templates/`：有声素材 brief 与 proof plan
- `CHANGELOG.md`：仅记录本库演进

