---
kanbento_id: 3a74d3e4-c995-45f4-82fc-fbf695c5aa2c
title: roo — ROO_ACTIVE=true (VS Code terminals) + ROO_CLI_RUNTIME=1 (headless CLI, process-wide); execa path sets neither
type: harness
status: documented
revised: 2026-07-13
---
# roo (Roo Code)

The cline fork family's largest member. Source-audited 2026-07-12.

## Identity signals (what a child process sees)

- `ROO_ACTIVE=true` — Terminal.getEnv() → createTerminal({env}).
  [source: Terminal.ts:153-161]
- `ROO_CLI_RUNTIME=1` — set process-wide by the headless CLI, inherited by
  ALL descendants (the strongest form). [source: apps/cli extension-host.ts:182]
- **Coverage gap: the execa inline provider sets NEITHER (only LANG/LC_ALL).**
  [source: ExecaTerminalProcess.ts:48-52]
- Terminal ambience: PAGER=cat, VTE_VERSION=0 (a GNOME-VTE spoof, not a
  version), conditional iTerm/P9K shell-integration flags. ROO_ZDOTDIR
  during zsh integration. No version var, no AI_AGENT.

## Context files & config

- `.roo/rules/` (preferred) + mode variants `.roo/rules-<mode>/`; legacy
  `.roorules`, `.clinerules` (lineage); `AGENTS.md` / `AGENT.md` /
  `AGENTS.local.md`. `.rooignore`, `.roomodes`. [source: custom-instructions.ts]
- Dirs: global `~/.roo` AND `~/.agents`; project `.roo` + `.agents`.
- Skills: `~/.agents/skills`, `~/.roo/skills` (+ per-mode), project
  `.agents/skills`, `.roo/skills` — native `.agents` reader with symlinks.
  [source: SkillsManager.ts:567-617]

## Headless

- apps/cli; IPC control via ROO_CODE_IPC_SOCKET_PATH; ROO_CLI_ROOT override.

## Meta

- Vendor: Roo Code (RooCodeInc) · detector shipped (source tier, mode=agent
  inferred from ROO_CLI_RUNTIME). Probe TODO: live snapshot both paths.
