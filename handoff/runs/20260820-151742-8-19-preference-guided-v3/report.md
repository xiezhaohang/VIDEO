# 8.19 Preference-Guided v3

## Outcome

The controlled v3 edit is complete as a local-only silent master and a local-only English-VO/burned-subtitle commercial final. The machine preflight passes technical and hard-constraint checks, but the result remains `needs_human_review`; no Human Preference PASS is claimed.

## Strategy tested

- Primary: Information
- Secondary: Emotion
- Hard constraints retained: Action Integrity, Proof Ownership, readability, no visible loop/repeated fill, no fabricated claim/audience, no dead-tail forcing
- Reference use: the accepted 17.533 s card body supplied structure and pacing principles only; no wording or imagery was copied

## Structural change from v2

| Metric | v2 | v3 | Change |
|---|---:|---:|---:|
| Runtime | 20.75 s | 15.70 s | -5.05 s |
| Effective shots/segments | 4 | 8 | +4 |
| Distinct visual information states | 6 | 8 | +2 |
| Commercial states including CTA | 7 | 9 | +2 |
| Average effective shot length | 5.19 s | 1.96 s | -3.23 s |
| Maximum effective shot length | 5.75 s | 2.70 s | -3.05 s |
| First silent-visible purchase meaning | 4.00 s | 0.00 s | -4.00 s |
| CTA audio start | 15.60 s | 13.10 s | -2.50 s |
| Full opening used as Hook | 4.00 s | 0.00 s | -4.00 s |

Counting is explicit in `v2_vs_v3_comparison.json`. v3 uses four legible prompts, a real number-to-question change, two quantity-growth states, a complete Hero, and a burned CTA. It does not count a repeated action as new information.

## Did low-information dwell actually decrease?

Yes, structurally and measurably. The full 4.0 s opening Hook is removed; average effective shot length falls from 5.19 s to 1.96 s; the longest effective segment falls from 5.75 s to 2.70 s; and v2's 2.52 s post-voice information-free tail is replaced by a Hero with burned CTA active through the final frame. This is a structural finding, not a preference verdict.

## Script and subtitle rationale

The positioning remains the evidence-supported generic category: `conversation starter / question prompts`. The copy uses visible topics—parents/family, love, friendship, and a number-to-question mechanism—without inventing a parent, couple, date, party, therapy, or relationship-improvement audience. English VO has a Chinese meaning recorded in `commercial_script.json`. One long subtitle was found clipped during QA, split into two lines, and re-rendered before finalization.

## Material ceiling

- Only four individually legible prompt contents are available at strong/usable quality.
- No real interaction, response, or emotional payoff exists, so Emotion can only support the information structure.
- The warm hotspot, fur texture, glare, and oblique card angles remain weaker than the accepted reference material.
- Quantity growth can show breadth, but it cannot create four additional unique readable questions.
- There is no natural directional CTA gesture, so the final uses a non-directional CTA.

## Human review focus

1. Blind choice: with v2 and v3 unlabeled, which would an editor actually publish if both were available, and why?
2. Value and pacing: does v3 communicate the purchase reason in the first 2–4 seconds, and at what exact second does either cut become slow, empty, awkward, or feel stitched?
3. Commercial feel and material ceiling: do VO/subtitles make v3 feel more like an ad rather than an explanation, and do the four unique questions still reveal a footage limit?

## Local-only outputs

- Silent: `D:\8.19\edit\runs\20260820-151742-8-19-preference-guided-v3\8_19_preference_guided_v3_silent_master.mp4`
- Voiced/subtitled: `D:\8.19\edit\runs\20260820-151742-8-19-preference-guided-v3\8_19_preference_guided_v3_vo_subtitled_final.mp4`
- Hashes and sizes: `metrics.json` and `local_only_index.json`

No raw video, finished video, audio, API key, private user file, or QA image is included in GitHub.
