# Home Commerce Director Experimental Validation v2

## Purpose

Prospectively test whether the Experimental Director can judge one unseen product better than the existing Director before any edit or human preference is known. This run compares planning decisions only. It does not write production rules, modify software, enter `main`, render media, or promote any hypothesis.

## Frozen inputs

Before either arm runs, freeze one input bundle:

- `product_brief`: product identity, target buyer, use scenario, known facts, allowed and forbidden claims, offer/price/CTA evidence, target market and language;
- `material_inventory`: exact source files identified by neutral sample IDs and SHA-256, duration and basic technical metadata;
- `action_evidence`: observable actions, entry/exit states, results, confirmations, readable text and owner identity, without strategy labels;
- `constraints`: target duration band if relevant, mandatory exclusions, brand requirements and unavailable evidence;
- `novelty_record`: proof that the product and footage were not used in Knowledge Mining, prior Director validation, rule writing or prompt examples.

Raw media remains local. The repository may receive only hashes, neutral IDs, structured observations and research records unless separate authorization is given.

## Comparison arms

| Arm | Context | Required behavior |
|---|---|---|
| Control | Existing Director as frozen before Experimental v2 | Judge the frozen input without access to the Experimental output or post-hoc reviewer feedback. |
| Treatment | Knowledge Base v1 plus Experimental Rule Layer v1 | Emit the v2 output contract before seeing the Control output or reviewer feedback. |

Run the two arms in isolated contexts. Keep model/version, product brief, material inventory and allowed claims identical. Record prompt and context hashes. Do not repair one arm using ideas from the other.

## Execution order

1. Eligibility reviewer completes `sample_selection_criteria.md` and freezes the input bundle.
2. A coordinator randomizes anonymous arm labels.
3. Control emits its native planning record. The coordinator maps only directly emitted content into the comparison fields; absent fields are marked `not_emitted` in a companion availability table and are never reconstructed after Treatment is known.
4. Treatment emits a planning record conforming to `director_output_schema.json`.
5. Two qualified editors independently inspect the frozen product brief and raw material, then record their reference judgment before seeing either arm's plan.
6. The editors review anonymized plans in randomized order and complete `evaluation_scorecard_template.json`.
7. A coordinator resolves factual disagreements against the raw material, reports both individual scores and the adjudicated result, and records any invalidating confound.

No video edit is required for this protocol-design stage. A later render comparison is a separate experiment.

## Required comparison fields

Treatment must emit every field below and conform to the schema. Control is scored on directly emitted equivalents; a missing field remains `not_emitted` rather than being inferred:

- `purchase_motivation`;
- `piev_scores` for Proof, Information, Emotion and Visual Appeal;
- `primary_strategy` and `secondary_strategy`;
- `hook_hypothesis`;
- `required_proof` with Claim → owner → Action → Result → Confirmation;
- `information_state_plan` with one explicit job per state and an information-exhaustion exit condition;
- `hero_strategy`;
- `cta_strategy`;
- `fallback` tied to evidence gaps.

Every recommendation must cite material evidence or an allowed product fact. Scores are descriptive judgments, not conversion probabilities, and no fixed weighted formula determines the winner.

## Evaluation dimensions

### Strategy judgment accuracy

Editors compare each arm with their prewritten reference judgment: purchase motivation priority, primary strategy fit, secondary strategy usefulness, calibration to material support and unsupported-claim avoidance.

### First purchase-meaning prediction

Assess whether the proposed first meaning is valuable, immediately legible from an identified source state, supportable by the later proof plan and preferable to merely showing product identity. Record the exact proposed evidence; do not score a hypothetical shot that does not exist.

### Shot-task reasonableness

Assess whether each information state adds new understanding, has a single dominant job, keeps setup adjacent to payoff, preserves Action Integrity and Proof Ownership, exits on information exhaustion, and avoids repeated-state or dead-tail filler. More states are not automatically better.

### Editor adoption willingness

Before any editing, each editor answers whether they would use the plan as their first-pass brief: `adopt_as_is`, `adopt_with_minor_changes`, `needs_major_replan`, or `reject`. They must name the first change they would make and the decision that most affected trust.

## Hard validity gates

Mark the comparison `invalid` if the sample is not genuinely unseen; inputs differ; an arm sees the other output or reviewer judgment before freezing its plan; the material cannot support any meaningful purchase-motivation judgment; blinding fails; or an output is reconstructed after the fact.

Unsupported claims, owner mismatch or fabricated visual states are arm failures, not reasons to invalidate the entire comparison, unless caused by unequal inputs.

## Decision labels

- `treatment_supported`: Treatment is better on adjudicated strategy accuracy and receives no worse adoption category from both editors, with no evidence-integrity regression.
- `mixed`: Treatment improves some target dimensions but loses another material dimension, or editors disagree.
- `no_effect`: No decision-relevant difference.
- `treatment_rejected`: Treatment is less accurate, less adoptable, or less evidence-safe.
- `invalid`: A protocol validity gate fails.

One supported sample keeps v2 experimental. It does not create a production rule. All failures and fallbacks remain in the record.

## Stop point

The framework is complete when the protocol, sample criteria, schemas, scorecard and manifest validate. Stop before selecting or analyzing a sample until the user supplies a new product and source material.
