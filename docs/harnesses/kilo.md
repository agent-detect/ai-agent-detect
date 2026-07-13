# kilo (Kilo Code)

An opencode-based rewrite (VS Code extension spawns a bundled `kilo serve`
backend). Source-audited 2026-07-12.

## Identity signals (what a child process sees)

- `KILO=1` [source: cli/setup.ts:56] + fork-parent markers `AGENT=1`,
  `OPENCODE=1`, `KILO_PID` [source: opencode/src/index.ts:111-113].
- From the VS Code backend spawn (inherited by all agent shell children):
  `KILO_CLIENT=vscode|jetbrains|acp`, `KILO_PLATFORM`, `KILO_APP_NAME`,
  `KILOCODE_FEATURE=vscode-extension|jetbrains-plugin|daemon`,
  `KILO_MACHINE_ID`, `KILO_PARENT_PID`… [source: server-manager.ts:113-152]
- **`KILOCODE_VERSION` / `KILO_APP_VERSION` / `KILO_VSCODE_VERSION` — the
  only version env vars found in the entire 25-harness field.**
- Double-claim is legitimate: kilo IS opencode underneath — both detectors
  fire, claims[] represents it, primary=kilo by specificity/order. The
  claims model's first proven real-world case.

## Context files & config

- AGENTS.md (project + global ~/.config) and CLAUDE.md (project +
  ~/.claude/CLAUDE.md) via opencode's instruction loader. `.roo` import
  exists for one-time migration only. [source: instruction.ts:16-69]
- Dirs: global `~/.kilocode`, `~/.kilo`; project walk-up `.kilocode`/`.kilo`;
  config kilo.json(c) / opencode.json(c); `.kilocodeignore`.
- Skills: SKILL.md dirs via the opencode skill tool.

## Headless

- The backend IS the CLI: `kilo serve` / `acp` / `daemon` / `remote`;
  KILO_CALLER distinguishes invocation.

## Meta

- Vendor: Kilo-Org · repo: github.com/Kilo-Org/kilocode · detector shipped
  (source tier, version extraction live). Probe TODO: live snapshot.
