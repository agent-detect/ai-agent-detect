# ai-agent-detect

Detect which AI agent is running your code. This library lets CLI tools, loggers, and Node apps recognize when an AI agent (Claude Code, Codex, Cursor, Gemini CLI, …) is executing them — and adapt: switch to machine-readable output, drop the spinners and prompts, emit agent-friendly errors, or tag telemetry with which agent and version it was.

Unlike a boolean check, it returns **structured identity with evidence**: name, version, mode, which signal matched, and how much to trust it.

```js
import { detect, isAgent } from 'ai-agent-detect';

if (isAgent()) {
  // an agent is executing this process — the new isatty()
}
isAgent('claude-code');  // assert style: am I running under this one?

detect();
// {
//   name: 'claude-code', vendor: 'anthropic',
//   version: '2.1.205', mode: 'agent',
//   source: 'env:AI_AGENT', confidence: 'high', corroborated: true,
//   raw: { AI_AGENT: 'claude-code_2-1-205_agent', CLAUDECODE: '1', ... },
//   claims: [ ... ]      // every claim the env carries — see below
// }
```

Or from any shell, hook, or CI step:

```bash
npx ai-agent-detect                  # ✓ claude-code 2.1.205 (agent) — via env:AI_AGENT, high
npx ai-agent-detect --check any      # exit 0 iff an agent is detected
npx ai-agent-detect --format json    # full structured result
npx ai-agent-detect --snapshot       # redacted env dump — paste into a fixture PR
```

**Status: early but real.** Every registered agent has evidence notes and synthetic fixtures; the API may still shift before `1.0`.

> Not to be confused with server-side "AI agent detection" (classifying AI crawlers in web traffic). This is the inverse, inside-out question: your process asking who launched it.

## Why structured identity

"Is this an agent?" is the easy 80%. The cases that break a boolean:

