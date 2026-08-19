# Experiment Report — AI Product Video Director Commercial Alpha v0.1

- Run ID: `20260819-172456-commercial-alpha-v0-1`
- Status: `handed_off`
- Branch: `handoff`; base: `98a66e005130388f1350256e5330e9eb163d4f1a`
- Handoff payload commit: `10b37cea7d7f3dce18a7dcb5a52440c2cc20bab1`\n- Human Sanity Gate: pending user; this is a software/technical smoke only.

## Result

The Chinese Electron UI, SQLite project/job persistence, unified job schema, ffprobe inventory, existing Action Unit/Coverage adapter, Script-Guided timeline, QA, persistent constraints, FFmpeg renderer and Windows local TTS adapter are implemented under `app/desktop/`.

`D:\8.19` smoke created a project and SQLite history record, scanned 14 raw files, loaded 28 reviewed Action Units, selected four clips, produced a 19.5 second timeline and made a real FFmpeg render call. Unit tests passed 4/4. Both `npm run dev` and the built portable EXE launched successfully.

## Boundaries

- Existing semantic evidence was adapted; no new visual-model inference is claimed.
- Invisible Transition currently produces a treatment plan and remains experimental.
- Script Engine evidence-chain records remain experimental.
- OpenAI Speech is interface-only, ElevenLabs is reserved, and Audio Relevant remains isolated.
- Human viewing is pending, so no commercial/aesthetic PASS or rule promotion is claimed.

## Local-only

- Portable EXE: 83,684,372 bytes; SHA-256 `A1CB0BD67EAE1AEDFC63806D046898FAB923883F2B5001FE4FB009AA35A522F1`.
- Smoke MP4 and SQLite database remain under `D:\8.19\edit\software_alpha_smoke` because they contain private/source-derived data.

Stable rules approved for `main`: None.
