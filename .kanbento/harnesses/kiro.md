---
kanbento_id: 08864210-27d3-41b6-b7c6-034bcd382115
title: "kiro — vercel-rules: TERM_PROGRAM~kiro gated on no_tty; env-only sees ambience → low confidence"
type: harness
status: documented
revised: 2026-07-13
---
# kiro

AWS Kiro. Vercel's rule: TERM_PROGRAM contains 'kiro' AND stdout is not a TTY — the TTY gate exists because the IDE terminal sets the same var for humans. Our env-only core cannot see TTY state → confidence low (ambience, not identity). A TTY-aware upgrade belongs to the /node rung. Probe TODO: live snapshot; find a real identity var.
