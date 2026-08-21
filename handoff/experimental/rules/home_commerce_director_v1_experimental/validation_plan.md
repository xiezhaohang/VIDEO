# Home Commerce Director v1 Experimental — A/B Validation Plan

## Objective

Test whether the experimental Director selects and executes a better narrative strategy **before** human preference is known. The test evaluates prospective decision quality, not whether the framework can explain a finished video after the fact.

## Arms

| Arm | Director | Rule state |
|---|---|---|
| A — Control | Existing Director | `director_strategy_mode: default`; experimental files not loaded |
| B — Treatment | Existing pipeline plus Home Commerce Director v1 experimental decision layer | `director_strategy_mode: home_commerce_director_v1_experimental` |

The experimental layer may choose the primary/secondary strategy, hook hypothesis, required proof, information-state order, Hero, CTA, script job, and fallback. It may not bypass the common hard gates.

## Eligibility and freeze

Use a product/material set not used to derive the four explanatory cases whenever possible. Before generating either arm, freeze:

- product brief, allowed/forbidden claims, and target audience;
- exact media files and hashes, eligible ranges, and excluded ranges;
- aspect ratio, resolution, frame rate, audio branch, caption style, and export settings;
- target duration band rather than an exact duration;
- hard-gate rubric and human review form;
- the B decision object, including its evidence and fallback;
- random arm labels for blinded review.

No new shot may be available to one arm only. If a hard-gate repair changes one arm, apply the same repair opportunity to the other arm and record it.

## Pre-edit Director record

Before editing B, emit a JSON decision that validates against `strategy_scoring_schema.json`. Record the same planning-level output available from A, or explicitly mark a field as not emitted by the control. The B record must be timestamped before human preference review.

Human reviewers must not see strategy names, filenames, edit history, or arm identity during first-pass review.

## Shared hard gates

Evaluate these before preference or quantitative metrics:

- Action Integrity;
- complete Proof Chain and correct Proof Ownership;
- no fabricated or unsupported claims;
- readability;
- no visible motion loop or repeated-motion fill;
- Duration Budget fundamentals.

A hard fail disqualifies the arm from a preference win. It cannot be offset by faster purchase meaning, more states, or reviewer liking.

## Required comparison metrics

### 1. First purchase-meaning time

Definition: earliest timestamp at which a silent viewer can identify at least one supported reason to continue watching or consider owning/using the product.

Record in seconds to two decimals. Also record the frame/time range, the purchase meaning, and whether it relies on caption, visual evidence, or both. Do not count product visibility alone unless appearance/identity is itself the supported purchase reason.

### 2. Distinct information-state count

Count a state only when it adds a new object, action, mechanism, result, option, quantity, emotion/sensory response, or user meaning. Alternate angles and repeated actions without upgrade count as the same state.

Record total states and a state list. Also report states per 10 seconds as descriptive context; do not treat higher as automatically better.

### 3. Preference Gate

After hard-gate review, ask each blinded reviewer:

> If both videos represented the same offer and production quality, which one would you choose to publish or buy from, and why?

Allowed responses: `A`, `B`, or `no_preference`. Record the reason and the moment that determined the choice. Report counts, not only a majority label.

### 4. Human re-edit willingness

Ask separately for each arm:

> Would you publish this version without a meaningful narrative re-edit?

Allowed responses: `yes`, `minor_only`, `meaningful_reedit`, `reject`. Also record requested edit points. The treatment is better when it reduces `meaningful_reedit`/`reject` responses without increasing hard failures.

### 5. Human Review

Use at least three blinded reviewers when available. Each review records:

- silent comprehension and first purchase meaning;
- full-audio comprehension;
- trust in retained claims and proof;
- clarity of narrative progression;
- ownership/experience desire;
- Hero and CTA fit;
- any hard failure or unsupported inference;
- overall preference and confidence in that preference.

## Secondary diagnostics

- runtime and average effective state duration;
- duplicate-state count;
- proof chains planned, retained, complete, and owner-correct;
- supported claims removed or unsupported claims retained;
- decision confidence versus reviewer agreement;
- fallback invoked, reason, and whether it prevented fabrication;
- first three seconds: supported purchase meanings and confusions.

These diagnose why an arm won or failed. They are not standalone success criteria.

## Decision rubric

Classify each comparison as:

- `treatment_supported`: both arms pass hard gates; B is preferred by a reviewer majority and has no worse meaningful-reedit rate. At least one improvement must be attributable to a declared Director decision.
- `mixed`: both arms pass hard gates but preference, re-edit willingness, or reviewer reasoning is split; retain the rule as experimental and revise the hypothesis.
- `no_effect`: both arms pass and reviewers show no meaningful preference or re-edit difference.
- `treatment_rejected`: B loses preference or increases meaningful re-edit requests for strategy-related reasons.
- `invalid`: either arm has an unresolved hard fail, material/configuration differs, blinding fails, or an undeclared confound prevents attribution.

One `treatment_supported` result does not authorize production promotion. Run across new material with different purchase motivations and evidence profiles, and retain failures as part of the record.

## Minimum run artifacts

- frozen input inventory and hashes;
- A and B configuration records;
- B experimental decision JSON;
- timelines or edit decision lists for both arms;
- hard-gate results;
- metric sheet with timestamp evidence;
- anonymized human reviews;
- comparison report, manifest, and explicit promotion status (`experimental` unless separately approved).

Media stays local unless separately authorized. The handoff must list local-only media with a reason and include no media in the rules checkpoint.
