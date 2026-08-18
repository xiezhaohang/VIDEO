# Verified-Boundary Cutter Test E — Summary

Status: **COMPLETE**

- Final video: 1080×1920, 60fps, 1579 frames, human-final audio reused; GT001–GT003 passthrough and GT004–GT011 rebuilt from the correct raw sources/AUs.
- Final decision freeze SHA-256: `11076CEF25595EB2B2AE7121A270A1199D019EF61D5342818487F207A7C50DEB`.
- Human Sanity Gate: **PASS, 0 hard fails**.
- Visible loops: **0** across the full 60fps scan and the focused 6–12s, 17–22s and CTA-tail windows.
- Repeated source motion ranges: **0**. CTA chain: hand entry → downward point onset → peak → release, **complete**.
- Mandatory action/result coverage: **8/8**.

## Human imitation diagnostics

| Metric | Cutter E | Oracle A | Test B |
|---|---:|---:|---:|
| Median absolute in error | 46.5 frames | 41.0 | 62.0 |
| Median absolute out error | 15.5 frames | 51.0 | 77.0 |
| Median convex span IoU | 0.746 | 0.459 | 0.203 |
| Mapping family match | 6/8 | broadly 7/8 | 4/8 structure |
| Mapping structure match | 5/8 | — | 4/8 |

The imitation result is mixed but materially improved in span/out selection. Cutter E is still not a human replica: GT004 uses a same-take back-hold skip, GT009 does not imitate the human terminal 2064–2075 hold mapping, and GT010 deliberately uses a continuous natural result interval instead of the human 11-frame expanded hold micro-range.

## Human viewing diagnostics

- Test B’s 8–11s cable loop is replaced by one continuous gather → lift → remove → cleared-result action.
- Test B’s 18–21s loop is replaced by one phone/watch/earbuds progression with a readable charging proof and a continuous earbuds result hold.
- Test B’s repeated CTA tail is replaced by one complete CTA gesture.
- Cutter E is more reliable to watch than Oracle A because it uses the correct AU/take, reaches the required result/gesture states, and has no low-level loop failures. Oracle A remains closer on a few exact human boundaries and the GT010 hold imitation.

## Remaining risks

- **GT005:** incoming onset remains unresolved; the conservative earlier continuous context is longer than the human entry.
- **GT009:** terminal stable boundary remains unresolved; charging proof is visible, but the far-late human terminal landing is not imitated.
- **GT011:** settle/tail remain unresolved; the shot ends naturally after release and is safe to watch, but the exact human out is not matched.
- Secondary conservative/imitation risks: GT004 front-stable phase, GT006 hero terminal boundary, GT008 late incoming onset, GT010 human hold mapping.

No files were written to `main`. Video, side-by-side and contact sheets remain local-only.

