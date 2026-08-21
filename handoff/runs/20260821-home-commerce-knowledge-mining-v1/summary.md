# Home Commerce Knowledge Mining v1 — Summary

## 完成状态

- Run ID：`20260821-home-commerce-knowledge-mining-v1`
- 范围：30 条 TikTok Home Commerce Research v1 样本 + 充电宝、耳机套、8.19 卡牌、史莱姆案例。
- 产物：知识库、账号风格矩阵、Pattern Library、镜头功能库、信息密度规则、失败模式库、Director 推理模型、summary；另含 handoff manifest/report。
- 未做：软件开发、`main` 修改、生产规则晋升、新成片、视频上传、账号操作。
- 研究性质：结构与人工偏好证据提炼，不宣称公开播放与转化之间的因果关系。

## 最重要 10 条知识

1. `validated`：首屏必须给购买意义；商品身份早出现不等于用户价值早出现。
2. `validated`：功能 Claim 必须由同一 owner 完成 Claim→Action→Result→Confirmation。
3. `validated`：剪切依据是信息耗尽与镜头任务完成，不是固定秒数。
4. `validated`：信息状态变化必须增加理解；换角度、换源素材、逐词切镜不自动算新信息。
5. `validated`：动作完整、商业意图完整、Proof 完整是三个不同门禁。
6. `validated`：字幕/VO 应增加收益、身份、怀疑消除或 CTA 意义，不能只复述动作。
7. `validated`：Hero 只有在汇总或升级购买意义时才值得长 Hold。
8. `validated`：情绪与强 Claim 都必须由素材支撑；缺失时降级或 fallback，不能靠文案补造。
9. `strong hypothesis`：Pattern 应作为可组合的购买动机路径；一个 Primary 管主线，Secondary 补弱点。
10. `strong hypothesis`：多功能商品先按价值、可证实性、差异度排序；“只留 2–3 个”暂不设硬阈值。

## 新增 Pattern

在 Discovery、Problem/Solution、Transformation、Emotion/Identity 之外，样本支持：

- Information Ladder：核心承诺→同步 feature/proof pairs→综合收益→CTA。
- Sensory Continuity：感官 Hook→持续反馈→变化/规模升级→最强状态。

## 旧规则被推翻/修改

- “产品首屏出现”→“购买意义首屏出现”。
- “每 2–3 秒切”→“信息耗尽才切”；数字只保留为样本描述。
- “结果优先”→只适用于强完成态/变化，后续 Proof 仍必须兑现。
- “多功能只留 2–3 个”→降级为需 A/B 的排序候选。
- “Hero 可以长”→必须仍在汇总/升级意义。
- “动作完整即可”→新增商业意图与 Proof 完整门禁。
- “字幕同步口播”→字幕/VO 必须新增销售意义并同步证据。
- “不同素材就不重复”→按观众获得的新理解判定重复。
- “方向 CTA 可配通用 Hero”→必须有对应手势/UI，否则换非方向 CTA。

## 可进入 Experimental Director

- 直接进入（validated）：购买意义 Hook 候选、Proof Chain/Ownership、信息状态与耗尽、重复升级、setup–payoff 邻接、readability/dead tail、Hero 任务、字幕销售意义、Claim/CTA 证据边界、风险与 fallback。
- 带实验标记进入（strong hypothesis）：Primary/Secondary Pattern、视觉结果先给、Emotion need、多功能排序、耳机套 finished-look first。
- 不进入：固定 1 秒 Hook、固定 2–3 秒新信息、固定 15–22 秒、固定功能数、固定 CTA、固定评分公式、播放量代理转化。

## 账号边界

- `@pick.tech`：Discovery/Identity/Sensory 偏好；无 CTA、反应音频和长 Hold 属账号风格。
- `@hdhdbc.tech`：Problem/Solution + Information Ladder；西语长口播、scarcity 和 30–40 秒属账号风格。
- `@deal..digger`：Transformation + Visual/Proof；车品占比、固定快节奏和结果先给频率属账号风格。

三个账号共同支持的是购买意义、同步 Proof、信息升级与收益 Hero；不支持统一镜头时长、统一 CTA 或统一结构。

## Handoff

- Branch target：`handoff`
- Publication base：`ced698b010e565f1165ef9723a20ec8fa8f57cf8`
- Source artifact/checkpoint：`a88b533c579fad4fa10a01d97bb16d6d8e0d63e0` / `6c1c99cbc88e8a1283984041b5a81e8029b58b44`
- Published payload：`ab64d794552330ea77c8b41cfb4c3fa5ea75fa05`
- Remote status：`handed_off`；已在 `origin/handoff` 验证
- Local-only：none；没有视频或二进制产物。
