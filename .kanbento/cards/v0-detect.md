---
kanbento_id: 46e65ca5-ad6b-4676-bd08-ce1f41f13ffd
title: "v0 — detect() + isAgent(): env rungs 1-3 (AI_AGENT parse, AGENT, vendor tells), structured AgentInfo, detector registry, fixtures for claude-code/codex/cursor/gemini-cli/amp/goose"
---
RELEASE ai-agent-detect@0.1.0 published (2026-07-12) — from name-claim stub to working library in one day. Ships: 3-rung env ladder (both AI_AGENT dialects, AGENT value-split), claims[] model, isAgent boolean+assert with short-circuit, hand-written index.d.ts, fixtures with probe provenance (claude-code + grok live-probed), matrix test suite 19 green, bench.js with once-per-process env cache (~0.5µs). Remaining for card exit: port the six documented harness records (codex/cursor/gemini-cli/amp/goose/opencode) into detector+fixture pairs.
