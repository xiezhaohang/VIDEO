# Information Density Rules v1

## 核心定义

信息密度不是镜头数/秒。一个 `information state` 至少改变以下一项：对象、动作、机制、结果、数量、选项、场景、情绪、用户意义或 Offer。机位微动、相似手持、重复按压与逐词换镜都不自动产生新信息。

## Information Exhaustion Rule 候选

> 当当前镜头不再增加用户对购买动机、机制、证据、选项、结果或情绪的理解，并且必要动作、结果确认与可读时间都已完成时，镜头进入 `information_exhausted`；此时应切换、压缩或删除。若连续动作仍在生成因果或可感知反馈，则即使时长较长也未耗尽。

等级：`validated`。这里验证的是判定逻辑，不是任何固定秒数。

建议状态字段：

```json
{
  "state_id": "S03",
  "shot_function": "Proof",
  "new_information": ["result: watch charging icon"],
  "entry_condition": "watch approaches charger",
  "hold_until": "charging icon visible and readable",
  "exit_condition": "confirmation complete; no new feedback",
  "exhaustion_reason": null
}
```

## 爆款样本何时切

30 条公开视频的有效切点多发生在以下事件，而非固定时间：

- 新对象或变体进入；
- 一个动作句完成并出现对应结果；
- 口播进入新利益，画面同步进入新证据；
- 场景切换把规格翻译成用途；
- before 进入 action，或 action 进入 after；
- 单品升级为成套、局部升级为完整 Hero；
- 当前反馈停止且无新的意义更新。

账号均值只用于描述：`pick.tech 3.27s`、`hdhdbc.tech 2.79s`、`deal..digger 2.44s`。等级：`strong hypothesis`。这些数字不能进入生产阈值。

## 哪些镜头允许 Hold

### 1. 因果 Proof

插入→识别→结果、佩戴→测量→读数、吸附→充电状态等不可为追求快切而破坏。充电宝 V2 将手表绿灯压到约 0.30 秒，语义更准但说服力下降。等级：`validated`。

### 2. 持续可见反馈

数字递增、形变回弹、雾量、灯色、装载量、磁吸接触或声音反馈持续变化时，长镜头仍在产出信息。Zikr 计数器约两个大镜头仍成立；史莱姆完整形变也可长 Hold。等级：`validated`。

### 3. 可读内容

问题卡、读数、界面、口号、细节需要完成读取。Hold 时长由内容复杂度和画面可读性决定，不能写死为 0.8–1.3 秒。等级：`validated`（需要读懂）；具体时长为 `weak hypothesis`。

### 4. Hero 汇总

Hero 能比普通镜头更长，不是因为它“好看”，而是它同时完成识别、整合 Proof、拥有想象与情绪收束。若 Hero 只是已看过的同角度产品，它没有长 Hold 权利。等级：`validated`。

### 5. 连续自然动作

结构 B-roll 若动作持续自然且沿途暴露新接口、厚度或使用方式，可以保留；动作完成后仅等待口播的是 `dead_tail`。等级：`validated`。

## Readability Tail 与 Dead Tail

- `readability_tail`：动作或结果已出现，但观众仍需要确认/阅读；保留。
- `dead_tail`：动作完成、结果已读懂、无反馈与新意义，仅等待下一句口播；压缩。
- Hook 前段对 dead tail 更敏感，因为尚未建立足够观看承诺。

等级：`validated`，来自充电宝 V5-Pro-R1 与 8.19 卡牌反馈。

## 信息升级规则

重复镜头只有满足下列至少一项才可保留：

- 新 owner：从手机到手表；
- 新能力：吸附升级到充电确认；
- 新数量：单只升级为整套；
- 新场景：桌面升级到真实车内/暗室；
- 新结果：安装升级到稳定使用；
- 新意义：规格升级为省时、身份或情绪收益；
- 更强汇总：局部 Proof 升级为完整 Hero。

不同源素材、不同角度或更强运动感不等于升级。等级：`validated`。

## 禁止写死的节奏结论

- 所有镜头必须 1–2 秒；
- 所有产品每 2–3 秒必须切；
- 15–22 秒一定优于 30–40 秒；
- 快切一定提高留存或转化；
- Hero 必须固定 Hold 某个秒数；
- 字幕每句话必须对应一个新镜头。

以上全部为 `weak hypothesis` 或已被证据反驳的硬化方式。
