# Narrative Strategy Research v1

## Identity

- Run ID: `20260820-narrative-strategy-research-v1`
- Status: `handed_off`（研究归档；没有生成新成片，不适用新成片 Human Sanity Gate）
- Date: `2026-08-20`
- Branch: `handoff`
- Base commit: `c9699a1b494097f9e988df093d0f6b7337706816`
- Scope: 只研究商品视频的剪辑与广告叙事；没有软件、UI、Electron、打包或 main 修改。

## 结论先行

“功能证明 / 信息递进 / 情绪故事 / 快速展示”不应被当成互斥的产品分类。更准确的结构是：

1. 先用连续维度描述**购买理由需要什么**：`Proof / Information / Emotion / Visual Appeal`。
2. 再单独估计素材对每个维度的**证据供给能力**，不能把“商品需要情绪”误当成“现有素材能证明情绪”。
3. 从有效权重中选 `primary_strategy + secondary_strategy`，同时保留不可被权重抵消的硬约束，例如 Action Integrity、Proof Chain、可读时间和不可虚构 CTA。
4. “快速展示”更像在 Visual Appeal 主导、信息状态少或时长很短时产生的执行策略，不是与 Proof / Information / Emotion 同层的商品本体类别。

因此，最适合自动剪辑系统的是：**多维评分作为内部表示，主策略 + 次策略作为导演决策，硬约束作为安全边界。**

---

## 1. 证据范围与结论强度

### 1.1 读取的现有证据

- 充电宝：
  - `handoff/runs/20260818-103000-director-pass-v2/summary.md`
  - `handoff/runs/20260818-103000-director-pass-v2/director_pass_v2_metrics.json`
  - `docs/因果连续性与状态机规则.md`
  - `docs/功能章节与商业主线规则.md`
  - `cases/magnetic_power_bank/V7_1_review.md`
- 耳机套：
  - `handoff/runs/20260818-164844-earphone-case-visual-first-v1/commercial_understanding.json`
  - `handoff/runs/20260818-164844-earphone-case-visual-first-v1/director_plan.json`
  - `handoff/runs/20260820-095912-earphone-case-full-production-v1/{summary.md,duration_budget.json,final_commercial_structure.json,validated_edit_constraints.json}`
  - 用户反馈：技术生产链可用，但“有其他选择不会选”，Preference Gate 失败。
- 8.19 卡片：
  - `handoff/runs/20260819-160000-ai-directed-footage-review/{coverage_report.json,shooting_quality_review.json}`
  - `handoff/runs/20260819-160424-ai-directed-controlled-auto-edit-v1/summary.md`
  - `handoff/runs/20260819-164702-script-guided-controlled-auto-edit-v2/{summary.md,v1_vs_v2_comparison.json}`
  - 用户反馈与参考片结构核对：去除 `00:00–00:07` 户外段后愿意使用主体；主体前七段约 `1.87–2.13 s` 一次信息刷新；字幕形成痛点→机制→情绪收益→CTA。
- 史莱姆：
  - `handoff/runs/20260818-143548-no-vo-blind-test1-slime/summary.md`
  - `handoff/runs/20260818-160940-slime-vo-blind-alignment-v2/{summary.md,semantic_anchors.json,director_plan.json}`
  - `handoff/runs/20260818-163253-slime-vo-blind-alignment-v2-1/validated_edit_constraints.json`
  - 用户给定状态：VO 对齐版本已通过；CTA 需要自然方向动作。

### 1.2 强度定义

- `validated`：已有案例中的人工反馈或实验直接支持；只在已观察范围内成立。
- `strong hypothesis`：多个证据一致，但尚未经过受控跨产品 A/B。
- `weak hypothesis`：当前用于启动 v0 的工程假设，阈值或泛化尚缺证据。

---

## 2. 决定剪法的核心变量

变量必须分成三组。只看产品品类会把“应该怎么卖”和“素材能不能这样卖”混在一起。

### 2.1 购买理由 / 价值结构

