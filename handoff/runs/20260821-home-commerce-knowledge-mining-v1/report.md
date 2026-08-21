# Experiment Report — Home Commerce Knowledge Mining v1

## Identity

- Run ID: `20260821-home-commerce-knowledge-mining-v1`
- Status: `blocked_handoff`
- Started/completed at: `2026-08-21T00:00:00+08:00` / `2026-08-21T00:00:00+08:00`
- Owner: Codex research agent
- Branch: `handoff`
- Base commit: `d79f5a4c72e44b47b4cb54da727311e2e15beb44`
- Artifact commit: `a88b533c579fad4fa10a01d97bb16d6d8e0d63e0`
- Manifest: `handoff/runs/20260821-home-commerce-knowledge-mining-v1/manifest.json`

## Objective and acceptance criteria

把三账号 30 条样本和四个已有案例从账号描述升级为 AI Director 可调用的知识层：账号不合并；建立至少四类 Pattern 并允许新增；定义镜头任务与信息耗尽；建立失败模式；给出非生产 Director 推理合同；所有结论按 validated/strong hypothesis/weak hypothesis 分级。不得开发软件、修改 main、生成或上传视频。

## Frozen inputs and method

输入为 TikTok Home Commerce Research v1 六项文本/JSON，以及仓库内充电宝、耳机套、8.19 卡牌、史莱姆案例记录。方法为逐样本比较 Hook、首次购买意义、Proof、信息状态、主策略与结尾，并用内部人工反馈检查反例。公开视频无转化数据，因此账号结论仅作结构共现；内部案例无统一发布 A/B，因此策略偏好不提升为生产规则。

## Human Sanity Gate

不适用：本 run 没有生成新成片。没有借用机器检查宣称人类观看通过。

## Quality gates

- Action Integrity: not applicable to a new timeline; preserved as a validated knowledge gate.
- Proof Chain: pass for knowledge traceability; functional rules retain Claim→Action→Result→Confirmation and owner binding.
- Proof Ownership: pass for knowledge traceability; no cross-owner substitution is permitted.
- Rule grading: pass; fixed timing, duration, feature count, CTA and scoring claims remain weak hypotheses.

## Artifacts

生成 8 项用户要求的文本/JSON，另含本 report 与 manifest。哈希记录在 manifest。

## Local-only files

None. No video, audio, image, binary, cache or private source media was copied into this run.

## Deviations, failures, and limitations

- 没有订单、点击、投流、受众或退款数据，不能将播放量解释为购买转化。
- 账号样本每个 10 条，非随机全量；账号风格结论是强假设。
- 内部案例的人类反馈深度不一致；耳机套与部分卡牌/史莱姆版本仍缺受控盲测。
- 不将 1 秒、2–3 秒、15–22 秒或 2–3 功能写成硬规则。

## Conclusion

- Final decision: `blocked_handoff`; local artifacts are complete, but remote export requires explicit approval.
- Validated: purchase meaning first; Proof Chain/Ownership; information exhaustion; commercial-intent completion; sales-meaning VO/subtitles; evidence-bound Claim/CTA; repetition upgrade; Hero task.
- Not validated: universal thresholds, universal result-first, universal CTA, conversion effects, fixed score formula.
- Stable rules approved for main: None.

## Handoff and next step

- Branch: `handoff`
- Local artifact commit SHA: `a88b533c579fad4fa10a01d97bb16d6d8e0d63e0`; remote commit pending
- Published files: text/JSON/manifest only
- Local-only: none
- Publish blocker: remote destination has not been explicitly authorized to receive this internal research payload.
- Recovery: after explicit approval, push the checkpoint to `origin/handoff`; no workaround is permitted.
- Next experiment: controlled Preference/A-B tests listed in the knowledge base only after handoff; no new video was started here.
