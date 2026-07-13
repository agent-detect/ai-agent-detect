# kiro

AWS Kiro. Vercel's rule: TERM_PROGRAM contains 'kiro' AND stdout is not a TTY — the TTY gate exists because the IDE terminal sets the same var for humans. Our env-only core cannot see TTY state → confidence low (ambience, not identity). A TTY-aware upgrade belongs to the /node rung. Probe TODO: live snapshot; find a real identity var.