| 变量 | 判定问题 | 对策略的影响 | 强度 |
|---|---|---|---|
| 核心价值位置 | 用户主要买功能结果、内容丰富度、外观、感官体验，还是关系/情绪收益？ | 决定四维需求先验 | `strong hypothesis` |
| 购买理由可直接视觉证明比例 | 关键购买理由中，有多少可以由画面直接看到，而不是只能由 VO 宣称？ | 高比例推高 Proof；低比例要求 Script 补意义或判定素材缺口 | `validated`（四案例均有对应正/负证据） |
| 明确 0→1 因果动作 | 是否存在“动作前不成立，动作后成立”的可见状态，例如吸附→充电、拆尾→端口出现？ | 存在则 Proof Chain 成为硬约束，不只是风格偏好 | `validated`（充电宝、耳机套） |
| 内容广度是否本身就是价值 | 不同问题、款式、数量、组合是否每次都构成新的购买信息？ | 推高 Information；要求状态去重和信息读完即切 | `validated`（参考卡片主体） |
| 情绪/关系收益的重要性 | 用户买的是物体本身，还是“更好聊、更亲近、解压、好玩”等体验？ | 推高 Emotion，但仍需视觉或互动证据 | `strong hypothesis` |
| 外观是否可独立驱动选择 | 造型、颜色、款式是否在没有复杂因果解释时仍能形成购买理由？ | 推高 Visual Appeal 和 Hero/variant 价值 | `strong hypothesis`（耳机套提供负向商业反馈） |

### 2.2 素材证据供给

| 变量 | 可计算证据 | 影响 | 强度 |
|---|---|---|---|
| Proof 完整度 | `prepare → action → result → readable hold` 覆盖率；结果反馈是否可见 | 决定功能 Claim 能否保留；缺结果时不得伪装成 Proof | `validated` |
| Proof Ownership 清晰度 | 触发对象、结果对象、被证明对象是否一致 | 决定是否允许因果连续；错配即退回 Director | `validated` |
| 可用信息状态数量 | 去重后的新问题、新款式、新数量、新状态、新结果数量 | 决定 Information 策略能否持续刷新 | `strong hypothesis` |
| 单状态信息读完时间 | OCR 可读时间、动作终点、结果确认时间、字幕阅读时间中的最大值 | 决定镜头最短合法时长；不是统一“2 秒一刀” | `validated`（Proof Hold 与卡片可读时间方向），具体阈值为 `weak hypothesis` |
| 可读文字承载能力 | OCR 置信、字号、角度、遮挡、光照、字幕安全区 | 高时画面可直接承担信息；低时不能把镜头标为“问题已交付” | `strong hypothesis` |
| 人物互动/反应供给 | 是否有使用者、对话、反应、前后变化或明确场景动作 | 决定 Emotion 能否成为视觉主策略 | `validated`（8.19 缺互动/反应被明确记录） |
| 动作完整度与素材质量 | 重试、重置、遮挡、光斑、逆光、构图、稳定性、景别/色彩一致性 | 影响所有策略的可执行性与 confidence | `validated` |
| 视觉吸引力供给 | 干净 Hero、款式对比、颜色/材质细节、主体占比、光线和运动质量 | 决定 Visual Appeal 能否补足技术流程的商业吸引力 | `strong hypothesis` |
| 自然 CTA 证据 | 指向、点击、产品完整展示、价格/购买信息是否真实存在 | 决定方向性 CTA、非方向 Hero CTA 或无 CTA | `validated`（充电宝、史莱姆、耳机套） |

### 2.3 时间与叙事可行性

| 变量 | 含义 | 规则影响 | 强度 |
|---|---|---|---|
| 信息刷新潜力 | 在目标时长内，素材能提供多少个不重复的新语义状态？ | 低潜力时不能靠重复动作制造“快节奏” | `strong hypothesis` |
| 情绪弧可观察性 | 是否存在起点→变化→收益，而不只是 VO 说“更开心/更亲近”？ | 无可观察变化时 Emotion 不能单独做 primary | `strong hypothesis` |
| 结构依赖强度 | 某状态是否必须在前一状态完成后才成立？ | 高时按因果/章节排序；低时可按信息或审美排序 | `validated` |
| 参考片可迁移度 | 参考片的优势来自剪法、字幕还是其独有素材？ | 只迁移有本地证据支持的结构，不复制不可供给状态 | `validated`（8.19 参考对比） |

核心关系可概括为：

`需要什么（value demand） × 素材能证明什么（evidence supply） × 观众读完需要多久（readability） → 可执行叙事策略`

---

## 3. 三种策略选择模型比较

### 3.1 单一离散分类

优点：规则简单、输出稳定、容易解释。

缺点：

