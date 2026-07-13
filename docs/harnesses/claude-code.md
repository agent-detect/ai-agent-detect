# claude-code

Anthropic's terminal coding agent. The one harness in this registry whose
facts come from **our own live probes**, not docs.

## Identity signals (what a child process sees)

- `AI_AGENT=claude-code_2-1-205_agent` — the full standard triple:
  name `claude-code`, version `2.1.205` (dashes encode dots), mode `agent`.
  [probed 2026-07-12, live session]
- `CLAUDECODE=1` — vendor tell, pre-dates AI_AGENT. [probed 2026-07-12]
- `CLAUDE_CODE_ENTRYPOINT` — carries invocation context (e.g. `cli`).
  [probed 2026-07-12]
- Does NOT set `AGENT` (the Goose/Amp convention). [probed 2026-07-12]

## Context files

- Reads the **CLAUDE.md hierarchy**: root CLAUDE.md at session start, nested
  CLAUDE.md files **lazily** — injected when files under that directory are
  first touched. [sentinel probe 2026-07-11, /tmp/agents-probe]
- **Ignores AGENTS.md entirely** — root and nested — despite ecosystem
  convention. [sentinel probe 2026-07-11; contradicts common assumption]
- `@import` syntax in CLAUDE.md pulls other files in eagerly.

## Config & skills

- Project dir: `.claude/` (settings.json, hooks, commands, agents, skills).
- Global: `~/.claude/` (`CLAUDE_CONFIG_DIR` overrides).
- Skills: `.claude/skills` only — does NOT read `.agents/skills`
  (non-universal in npx-skills terms). Skills autoload by frontmatter
  description match.

## Headless invocation

- `claude -p "<prompt>"` — print/headless mode.
- Permission dialect: `--allowedTools` (granular allow-list);
  `--dangerously-skip-permissions` for full-auto.
- Model flag: `--model`.

## Meta

- Vendor: Anthropic · distribution: npm `@anthropic-ai/claude-code` +
  native installer · docs: https://code.claude.com/docs
- npx-skills registry entry: skillsDir `.claude/skills`, detectInstalled =
  `~/.claude` exists — note their question is *installed on machine*, ours
  is *running me*; different signals.
