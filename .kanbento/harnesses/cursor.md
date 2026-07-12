---
kanbento_id: 0814f2da-266f-47f2-ae23-039df563e2ae
title: "cursor — Anysphere agent CLI: CURSOR_AGENT=1 + CURSOR_TRACE_ID (community tier), omnivorous skill reader, agent -p headless"
type: harness
status: documented
refs:
  about:
    - note:design
revised: 2026-07-12
---
# cursor

Anysphere's editor + CLI agent (binary `agent` / `cursor-agent`). Well-
documented CLI; the detection env vars, notably, are *not* on any official
reference page — all three tells are community/staff-forum tier.

## Identity signals (what a child process sees)

- `CURSOR_AGENT=1` — set in the env of shell commands the agent runs.
  Staff-confirmed on the forum (was accidentally dropped once and re-added —
  i.e. real but historically fragile). [community/staff:
  forum.cursor.com/t/132427]
- `CURSOR_TRACE_ID` — set in agent terminal sessions; the tell shell-rc
  files rely on (`[[ -n $CURSOR_TRACE_ID ]]`). [community: forum.cursor.com/t/37734]
- `CURSOR_CLI` — set by Cursor's integrated terminal (cursor-agent uses it
  to delegate). [community]
- No `AGENT`/`AI_AGENT` (open feature request, not shipped). No version env
  var (`agent --version` only). No session-id env var (hooks get it via
  stdin; also an open request). [community/doc]

## Context files

- Auto-loads: `.cursor/rules/*.mdc` (Project Rules), root `AGENTS.md`,
  root `CLAUDE.md`. [doc: cursor.com/docs/rules]
- Nested AGENTS.md supported in any subdirectory — deeper wins, combines
  with parents. Precedence overall: Team Rules → Project Rules → User
  Rules. `.cursorrules` legacy, deprecated. [doc]

## Config & skills

- Project: `.cursor/` (rules/, skills/, environment.json). Global:
  `~/.cursor/` (cli-config.json; `CURSOR_CONFIG_DIR` overrides; XDG on
  Linux). [doc]
- Skills (SKILL.md, Cursor 2.4+): project `.agents/skills/` + `.cursor/skills/`;
  global `~/.agents/skills/` + `~/.cursor/skills/`; ALSO reads `.claude/skills/`
  and `.codex/skills/` — the most omnivorous skill reader surveyed. Nested
  discovery for monorepos. [doc: cursor.com/docs/skills]

## Headless invocation

- `agent -p/--print "<task>"` — full tool access incl. write and shell.
  `--output-format text|json|stream-json`. [doc: cursor.com/docs/cli/reference/parameters]
- Permission dialect: `--force` (aka `--yolo`), `--trust` (headless
  workspace trust), `--sandbox enabled|disabled`. Model: `--model`.
  Auth: `--api-key` / `CURSOR_API_KEY`. [doc]

## Meta

- Vendor: Anysphere (Cursor) · install: `curl https://cursor.com/install | bash`
  (no native Windows; WSL only) · docs: https://cursor.com/docs/cli
- Probe TODO: verify `CURSOR_AGENT=1` + `CURSOR_TRACE_ID` in a live
  `agent -p` env snapshot — all identity tells are community tier.
