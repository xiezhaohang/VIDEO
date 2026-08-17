# Oracle Source Test A

Status: COMPLETE

Selection was frozen at 2026-08-17T14:56:03.3745169+08:00 before Ground Truth evaluator access. Pre-hash: `94D62D9448015D20377A6947C47F92102979754DE3C7EFE522EF5CF179C153DA`.

## Result

Giving the correct source file is not enough yet. GT006 is close and GT005/GT008 have useful envelope overlap, but five of eight scored shots remain materially wrong in internal in/out, repeated-take choice, speed, hold, or nonlinear landing.

The largest error class is source-in/source-out and internal take-region selection. The second is mapping: the human ordinary shots progress at roughly 1.20 native source frames per final frame while the oracle cut used 1.0x, and GT009/GT010 require hold/jump structures the oracle did not reproduce.

Conclusion: the current failure is not only “AI cannot choose a source.” Even with the source supplied, AI cannot yet cut reliably enough. Do not shift the main effort to Source Matcher; improve in-take action-state selection and speed/hold/jump decisions first.
