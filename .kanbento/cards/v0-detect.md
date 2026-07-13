---
kanbento_id: 46e65ca5-ad6b-4676-bd08-ce1f41f13ffd
title: "v0 — detect() + isAgent(): env rungs 1-3 (AI_AGENT parse, AGENT, vendor tells), structured AgentInfo, detector registry, fixtures for claude-code/codex/cursor/gemini-cli/amp/goose"
---
PARITY+ REACHED (2026-07-12): registry at 25 agents, 82 tests green. Full detect-agent coverage absorbed (their agents.json extracted and hand-ported with tier labels; their goose rule rejected — GOOSE_PROVIDER is user config, false-positive prone). Beyond parity: amp, goose (correct rule), grok, qwen-code, crush, cline, roo, kilo, aider, openhands, continue — from four opus source-sweeps. Notables: kilo = only harness with version env vars + legitimate double-claim with fork-parent opencode (claims model proven by a real case); qwen-code defends against nested contamination; aider = accidental fingerprint class; no-signal class now grok+crush+continue+codex-full-access. README table regenerated with evidence tiers.
