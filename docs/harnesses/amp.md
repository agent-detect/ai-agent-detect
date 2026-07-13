# amp

Sourcegraph's coding agent (ampcode.com). Facts from vendor manual + one
community-tier claim on the key detection signal — a probe is the open item.

## Identity signals (what a child process sees)

- `AGENT=amp` — the split-convention (`AGENT=<name>`), listed as
  "implemented" in the agents.md adoption table. **Community tier — not in
  the official manual, not verified in source.** The record stays
  `documented` until an `env | grep -i agent` inside `amp -x` confirms.
  [community: github.com/agentsmd/agents.md/issues/136]
- No `AI_AGENT`. No version env var. [not found]
- All `AMP_*` vars (`AMP_API_KEY`, `AMP_LOG_LEVEL`, `AMP_SETTINGS_FILE`…)
  are vars Amp *reads* — inputs, not detection signals. [doc: ampcode.com/manual]

## Context files

- Reads `AGENTS.md`, `AGENT.md` (singular), **and `CLAUDE.md`**. [doc]
- Nested: subtree AGENTS.md included when files there are read; discovery
  walks cwd up to `$HOME`. Precedence: cwd+parents → subtree → system-wide
  (`/etc/ampcode/AGENTS.md` etc.) → user (`~/.config/amp/AGENTS.md`,
  `~/.config/AGENTS.md`). [doc: ampcode.com/manual]
- `@`-mentions incl. globs (`@doc/*.md`) lazy-load. [doc]

## Config & skills

- Project: `.amp/settings.json(c)`, `.amp/plugins/*.ts`. User:
  `~/.config/amp/` (XDG-style — not `~/.amp`). System: `/etc/ampcode/`
  (Linux) / `/Library/Application Support/ampcode/` (macOS). [doc]
- Skills (SKILL.md format), search precedence first-wins:
  `~/.config/agents/skills` → `~/.agents/skills` → `~/.config/amp/skills` →
  `.agents/skills` → `.claude/skills` → `~/.claude/skills` → plugins.
  Native `.agents/skills` reader; also reads `.claude/skills`. [doc]
- Toolboxes (`AMP_TOOLBOX`) retired → `.amp/plugins/`. [doc]

## Headless invocation

- `amp -x "<prompt>"` (`--execute`); auto-enabled when stdout redirected;
  stdin piping works. `--stream-json` family for structured output.
  Threads: `amp threads continue -x`. [doc: ampcode.com/news/amp-x]
- Permission dialect: `--dangerously-allow-all`; finer rules via
  `amp.permissions` settings. Model selection via *modes* (free/rush/smart),
  no confirmed CLI model flag. [doc/community]

## Meta

- Vendor: Sourcegraph · npm `@ampcode/cli` (former `@sourcegraph/amp` still
  aliases) · installer scripts + Homebrew · docs: https://ampcode.com/manual
- Probe TODO: verify `AGENT=amp`, capture full env snapshot in `amp -x`.