- 卡片同时需要 Information 和 Emotion；耳机套同时需要 Proof 和 Visual Appeal。
- 同一商品在不同素材包或广告目标下会改变剪法。
- 一次分类错误会整条套错规则。
- 不能表达“情绪重要，但现有素材没有人物互动”的证据缺口。

结论：不适合作为内部真相；最多用于人工简写。`validated` 的负面依据是四案例均出现混合或供给差异。

### 3.2 主策略 + 次策略

优点：Director 容易执行；能说明谁负责主线、谁负责增强；比单标签容错好。

缺点：如果没有底层分数，主次来源仍可能是黑箱；无法表达第三个维度的硬需求；容易把 60/40 当成假精确。

结论：适合成为 Director 的决策接口，但不应是唯一推理层。`strong hypothesis`。

### 3.3 多维评分 / 权重

建议维度：

- `P — Proof`：需要并能维持多少因果证明。
- `I — Information`：购买价值是否靠不同内容/状态持续刷新。
- `E — Emotion`：购买动机是否需要体验、关系或情绪变化。
- `V — Visual Appeal`：外观、质感、款式与审美是否能独立驱动选择。

优点：保留混合性；可以分开记录需求与素材供给；支持解释、置信度和 fallback。

缺点：权重阈值目前缺少跨产品标定；如果直接拿分数驱动每一刀，会产生摇摆或过度优化。

### 3.4 推荐模型

采用三级混合模型：

1. **连续维度为内部表示**：分别输出 `demand[P,I,E,V]` 和 `support[P,I,E,V]`。
2. **主策略 + 次策略为导演接口**：根据有效权重选主次，但不把数值伪装成精确心理比例。
3. **硬约束独立执行**：Action Integrity、Proof Ownership、最低可读时间、不可虚构 Claim/CTA、无重复动作填充，不能被任何策略权重覆盖。

v0 可用：

`effective_k = demand_k × (0.5 + 0.5 × support_k)`

之后归一化只用于排序。这里保留 `0.5` 是为了让“重要但素材缺失”的维度仍暴露为缺口，而不是被乘成零。该公式及阈值均为 `weak hypothesis`，不是已验证规则。

主策略取最高有效权重；次策略在以下任一条件成立时保留：

- 次高维度归一化后 ≥ `0.25`；
- 前两名差值 < `0.15`；
- 次高维度对应不可省略的商业任务，例如耳机套的外观 Hero 或卡片的情绪收益解释。

阈值为 `weak hypothesis`，下一轮需标定。

---

## 4. 四个案例在模型中的位置

以下分数只是 v0 可解释估计，不是验证后的标定值。

| 案例 | Demand P/I/E/V | Support P/I/E/V | Primary | Secondary | 关键理由 | 结论强度 |
|---|---|---|---|---|---|---|
| 充电宝 | `.90/.35/.10/.35` | `.90/.60/.10/.55` | Proof | Information | 存在手机/手表/耳机的明确 0→1 因果链；Director v2 的 4/4 Proof Chain、0 ownership mismatch 已过 Human Sanity。信息只能在功能章节升级时刷新，不能破坏因果确认。 | `validated`（primary）；次策略为 `strong hypothesis` |
| 耳机套 | `.60/.45/.20/.80` | `.80/.55/.15/.70` | Visual Appeal | Proof | 安装、开合、携带、端口访问技术链完整，但用户在有其他选择时不会选，说明“流程正确”不是主要购买吸引力；双款 Hero 和造型应更早/更强，Proof 负责可信而非统治整条。 | primary 调整为 `strong hypothesis`；技术 Proof 能力 `validated` |
| 8.19 卡片 | `.25/.90/.75/.35` | `.35/.75/.20/.45` | Information | Emotion | 参考主体约两秒刷新一个问题/状态，且用户明确愿意使用；产品价值来自问题内容与交流收益。现有 8.19 没有人物互动/反应，所以 Emotion 是高需求、低视觉供给，只能由具体字幕与可读问题共同支撑，不能空讲。 | Information `validated` 于参考主体；迁移到现有素材为 `strong hypothesis` |
| 史莱姆 | `.45/.45/.80/.65` | `.70/.65/.45/.75` | Emotion / Sensory Experience | Visual Appeal（Proof 为硬支撑） | 计数递进、五个 payoff、单只/整套对比、慢回弹质感和自然 CTA 共同卖“体验”；无 VO 版本即使动作完整也曾难理解，VO 对齐与自然方向动作成为关键。情绪/感官必须由形变与慢回弹 Proof 支撑。 | 音画锚点与 CTA `validated`；Emotion primary 为 `strong hypothesis` |

