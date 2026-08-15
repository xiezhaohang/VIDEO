# CHANGELOG

## v1.3 — 2026-08-15

基于充电宝口播 V4、V5-Pro 与 V5-Pro-R1 的实际成片与人工/高密度复核，新增并验证：

- V4 验证 Setup–Payoff 邻接规则：如果 Pain Point / Old Solution 只是为后续 Reject Old 做铺垫，setup 与 payoff 不能隔多个独立功能段；要么一次性闭环，要么删除前置 setup。
- 验证 Pain Point 不必强行放在开头；如果不能快速完整表达，直接产品揭示优于意义模糊的旧方案镜头。
- V4 验证方向性 CTA：`I'll leave the link below.` 优先使用真实向下/左下指向手势，明显优于普通 hero shot。
- 新增 `action_sentiment_to_target_product`：主产品在 Hook / 核心展示阶段的动作必须是 positive 或明确 neutral；甩开、推远、离场、丢弃等 negative / ambiguous 动作禁止使用，即使与口播重音同步。
- 新增 `readability_tail / dead_tail`：Proof 后为看清结果服务的稳定尾巴可保留；动作结束后无新信息、只是等待口播的 dead tail 必须压缩，Hook 前 3 秒尤其严格。
- 新增视觉重复层：`visual_redundancy / same_action / same_information / same_composition / new_visual_information`。不同源素材也可能因为构图、动作、信息高度相似而让观众感到重复。
- 验证“是否提供新视觉信息”比“是不是不同素材”更重要。
- 结构 B-roll 保留边界：连续自然地经过厚度、接口、正面等结构信息可以保留，但不能冒充 TSA / hotel wall plug / sale 等不存在的 Proof。
- 新增纯剪辑停止条件：当无必修语义错误、Proof 损坏、状态跳变、明显视觉重复，且剩余问题主要来自素材缺失或包装不足时，应停止继续重排素材，进入字幕、音效、BGM、CTA 包装阶段。
- 新增案例 `cases/magnetic_power_bank/voiceover_v4_review.md` 与 `cases/magnetic_power_bank/voiceover_v5_pro_r1_review.md`。

## v1.2 — 2026-08-15

基于充电宝口播驱动 V1 / V2 实际成片与人工逐帧对比审片，新增并验证：

- 新增 `docs/口播驱动商品剪辑规则.md`
- 口播驱动剪辑从“逐句配画面”升级为 `表达意图 → 视觉对象 → 动作/结果峰值 → 人眼可读时间`
- 新增口播—画面覆盖矩阵：`exact_match / partial_match / no_match / proxy_visual_allowed / proof_missing`
- 明确 A-roll 与 B-roll 分工，功能 Proof 必须强对应，代理画面不能冒充事实证明
- 新增“语义峰值对齐”规则：视觉峰值应落在 `charges / watch / magnetic / snap` 等关键词附近，而不是只同步镜头入点
- 验证 `sync_accuracy` 不能覆盖 `human_readability`：V2 手表绿灯虽更对词，但只有约 0.30 秒可读时间，观感弱于 V1
- 禁止“逐词打卡式剪辑”：不能因为每个短语/名词变化就强制换镜
- 后半段缺直接素材时，连续自然 B-roll 优先于频繁切相似代理镜头
- 禁止为对词重复使用同源动作片段；V2 13.20–16.40 秒接口/侧面重叠使用被人工识别为明显重复
- CTA 前应制造信息/景别反差；`多设备总结 → 单产品 hero` 优于连续两个近似手持产品镜头
- 新增案例 `cases/magnetic_power_bank/voiceover_v1_v2_review.md`，记录 V1/V2 优劣、逐帧纠正和下一版融合建议

## v1.1 — 2026-08-14

基于 V7.1 完整人工逐帧复盘，新增并强化：

- 独立 `docs/因果连续性与状态机规则.md`
- 每个候选镜头必须维护 `state_before / action / state_after`
- 新增对象存在状态与产品朝向连续性检查
- 禁止在近似同构图中让手机、手表、耳机仓凭空出现/消失
- 区分“连续状态型时间线”和“独立功能蒙太奇型时间线”
- 独立素材若状态需要重置，必须通过明显景别/角度/结构分隔告诉观众这是新的演示
- 核心动作不得作为普通 microcut 压缩：必须从可读的动作准备开始，经过触发，到成功反馈并保留稳定尾巴
- 功能 proof 必须闭环到真实可见结果；放置/接触本身不是成功证明
- 总编前新增逐镜头状态审查，任何高严重度 `causal_conflict` 必须在 FFmpeg 执行前解决
- 新增案例 `cases/magnetic_power_bank/V7_1_review.md`，记录手机/手表/耳机状态重置、手表三次重复、耳机无 proof、前重后赶、弱结尾等典型错误

## v1.0 — 2026-08-14

建立首版通用商品实拍 AI 剪辑规则库。

已纳入的关键经验：

- 目标商品 / 演示道具区分
- 核心卖点锚定
- commercial_intent / story_role
- 产品关键面与连续 360° 认知
- microcut 使用边界
- “动作必须剪到起作用的那一刻”
- visual_success_signal（LED、屏幕、动画、状态变化等）
- 10–30 FPS 候选动作复核
- 失败 / 重试 / 手部重新定位 / 反向运动检查
- 状态机：state_before → action → state_after
- 禁止状态倒退、重复首次动作、物体凭空出现/消失
- 同功能 1 次主动作 + 最多 1 次不同信息 Proof
- 素材价值利用优先于素材条数利用
- 导演 / 审片 / 高帧率质检 / 独立总编四层分工
- 节奏、人眼可读时长、呼吸空间、结尾强度
- ffprobe 时间码校验与完整解码验证
