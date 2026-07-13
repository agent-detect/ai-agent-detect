# cline

The VS Code extension family's namesake (now a monorepo: apps/vscode,
apps/cli, sdk/). Source-audited 2026-07-12.

## Identity signals (what a child process sees)

- `CLINE_ACTIVE=true` — injected via createTerminal({env}) on VS Code
  integrated terminals. [source: VscodeTerminalRegistry.ts:29]
- **Coverage gap: the standalone/CLI/JetBrains path (StandaloneTerminalProcess.ts:
  104-116) sets only anti-interactivity overrides (TERM, PAGER=cat,
  GIT_PAGER=cat, MANPAGER=cat) — NOT the marker.** VS-Code-terminal-only;
  absence proves nothing. Upstream ticket candidate: set it on all paths.
- No version var, no AI_AGENT/AGENT. [source]

## Context files & config

- `.clinerules` (file or dir) + retained compat: `.cursorrules`,
  `.cursor/rules`, `.windsurfrules`, and `AGENTS.md`. [source: disk.ts:18-42]
- Global home `~/.cline` (data/, skills/, endpoints.json).
- Skills: `~/.cline/skills`, `.clinerules/skills`, `.cline/skills`,
  `.claude/skills`, `.agents/skills` — native cross-vendor reader.
  [source: disk.ts:32-35, skills.ts:212]
- Workflows `.clinerules/workflows`; hooks `.clinerules/hooks`.

## Headless

- `cline` CLI (apps/cli) with yolo/json/stdin modes and an ACP mode —
  cline speaks Zed's Agent Client Protocol. [source: apps/cli]

## Meta

- Vendor: Cline (cline/cline) · detector shipped (source tier). Probe
  TODO: verify the CLI path really omits the marker (ticket evidence).