重要说明：史莱姆中的“Proof”不是把它变成功能证明型。它是对感官体验的证据约束：如果 VO 说 slow/no-rebound，画面必须给完整形变和可读结果。

---

## 5. 策略怎样改变各引擎

### 5.1 Proof 主策略

**Director**

- 以 `Claim/Problem → Action → Result → Confirmation` 组织章节。
- 每章只保留一条主因果链；重复 Proof 只有产生 major information upgrade 才可进入。
- 维护 `state_before/action/state_after/proof_owner`，禁止状态倒退和对象凭空出现。

**Cutter**

- 入点覆盖必要准备；不得在核心动作已几乎完成时才进入。
- 出点必须越过结果出现，并保留 `Proof Hold`；充电宝已有证据支持结果后约 `0.3–0.8 s` 按画面调整。
- 动作完整性优先于统一镜头时长。

**Script Engine**

- 回答“为什么做这个动作、结果证明了什么、对用户有什么用”。
- Claim 必须有对应 owner，不能用 Watch 结果回答 Phone Claim。
- 不复述手部动作，不扩张到素材未证明的保护、防水、速度等 Claim。

**Duration Budget**

- 允许 Action + Proof Hold；不允许为 VO 延长 dead tail。
- 先压缩 VO，再考虑轻微语速；不可循环或重复视觉。

**Transition**

- 切点服从因果边界和状态连续；优先结构性硬切或独立演示分隔。
- 无感过渡不能遮盖状态错配。

**CTA / Hero**

- 先完成最强终态/组合 Proof，再收 Hero。
- 有方向动作才使用方向 CTA；否则用真实 Hero + 非方向 CTA。

### 5.2 Information 主策略

**Director**

- 用“每镜新增什么”排镜头：新问题、新款式、新数量、新机制、新结果或新销售信息。
- 开场尽快交付可识别用途；卡片参考支持首个有效画面直接出现产品 + 使用状态 + 可读问题。
- 当前状态信息耗尽后，不因动作尚有自然尾巴而继续占线。

**Cutter**

- 镜头最短时长由 `max(动作完成时间, OCR/字幕读完时间, 必要结果确认)` 决定。
- 卡片参考提供约 `1.87–2.13 s` 的成功刷新节奏；`≤2.2 s` 只能作为该类素材的候选上限，不是全局硬规则。
- 可读问题建议至少保持约 `0.8–1.3 s`，但需按字号、语言、角度和 OCR 置信动态调整。该具体范围为 `weak hypothesis`。

**Script Engine**

- 字幕/VO 走具体痛点 → 使用机制 → 内容/数量丰富度 → 可感知收益 → CTA。
- 文案回答画面没有回答的问题，不能只是“拿卡、翻卡、铺卡”。
- 视觉状态变化与文案意义变化对齐；静音首屏仍需成立。

**Duration Budget**

- 为读取新信息而 hold；信息读完后不 hold。
- Hero 超过约 2 秒必须仍有字幕、数量、最佳问题或 CTA 的新增信息。此阈值为 `weak hypothesis`。

**Transition**

- 同机位换卡/翻卡可在动作完成点硬切；优先语义刷新，不为丰富而加效果。
- 景别、曝光跳变仍需 Transition Compatibility，但不能牺牲卡片可读性。

**CTA / Hero**

- CTA 与完整产品、内容数量或最佳问题样例同屏。
- 结尾继续交付最后一个信息，不使用“信息已经耗尽的长尾帧”。

### 5.3 Emotion / Story 主策略

**Director**

- 先定义可观察弧：情绪/关系起点 → 好奇或尝试 → 互动/变化 → 情绪收益 → CTA。
- 每章必须同时推进至少一项：视觉状态、文案意义或情绪强度；不能只靠抽象 VO 宣告变化。
- 若没有人物互动，可用具体问题、感官变化、数量升级等代理证据，但必须降低 confidence。

**Cutter**

- 允许为反应、触感、悬念和 payoff 留呼吸，但必须有情绪或感官变化在发生。
- 对史莱姆保留完整挤压→形变→慢/不回弹结果；对关系类卡片保留问题可读时间。

