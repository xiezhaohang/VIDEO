# 视频自动剪辑项目规则

状态：handoff 规则草案  
适用范围：所有实验、Director Pass、Blind Auto Edit、新素材测试与规则晋升  
原则：项目文件是唯一持久依据；聊天记录不得作为唯一依据。

## 1. 强制实验流程

每个实验必须按以下顺序完成，任何一步未完成都不得进入下一实验：

1. **完成实验**：冻结输入、配置、代码版本与输出；分配唯一 `run_id`。
2. **生成报告**：使用 `docs/templates/EXPERIMENT_REPORT_TEMPLATE.md`，记录目标、方法、Human Sanity Gate、指标、结论与已知限制。
3. **Handoff GitHub**：使用 `docs/templates/HANDOFF_MANIFEST_TEMPLATE.json` 生成 manifest；实验结果必须提交到 `handoff` 分支。
4. **更新状态**：在 `docs/status/EXPERIMENT_STATUS.md` 记录 `run_id`、branch、commit SHA、产物、`local_only`、状态与下一步。
5. **再进入下一实验**：只有报告、manifest、GitHub handoff 和状态记录全部完成后，下一实验才可开始。

若 GitHub 发布失败，不得静默继续。状态必须标为 `blocked_handoff`，并明确记录原因、待发布文件和恢复条件。

## 2. GitHub 与归档规则

- 实验结果默认进入 `handoff`，不得直接提交到 `main`。
- `main` 只接收经过稳定、重复验证并获明确晋升决定的规则；实验性结论不得直接进入 `main`。
- 每个实验必须有一个 manifest。缺少 manifest 视为实验未归档。
- 每个 manifest 必须记录：`run_id`、实验名、状态、branch、基准 commit、产物路径与 SHA-256、Human Sanity Gate、指标摘要、`local_only`、结论和下一步。
- `local_only` 文件必须逐项记录路径与原因。允许的原因包括：体积、隐私/授权、临时诊断、中间缓存或可重建产物；“忘记上传”不是有效原因。
- 提交后必须回报：`run_id`、branch、commit SHA、已发布产物、`local_only` 及其原因、最终状态。
- 未经明确稳定验证与晋升决定，不得合并或直接写入 `main`。

## 3. 质量门禁与评价顺序

评价顺序不可颠倒：

1. Human Sanity Gate
2. Action Integrity
3. Proof Chain / Proof Ownership
4. 商业节奏与量化指标
5. 视觉与风格优化

### 3.1 Human Sanity Gate

- 必须由人先完整观看成片，再评价指标。
- Human Sanity Gate 未通过时，指标不得用于宣告实验成功。
- 报告必须记录观看者、时间、版本、结论和所有硬失败。

### 3.2 Hard Fail

以下任一情况出现即为硬失败，实验不得标记为 `passed`：

- `visible motion loop`：观众可见的动作循环。
- `repeated motion fill`：为填充时长重复动作或重复同一动作片段。

硬失败不能被更好的节奏、留存、镜头密度或其他指标抵消。

### 3.3 Action Integrity First

- Action Integrity 优先于商业节奏优化。
- 一个动作可以保留少量自然呼吸，但不得因追求完整而拖成长段监控式素材。
- Director 可以调整动作句顺序、删除动作句或选择其他 Action Unit，但不得在物理动作中间任意拆切并拼接不连续结果。
- 成片中的动作句应至少保留：必要准备、关键动作、对应结果；自然呼吸仅保留到足以确认结果。
- 如动作完整性不成立，商业节奏评价无效。

### 3.4 Director Layer：Proof Chain 与 Proof Ownership

- Proof Chain 必须形成：`claim/问题 -> 对应动作 -> 对应结果 -> 足够确认`。
- Proof Ownership 必须绑定触发对象和被证明对象，例如手机动作必须由手机结果完成证明。
- 不允许 Phone claim 由 Watch proof 回答，或结果提前但因果链未完成。
- 同一功能再次出现必须产生信息升级；无升级的重复 proof 视为重复风险。
- Director Layer 只能在完整动作句之间做商业结构优化，不能绕过 Action Integrity。

## 4. 状态定义

- `planned`：已登记，尚未开始。
- `running`：正在执行，输入和 `run_id` 已冻结。
- `needs_review`：产物已生成，等待 Human Sanity Gate。
- `hard_fail`：出现硬失败；不得进入指标成功判断。
- `failed`：未通过非硬失败验收条件。
- `passed_pending_handoff`：质量通过，但尚未完成 GitHub handoff。
- `blocked_handoff`：handoff 失败，原因已记录。
- `handed_off`：报告、manifest、产物和状态已提交到 `handoff`。
- `promoted`：规则经稳定验证后获明确决定并进入 `main`。

只有 `handed_off` 或 `promoted` 状态允许启动依赖该实验结论的下一实验。

## 5. 实验启动与结束检查

实验启动前：

- 阅读本文件与 `docs/status/EXPERIMENT_STATUS.md`。
- 确认前置实验已 `handed_off` 或明确记录了例外授权。
- 创建唯一 `run_id`，登记输入、目标和验收条件。
- 检查当前分支；实验发布目标必须是 `handoff`。

实验结束前：

- 完成 Human Sanity Gate，先记录硬失败，再记录指标。
- 生成实验报告和 manifest，并验证 manifest 是合法 JSON。
- 明确列出发布产物和所有 `local_only` 文件及原因。
- 提交并推送到 `handoff`，记录 commit SHA。
- 更新实验状态；未完成上述步骤不得宣布“完成”或进入下一实验。

## 6. 规则晋升到 main

规则只有同时满足以下条件，才可申请从 `handoff` 晋升到 `main`：

- 至少经过重复实验或新素材验证，证明并非单素材偶然结果。
- Human Sanity Gate 无相关硬失败。
- 证据、限制、失败样本和回退方式均已记录。
- 有明确的人工晋升决定。
- 晋升提交只包含稳定规则，不夹带实验产物或未验证草案。


