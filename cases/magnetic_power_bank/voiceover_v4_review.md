# Voiceover V4 人工审片记录

## 总体判断

V4 整体相较 V3 有明显提升，尤其方向性 CTA 已被用户确认正确。

但开头旧线材逻辑仍然存在结构问题：

- 开头先出现一段数据线/旧充电器相关画面
- 中间经过若干产品与功能片段
- 后面才真正把旧线材整束移走/扔掉

用户反馈：这种“先铺旧线材，隔几个片段后再处理掉”的结构不自然。

## 用户明确建议的两种合法方案

### 方案 A：旧方案一次性闭环

如果要使用旧线材作为开场 Pain Point：

`旧线材出现 → 抓起/整理 → 移走/扔掉 → 桌面清空 → 主产品出现`

应尽量在同一短结构内完成，不要把 setup 和 payoff 拆开隔很远。

### 方案 B：完全舍弃开头旧线材

如果口播/素材不适合一开始完整闭环旧方案，则：

- 直接从主产品揭示开始
- 将完整旧线材“拿起→移走”动作只放在 `No more carrying a bunch of different chargers` 对应语义处

这比开头先放一段意义不完整的旧线材更自然。

## 本轮验证出的通用规则

### Setup–Payoff 邻接规则

如果某个镜头的主要价值只是为后续动作建立前置条件，那么 setup 与 payoff 之间不能隔太多无关信息。

新增字段：

- `setup_role`
- `payoff_role`
- `setup_payoff_distance`
- `setup_standalone_value`

规则：

1. `setup_standalone_value=false` 时，setup 必须靠近 payoff。
2. 若 setup 与 payoff 中间跨越多个独立功能段，应优先：
   - 合并成连续闭环；或
   - 删除 setup，只保留 payoff 所在语义段。
3. 不允许为了“先埋一个点”而牺牲当前段落的即时可理解性。

### Pain Point 不是必须放在开头

Pain Point 是否放开头取决于：

- 是否能在短时间内完整表达
- 是否比直接产品揭示更强
- 是否与开场口播真正匹配

如果不能完整闭环，直接进入主产品通常优于一个意义模糊的 Pain Point 镜头。

## CTA 反馈

最后手指指向左下角的方向性 CTA 被用户确认是正确改动。

因此继续保留：

- `cta_direction`
- `cta_gesture_match`
- `cta_semantic_peak_alignment`

该方向性 CTA 规则在 V4 得到人工正向验证。