**Script Engine**

- 回答“用户为什么在意、体验如何改变、最后得到什么感受”。
- 情绪词必须绑定画面中的问题、互动、反应或可感官 Proof；禁止泛化的“更有趣、更亲近”空话。
- 关系收益无法视觉证明时，改写为较弱、可支持的机制性表述。

**Duration Budget**

- 情绪转折、反应和 payoff 可 hold；没有状态变化的“氛围空镜”不可自动获得时长。
- VO 节拍可成为切点锚，但不能截断物理动作。

**Transition**

- 优先连续动作、视线、姿态、音义或情绪相位匹配；效果转场仍是末级手段。
- 可以用结构性段落切从“问题”进入“体验”，但要让意义变化可读。

**CTA / Hero**

- 收束在情绪/感官 payoff 与产品同屏；方向性语义需自然手势匹配。
- CTA 不是突然卖货，而是“把刚看到的体验归还给产品”。

### 5.4 Visual Appeal / 快速展示主策略

**Director**

- `Strong visual hook → form/texture → 2–3 distinct highlights or variants → strongest Hero`。
- 以造型、颜色、材质、尺度、款式升级，而不是重复旋转同一外观。
- 技术 Proof 作为短支撑插入；不让长流程吞掉造型 payoff。

**Cutter**

- 镜头以审美信息读完即切；动作可从已开始的位置进入，只要不制造因果 Claim。
- 优先干净构图、主体占比、光线和自然相机运动；淘汰遮挡、停顿和低质重复角度。

**Script Engine**

- 说选择理由、设计差异、使用场景和可证卖点；少做步骤说明。
- 不用“可爱/高级”等空词替代可见细节，尽量指出具体外观差异。

**Duration Budget**

- Hook 和特色镜头短而明确；最强 Hero/双款 payoff 可获得最长 hold。
- 当可用视觉状态不足时，不用重复、慢放或装饰转场填满目标时长，应缩短成片或 fallback。

**Transition**

- 优先构图、颜色、运动方向、尺度的无感匹配；硬切只要形成明确视觉升级即可。
- 不用转场效果救低质量镜头。

**CTA / Hero**

- 以最佳款式组合或 choose-your-favorite 收束；有真实方向动作才使用方向 CTA。
- 对耳机套，双款 Hero 应承担真实商业 payoff，而不只是流程结束后的尾镜。

---

## 6. 错误使用策略的典型失败

1. **卡片按功能流程剪**：开盒→抽卡→铺卡虽然动作完整，但把不同问题当成同一“抽卡动作”的重复，4–6 秒陪动作走完，信息和意义不增长；结果技术正确、Preference Gate 失败。`validated`。
2. **充电宝按纯信息刷新剪**：为追求两秒一刀，会在手机/手表/耳机的触发与结果之间切走，或把不同 owner 的反馈拼在一起；信息密度上升但 Proof Chain 被破坏。`validated` 于已有失败类型，尚未做受控反例 A/B。
3. **情绪型产品只有空洞 VO**：画面只证明“有卡/有玩具”，VO 却宣称“更亲近/更开心”，购买意义完全依赖声音，静音观看崩溃且可信度低。`validated` 的负面证据来自 8.19 素材缺互动与泛化文案反馈。
4. **耳机套只按功能证明**：安装、开合、携带、端口都对，但观众看完像说明书；外观、双款选择和 Hero 没有成为主驱动力，商业吸引力一般。`strong hypothesis`，需受控重排验证。
5. **史莱姆只按快速展示**：多次挤压若被剪成漂亮 microcuts，却没有计数、单只/整套对比和 slow/no-rebound 锚点，会变成相似动作堆叠；No-VO 版本已出现“局部动作成立、整条难理解”。`validated`。
6. **Visual Appeal 用来救差素材**：外观策略在逆光、遮挡、无干净 Hero、状态数量少时会退化为重复角度和装饰转场。`strong hypothesis`。

---

## 7. 自动判定流程 v0

### 输入

- `product_understanding`：产品、目标人群、核心购买理由、允许/禁止 Claim、期望时长。
- `material_analysis`：Action Units、状态前后、Proof 反馈、OCR/字幕可读性、人物互动/反应、Hero/款式、素材质量、自然 CTA。
- `reference_analysis`（可选）：参考片的语义状态序列、切点、字幕功能、情绪弧，以及哪些状态在本地素材中可供给。

