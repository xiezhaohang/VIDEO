# Slime VO Blind Alignment v2.1 — Preserve Wins + CTA Fix

Run: `20260818-163253-slime-vo-blind-alignment-v2-1`

The natural directional CTA gesture was found in `DJI_20260813103012_0045_D.MP4` and restored using Action Unit `AU45_CTA_POINT_1`, source `4.15–6.483333 s`. The hand enters from screen lower-right, forms a clear directional index point over the lower product area, reaches a readable peak on the VO phrase “link below,” then releases and settles.

The v2 timeline from `0.0–13.966667 s` is unchanged. Decoded frames 0–837 have identical frame-hash files in v2 and v2.1, and the decoded source-audio SHA-256 also matches exactly. No front anchor, Director structure, VO, or pre-CTA boundary was changed.

Only `13.966667–16.3 s` changed: v2’s neutral full-set hold was replaced by the complete CTA gesture. Transition pair P9 remains compatible without a decorative transition.

Model preflight found zero visible loops, zero repeated-motion fill, zero validated-constraint regressions, zero missing directional CTA failures, and zero preserved-anchor regressions. Final Human Sanity Gate remains pending the user’s full viewing review.
