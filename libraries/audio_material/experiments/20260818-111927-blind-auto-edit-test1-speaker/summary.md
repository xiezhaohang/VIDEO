# Blind Auto Edit Test 1 — Speaker

- Run ID: `20260818-111927-blind-auto-edit-test1-speaker`
- Final status: `aborted_input_complexity`
- Termination: `cancelled_by_user_for_material_complexity`
- Canonical archive: `libraries/audio_material/experiments/20260818-111927-blind-auto-edit-test1-speaker/`
- Inputs: 13 raw clips, 1 selected voiceover
- Prior rendered/metric outputs: retained only as historical diagnostics; they are not a final PASS.

## Why this run was stopped

The material requires phone UI / interface-level recognition and is too complex for the intended first-round generalization validation.

- This is **not** a Visual Workflow failure.
- This is **not** an Audio Branch rule failure.
- The run is retained only as a high-difficulty negative sample and future regression test.
- No new editing material was started during migration and cleanup.

## Archive note

The complete long-term payload was moved out of general `handoff/runs/`. General `handoff/latest/` now contains only a migration pointer.
