---
kanbento_id: 70cb6139-65a1-4a82-80d4-3ee5013bba02
title: "goose — Block/AAIF agent: AGENT=goose present-but-not-universal (source contradicts docs — per-execution-path coverage), env-first headless knobs"
type: harness
status: documented
refs:
  about:
    - note:design
revised: 2026-07-12
---
# goose

Block's open-source agent (Rust), now governed by the **Agentic AI
Foundation at the Linux Foundation** — repo moved block/goose →
aaif-goose/goose; docs moved to goose-docs.ai. Source-audited at HEAD
858e8de (2026-07-11).

## Identity signals (what a child process sees)

- `AGENT=goose` + `GOOSE_TERMINAL=1` — documented as "automatically set
  when goose runs commands," **but the source contradicts the docs**: set
  only in the computer-controller extension's shell scripts and the
  command-retry path. The main developer-extension shell tool
  (`platform_extensions/developer/shell.rs`) sets only `PATH` — ordinary
  shell commands may see NEITHER var. Present-but-not-universal.
  [source: goose-mcp computercontroller/mod.rs:855-873, retry.rs:239-246;
  contradicts doc: goose-docs.ai/docs/guides/environment-variables]
- `AGENT_SESSION_ID=<sid>` — reliable for STDIO/MCP extension children and
  `goose term init`-initialized shells only. [source: extension_manager.rs:1093]
- No `AI_AGENT` (zero source matches). No version env var
  (`GOOSE_MCP_CLIENT_VERSION` is inbound config, not a tell). [source]
- Detection consequence: goose is the poster case for **per-execution-path
  signal coverage** — a registry entry needs path conditions, not just a
  var list.

## Context files

- Default context filenames, source order: `.goosehints` first, then
  `AGENTS.md` (some docs state the reverse — source wins).
  [source: hints/load_hints.rs:9-23]
- Configurable via `CONTEXT_FILE_NAMES` (JSON array). Global hints:
  `~/.config/goose/.goosehints`; hierarchical cwd→git-root plus lazy
  nested-subdir loading (SubdirectoryHintTracker). [source/doc]

## Config & skills

- Global: `~/.config/goose/` (config.yaml, secrets.yaml; `GOOSE_PATH_ROOT`
  overrides). Project: `.goose/` (e.g. .goose/memory/). [source]
- Skills (SKILL.md) — project: `.agents/skills`, `.goose/skills`,
  `.claude/skills`; global: `~/.agents/skills` (canonical writable),
  `~/.config/goose/skills`, `~/.claude/skills`, `~/.config/agents/skills`,
  plus plugin skills. Native `.agents/skills` + `.claude/skills` reader.
  [source: skills/mod.rs:300-312]

## Headless invocation

- `goose run` with `-t <text>` | `-i <file>` (`-i -` = stdin) | `--recipe
  <name>` (+ `--params k=v`); `--no-session` for one-offs. [source: cli.rs]
- Permission dialect: **env, not flag** — `GOOSE_MODE=auto|approve|chat|
  smart_approve`. Model: env `GOOSE_PROVIDER` + `GOOSE_MODEL` (required).
  The only surveyed harness whose headless knobs are env-first. [doc]
- Recipes support `json_schema`-validated output; text/json/stream-json.

## Meta

- Vendor: Block, Inc. → **AAIF / Linux Foundation** governance · install
  script + desktop app · docs: https://goose-docs.ai/ · source:
  github.com/aaif-goose/goose
- Probe TODO: env snapshot per execution path (developer shell vs
  computer-controller) to pin the AGENT/GOOSE_TERMINAL coverage gap.
