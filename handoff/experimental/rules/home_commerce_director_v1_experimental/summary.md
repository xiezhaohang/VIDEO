# Home Commerce Director Experimental Rule Layer v1 — Summary

- Run ID: `20260821-home-commerce-director-experimental-rule-layer-v1`
- Version: `home_commerce_director_v1_experimental`
- Status: `experimental`; disabled by default
- Branch target: `handoff`
- Production promotion: none
- Software or production-rule changes: none
- Media included: none

## What became callable

The prior research is now represented as an explicit rule-selection contract:

`purchase reasons + material evidence capability -> four-dimensional scores -> primary/secondary strategy -> hook/proof/information/Hero/CTA/fallback decision`

The four dimensions are `Proof`, `Information`, `Emotion`, and `Visual Appeal`. The output strategy values are `proof_led`, `information_led`, `emotion_led`, and `visual_led`. Selection is continuous and evidence-based; product categories are not inputs to the strategy choice.

Each dimension records purchase `demand_score`, material `support_score`, experimental `effective_score`, evidence, and gaps. v1 deliberately does not freeze a scoring formula, threshold, universal hook time, cut interval, runtime, or CTA winner.

## What remains invariant

The experimental layer cannot override Action Integrity, Proof Chain/Ownership, no fabricated claims, readability, no visible motion loop or repeated-motion fill, or Duration Budget fundamentals. When strategy demand exceeds material support, the Director must weaken/delete the claim, choose a supported fallback, shorten the plan, request a precise reshoot, or return insufficient material.

## Validation readiness

The A/B protocol is frozen at the rule level:

- A: existing Director, experimental mode disabled.
- B: existing pipeline with `home_commerce_director_v1_experimental` explicitly loaded.
- Shared inputs, claims, media, duration band, audio branch, render settings, and hard gates.
- Required comparisons: first purchase-meaning time, distinct information-state count, Preference Gate, human re-edit willingness, and blinded Human Review.
- B must emit its decision object before editing and before preference is known.

An A/B win keeps the rule experimental. Production promotion requires repeated new-material validation and a separate explicit human decision.

## Files

- `home_commerce_director_v1_experimental.yaml`: rule content, statuses, strategy definitions, gates, and fallback order.
- `strategy_scoring_schema.json`: machine-readable scoring and decision-output schema.
- `rule_activation_readme.md`: opt-in activation and execution contract.
- `validation_plan.md`: controlled A/B protocol and review rubric.
- `manifest.json`: provenance, constraints, hashes, artifact list, and checkpoint status.

## Checkpoint

- Publication base: `ced698b010e565f1165ef9723a20ec8fa8f57cf8`
- Source artifact/checkpoint: `985941af242e15f4cb5fe7bd3b848ac853dbc1f4` / `d4b9ae2424921432728aa5b585b37c1ab861e03d`
- Published payload: `ab64d794552330ea77c8b41cfb4c3fa5ea75fa05`
- Remote status: `handed_off`; verified on `origin/handoff` on 2026-08-21
- Safety scope: research text, JSON, YAML, manifest and status only; no video, audio, raw material, credential or private file was added by this publication
