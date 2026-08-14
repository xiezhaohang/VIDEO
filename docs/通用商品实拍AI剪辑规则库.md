# 通用商品实拍 AI 剪辑规则库 v1

> 本文档是长期维护的主规则。以后每次从真实成片中发现新问题，都优先判断它是“通用规律”还是“单产品特例”。通用规律进入本文档，单产品特例进入 `cases/`。

## 1. 总目标

把多条商品实拍素材剪成一条信息清晰、动作完整、卖点明确、节奏自然、因果连续的成片。

目标不是“尽量用完素材”，也不是“只留最强 3 条素材”，而是：**尽量利用所有素材的有效信息，同时删除完全重复、状态冲突和无新增价值的片段。**

---

## 2. 第一层：商品、道具与卖点识别

每个项目必须先锁定：

- `target_product`：真正售卖的商品
- `demo_props`：手机、手表、耳机、容器、支架等演示道具
- `primary_selling_point`：第一核心卖点
- `secondary_selling_points`：次级卖点
- `misidentification_risk`：是否容易把道具误认为商品

硬规则：

1. 道具不能长期抢主体。
2. 最终成片必须让观众快速明确“卖的是谁”。
3. 核心卖点必须有至少一次完整、可见、可理解的证明。

---

## 3. 第二层：不是“拍了什么”，而是“为什么拍”

每条素材都必须输出：

- `literal_action`：字面发生了什么
- `commercial_intent`：为什么拍这段
- `story_role`：它在广告中的角色
- `target_product_relation`：如何服务目标商品
- `unique_information`：相对其他素材新增了什么

推荐 `story_role`：

- Pain Point
- Old Solution
- Reject Old
- Comparison
- Replacement
- Product Identity
- Product Coverage
- Magnet/Feature Hook
- Demo
- Proof
- Detail
- Payoff
- Outro

硬规则：**目标商品不在画面 ≠ 素材没价值。**

旧方案、痛点、扔掉旧工具、前后对比等都可能是重要商业叙事素材。

---

## 4. 第三层：信息槽位优先，不先全局抢最高分镜头

先决定一条成片需要哪些信息槽位，再为每个槽位选最优镜头。

常见槽位：

1. Hook / 痛点 / 对比
2. Product Identity
3. Product Coverage
4. Primary Selling Point
5. Secondary Feature
6. Proof
7. Payoff

不要先把所有镜头打分后只取最高分，否则容易出现“每条镜头都不错，但整条片逻辑倒退”。

---

## 5. 产品展示：从“出现过”升级为“形成完整产品认知”

产品展示分两层：

- `Product Identity`：观众知道卖的是谁
- `Product Coverage`：观众看到了关键面和关键结构

每个产品展示候选增加：

- `product_face`
- `visible_features`
- `adds_new_product_information`
- `product_rotation_coverage`
- `continuous_product_view`
- `covered_faces`
- `missing_faces`

规则：

1. 优先连续旋转、翻转、环绕展示，形成近似 360° 的产品认知。
2. 若连续镜头无法覆盖关键面，再用短 microcut 补齐。
3. 不同面/不同结构 = 新信息，不算重复。
4. 同一面、同一结构、同一信息 = 重复。
5. 核心产品结构镜头必须考虑人眼识别时间，不能因为模型“已经看见”就压成 0.3–0.5 秒。
6. `microcut` 不承担核心产品身份建立；核心结构通常需要足够的 `human_readability_min_duration`。

---

## 6. 最重要的硬规则：操作必须剪到“起作用的那一刻”

任何操作型镜头都必须区分：

1. 动作开始
2. 动作完成
3. 功能/效果出现
4. 效果稳定可读
5. 安全切出

必须输出：

- `action_intent`
- `expected_effect`
- `action_start`
- `action_completion_frame`
- `result_visible_frame`
- `effect_visible_frame`
- `effect_confirmed`
- `effect_stable_frame`
- `settle_frame`
- `safe_cut_end`
- `information_completed`

### 核心原则

**动作完成 != 信息完成。**

