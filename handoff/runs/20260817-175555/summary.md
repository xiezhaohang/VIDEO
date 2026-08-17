# Boundary Refiner Test D — Summary

Status: **COMPLETE**

- Usable boundaries/intervals: **38/43**; order-consistent useful candidates: **36/43**.
- Test C → D: merged event resolution **14/25 (56%) → 38/43 (88%)**; relevant onset coverage **5/8 → 8/8** and MAE **106.2 → 74.875** native frames.
- Result/hold coverage: **3/8 → 7/8**; error is mixed because GT009 terminal is still early.
- GT005 incoming motion: not solved. GT008 incoming: partially solved interval but late. GT009 terminal: not solved. GT010 low-motion/static: partially solved interval. GT011 point chain: partially solved; settle/order and release-tail separation remain unresolved.
- Primary remaining bottleneck: deterministic localization / event-specific visual measurement, not basic semantic presence.
- Cutter: use only order-consistent verified candidates; Test D is a candidate gate, not a complete authoritative boundary generator.
- Human sanity gate draft: generated for handoff only.

Freeze SHA (predictions): `505394E0E24EE894309FA640EF85A210700C763D9FE1CCB37A0AE4A4868A28A8`
