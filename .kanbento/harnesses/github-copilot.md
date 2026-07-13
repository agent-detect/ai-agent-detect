---
kanbento_id: 301b1722-895f-4875-a0b4-9a70d7a68365
title: "github-copilot — COPILOT_CLI=1 is the vendor-DOCUMENTED subprocess-detection hook + session id; Vercel's COPILOT_MODEL trio unverified"
type: harness
status: documented
revised: 2026-07-13
---
# github-copilot

GitHub Copilot CLI (closed source; public repo = README + changelog).
Doc-audited 2026-07-12.

## Identity signals (what a child process sees)

- `COPILOT_CLI=1` — explicitly documented FOR detection: "Git hooks can
  detect Copilot CLI subprocesses via the COPILOT_CLI=1 environment
  variable". [doc: changelog:1674]
- `COPILOT_AGENT_SESSION_ID` — on shell commands and MCP servers.
  [doc: changelog:1128]
- Also self-identifies via `AI_AGENT=github-copilot` / `github-copilot-cli`
  (core rung 1; Vercel's scoped package normalizes the -cli suffix away —
  we preserve evidence verbatim).
- Vercel's COPILOT_MODEL / COPILOT_ALLOW_ALL / COPILOT_GITHUB_TOKEN trio:
  NOT confirmable in the public changelog (the documented items are CLI
  flags --allow-all/--yolo, not env vars) — kept as weaker fallback.
- Hook-scoped Claude-compat vars: CLAUDE_PLUGIN_ROOT, CLAUDE_PROJECT_DIR
  (plugin paths only). No version var on children.

## Context files & config

- `.github/copilot-instructions.md`, pattern files
  `.github/instructions/*.instructions.md`, user `~/.copilot/instructions/`;
  @-imports expanded in AGENTS.md, CLAUDE.md, and instruction files;
  dedups copilot-instructions vs identical CLAUDE.md. [doc: changelog]
- Dirs: global `~/.copilot/` (settings, skills/, hooks/, agents/,
  mcp-config); COPILOT_HOME override; repo `.github/copilot/settings.json`.
- Skills: `~/.copilot/skills`, `~/.agents/skills`, project scope;
  precedence project > plugin-dir > personal.

## Headless

- `copilot -p/--prompt`; --output-format json (JSONL); permission dialect
  --allow-all/--yolo/--allow-all-tools; custom agents via --agent.

## Meta

- Vendor: GitHub · closed source · detector shipped (doc tier). Probe
  TODO: live snapshot would settle the COPILOT_MODEL question.