例如：

- 把耳机仓放上去，不代表充电成功；黄灯/指示灯/动画出现才是结果。
- 手机吸上去，不代表功能证明完成；充电动画、稳定拿起、状态变化才可能是 proof。
- 手表放上去，不代表完成；绿色充电反馈出现才完成。
- 插头插进去，不代表完成；设备工作/指示灯变化才完成。
- 扔掉旧线，不是手离开就完成；观众需要看清旧方案被明确淘汰。

如果 `effect_confirmed != true`：

- 不允许标为 `Proof`
- 可以降级为 `Demo`
- 或继续向后搜索结果帧
- 找不到结果时必须诚实舍弃 proof 结论

---

## 7. Visual Success Signal：成功反馈不只是一行“Charging”

视觉成功反馈包括：

- LED 点亮
- LED 颜色变化
- LED 闪烁
- 屏幕亮起
- 充电动画
- 电量变化
- 图标出现
- 机械状态锁定
- 稳固拿起不脱落
- 设备姿态变化后的稳定结果

对小型 LED/短暂反馈，应提高时间分辨率检查，不能只依赖 1 FPS 粗采样。

---

## 8. 高帧率动作质检

全素材不需要全部高帧率分析。

推荐两阶段：

### 粗理解

全素材用强多模态模型做商业理解、候选区域定位。

### 精细动作质检

仅候选动作区间使用 10 FPS；对微小 LED、快速接触、极短反馈必要时提升到 15–30 FPS 或逐帧扫描。

质检字段：

- `single_attempt_success`
- `failed_attempt`
- `retry_count`
- `hand_reposition`
- `reverse_motion`
- `clean_contact_moment`
- `stable_result`
- `action_readability_score`
- `continuity_score`

若存在“失败 → 调整 → 重试 → 成功”：

- 优先只保留干净成功动作
- 无法干净分离时降权或舍弃

---

## 9. 状态机与因果连续性

这是总编前必须新增的一层。

每个候选镜头必须记录：

- `state_before`
- `action`
- `state_after`
- `new_information`
- `can_follow_previous`
- `causal_conflict`

规则：

1. 已经吸上的设备不能在后面又被当作“第一次吸附”。
2. 已经证明过的状态不能无解释回退。
3. 相邻镜头不能让设备凭空出现/消失。
4. 产品朝向、手势、设备位置若强烈跳变，需要检查是否会造成认知断裂。
5. `causal_conflict=true` 的镜头禁止直接进入主线。

示例：

- 镜头 A：裸充电宝 → 吸手表 → 充电宝+手表
- 镜头 B：充电宝+手表 → 吸手机 → 充电宝+手表+手机
- 镜头 C：再次“第一次吸手表” → **状态冲突，禁止**

---

## 10. 重复控制：禁止完全同义，不禁止不同证据

### 手机/手表/耳机等功能证明

同一个功能建议：

- 1 次主动作
- 最多 1 次明显不同的信息 proof

例如：

- 第一次：吸附瞬间
- 第二次：拿起后仍稳固 / 亮屏充电

第三次再做同样吸附通常属于重复。

### 语义去重字段

- `semantic_cluster`
- `incremental_information`
- `duplicate_strength`
- `proof_type`

不要因为属于同一卖点就全部删除；判断“是否新增证据”。

---

## 11. 素材利用率：利用“价值”，不是强行利用“条数”

原则：

- 拍了通常有理由，因此要先理解其目的。
- 不要大批量因为“相似”就丢弃。
- 但也不追求 17/17 全塞进成片。

对未进完整主镜头的素材，判断是否适合：

- `microcut`
- 补充角度
- match cut
- 节奏脉冲
- 状态补充
- 产品面补充
- 候补镜头

字段：

- `microcut_value`
- `incremental_information`
- `can_support_transition`
- `can_support_rhythm`
- `reason_if_unused`

### microcut 使用边界

适合：

- 补角度
- 补动作瞬间
- 补产品结构
- 节奏脉冲

不适合：

