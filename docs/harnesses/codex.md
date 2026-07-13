# codex

OpenAI's terminal agent (Rust core, npm `@openai/codex`). The detection
story is the notable one: **there is no general "I am Codex" marker** — the
only env signals are sandbox side effects, source-confirmed but conditional.

## Identity signals (what a child process sees)

- `CODEX_SANDBOX_NETWORK_DISABLED=1` — set on every shell-tool child *when
  the network sandbox is on* (any OS). [source: codex-rs/core/src/spawn.rs]
- `CODEX_SANDBOX=seatbelt` — macOS only, under Seatbelt. NOT set on Linux
  (Landlock/bwrap) or Windows sandboxes. [source: codex-rs/core/src/sandboxing/mod.rs]
- **Under `danger-full-access` neither var is set — env detection has a
  hole; ppid walk is the only rung that catches Codex there.** [source]
- No `AI_AGENT`, no `AGENT`, no version env var (version is compiled in,
  surfaced via `--version` only). [source: repo grep]
- `CODEX_MANAGED_BY_NPM`/`_PNPM`/`_BUN` — install-channel markers, not
  session tells. [source]

## Context files

- `AGENTS.md` native (the convention's co-author). Order: global
  `~/.codex/AGENTS.override.md` → `~/.codex/AGENTS.md` → project walk from
  git root down to cwd (`AGENTS.override.md`, `AGENTS.md`, then
  `project_doc_fallback_filenames`), concatenated root→down (closer to cwd
  wins), capped at `project_doc_max_bytes` (32 KiB default).
  [doc: learn.chatgpt.com/docs/agent-configuration/agents-md]
- Hierarchical: yes, git-root → cwd walk.

## Config & skills

- Global: `$CODEX_HOME` (default `~/.codex`) — config.toml, auth, logs,
  sessions, skills. Admin: `/etc/codex/managed_config.toml`. [doc/source]
- Skills (SKILL.md): repo scope `.agents/skills` scanned cwd→repo-root
  (native reader); user `~/.agents/skills`; admin `/etc/codex/skills`;
  installed under `$CODEX_HOME/skills`. [doc: learn.chatgpt.com/docs/build-skills]

## Headless invocation

- `codex exec "<prompt>"` (alias `codex e`); `--json` JSONL stream;
  `-o/--output-last-message`; `--output-schema`; resume via
  `codex exec resume --last`. [doc: learn.chatgpt.com/docs/non-interactive-mode]
- Permission dialect: `--sandbox read-only|workspace-write|danger-full-access`
  + `--ask-for-approval never|untrusted|on-failure|on-request`;
  `--dangerously-bypass-approvals-and-sandbox` for isolated runners;
  `--full-auto` deprecated. Model: `-m/--model`. Auth: `CODEX_API_KEY`. [doc]

## Meta

- Vendor: OpenAI · npm `@openai/codex` + Homebrew (Rust binary) · docs:
  developers.openai.com/codex → learn.chatgpt.com/docs · source:
  github.com/openai/codex
- Probe TODO: env snapshot per sandbox mode — confirm the
  danger-full-access hole and the Linux CODEX_SANDBOX absence.