- **Agents run agents.** A grok session spawned inside a Claude Code session passes the inherited `AI_AGENT` through to its children (live-probed) — env vars cannot tell you which *layer* set them. `detect()` reports **every claim** the env carries (`claims[]`) and never silently picks between conflicting ones; genuine stack ordering (via process-tree walk) is `detectDeep()`'s job — planned, `ai-agent-detect/node` subpath.
- **Signals vary in quality.** A deliberate, documented flag (`GEMINI_CLI=1`) is not an accidental fingerprint (aider's OpenRouter attribution vars) is not terminal ambience (`TERM_PROGRAM=kiro`). Every claim carries `source`, `raw` (the matched variables), and `confidence` — apply your own trust policy instead of inheriting ours.
- **Version and mode matter.** Telemetry that knows "claude-code 2.1.205, headless" beats "agent: true". Where a harness exposes them (env triple, exec paths, version vars), we extract them.

## What it reads

1. **`AI_AGENT`** — both value dialects in the wild: `name@version` (Vercel's spec: `devin@1`) and `name_version_mode` (Anthropic ships `claude-code_2-1-205_agent`).
2. **`AGENT`** — the older convention, value-split: `AGENT=goose` names the agent; `AGENT=1` (opencode) proves agenthood without naming it — `isAgent()` true, every assert form false.
3. **Vendor tells** — per-agent detector functions. Code, not a condition engine: the claude-code detector recovers the version from `CLAUDE_CODE_EXECPATH` when `AI_AGENT` is stripped; no declarative rule format can express that.

## Supported agents

Evidence tiers: **probed** (live env snapshot recorded by us) > **source** (read in the agent's source code) > **doc** (vendor documentation) > **community** (reports) > **vercel-rules** (adopted from detect-agent's rules, not independently verified).

| agent | signal | evidence |
|---|---|---|
| openclaw | execution markers; see [evidence](docs/harnesses/openclaw.md) | registry |
| claude-code | `AI_AGENT` triple, `CLAUDECODE=1`, version via `CLAUDE_CODE_EXECPATH` | probed |
| grok | **none** — no identity var; passes inherited `AI_AGENT` through | probed |
| gemini-cli | `GEMINI_CLI=1` (deliberate, documented) | source+doc |
| qwen-code | `QWEN_CODE=1` + session-id family (fork renamed Gemini's flag) | source |
| opencode | `OPENCODE=1`, `AGENT=1`, `OPENCODE_PID` | source |
| kilo | `KILO=1`, `KILO_CLIENT`, **version via `KILOCODE_VERSION`** (+ fork-parent `OPENCODE=1`, `AGENT=1`) | source |
| codex | sandbox side effects only (`CODEX_SANDBOX*`); **nothing under `danger-full-access`** | source |
| goose | `AGENT=goose` + `GOOSE_TERMINAL=1` — on two of three execution paths only | source |
| cline | `CLINE_ACTIVE=true` — VS Code terminals only | source |
| roo | `ROO_ACTIVE=true` (terminals), `ROO_CLI_RUNTIME=1` (headless) | source |
| aider | `OR_APP_NAME=Aider` + `OR_SITE_URL` (accidental fingerprint) | source |
| openhands | sandbox furniture: `OH_*` vars, `PS1` markers | source |
| crush | **none** — sets no identity variable | source |
| continue | **none** — sets no identity variable | source |
| github-copilot | `COPILOT_CLI=1` (documented), `COPILOT_AGENT_SESSION_ID`; `AI_AGENT=github-copilot(-cli)` | doc |
| amp | `AGENT=amp` (reported, unverified) | community |
| cursor | `CURSOR_AGENT=1`, `CURSOR_TRACE_ID`, `CURSOR_EXTENSION_HOST_ROLE` | community |
| antigravity | `ANTIGRAVITY_AGENT` | vercel-rules |
| augment | `AUGMENT_AGENT` | vercel-rules |
| cowork | `CLAUDE_CODE_IS_COWORK` atop claude-code vars | vercel-rules |
| junie | `JUNIE_DATA` / `JUNIE_SHIM_PATH` | vercel-rules |
| kiro | `TERM_PROGRAM~kiro` (low confidence — ambience, not identity) | vercel-rules |
| pi | PATH contains `.pi/agent` (low confidence) | vercel-rules |
| replit | `REPL_ID` (environment marker, not agent-specific) | vercel-rules |
| devin | file tell only (`/opt/.devin`) — outside the env core, planned for `/node` | vercel-rules |

The no-signal entries (grok, crush, continue; codex under `danger-full-access`) are deliberate: an agent that cannot be detected from env is recorded as such — honesty over reach. Any agent that sets `AI_AGENT` or a name-valued `AGENT` is detected without a registry entry. Coverage caveats (goose's per-path signals, cline's terminal-only marker) live as comments in each detector and in the fixtures.

## Design

- **Zero runtime dependencies**, ESM, Node ≥ 18.
- **Edge-safe core**: no `node:` imports anywhere in the import graph; env access is guarded (`globalThis.process?.env`), so Workers/Deno/Bun run it and env-less runtimes return `null`. Anything runtime-specific (the process-tree walk, file tells) lives behind the `/node` subpath, never in the root export.
- **Sync and cheap**: no spawn, no disk, no network. `process.env` is copied once per process (it's a proxy — see `bench.js`); `detect()` ≈ 0.5µs, `isAgent(name)` short-circuits at ≈ 0.15µs. Safe in the first lines of a CLI.
- **Fixtures are the ground truth**: every registry entry ships a recorded env snapshot with probe date and method (`fixtures/`). The test matrix runs every fixture against every detector — no false positives is as tested as no false negatives.

## Roadmap

- `detectDeep()` (`/node` subpath) — process-tree walk: catches the no-signal agents, resolves the nesting stack, checks file tells (devin).
- `isAgentic()` — the broader question ("am I in an agentic environment at all", including a human typing in an AI tool's terminal), distinct from `isAgent()`'s strict "an agent is executing me".
- `capabilities()` — what the detected agent honors (context files, skill dirs), sentinel-probe sourced.

## Contributing an agent

One folder, one fixture, one PR:

1. `agents/<name>/index.js` — `{ name, vendor, procNames, pidEnvVar, detect(env) }`, registered in `agents/index.js` (alphabetical).
2. `fixtures/<name>.json` — a recorded env snapshot from a live session (probe date + method required; the matrix test fails any entry without one).
3. `npm test`.
