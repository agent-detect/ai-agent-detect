---
kanbento_id: 38960589-2074-494c-a9c8-ede5d9ef6bce
title: "ai-agent-detect — design: structured identity over the signal ladder, capability registry as the moat"
revised: 2026-07-12
---
# ai-agent-detect — design

Runtime identification for the agentic era. `isatty()` had fifty years; agents
are the third consumer class after humans and pipes. This library answers
**"which agent is running my code, and what does it honor?"** — structured
identity plus capabilities, not a boolean.

## Positioning

- **vs `detect-agent` (Vercel)** — theirs is a declarative condition engine
  (`agents.json`: env_set / env_value / env_matches / file_exists, first-match,
  emits a name string) built for a boolean question. Ours is *code*: per-agent
  detector functions that can parse versions, infer mode, walk the process
  tree — code is always richer than any condition engine. We consume their
  `agents.json` as a compatibility tier, so we're a superset, never behind.
- **vs `which-agent`** (sibling package) — hard boundary: `ai-agent-detect`
  identifies *the agent running you* (inbound); `which-agent` resolves *an
  agent to run* (outbound invocation: binary, headless flags, permission
  knob). They may share a data registry eventually; APIs never merge.
- **vs `unharness`** — unharness materializes context *for* harnesses; this
  library only observes. No writes, ever.

## API

```js
import { detect, isAgent } from 'ai-agent-detect';   // edge-safe core
import { detectDeep } from 'ai-agent-detect/node';    // Node-only depth

isAgent()              // boolean — the new isatty(); THE v0 consumer surface
isAgent('claude-code') // assert style — "am I running under this one?"
detect()               // structured: primary AgentInfo + claims[] (all env
                       // claims, unordered — env can't order nesting layers)
await detectDeep()     // ppid walk → genuine ordered stack[] (innermost
                       // first), env claims attributed to their layers
capabilities()         // later (v0.2) — not part of the v0 surface
```

The consumer contract (George, 2026-07-12): v0 is used through `isAgent()`
boolean and assert forms; `detect()` is the structured layer underneath;
capabilities comes later. Nested harnesses are modeled as an **agent call
stack**, never resolved away — `claims[]`/`stack[]` show what is actually
happening and the caller picks the layer they care about.

The split is a hard boundary: the root export runs anywhere JS runs
(workerd, Vercel Edge, Deno, Bun, browsers-in-principle); the process-tree
walk needs `node:child_process`, so it lives behind the `/node` subpath and
can never leak into an edge bundle.

### AgentInfo

```js
{
  name: 'claude-code',      // canonical slug (registry-defined)
  vendor: 'anthropic',
  version: '2.1.205',       // string | null
  mode: 'agent',            // 'agent' (headless/auto) | 'interactive' | null
  source: 'env:AI_AGENT',   // which rung matched
  confidence: 'high',       // 'high' | 'medium' | 'low'
  raw: { AI_AGENT: 'claude-code_2-1-205_agent' }  // the matched evidence
}
```

Every claim carries its evidence (`source`, `raw`) — a consumer can apply its
own trust policy instead of inheriting ours.

## Survey consequences (7-harness proto-registry, 2026-07-12)

The `harness:*` records (claude-code probed; codex, cursor, gemini-cli,
amp, goose, opencode documented) force four spec revisions:

1. **`AI_AGENT` has exactly one known implementer** — claude-code. Vercel
   promotes it as the standard; no other surveyed harness sets it (source-
   confirmed absent in codex/gemini-cli/goose/opencode). Rung 1 stays first
   (highest signal quality when present) but rung 3 is where the real
   coverage lives today.
2. **The `AGENT` var is value-split**: goose sets `AGENT=goose`
   (name-valued), opencode sets `AGENT=1` (boolean). Rung 2 parser rule:
   `AGENT` is identity-bearing only when its value isn't a truthy literal
   (`1`/`true`); a boolean value proves agenthood (isAgent=true) without
   naming the agent — a partial match the ladder must be able to return.
3. **Signals are conditional on execution path, not just agent** — codex
   sets vars only when sandboxed (nothing under `danger-full-access`);
   goose sets `AGENT`/`GOOSE_TERMINAL` on the computer-controller and retry
   paths but NOT the main developer shell tool (source contradicts docs).
   Registry entries need a `coverage` field (which paths carry the signal);
   `confidence` must reflect it. The codex hole **promotes the ppid walk
   from nice-to-have to required** for complete detection.
