---
kanbento_id: 7b27931a-f390-40ab-b76f-fa9595039a9e
title: detect-agent (Vercel) relationship — boolean rules engine vs structured identity; compat tier = superset by construction; agent-detect held as our alias
refs:
  about:
    - note:design
revised: 2026-07-12
---
# Relationship to @vercel/detect-agent

Moved out of the README (2026-07-12) — competitive framing doesn't belong in
a functional doc; the library speaks through its API.

## The positioning

`detect-agent` (Vercel, npm `detect-agent` + `@vercel/detect-agent`) answers
the boolean question via declarative rules: `agents.json` conditions limited
to env_set / env_value / env_matches / file_exists + anyOf/allOf, first-match
wins, emits a name string. Their README promotes `AI_AGENT` as a universal
standard — which, per our 8-harness survey, has exactly one known
implementer (claude-code; Anthropic, their rival). Two value dialects
already exist (their `name@version` spec vs Anthropic's shipped
`name_version_mode`).

`ai-agent-detect` answers *which agent, which version, which layer* —
structured identity with evidence (`source`/`raw`/`confidence`), claims[]
for nested harnesses, detectors as code (the claude-code version-from-
execpath recovery and grok's honest env-invisibility are both inexpressible
in their condition schema).

## Interop, not rivalry

- **Compat tier planned** (rung 4 of the ladder): vendor a snapshot of their
  `agents.json` and evaluate it for agents we have no hand-written detector
  for — we consume their rules format, we never author one. This makes us a
  superset by construction: everything they detect, we detect at `medium`
  confidence minimum.
- Their supported list is seed data: Devin, Antigravity, Replit, v0, GitHub
  Copilot (`COPILOT_MODEL`, `COPILOT_ALLOW_ALL`, `COPILOT_GITHUB_TOKEN`).
- Watch item: if their schema grows expressive (version extraction,
  negation, process checks), the "code beats rules" differentiator narrows
  — the claims/stack model and the fixture-provenance trust story are the
  durable moats.

## Name facts

- `agent-detect` (npm) is held by us as an alias of `ai-agent-detect`.
- Vercel activated the bare `detect-agent` name 2026-07-10 — the 48-hour
  tempo that triggered our claim campaign (see note:dotagents-utility on
  the kanbento board).
