# Sample Selection Criteria

## Mandatory eligibility

The first sample must satisfy every item:

- The product and footage did not participate in TikTok Home Commerce Knowledge Mining v1.
- The product and footage were not used to author, tune, explain or validate either Director arm.
- No prior winning edit, performance result, creator script or preferred strategy is included in either arm's context.
- The user can provide the original source material and a factual product brief with allowed/forbidden claims.
- The material visibly supports at least one complete candidate proof chain: Claim → owner → Action → Result → Confirmation.
- The material supports at least one plausible first-screen purchase meaning without requiring fabricated text or an unavailable shot.
- The source identity and hashes can be frozen while the media itself remains local.

If any mandatory item fails, do not substitute a familiar case. Wait for another sample.

## Preferred diagnostic profile

Prefer a sample that:

- has at least two plausible purchase motivations, so the Director must prioritize rather than identify an obvious category;
- contains both strong evidence and a tempting evidence gap, allowing fallback behavior to be tested;
- offers more than one defensible Hook candidate;
- has a usable Hero state but does not make the CTA choice automatic;
- is understandable enough for two editors to form an independent reference judgment;
- is not so polished that the original edit strategy is embedded in the footage order.

These are selection preferences, not hard numeric rules.

## Exclusions for the first validation

- Magnetic power bank, earphone case, 8.19 cards and slime cases used in prior reasoning.
- Any product appearing as a worked example in the Knowledge Base or Experimental Rule Layer prompt supplied to the Treatment arm.
- Media with missing ownership for all results, no readable result state, or only static pack shots.
- A sample whose decisive purchase claim depends on price, scarcity, medical/safety performance or compatibility facts that cannot be verified.
- A sample already edited or reviewed by the scoring editors when that prior knowledge would reveal the intended strategy.

## Frozen selection record

Record before running either arm:

```yaml
sample_id: neutral identifier
product_identity: factual description
novelty_checks:
  knowledge_mining: pass|fail
  prior_director_examples: pass|fail
  reviewer_prior_exposure: pass|fail|declared
source_files:
  - neutral_id: S01
    sha256: required
claims:
  allowed: []
  forbidden: []
evidence_coverage:
  complete_candidate_proof: description
  first_purchase_meaning_candidate: description
  known_gaps: []
eligibility: pass|fail
reason: concise decision
```

Do not include a preferred strategy, Hook or information order in the selection record.
