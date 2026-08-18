# Experiment Report — `<experiment_name>`

## Identity

- Run ID: `<YYYYMMDD-HHMMSS>`
- Status: `<status>`
- Started at: `<ISO-8601>`
- Completed at: `<ISO-8601>`
- Owner: `<person/agent>`
- Branch: `handoff`
- Base commit: `<sha>`
- Handoff commit: `<sha or pending>`
- Manifest: `<repository path>`

## Objective and acceptance criteria

Describe the hypothesis, the user-visible objective, and the pass/fail criteria fixed before the run.

## Frozen inputs and method

List source media, audio, brief, configuration, code version, model/tool versions, and relevant hashes. Describe the method sufficiently for reproduction.

## Human Sanity Gate — evaluate first

- Version watched: `<artifact path and sha256>`
- Reviewer: `<person>`
- Reviewed at: `<ISO-8601>`
- Result: `<PASS/HARD FAIL>`
- Full-watch notes: `<notes>`

### Hard failures

| Check | Result | Evidence/timecode |
|---|---|---|
| visible motion loop | `<pass/fail>` | `<evidence>` |
| repeated motion fill | `<pass/fail>` | `<evidence>` |
| other hard fail | `<pass/fail/n/a>` | `<evidence>` |

If any hard failure is present, stop success evaluation here. Metrics may be recorded for diagnosis but cannot change the result.

## Action Integrity

- Result: `<pass/fail>`
- Are necessary preparation, key action, and corresponding result understandable as one action sentence?
- Is breathing room sufficient but not overlong?
- Did any Director decision cut through a physical action or splice an unrelated result?
- Evidence/timecodes: `<details>`

## Director Layer: Proof Chain and Proof Ownership

For each claim, record the full chain and owner binding.

| Claim/object | Action | Result/confirmation | Proof owner | Continuous? | Evidence/timecode |
|---|---|---|---|---|---|
| `<claim>` | `<action>` | `<result>` | `<object>` | `<yes/no>` | `<details>` |

Record repeated proofs and explain the information upgrade. Repetition without upgrade is a failure risk.

## Metrics — evaluate only after Human Sanity Gate

List quantitative results, comparison baseline, and measurement method. Explicitly state whether the gate passed before interpreting metrics.

## Artifacts

| Repository path | SHA-256 | Type | Required |
|---|---|---|---|
| `<path>` | `<sha256>` | `<type>` | `<yes/no>` |

## Local-only files

| Local path | Reason | Rebuild procedure |
|---|---|---|
| `<path>` | `<size/privacy or authorization/temporary diagnostic/cache/rebuildable + details>` | `<procedure>` |

If none, write `None`. Every omitted artifact must have an explicit reason.

## Deviations, failures, and limitations

Record deviations from the frozen plan, failed attempts, known limitations, and risks. Do not omit negative evidence.

## Conclusion

- Final decision: `<hard_fail/failed/passed_pending_handoff/handed_off>`
- What was validated: `<statement>`
- What was not validated: `<statement>`
- Rule candidates for handoff: `<list>`
- Stable rules approved for main: `None` unless an explicit promotion decision exists.

## Handoff and next step

- Branch: `handoff`
- Commit SHA: `<sha or pending>`
- Published files: `<list>`
- Local-only files and reasons: `<list>`
- Next experiment: `<name/action>`
- May the next experiment start? `<yes only after handed_off, otherwise no + reason>`


