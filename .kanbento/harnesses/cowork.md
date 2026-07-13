---
kanbento_id: e988550d-9d1e-42d9-83d2-c460ca80d650
title: "cowork — vercel-rules: CLAUDE_CODE_IS_COWORK atop claude-code vars; specificity handling precedent"
type: harness
status: documented
revised: 2026-07-13
---
# cowork

Anthropic's Cowork desktop product — runs Claude Code under the hood, marks itself with `CLAUDE_CODE_IS_COWORK` alongside CLAUDECODE/CLAUDE_CODE [vercel-rules]. Our claude-code detector defers when the marker is present (specificity wins) — the registry's precedent for wrapper-product handling. Probe TODO: live snapshot from a Cowork session.
