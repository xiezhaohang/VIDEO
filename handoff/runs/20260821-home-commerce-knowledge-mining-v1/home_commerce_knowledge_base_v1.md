# Home Commerce Knowledge Base v1

## 定位

这是 AI Director 的研发知识层，不是账号报告、剪辑模板或生产配置。证据来自 TikTok Home Commerce Research v1 的 30 条公开视频，以及充电宝、耳机套、8.19 卡牌、史莱姆四个内部案例。公开样本没有点击、订单、投流与退款数据，因此只能支持结构共现；内部案例提供人工反馈与失败诊断，但多数没有发布转化 A/B。

结论统一分为：

- `validated`：至少有直接案例/反例支持方向与边界，可进入 Experimental Director；不代表跨品类转化因果已证明。
- `strong hypothesis`：多样本一致或解释力强，但仍需受控偏好/转化验证。
- `weak hypothesis`：样本不足、阈值未标定或易被账号风格混淆；不得写成规则。

## 核心知识模型

有效剪辑不是“镜头更快”，而是让用户问题按顺序得到回答：

`为什么看 → 这与我有什么关系 → 它怎么做到 → 我凭什么相信 → 得到什么 → 下一步做什么`

不同商品可省略某些问题：身份型商品可以没有痛点，纯视觉商品可以弱化解释；但显式功能 Claim 不能省略 Proof，情绪 Claim 不能脱离素材，CTA 不能早于购买意义。

## 最重要知识

### K-01 首屏任务是交付购买意义，不是交付商品身份

商品出现很早仍可能无效；观众还需看到结果、用途、问题、发现、体验、身份或外观意义之一。卡牌 v2 的首个可见购买意义在 4.00 秒，v3 为 0.00 秒；耳机套 install-first 完成技术链却未提前建立选择理由。等级：`validated`。具体 1.0/1.5/2.0 秒阈值：`weak hypothesis`。

### K-02 Pattern 是购买动机的推理路径，不是产品类别模板

同一商品可能使用多个 Pattern，例如灯具是 Transformation primary + Proof secondary，卡牌可为 Information primary + Emotion secondary。Primary 决定主线，Secondary 补可信度或欲望。等级：`strong hypothesis`。

### K-03 明确 Claim 必须由同一 owner 完成 Proof Chain

`Claim→Action→Result→Confirmation` 缺一不可；Phone 的结果不能回答 Watch。快切、字幕和音效不能补救 owner 错位或结果缺失。等级：`validated`。

### K-04 信息密度是理解增量，不是切镜速度

只有对象、动作、机制、结果、数量、选项、场景、情绪、意义或 Offer 的变化才算新状态。不同角度、不同源素材和逐词换镜不自动增加信息。等级：`validated`。

### K-05 切点由信息耗尽与任务完成共同决定

普通展示在读懂后应切；Proof 必须等结果确认；可读内容等读完；感官镜头在反馈持续时可长 Hold；Hero 在整合价值时可长 Hold。等级：`validated`。

### K-06 完整动作不等于完整商业意图

抓起线材是动作完成，但没有移走就未完成 Reject Old；安装完成也不等于解释了为什么值得选择。Director 需要同时标注动作边界与商业意图边界。等级：`validated`。

### K-07 字幕/VO 必须新增销售意义

字幕/VO 应翻译收益、建立身份/情绪语境、解释关键机制、消除怀疑或给合法 CTA；只说“装进去、打开、拿下来”是在复述画面。等级：`validated`。

### K-08 Hero 是收益汇总，不是漂亮产品镜头

Hero 应把分散 Proof 收束为可拥有结果：装好、亮起、读数、导入、装满、成套或最强感官状态。没有升级意义的 Hero 不应长 Hold。等级：`validated`。

### K-09 情绪需要素材供给

身份、礼物、关系和体验可以是购买意义，但必须由圈层符号、人物、动作、声音、场景或感官反馈支撑。没有人物互动不能宣称关系改善。等级：`validated`（证据边界）；具体 Emotion primary 选择为 `strong hypothesis`。

### K-10 失败时应降级与 fallback，而不是用文案补全

Proof missing 时删除/弱化 Claim 或转为 Discovery/Visual 路径；Hero 缺失时不承诺 Transformation；CTA 手势缺失时不用方向性文案。等级：`validated`。

## 三账号：可泛化与不可泛化

### @pick.tech

核心受众意图是发现、分享、送礼、圈层身份与感官体验；学习品是例外分支。其产品直现、微揭晓、身份符号和感官 Hold 提供 Discovery/Emotion/Sensory 证据。可泛化的是“新奇商品无需伪造痛点”“持续反馈允许 Hold”；不可泛化的是无 CTA、反应音频、3.27 秒平均间隔与多变体收尾。

