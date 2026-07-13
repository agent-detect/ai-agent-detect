# continue

Continue.dev — VS Code extension + `cn` CLI (TypeScript). Source-audited
2026-07-12.

## Identity signals (what a child process sees)

- **None.** The cn CLI's terminal tool calls spawn(shell, args) with no
  env option — children inherit ambient env unchanged.
  [source: extensions/cli/src/tools/runTerminalCommand.ts:192]
- VS Code path adds only a generic color bundle (FORCE_COLOR, COLORTERM,
  TERM, CLICOLOR*). [source: core/tools/implementations/runTerminalCommand.ts:91-99]
- CONTINUE_* vars (GLOBAL_DIR, REMOTE, METRICS…) are READ, not set.
  Version appears only in an LLM User-Agent header. Env-undetectable.
  Upstream ticket candidate: request CONTINUE=1 (or CN=1) in the CLI spawn.

## Context files & config

- Agent files at cwd, first match wins: AGENTS.md, AGENT.md, CLAUDE.md,
  CODEX.md (CLI); core list AGENTS.md/AGENT.md/CLAUDE.md.
  [source: systemMessage.ts:167; loadMarkdownRules.ts:10]
- Rules: `.continue/rules/**/*.md` + `~/.continue/rules/`.
- Dirs: global `~/.continue` (CONTINUE_GLOBAL_DIR override) — sessions/,
  index/, rules/, skills/.
- Skills: `.continue/skills/*/SKILL.md` (workspace + global) AND
  `.claude/skills/*.md`. [source: loadMarkdownSkills.ts:18-62]

## Headless

- `cn -p/--print` non-interactive, --format json, piped stdin.

## Meta

- Vendor: Continue (continuedev/continue) · detector shipped as honest-null
  (source tier).