4. **Free ppid head start**: opencode exports `OPENCODE_PID` — when an
   agent hands over its own PID, `detectDeep` starts there instead of
   walking. Registry entries get an optional `pidEnvVar`.

Version via env exists nowhere but claude-code's `AI_AGENT` triple; mode
likewise. `null` version/mode is the norm, not the exception.

Second round (grok live probe + Vercel spec read, same day) adds three:

5. **`AI_AGENT` already has two value dialects.** Vercel's own README
   specs `name` or `name@version` (`devin@1`, `custom-agent@2.0`);
   Anthropic ships `name_version_mode` (`claude-code_2-1-205_agent`). The
   rung-1 parser handles both: `@` split → Vercel dialect; `_` triple →
   Anthropic dialect; else whole-string name.
6. **Nested-harness contamination is real** (harness:grok, probed): grok
   spawned inside a Claude Code session passes `AI_AGENT=claude-code_…`
   through to its children — env alone cannot distinguish own from
   inherited signals. **Decision (George, 2026-07-12): never hide what is
   actually happening — model it as an agent call stack.** No silent
   winner-picking: sync `detect()` reports *every* claim the env carries
   (`claims[]` — it cannot order layers, so it doesn't pretend to);
   `detectDeep()` walks the ppid chain and returns the genuine ordered
   `stack[]` (innermost first), attributing env claims to their layers.
   Nesting is a minority case but a valid one — the API represents it
   instead of resolving it away, and the caller picks the layer they care
   about.
7. **The no-signal class exists** (grok joins codex-under-full-access):
   harnesses with zero self-identification. Grok's children do carry a
   distinctive *hygiene bundle* (CI + pager/progress suppression) — too
   weak to name an agent, possibly enough for `isAgent()` at `low`
   confidence; a design question parked, not decided.

## The signal ladder (first match wins, confidence attached)

1. **`AI_AGENT` env** — the Vercel-promoted standard. Grammar (observed live,
   2026-07-12): `<name>_<version-dashes>_<mode>` →
   `claude-code_2-1-205_agent` parses to name `claude-code`, version
   `2.1.205` (dashes→dots), mode `agent`. Underscores delimit fields; dashes
   stay inside fields. Malformed values degrade gracefully: whole string as
   `name`, confidence `medium`. → confidence `high`.
2. **`AGENT` env** — the older split-convention (Goose, Amp). Name only. →
   `high`.
3. **Vendor tells** — per-agent detector functions over env:
   `CLAUDECODE=1` / `CLAUDE_CODE_ENTRYPOINT` (claude-code),
   `CURSOR_TRACE_ID` (cursor), Codex/Gemini/Amp/Goose equivalents. Detectors
   can combine signals and extract version/mode where the vendor exposes
   them. → `high` per detector's own judgment.
4. **`agents.json` compat tier** — evaluate Vercel's declarative definitions
   (vendored snapshot, no runtime fetch) for agents we have no hand-written
   detector for. → `medium`. (Consuming *their* rules format for interop is
   fine; we don't author one — see the registry section.)
5. **Process-tree walk** (`detectDeep` only) — walk ppid chain, match
   ancestor command names against the registry (`claude`, `codex`,
   `cursor`…). Catches stripped-env child processes. darwin/linux via
   `ps`; costs a subprocess, hence opt-in async. → `medium`.
6. Nothing matched → `null`. (TTY state alone never claims agenthood — it
   feeds `mode`, not identity.)

## Detector registry

```js
// src/agents/claude-code.js
export default {
  name: 'claude-code', vendor: 'anthropic',
  detect(env) { /* returns Partial<AgentInfo> | null */ },
  procNames: ['claude'],
}
```

**Contribution is the scaling model** (requirement, George 2026-07-12): one
agent = one file = one easy PR. The pattern that scaled vercel-labs/skills
to 73 harnesses via community PRs, tightened:

- a schema-validated entry shape (validation script fails CI on drift);
- a required env fixture per agent — a PR without a recorded fixture doesn't
  merge, so the registry can't accumulate folklore;
- the supported-agents table in the README is codegen'd from the registry
  (single source, never hand-synced);
- a fill-in template (`docs/new-agent.md`): copy a file, paste your env
  snapshot, run the validator.

Adding or updating a vendor should take a contributor under fifteen minutes
with no knowledge of the library's internals.

## Capability tier (v0.2)

`capabilities(info?)` → static registry keyed by canonical name:

```js
{ contextFiles: { reads: ['CLAUDE.md'], hierarchy: 'lazy-nested', ignores: ['AGENTS.md'] },
  skillDirs: ['.claude/skills'],       // what it actually discovers
  envConvention: 'AI_AGENT',
  headless: true }
```

Sourced from **sentinel probes, not vendor docs** (write to observed
behavior — the CLAUDE.md-vs-AGENTS.md probe already caught docs lying).
Each entry cites its probe date. This is the moat: nobody else ships
"what does this agent honor" as data.

## Principles (the four requirements, George 2026-07-12, plus consequences)

- **Edge-compatible.** The core export uses no `node:` imports and never
  touches `process` directly — env comes through a guarded adapter
  (`globalThis.process?.env ?? {}`; Deno/Bun/workerd all satisfy it or
  return empty). Anything runtime-specific lives behind subpath exports
  (`/node` today). Edge safety is CI-verified, not asserted.
- **Zero runtime dependencies.** Forever — this is a first-lines-of-a-CLI
  library; its install cost and attack surface must be nil. ESM, Node ≥ 18,
  `exports` map; CJS build only if demand shows.
- **Easy to contribute.** See the registry section — one file, one fixture,
  one PR; codegen'd docs; sub-fifteen-minute vendor updates.
- **Tests/quality ⇒ trust.** Detection libraries are trusted or worthless —
  a wrong `AgentInfo` is worse than `null`. See Testing.
- **Sync core.** `detect()` never spawns, never reads disk (env only) —
  safe in hot paths and CLIs' first lines.
- **No writes, no network.** Pure observation.
- **Evidence over verdicts.** `source` + `raw` + `confidence` on every
  result.
- **Registry data is a commons** — MIT, importable by which-agent/unharness.
- **Data is facts, never rules** (George, 2026-07-12): the JSON commons
  (`registry/`, `fixtures/`) holds *dumb facts* — canonical names, vendors,
  known env var names, `procNames`, `pidEnvVar`, capability data, fixtures,
  probe provenance. Detection logic stays code. No condition DSL, no rules
  engine: the ecosystem is wild west (per-path coverage, value dialects,
  inherited-signal contamination — all found in one week); forcing it into
  declarative style now would be premature and fighting the last section's
  own evidence. Vercel's agents.json shows the ceiling of declarative:
  boolean-ish, first-match, blind to everything interesting. Revisit only
  if detector code turns out to be 90% the same shape.
  Multi-platform sequencing: `note:multi-platform`.

## v0 scope

`detect()` + `isAgent()`, rungs 1–3, structured AgentInfo, fixtures for
claude-code (live-verified), codex, cursor, gemini-cli, amp, goose.
Then v0.1 = `detectDeep` (rung 5), v0.2 = capabilities registry,
agents.json compat tier when its schema stabilizes.

## Testing — quality is the product

Trust is what a detection library sells; the test story is the trust story:

- **Fixture-driven.** Env snapshots recorded from live sessions are the
  unit-test corpus — every registry entry runs against its own fixture and
  against every *other* agent's fixture (no false positives is as tested as
  no false negatives). The claude-code fixture is already captured:
  `AI_AGENT=claude-code_2-1-205_agent`, `CLAUDECODE=1`.
- **Provenance dates.** Each fixture carries its probe date; a fixture is
  stale when the agent's env convention changes after it — staleness is
  lintable, and the README table shows last-verified per agent.
- **Runtime matrix in CI.** Node LTS, Bun, Deno, and an edge smoke test
  (workerd/miniflare importing the root export) — edge compatibility is a
  gate, not a claim.
- **Type declarations** shipped (hand-written `.d.ts` over the JS — no build
  step for a zero-dep package), so the structured result is IDE-checkable.
- **Malformed-input tests** — the `AI_AGENT` parser is fuzzed with junk
  values; degradation paths (`medium` confidence, raw-as-name) are specified
  behavior, not accidents.