- 核心产品身份建立
- 需要人眼理解完整结构的展示
- 关键功能闭环

---

## 12. 多模型分工

不要要求一个模型做所有事情。

### A. 导演模型

负责：

- 商品与道具识别
- 商业意图
- story role
- 卖点结构
- 候选池
- 宏观广告叙事

### B. 审片模型

独立挑错：

- 语义重复
- 过长展示
- 动作未完成
- 结果未出现
- weak proof
- weak ending
- 重复吸附/拿起

### C. 高帧率视觉质检

负责：

- 精确动作边界
- 失败/重试
- LED/视觉反馈
- settle tail

### D. 独立总编层

只看清洗后的候选镜头、标签和质检结论，不重新理解全部原始素材。

负责：

- 最终顺序
- 镜头长度
- 快慢变化
- 呼吸空间
- 信息峰值
- 收尾

字段：

- `transition_feel`
- `rhythm_score`
- `breathing_room`
- `impact_peak`
- `pace_variation`
- `ending_strength`
- `human_readability`

---

## 13. 节奏与镜头语言

不能所有镜头都按同一时长切。

总编必须判断：

- 这里应该快切还是停半拍？
- 两个镜头接起来顺不顺、爽不爽？
- 核心动作是否有足够时间读懂？
- 是否需要在结果出现后留 0.2–0.5 秒消化？
- 是否有过长的产品旋转停顿？
- 是否有突兀的 0.3–0.5 秒核心展示？

核心原则：**模型看见了 ≠ 人眼看清了。**

---

## 14. 时间线单向推进

最终时间线应尽量满足：

- 痛点 → 替代
- 产品 → 功能
- 操作 → 结果
- 弱 proof → 强 payoff

禁止：

- 结果已证明后回到同一功能的准备动作
- 已经吸附后又做第一次吸附
- 已经亮屏后又回到尚未接触
- 已经完成产品认知后再重复长时间静态展示

---

## 15. 执行层硬规则

AI 给出的时间码必须经过程序验证：

1. ffprobe 校验源时长
2. 禁止 start/end 越界
3. 不虚构不存在的画面
4. 编码输出优先兼容 Windows
5. H.264 8-bit yuv420p + AAC 作为当前默认兼容规格
6. 输出后完整解码验证

---

## 16. 最终成片审查清单

### 商品

- [ ] 观众能快速知道卖什么
- [ ] 道具没有抢主体
- [ ] 核心产品面/结构覆盖完整
- [ ] 产品展示不碎、不拖

### 卖点

- [ ] 第一核心卖点明确
- [ ] 操作剪到了真正起作用的时刻
- [ ] 每个 proof 都有可见证据
- [ ] Demo 与 Proof 没混淆

### 动作

- [ ] 没有失败/重试被当成一次干净动作
- [ ] 没有动作差 0.1–0.3 秒就完成却提前切
- [ ] 有必要的 settle tail
- [ ] 核心动作人眼可读

### 状态连续性

- [ ] 没有设备凭空出现/消失
- [ ] 没有已吸附后又第一次吸附
- [ ] 没有状态倒退
- [ ] 相邻镜头 state_before/state_after 可衔接

### 重复

- [ ] 同一手机吸附没有重复 3 次
- [ ] 同一手表吸附没有重复 3 次
- [ ] 拿起 proof 没有重复
- [ ] 结尾没有两个同义 payoff

### 节奏

- [ ] 核心产品镜头不突兀
- [ ] 产品展示不过长
- [ ] 有快有慢
- [ ] 重要结果有消化时间
- [ ] 结尾是全片最强或最合适的 payoff

---

## 17. 规则更新机制

发现问题后先分类：

- 商业理解错误 → 导演规则
- 重复/冗余漏检 → 审片规则
- 动作边界错误 → 高帧率质检规则
- 状态倒退 → 状态机规则
- 单镜头都对但组合不好 → 总编/节奏规则
- 仅该产品成立 → `cases/`

不要每发现一个问题就无限追加孤立 Prompt。优先把问题抽象成更高层通用规则。