### @hdhdbc.tech

核心意图是解决实用问题并验证多功能。其痛点/承诺→机制→功能 Proof→收益→CTA 说明功能品需要同步证明。可泛化的是 owner 一致 Proof 与 VO/画面同步；不可泛化的是西语长口播、scarcity 频率、30–40 秒时长和功能栈规模。

### @deal..digger

核心意图是低成本获得明显外观/使用升级。其结果预览、安装与完整使用态支持 Transformation。可泛化的是结果强时可预览、改造必须给机制；不可泛化的是固定快节奏、车品占比、结果先给适用于所有品类。

完整矩阵见 `account_style_matrix.json`。

## Pattern Library

除指定四类外，样本还支持两个独立模式：

1. Discovery：attention→curiosity→reveal→value→CTA。
2. Problem/Solution：problem→mechanism→proof→result→CTA。
3. Transformation：before/after preview→action→after→benefit。
4. Emotion/Identity：feeling→experience→meaning→CTA。
5. Information Ladder：core promise→同步的 feature/proof pairs→综合收益→CTA。
6. Sensory Continuity：sensory hook→反馈推进→变化/规模升级→最强状态。

后两类不能被“多切几镜”或“加情绪 VO”替代。完整定义与失败边界见 `pattern_library.json`。

## 四案例交叉验证

| 案例 | 购买动机 | 知识贡献 | 分级 |
|---|---|---|---|
| 充电宝 | 功能消痛 + 多设备信息 | Proof Chain/Ownership、setup–payoff 邻接、商业意图完成、readability/dead tail、CTA 手势匹配 | validated |
| 耳机套 | 外观/身份 + 使用 Proof | 技术正确不等于被选择；finished-look first 是下一步实验 | 失败诊断 validated；重排 strong hypothesis |
| 8.19 卡牌 | 内容信息 + 交流/情绪价值 | 首屏购买意义、可读状态、字幕销售意义、重复问题去重 | Information validated；Emotion secondary strong hypothesis |
| 史莱姆 | 感官/体验 + 颜色/数量升级 | 完整重复动作不能构成叙事；持续形变可 Hold；单只→整套是有效升级 | 感官规则 validated；Primary 命名 strong hypothesis |

## 被推翻或修改的旧规则

1. “首屏产品出现即可”改为“首屏出现购买意义；产品身份只是其中一部分”。
2. “每 2–3 秒切镜”改为“按信息耗尽与任务完成切；2–3 秒仅为样本描述”。
3. “结果优先”改为“视觉完成态强时可结果预览；机制/教程仍需后续兑现，且不是全品类默认”。
4. “每条只设一个 Primary Strategy”保留，但 Strategy 从四个抽象标签升级为可组合 Pattern + 硬门禁。
5. “多功能只留 2–3 个”降级为实验排序策略，不设硬数量。
6. “Hero 可以更长”改为“只有 Hero 仍在整合/升级意义时可更长”。
7. “动作完整即可”改为“动作完整、商业意图完整、Proof 完整三者分别检查”。
8. “字幕同步口播”改为“字幕/VO 必须新增销售意义并与对应证据同步”。
9. “不同素材可避免重复”被推翻；重复按观众获得的新信息判断。
10. “CTA 用通用 Hero 收尾”改为“方向性 CTA 需手势/UI 证据；否则选择非方向 CTA”。

## 可进入 Experimental Director

- validated：首屏购买意义候选、Claim→Action→Result→Confirmation、Proof Ownership、信息耗尽判定、readability/dead tail、重复升级、setup–payoff 邻接、Hero 任务、字幕销售意义、Claim/CTA 证据边界、风险与 fallback。
- strong hypothesis（带实验标记）：Primary/Secondary Pattern 选择、视觉结果先给、Emotion need、多功能价值/可证实性排序、耳机套 finished-look first。
- 禁止硬化：固定 Hook 秒数、固定镜头秒数、固定总时长、固定功能数量、固定 CTA 类型、固定评分公式、播放量等于转化。

## 下一步验证

只建议研发实验，不在本 run 生成成片：耳机套 finished-look first 对 install-first；8.19 v2/v3/参考主体盲测“会不会用”；史莱姆动作解释 VO 对体验意义 VO；多功能商品 2–3 强功能版对全功能栈版。需记录 3 秒留存、有效观看、完播、点击、加购、下单与退款，且先过人工 Preference/Sanity Gate。
