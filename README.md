# ai-agent-detect

Detect which AI agent is running your code — structured identity, not just a boolean.

**Status: working prototype.** The code runs (19 tests, 2 live-probed agents); the API may still shift before `0.1.0`.

```js
import { detect, isAgent } from 'ai-agent-detect';

isAgent();               // boolean — the new isatty()
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

## Why claims, not a single winner

Agents run agents. A grok session spawned inside a Claude Code session passes the inherited `AI_AGENT` through to its children (live-probed) — environment variables cannot tell you which *layer* set them. So `detect()` reports **every claim** the env carries and never silently picks between conflicting ones. The env cannot order nesting layers, so `claims[]` doesn't pretend to; genuine stack ordering (via process-tree walk) is `detectDeep()`'s job — planned, `ai-agent-detect/node` subpath.

Every claim carries its evidence: `source` (which signal matched), `raw` (the matched variables), `confidence`. Apply your own trust policy instead of inheriting ours.

## What it reads

1. **`AI_AGENT`** — both value dialects in the wild: `name@version` (Vercel's spec: `devin@1`) and `name_version_mode` (Anthropic ships `claude-code_2-1-205_agent`).
2. **`AGENT`** — the older convention, value-split: `AGENT=goose` names the agent; `AGENT=1` (opencode) proves agenthood without naming it — `isAgent()` true, every assert form false.
3. **Vendor tells** — per-agent detector functions. Code, not a condition engine: the claude-code detector recovers the version from `CLAUDE_CODE_EXECPATH` when `AI_AGENT` is stripped; no declarative rule format can express that.

## Supported agents

| agent | signals | evidence |
|---|---|---|
| claude-code | `AI_AGENT` triple, `CLAUDECODE=1`, version via `CLAUDE_CODE_EXECPATH` | live-probed 2026-07-12 |
| grok | **none** — sets no identity variable (and passes inherited `AI_AGENT` through) | live-probed 2026-07-12 |

grok's entry is deliberate: an agent that cannot be detected from env is recorded as such — honesty over reach. Any agent that sets `AI_AGENT` or a name-valued `AGENT` is detected without a registry entry.

## Design

- **Zero runtime dependencies**, ESM, Node ≥ 18.
- **Edge-safe core**: no `node:` imports; env access is guarded (`globalThis.process?.env`), so Workers/Deno/Bun run it and env-less runtimes return `null`. Anything runtime-specific will live behind subpath exports.
- **Sync and cheap**: no spawn, no disk, no network. `process.env` is copied once per process (it's a proxy — see `bench.js`); `detect()` ≈ 0.5µs, `isAgent(name)` short-circuits at ≈ 0.15µs.
- **Fixtures are the ground truth**: every registry entry ships a recorded env snapshot with probe date and method (`fixtures/`). The test matrix runs every fixture against every detector — no false positives is as tested as no false negatives.

## Contributing an agent

One folder, one fixture, one PR:

1. `agents/<name>/index.js` — `{ name, vendor, procNames, pidEnvVar, detect(env) }`, registered in `agents/index.js` (alphabetical).
2. `fixtures/<name>.json` — a recorded env snapshot from a live session (probe date + method required; the matrix test fails any entry without one).
3. `npm test`.

