---
kanbento_id: dce6835f-42e6-456b-9d5d-3b45f2f192ad
title: "grok — xAI agent: NO identity var (probed), passes inherited AI_AGENT through — the live proof of nested-harness contamination"
type: harness
status: probed
revised: 2026-07-12
---
# grok

xAI's coding agent (binary `~/.grok/bin/agent` — literally named `agent`).
**Live-probed 2026-07-12** — the probe that surfaced the nested-harness
contamination problem.

## Identity signals (what a child process sees)

- **None.** Scrubbed-env probe (grok 0.2.45): no `GROK_*` identity var, no
  `AGENT`, no `AI_AGENT`. Codex-class: zero self-identification.
  [probed 2026-07-12, `env -u AI_AGENT -u CLAUDECODE … agent -p`]
- What it DOES set on children — a non-interactive hygiene bundle: `CI`,
  `CLICOLOR`, `GIT_TERMINAL_PROMPT`, and pager/progress suppression
  (`PAGER`, `GIT_PAGER`, `GH_PAGER`, `MANPAGER`, `SYSTEMD_PAGER`,
  `AWS_PAGER`, `NPM_CONFIG_PROGRESS`, `PIP_PROGRESS_BAR`,
  `CARGO_TERM_PROGRESS_*`). A weak fingerprint (shared with real CI), but
  the *bundle* is distinctive. [probed]
- **Passes inherited identity vars through**: probed un-scrubbed from
  inside a Claude Code session, grok's child saw
  `AI_AGENT=claude-code_2-1-205_agent` — a false claude-code positive one
  nesting level deep. Env-only detection cannot distinguish own vs
  inherited signals. [probed 2026-07-12]
- `GROK_COMPACTION_MODE`/`_DETAIL` exist but are flag-set inputs, not
  session tells. [help text]

## Config & context

- Home: `~/.grok/` (bin/, completions/, skills/, leader.sock).
- Skills: `.grok/skills` (in our HARNESS_SKILL_DIRS registry from the
  kanbento work). Context-file behavior unprobed.

## Headless invocation

- `agent -p/--single "<prompt>"` — single-turn, prints to stdout.
  `--output-format plain|json|streaming-json`. [help]
- Permission dialect: `--allow`/`--deny` rules (help text explicitly maps
  them to Claude Code's `--allowedTools`/`--disallowedTools`),
  `--always-approve`, `--permission-mode`. [help]
- Distinctives: `--best-of-n <N>` (parallel attempts, pick best),
  `--check` (self-verification loop), `--worktree`. [help]

## Meta

- Vendor: xAI · binary `agent` on PATH via `~/.grok/bin` · version:
  `grok 0.2.45 (e4661b89c04) [stable]`.
- Ticket candidate (upstream-identity-tickets): ask xAI for a `GROK=1` or
  `AGENT=grok` — and to *override* inherited `AI_AGENT` rather than pass
  it through.
