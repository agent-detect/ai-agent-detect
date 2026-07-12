---
kanbento_id: 2a58fcd4-bb00-4221-af45-3322e69945c3
title: "opencode — Anomaly terminal agent: OPENCODE=1 + AGENT=1 (boolean, not name!) + OPENCODE_PID; deliberate detection flags via community request"
type: harness
status: documented
refs:
  about:
    - note:design
revised: 2026-07-12
---
# opencode

Anomaly's open-source terminal agent (repo moved sst/opencode →
anomalyco/opencode). Deliberate, source-confirmed detection flags — added
*because users asked* (issue #1775 → PR #1780, 2025-08-11).

## Identity signals (what a child process sees)

Set unconditionally in CLI startup middleware — every bash-tool child
inherits them:

- `OPENCODE=1` — the canonical flag. [source: packages/opencode/src/index.ts:76]
- `AGENT=1` — **boolean-valued, not `AGENT=opencode`** — the generic
  convention diverges here: Goose/Amp set `AGENT=<name>`, opencode sets
  `AGENT=1`. A parser must treat `AGENT` as identity-bearing only when
  non-"1". [source: index.ts:75]
- `OPENCODE_PID=<pid>` — the agent process PID, handed to children — a
  free head start for the ppid walk. [source: index.ts:77]
- No version env var (requested in #1775, not shipped; `--version` only).
  No session-id vars (#9292 closed as not planned). [source]
- Conditional (flag-dependent, not detection-reliable):
  `OPENCODE_PRINT_LOGS`, `OPENCODE_LOG_LEVEL`, `OPENCODE_PURE`. [source]
- V2 core rewrite (packages/core bash tool) spawns with no custom env —
  children still inherit the middleware-set flags. [source]

## Context files

- `AGENTS.md`, walking UP from cwd, with `CLAUDE.md` as fallback (AGENTS.md
  wins when both exist); then global `~/.config/opencode/AGENTS.md`; then
  `~/.claude/CLAUDE.md` unless disabled. [doc: opencode.ai/docs/rules]
- No auto-parsing of nested references; monorepo extras via the
  `instructions` config key (globs like `packages/*/AGENTS.md`, URLs). [doc]

## Config & skills

- Config: `opencode.json(c)` at project root + `~/.config/opencode/`;
  `.opencode/` project dir (agents/ commands/ modes/ plugins/ skills/
  tools/ themes/). Overrides: `OPENCODE_CONFIG`, `OPENCODE_CONFIG_DIR`. [doc]
- Skills (SKILL.md): project `.opencode/skills` + `.claude/skills` +
  `.agents/skills` (walked up to worktree root); global
  `~/.config/opencode/skills` + `~/.claude/skills` + `~/.agents/skills`.
  Native `.agents/skills` and `.claude/skills` reader. [doc]

## Headless invocation

- `opencode run "<message>"`; `--format json` event stream; sessions via
  `-c/--continue`, `-s/--session`, `--fork`. Also `opencode serve` (HTTP
  API). [doc: opencode.ai/docs/cli]
- Permission dialect: `--auto` (approve unless explicitly denied); a full
  `--yolo` bypass is an unmerged request. Model: `-m provider/model`.
  Agent selection: `--agent <name>`. [doc]

## Meta

- Vendor: Anomaly (anoma.ly) · install script / npm / Homebrew / Chocolatey
  / Docker · docs: https://opencode.ai/docs/ · source:
  github.com/anomalyco/opencode
- Probe TODO: env snapshot in `opencode run`; verify V2 rewrite still
  passes the flags through.
