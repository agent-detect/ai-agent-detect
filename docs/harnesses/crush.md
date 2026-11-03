# crush

Charm's terminal agent (Go). Source-audited 2026-07-12 — full sweep of
Setenv / cmd.Env across internal/.

## Identity signals (what a child process sees)

- **None.** Plain shell run/stream paths inherit os.Environ() unchanged
  (internal/shell/run.go:129,177). Only the PTY-capture path adds generic
  color-forcing (COLORTERM=truecolor, CLICOLOR_FORCE=1, FORCE_COLOR=1) —
  non-specific. [source]
- CRUSH_*-prefixed vars are an inbound config-override mechanism (read,
  promoted to un-prefixed within the crush process), not child markers.
  [source: internal/config/load.go:170-190]
- Env-undetectable. Upstream ticket candidate: request CRUSH=1.

## Context files & config

- Reads a broad case-variant list: CRUSH.md / crush.md / CRUSH.local.md /
  gemini.md / AGENTS.md / agents.md / Agents.md. [source: config.go:40-49]
- Global context: ~/.config/crush/CRUSH.md and ~/.config/AGENTS.md.
- Dirs: project `.crush`; global `~/.config/crush` (XDG honored);
  overrides CRUSH_GLOBAL_CONFIG / CRUSH_GLOBAL_DATA.
- Skills: SkillsPaths — dirs of SKILL.md folders; defaults
  ~/.config/crush/skills and ./skills. [source: config.go:279]

## Headless

- `crush run [prompt...]` (alias r); stdin accepted; --quiet/--verbose.

## Meta

- Vendor: Charm (charmbracelet) · repo: github.com/charmbracelet/crush ·
  detector shipped as honest-null (source tier).


## Additional execution-marker evidence

# Crush detection evidence

Investigated while maintaining [Detect Agent](https://github.com/ai-shifu/detect-agent), a community specification with shared synthetic cases. [Pinned rule and evidence record](https://github.com/ai-shifu/detect-agent/blob/c06e732d17d02f74fd9b452f20c4fa17a9f95a03/detect-agent.md).

Adopted signal: non-empty `CRUSH`.

Registry-derived rule from the pinned detector snapshots recorded in Detect Agent. This is a community heuristic, not independently verified producer injection.

Ordinary markers require a non-empty string without trimming or boolean parsing; exact comparisons and conjunctions are preserved. The upstream claims API reports simultaneous claims; it does not infer nesting.

The test inputs are synthetic. No fresh live vendor session was run for this contribution. Reported or static observations do not establish every build, interface or operating system. Markers can be inherited or set manually and do not authenticate the immediate caller. The normal detection result adds no marker values, credentials, user paths or session identifiers. Existing diagnostic APIs retain their upstream behavior. There is no runtime dependency on Detect Agent or new process-tree probe.
