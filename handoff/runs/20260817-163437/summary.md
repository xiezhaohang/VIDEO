# Human Cutter Test B — Summary

Status: COMPLETE

- Median absolute source in error: 41.0 → 62.0 native frames
- Median absolute source out error: 51.0 → 77.0 native frames
- Median span IoU: 0.4586 → 0.2029
- Improved / tied / worsened: 4 / 0 / 4
- Mapping structure accuracy: 6/8 → 4/8
- Natural semantic state hits: 2/8

Verdict: State First, Duration Second did not significantly improve this Cutter implementation. The largest remaining error is action-state understanding/localization (especially GT009 and GT011), followed by destructive duration-fit repetition.

Local-only: human_cutter_test_b.mp4, human_cutter_test_b_side_by_side.mp4, human_cutter_test_b_contact_sheet.jpg