### 流程

1. **拆购买理由**：把每个购买理由标为 `functional_result / content_breadth / appearance / sensory_experience / relationship_emotion`，并记录重要度。
2. **建立 Claim–Evidence 表**：对每个理由记录 `directly_provable / indirectly_supported / unsupported`；标出 0→1 因果动作和 proof owner。
3. **计算 Demand 向量**：输出 `P/I/E/V` 的需求分及逐项理由。
4. **计算 Support 向量**：
   - P：完整 Proof Chain 比例、owner 清晰度、动作质量。
   - I：去重新信息状态数、OCR 可读率、目标时长内刷新能力。
   - E：人物互动/反应、前后变化、感官变化与文案锚点覆盖。
   - V：Hero、款式、构图、光线、稳定度、审美差异状态。
5. **应用硬门禁**：
   - 不完整动作不得承担 Proof。
   - 不可读文字不得承担内容信息。
   - 无视觉/机制支撑的情绪收益不得作为强 Claim。
   - 无自然方向证据不得生成方向 CTA。
   - 不允许可见循环、重复动作填充或为 VO 延长 dead tail。
6. **参考片差距分析**：只迁移本地素材可实现的语义结构；把缺失的人物反应、多问题状态、字幕能力列为 material gap，不用剪辑伪造。
7. **算有效权重并选主次**：用 v0 公式排序；主策略负责章节主线，次策略负责每章增强和结尾收束。
8. **生成 fallback**：依据“次高支持维度 + Claim 安全”选择，不只是次高 demand。
9. **计算 confidence**：由产品理解完整度、证据覆盖、参考可迁移度、前两策略分差、素材质量共同组成；任一关键 Claim unsupported 时上限降低。

### 输出契约示例

```json
{
  "primary_strategy": "information_progression",
  "secondary_strategy": "emotion_story",
  "confidence": 0.74,
  "demand_scores": {"proof": 0.25, "information": 0.90, "emotion": 0.75, "visual_appeal": 0.35},
  "support_scores": {"proof": 0.35, "information": 0.75, "emotion": 0.20, "visual_appeal": 0.45},
  "key_evidence": [
    "multiple readable questions and multi-card quantity states exist",
    "content breadth is the clearest visible purchase reason",
    "no real social interaction or reaction is present"
  ],
  "hard_constraints": [
    "hold each readable question long enough for OCR/readability",
    "do not claim observed emotional change",
    "do not repeat the same selection action as new information"
  ],
  "material_gaps": ["real interaction/reaction payoff"],
  "fallback_strategy": "visual_appeal",
  "fallback_reason": "use a shorter product-and-card showcase if distinct readable states are insufficient"
}
```

### Fallback 规则

- Proof 不足：降为 Information 或 Visual，并删除不可证明 Claim；绝不把 Demo 标成 Proof。
- Information 状态不足：若有完整因果链，降为 Proof；否则缩短为 Visual，不用重复动作填时长。
- Emotion 证据不足：降为 Information + 具体机制文案；若连机制也不可读，则 Visual 或请求补拍。
- Visual 质量不足：选择证据最强的 Proof/Information；若都不足，输出 `insufficient_material` 而不是硬剪。

以上流程结构为 `strong hypothesis`；分数公式、阈值和 confidence 标定为 `weak hypothesis`。

---

## 8. 下一轮最小验证计划（本轮不生成视频）

### Test 1 — 8.19 Preference-Guided v3

- 使用产品：现有 8.19 素材，不新增拍摄。
- 关键假设：对内容型商品，Information primary + Emotion secondary 比功能流程结构更能跨过 Preference Gate。
- 对照：已存在的 Script-Guided v2；实验版未来只改变 Director/Script/Duration 的信息递进策略，不把 Transition 当主变量。
- 观察：
  - 盲选时是否优先选择实验版；
  - `would_use_if_other_options_exist` 是否从否变是；
  - 静音首屏能否在 0.5–1.0 秒内说清用途；
  - 每镜是否新增语义状态，读完后是否立即切；
  - 泛化情绪 Claim 数 = 0；
  - Action Integrity / hard fail 不退步。
- 失败解释：若仍不愿选择且本地只有约 4 个有效状态，优先判为素材供给上限，而不是继续加速剪辑。

### Test 2 — 耳机套 Visual-led controlled variant

