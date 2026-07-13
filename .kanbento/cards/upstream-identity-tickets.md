---
kanbento_id: 83c6a525-c8a7-4494-a407-46d3f5c51946
title: upstream identity tickets — for each vendor, find (or file) the ticket asking the harness to set an identity env var; track status per harness
---
Sweep round 2 (2026-07-12) adds ticket candidates: crush (Charm) — no identity var, source-confirmed, request CRUSH=1; continue — cn CLI spawns with no env option, request CONTINUE=1; cline/roo — markers are VS-Code-terminal-only, request them on the CLI/standalone paths too; codex — CODEX_THREAD_ID (vercel rules) might already close the danger-full-access hole, probe before filing. Model citizens grew: gemini-cli joined by qwen-code (QWEN_CODE=1 + session family, deliberately overwrites inherited stale values — the only anti-contamination design surveyed), opencode, kilo (only version env var in the field), copilot (COPILOT_CLI=1 documented for exactly this purpose).
