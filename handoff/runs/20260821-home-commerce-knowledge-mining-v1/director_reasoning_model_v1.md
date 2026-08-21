# Director Reasoning Model v1（非生产草案）

本模型只规定推理合同，不规定软件实现。它把 Pattern 当作可组合策略，把 Proof/真实性当作硬门禁，并允许在素材不足时返回 fallback，而不是强行生成完整广告。

## Input

### `product_understanding`

- 商品是什么、成熟品类还是陌生形态；
- 用户替代方案、核心摩擦与理想结果；
- 候选购买动机：utility、transformation、discovery、identity/emotion、sensory、information；
- 可验证 Claim 与高风险 Claim；
- 价格/Offer/CTA 只有有证据时输入。

### `material_support`

- Action Units 与 entry/exit state；
- 可见 before、mechanism、result、confirmation、Hero、人物/场景、声音/触感代理；
- 每条 Claim 的 proof owner 与完整度：complete/partial/missing；
- 内容可读性、动作连续性、重复状态、自然 CTA 证据；
- 缺失素材和不可说 Claim。

### `reference_style`

- 目标受众意图、语言、账号风格；
- 可借鉴的 Hook/节奏/结尾偏好；
- 必须区分 `style preference` 与 `generalizable rule`；
- 参考结构不能覆盖素材真实性与 Claim 边界。

## Reasoning

### 1. `purchase_motivation`

为每个候选动机记录：用户问题、可见结果、素材覆盖、差异度、风险和证据等级。选择最强动机不是选择最热账号风格，而是选择“对用户重要且素材能证明”的交集。

输出：

```json
{
  "primary": "utility",
  "secondary": "information",
  "why_now": "one charger replaces three device-specific steps",
  "evidence_grade": "validated"
}
```

等级：四维/多维连续表示优于单一产品标签为 `strong hypothesis`。

### 2. `strategy_match`

给 Discovery、Problem/Solution、Transformation、Emotion/Identity、Information Ladder、Sensory Continuity 逐项判断：

- 动机匹配度；
- 素材支持度；
- 所需 Proof 是否完整；
- 是否依赖 unsupported Claim；
- 参考风格是否适配受众。

选一个 Primary Pattern；Secondary 只能补弱点。若两个 Pattern 争夺主线且不能合并，生成两个实验版本，不平均混合。

### 3. `hook_choice`

候选只从已有证据中产生：结果、问题、发现、体验、身份、外观或关键机制。排序依据：购买意义强度、首屏可读性、真实性、后续可兑现性。开箱与安装不是默认 Hook。

输出每个候选的 `promise_created`、`payoff_due`、`risk` 和 evidence。具体首秒阈值不写死。

### 4. `proof_need`

为每个保留 Claim 建立：

`claim → owner → action → result → confirmation → hold_until`

状态：

- `complete`：可以说；
- `partial`：只能说画面确实支持的弱版本；
- `missing`：删除 Claim 或列为补拍；
- `conflicted`：画面与文案冲突，禁止使用。

### 5. `information_plan`

每一状态必须记录 `shot_function`、新增理解、删除损失、进入/退出条件与升级类型。切点由信息耗尽决定；Proof、可读内容、感官反馈和 Hero 可根据任务 Hold。

强制检查：

- setup–payoff 是否邻接；
- 重复是否真正升级；
- VO 进入新利益时画面是否同步；
- readability tail 与 dead tail 是否区分；
- Hero 是否汇总或升级价值。

### 6. `emotion_need`

仅当购买动机需要体验/身份，或功能主线缺“为什么选择它”时启用。检查素材是否支持人物、关系、仪式、触感、场景或拥有想象；没有证据则降级，不能由 VO 虚构。

## Output

```json
{
  "recommended_structure": {
    "primary_pattern": "problem_solution",
    "secondary_pattern": "information_ladder",
    "states": [
      {
        "function": "Hook",
        "user_question": "why watch",
        "new_understanding": "one device replaces charger clutter",
        "visual_evidence": "...",
        "hold_until": "promise understood",
        "exit_when": "mechanism must answer promise"
      }
    ]
  },
  "confidence": {
    "level": "medium",
    "basis": ["purchase motivation supported", "one proof partial"],
    "calibration": "qualitative; no production numeric threshold"
  },
  "evidence": {
    "validated": ["..."],
    "strong_hypothesis": ["..."],
    "weak_hypothesis": ["..."]
  },
  "risks": [
    {"type": "proof_missing", "claim": "...", "required_action": "remove or reshoot"}
  ],
  "fallback": {
    "trigger": "primary proof incomplete",
    "structure": "discovery -> visible detail -> supported use -> soft CTA",
    "claims_removed": ["..."]
  }
}
```

## Confidence 规则

- `high`：购买动机、Hook、主 Proof、Hero 均有直接素材；使用的关键规则为 validated。
- `medium`：主线成立但有 secondary、CTA 或体验证据缺口；缺口已降级且有 fallback。
- `low`：主购买动机依赖 weak hypothesis、关键 Proof partial/missing，或参考风格与素材冲突。低置信度不得伪装成完整推荐。

置信度是证据覆盖描述，不是转化概率。

## Experimental Director 可接入项

可以进入实验层：购买动机先判、Pattern 主辅选择、首屏购买意义候选、Proof Chain/Ownership、信息状态计划、耗尽切点、重复升级检查、Hero 任务、Claim/CTA 证据边界、风险与 fallback。

不得进入生产硬规则：固定 1 秒 Hook、固定 2–3 秒新信息、固定 15–22 秒、固定 2–3 功能、固定 CTA、固定评分公式、结果先给适用于所有品类。