- 使用产品：现有耳机套素材。
- 关键假设：该商品应是 Visual Appeal primary + Proof secondary；把双款/造型 payoff 前置并压缩安装说明，可提高主动选择偏好，同时不损失可信度。
- 对照：Full Production Pass v1。
- 观察：
  - 盲选 Preference；
  - 前 1 秒产品吸引力/品类识别；
  - “像广告而不是说明书”的人工评分；
  - 安装、开合、端口访问的关键 Proof 是否仍理解；
  - Hero 是否形成真正 payoff；
  - 不支持 Claim、动作截断、状态倒退均为 0。

### Test 3 — 现有史莱姆版本的无渲染标注复核

- 使用产品：已有 No-VO、VO 对齐 v2/v2.1，不生成新成片。
- 关键假设：体验/感官产品的 Emotion primary 必须由语义锚点 + 感官 Proof 支撑；仅完整动作不足以建立整条叙事。
- 方法：对现有版本做统一人工量表，不改变文件。
- 观察：产品理解、购买理由复述、感官词与画面匹配、CTA 自然度、主动选择偏好。
- 价值：用零渲染成本确认 `Emotion demand` 与 `Emotion support` 必须分开。

最小顺序：先 Test 1；只有其证明多维模型能改变 Preference，再做 Test 2；Test 3 可与人工审片同批完成。暂不为充电宝生成“错误策略”反例，因为已验证的 Proof Chain 不应为了证明理论而冒回归风险。

---

## 9. 目前最不确定的三个问题

1. **权重和切换阈值能否跨品类标定**：当前 0.25、0.15 和有效权重公式只是 v0；四个案例不足以证明稳定边界。`weak hypothesis`。
2. **没有人物互动时，Emotion 何时仍能做 primary**：史莱姆可由感官形变承载体验，但关系类卡片是否能仅靠可读问题 + 字幕形成真实情绪弧，尚未验证。`weak hypothesis`。
3. **素材状态数量与 Preference 的因果关系**：参考卡片主体约两秒刷新一次明显更好，但究竟是信息密度、字幕文案、拍摄质量还是三者交互在主导，尚缺同素材受控 A/B。`strong hypothesis`，待 Test 1 拆分。

---

## 10. 规则状态清单

### Validated

- 明确 0→1 功能 Claim 必须保留 Action Integrity、Proof Chain、Proof Ownership 和可读结果 hold。
- 结果/owner 错配不能被快节奏或转场补救。
- 卡片参考主体去掉无关户外段后通过用户使用偏好；成功主体持续刷新问题/状态，字幕承担完整销售链。
- 现有 8.19 与耳机套技术链不等于 Preference Gate 通过。
- 史莱姆计数递进和自然方向 CTA 是需跨版本保留的语义/动作锚点；无 VO 的相似动作序列可在局部完整时仍缺整条叙事理解。
- 无素材证据的 Claim、情绪结果和方向 CTA 不得生成。

### Strong hypotheses

- 叙事策略本质是连续维度，Director 应接收主策略 + 次策略而不是单一品类标签。
- 耳机套应从 Proof-led 调整为 Visual-led + Proof-supported。
- 8.19 应采用 Information-led + Emotion-supported，并以信息读完而非动作自然尾巴决定切点。
- “快速展示”是 Visual Appeal 主导或素材/时长受限时的执行策略，不是同层的独立价值类别。
- Demand 与 Support 必须分别计算，否则会产生空洞情绪 VO 或无法执行的高信息结构。

### Weak hypotheses

- v0 有效权重公式及 primary/secondary 阈值。
- 卡片可读 hold `0.8–1.3 s`、主体状态候选上限 `2.2 s`、长 Hero 约 `2 s` 的具体阈值可泛化。
- 现有 8.19 素材能仅靠重排和新文案跨过 Preference Gate。
- confidence 的数值标定和 fallback 的自动选择边界。

## Handoff

- Handoff payload commit: `7de0c068c42e07dade7399b31e7a7cacdb72d535`
- Published scope: 本报告、可机读规则候选、summary、manifest、实验状态条目。
- New video: None.
- Local-only media: None；本轮只读取已归档文本/JSON和用户提供的反馈，不复制源素材或成片。
- Stable rules approved for main: None.
- Next action: 只批准验证计划设计；在明确启动下一轮前不生成视频。
