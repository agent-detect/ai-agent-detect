# gemini-cli

Google's terminal agent (npm `@google/gemini-cli`, Apache-2.0). The cleanest
detection story surveyed: one deliberate, source-confirmed identification
flag.

## Identity signals (what a child process sees)

- `GEMINI_CLI=1` — set on every child of the shell tool, by design:
  `GEMINI_CLI_IDENTIFICATION_ENV_VAR` in
  `packages/core/src/services/shellExecutionService.ts`, and documented in
  docs/tools/shell.md. The only surveyed harness whose identification var is
  *both* source-confirmed and officially documented. [source+doc]
- No `AI_AGENT`, no `AGENT` (repo search: zero matches). No version env var
  (`--version` flag only). [source]
- The many `GEMINI_CLI_*` vars (`_HOME`, `_TRUST_WORKSPACE`, `_SURFACE`,
  `_IDE_WORKSPACE_PATH`…) are vars the CLI *reads* — inputs, not tells.
  [source]

## Context files

- Default context file: `GEMINI.md` — hierarchical: global
  `~/.gemini/GEMINI.md`, then ancestor GEMINI.md files from cwd up to a
  trusted root, concatenated into every prompt. [doc]
- AGENTS.md NOT read by default — opt-in via `context.fileName` array in
  settings.json (e.g. `["AGENTS.md", "GEMINI.md"]`). [doc]

## Config & skills

- Global: `~/.gemini/` (settings.json, GEMINI.md, tmp/<hash>/shell_history);
  relocatable via `GEMINI_CLI_HOME`. Project: `.gemini/settings.json`. [doc/source]
- Skills (SKILL.md, Agent Skills standard): precedence Built-in → Extension
  → User (`~/.gemini/skills` or `~/.agents/skills` alias) → Workspace
  (`.gemini/skills` or `.agents/skills` alias); within a tier the
  `.agents/skills` alias wins. Native `.agents/skills` reader. [doc]

## Headless invocation

- `gemini -p "<prompt>"`; headless also auto-triggers on non-TTY.
  `--output-format json` or streaming JSONL. Distinct exit codes: 0 ok,
  1 error, 42 input error, 53 turn-limit. [doc]
- Permission dialect: `--yolo` (auto-approve all), `--approval-mode`;
  `-s/--sandbox` (Docker isolation). Model: `-m/--model`. [doc]

## Meta

- Vendor: Google · npm `@google/gemini-cli` · docs: https://geminicli.com/docs/
  · source: github.com/google-gemini/gemini-cli
- Probe TODO: env snapshot to confirm GEMINI_CLI=1 and catch anything the
  docs omit; check whether TTY-vs-headless is distinguishable from inside.
