# openhands

All Hands' agent platform (Python; runtime split into software-agent-sdk).
Source-audited 2026-07-12.

## Identity signals (what a child process sees)

- No dedicated marker (no OPENHANDS=1). Commands run in a sandbox whose
  baked-in container env is the fingerprint: `OH_CONVERSATIONS_PATH`,
  `OH_BASH_EVENTS_DIR`, `OPENVSCODE_SERVER_ROOT`, LOG_JSON, WORKER_* ports.
  [source: docker_sandbox_spec_service.py:38-52]
- `PS1` rewritten with `###PS1JSON###…###PS1END###` markers — a child can
  read $PS1. [source: subprocess_terminal.py:150; constants.py:5-6]
- Env is passed through sanitized (only SESSION_API_KEY stripped); LLM_*/
  LMNR_* auto-forwarded from host. Version exists as OPENHANDS_BUILD_GIT_SHA
  server-side, not on shell children.
- Environment-grade fingerprint → medium confidence.

## Context files & config

- AGENTS.md / agents.md, `.cursorrules`, `.openhands/skills/` +
  `.openhands/microagents/` (project), `~/.openhands/` (global: profiles/,
  auth/, skills/, microagents/), org-level {org}/.openhands repo.
  [source: skills_service.py, agent_context.py:95-130]

## Headless

- Now server-first: `python -m openhands.agent_server` (FastAPI); the
  classic CLI lives outside this repo split.

## Meta

- Vendor: All Hands AI · repos: All-Hands-AI/OpenHands +
  OpenHands/software-agent-sdk · detector shipped (source tier).
