# Home Commerce Director v1 — Experimental Rule Activation

## Purpose and boundary

This directory makes the research framework callable as an **experimental rule layer**. It does not change application code, default Director behavior, production rules, or `main`.

- Version: `home_commerce_director_v1_experimental`
- Status: `experimental`
- Branch: `handoff`
- Default state: disabled
- Unit of selection: purchase reason plus material evidence capability
- Explicit non-goal: product-category classification

## Activation contract

An experiment runner may load this layer only when the run configuration explicitly contains:

```yaml
director_strategy_mode: home_commerce_director_v1_experimental
director_strategy_rule: handoff/experimental/rules/home_commerce_director_v1_experimental/home_commerce_director_v1_experimental.yaml
decision_output_schema: handoff/experimental/rules/home_commerce_director_v1_experimental/strategy_scoring_schema.json
```

If `director_strategy_mode` is missing, unknown, or `default`, use the existing Director unchanged. Loading the file is not permission to alter the production configuration or copy this rule into `rules/`.

## Required call sequence

1. Freeze the product brief, source material, claims, reference material, and source hashes.
2. Build an evidence inventory from observable material only: Action Units, Claim–Evidence bindings, owners, readable results, unique information states, reactions/sensory feedback, Hero options, CTA evidence, and gaps.
3. Score `Proof`, `Information`, `Emotion`, and `Visual Appeal` separately for purchase demand and material support.
4. Evaluate every hard gate independently. A strategy score cannot turn a failed gate into a pass.
5. Select one primary strategy and zero or one secondary strategy. Do not choose from product category names.
6. Emit a decision object that validates against `strategy_scoring_schema.json`.
7. If evidence is insufficient, remove or weaken claims, choose a supported fallback, shorten the plan, or return `insufficient_material`.
8. For A/B validation, freeze the decision object before either edit is evaluated.

## Decision semantics

- `primary_strategy` owns the commercial through-line.
- `secondary_strategy` fixes the primary strategy's most important weakness; it is not an equal second template.
- `confidence` expresses confidence in the strategy choice for the supplied evidence. It does not predict conversion and does not certify claims.
- `evidence` must point to observable source facts. Unsupported inference belongs in `gaps` or `fallback_strategy`.
- `hook_hypothesis` states the earliest purchase meaning to test; it does not impose a universal time threshold.
- `required_proof` is mandatory for every retained functional claim.
- `information_state_plan` defines what new meaning each state adds and when that meaning is exhausted.
- `hero_strategy` must end on a benefit, completed state, experience payoff, or ownership choice supported by the material.
- `cta_strategy` may be directional only when direction is visibly supported.
- `fallback_strategy` is required even when confidence is high.

## Hard-gate precedence

The experimental layer cannot override or weaken:

1. Action Integrity.
2. Proof Ownership and complete Proof Chain requirements.
3. No fabricated or unsupported claims.
4. Readability of text, state, result, and offer.
5. No visible motion loop or repeated-motion fill.
6. Duration Budget fundamentals: stop when meaning is exhausted; do not fill with repetition, dead tails, or VO overhang.

If a proposed hook or strategy conflicts with a gate, reject the proposal and invoke the fallback. Fast cuts, transitions, reference style, and predicted preference never compensate for a hard-gate failure.

## Strategy naming

The callable values are `proof_led`, `information_led`, `emotion_led`, and `visual_led`. Sensory execution is represented inside `emotion_led` and must still be supported by observable deformation, reaction, texture, sound, or other sensory evidence. Mixed strategies are expressed through primary plus secondary, not compound category labels.

## A/B isolation

- A uses the existing Director with this layer disabled.
- B activates this exact version.
- Both arms use the same eligible footage, exclusions, claims, duration band, audio branch, aspect ratio, output settings, and review rubric.
- The experimental layer may change the hook, semantic order, retained information states, Hero, CTA strategy, and script job only where those are its declared decisions.
- Any other changed variable must be declared as a confound; an undeclared confound invalidates causal attribution.

## Promotion rule

This rule remains experimental after a successful run. Promotion requires repeated new-material validation, no relevant hard failures, documented limitations and fallbacks, and an explicit human promotion decision. Promotion is a separate change and must not be performed from this directory.
