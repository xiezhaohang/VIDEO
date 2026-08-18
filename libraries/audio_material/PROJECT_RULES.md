# 有声素材独立库项目规则

状态：`handoff` 实验规则；不是 `main` 规则晋升。  
适用范围：`libraries/audio_material/` 内的有声素材分类、Audio Proof 与同步声音实验。

## 1. 隔离原则

- 本库是有声素材独立库，现有无声/视觉工作流是稳定基线。
- 不修改、覆盖、移动或改写旧视觉库及既有 `docs/rules` 正文。
- 与旧体系只允许显式引用；任何继承、输入或回退都必须在配置或实验记录中写明。
- Audio Branch 不得反向覆盖 Visual Workflow 规则。
- 实验默认只写 `handoff`，未经重复验证和明确晋升决定不得写入 `main`。

## 2. 当前阶段

当前只做最粗分流：

- `visual_only`：无声或声音无商业价值。
- `audio_relevant`：原素材声音承担信息、证明或体验价值。

存在音轨不是进入 Audio Branch 的充分条件。后续可以细分，但初版不得以未经验证的复杂分类替代这两个入口结果。

## 3. 继承的核心纪律

以下稳定原则继续有效，优先级不降低：

1. Action Integrity 最高优先级。
2. Proof Chain：`Claim -> Action -> Result -> Hold`。
3. Proof Ownership：触发对象、结果与被证明对象必须一致。
4. Proof modality 仅在本库扩展为 `visual / audio / audiovisual`。

本扩展不改写旧视觉规则对 Proof 的定义，只在 Audio Branch 内增加可听与视听证据。

## 4. Audio Proof 与包装层

- 原素材真实声音可以承担 Proof。
- `product_proof` 和 `music_demo` 属于核心剪辑证据，不等于 BGM。
- BGM 与后加 SFX 仍属于包装层，不得冒充产品原声或核心 Proof。
- 如 Audio Proof 依赖动作与声音同步，优先保留同一 continuous take 的 sync sound / product audio。

## 5. VO Gap

- VO gap 不得默认视为 dead air。
- 必须先判断该区间是否为 Audio Proof Window。
- 若是，可保留当前 continuous take 的 sync sound / product audio，并记录其 Proof Ownership。
- 若不是，才按普通节奏与包装规则处理。

## 6. 强制实验流程

每个有声实验必须依序完成：

1. 完成实验：冻结输入、配置、版本和输出，分配 `run_id`。
2. 生成报告：记录 Human Sanity Gate、Action Integrity、Proof Chain / Ownership、音频证据与限制。
3. Handoff：将报告、manifest 与允许发布的产物提交到 `handoff`。
4. 更新状态：记录 branch、commit、产物、`local_only`、状态和下一步。
5. 再进入下一实验：未完成 handoff 与状态更新，不启动依赖该结论的下一实验。

若 handoff 失败，状态必须标记为 `blocked_handoff`，不得静默继续。架构 bootstrap 不等于规则通过实验，也不构成规则晋升。

