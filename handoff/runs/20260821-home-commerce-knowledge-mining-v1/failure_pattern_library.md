# Failure Pattern Library v1

以下失败共同解释“技术上没错，但人不会选择使用”。修复方向只进入 Experimental Director，不代表已经证明提升转化。

| ID | 等级 | 症状 | 原因 | 修复方向 | 证据 |
|---|---|---|---|---|---|
| F-01 | validated | 首个购买意义太晚；前几秒只有摆放、开箱或安装 | 展示了拍摄流程，没有回答为什么值得看 | 第一镜从结果、问题、发现、体验、身份或外观中选最强且可证实的一项 | 8.19 卡牌 v2 首个意义 4.00s，v3 0.00s；耳机套 install-first |
| F-02 | validated | 商品身份先出现，但用户价值仍不清楚 | “这是什么”被误当成“为什么买” | 商品身份与用途/结果/身份意义同屏或紧邻；纯 Hero 需补收益 | 充电宝开头静态线材、耳机套技术链 |
| F-03 | validated | 功能动作存在，却没有结果或确认 | Action Integrity 被误当成 Proof Chain 完整 | 强制 Claim→Action→Result→Confirmation，并绑定 owner | 充电宝手表/耳机 Proof 修正 |
| F-04 | validated | VO 很满，画面只做通用手持或复述动作 | VO 承担了本应由画面证明的事实，或没有增加销售意义 | 新利益切换时同步证据；删纯动作旁白；unsupported Claim 降级 | 耳机套 VO、充电宝功能段 |
| F-05 | validated | 不同镜头看似多样，用户感到重复 | 动作、信息与构图未升级；换素材不等于新状态 | 给重复镜头标 upgrade；无新 owner/能力/数量/场景/结果/意义则删 | 充电宝 V2/V5、史莱姆重复挤压 |
| F-06 | validated | Hero 停很久却没有收束感 | Hero 只是同角度产品或包装，没有汇总收益 | 结尾使用完成态、组合结果、成套、暗场、读数或更强感官状态 | TikTok 30 条 ending hero；耳机套 Hero 太晚 |
| F-07 | validated | 情绪口播存在，但观众不相信或无感 | 素材没有人物、关系、仪式、触感或场景支撑 | 降级为视觉/信息策略，或补具体体验证据；禁止空讲关系改善 | 8.19 卡牌素材缺人物互动；史莱姆无 VO 失败 |
| F-08 | validated | 痛点镜头有相关物件，但意义不成立 | 物理对象出现不等于商业意图完成 | 将痛点剪到可读动作和结果；旧方案需明确退出 | 充电宝静态线材与 Reject Old 反馈 |
| F-09 | validated | setup 很早出现，payoff 隔多个功能段才到 | setup 无独立价值，工作记忆被打断 | setup 与 payoff 邻接；否则删 setup，直接从产品/结果开始 | 充电宝 V4 |
| F-10 | validated | 为对齐每个词频繁切镜，结果读不清 | 语音同步优先级压过 Proof 与可读性 | 对齐语义峰值而非逐词；Proof hold 与 readability tail 优先 | 充电宝 V2 手表绿灯仅约 0.30s |
| F-11 | validated | 一条视频把所有功能都讲完但主线变弱 | 信息数量被误当成购买意义密度 | 按价值、可证实性、差异度排序；低价值功能删或拆版本 | hdhdbc 长功能栈；充电宝功能章节 |
| F-12 | validated | 动作物理完成，但商业意义仍未完成 | Director 只识别动作边界，不识别意图边界 | 同时标 `action_complete` 与 `commercial_intent_complete` | 抓起旧线材但未移走 |
| F-13 | validated | CTA 文案与画面方向不匹配 | 通用 Hero 被错误用来回答 below/tap/click | 有手势/UI 证据才用方向 CTA；否则改 soft/choice/engagement | 充电宝 V3/V4；史莱姆 CTA 缺画面 |
| F-14 | strong hypothesis | 技术链完整但仍“不想选” | 只证明能用，未提供差异、身份、审美或体验理由 | 在 Proof 之前或之间建立 Primary purchase motivation；耳机套试 finished-look first | 耳机套 Visual-first 案例 |
| F-15 | validated | 无 VO 的完整动作序列仍看不懂 | 多个动作证明同一事实，缺少语义层级与升级 | 建立 Hook→Identity/Meaning→Variation→Payoff；字幕/VO补产品与体验意义 | 史莱姆 no-VO 用户反馈“完全看不明白” |
| F-16 | strong hypothesis | 结果先给后，教程/过程缺乏继续观看动力 | Preview 已消耗全部未知，后续机制没有新问题 | 只预览部分结果，或让后续 Proof 回答真实性/易用性 | TikTok Transformation 共现；尚无受控 A/B |

## 失败判定优先级

1. 真实性与 Claim support；
2. Action Integrity、Proof Chain、Proof Ownership；
3. 首屏购买意义与策略匹配；
4. 信息升级与耗尽；
5. Hero/CTA 收束；
6. 风格、速度和视觉润色。

上层失败不能由更快节奏、更多字幕或更漂亮转场抵消。
