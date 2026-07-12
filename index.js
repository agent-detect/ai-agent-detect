// ai-agent-detect — edge-safe core: env-only, sync, zero deps.
// Detection logic is code; the registry holds facts (see agents/).
import { agents } from './agents/index.js';

const TRUTHY = new Set(['1', 'true', 'yes', 'on']);

/**
 * Detect the agent(s) running this process from environment signals.
 * Returns the primary claim plus `claims[]` — every claim the env carries,
 * deliberately unordered: env cannot order nesting layers, so it doesn't
 * pretend to. Genuine stack ordering is detectDeep()'s job (./node).
 */
export function detect(opts = {}) {
  const env = snapshot(opts.env);
  const claims = [];

  // rung 1 — the AI_AGENT standard (two dialects in the wild)
  if (env.AI_AGENT) claims.push(parseAiAgent(env.AI_AGENT));

  // rung 2 — the AGENT convention (value-split: name-valued vs boolean)
  if (env.AGENT) claims.push(parseAgentVar(env.AGENT));

  // rung 3 — per-agent vendor tells (code, richer than any condition engine)
  for (const agent of agents) {
    const hit = agent.detect(env);
    if (hit) {
      claims.push({
        name: agent.name,
        vendor: agent.vendor ?? null,
        version: null,
        mode: null,
        source: 'env:vendor',
        confidence: 'high',
        ...hit,
      });
    }
  }

  if (claims.length === 0) return null;
  return { ...merge(claims), claims };
}

/**
 * isAgent()              — am I running under any agent?
 * isAgent('claude-code') — am I running under this one? (assert style)
 * An anonymous claim (AGENT=1) proves agenthood without naming the agent:
 * isAgent() is true, every assert form is false.
 */
export function isAgent(name, opts) {
  if (name !== undefined && typeof name === 'object') {
    opts = name;
    name = undefined;
  }
  const env = snapshot(opts?.env);

  // Booleans can't get better with more evidence — short-circuit per rung.
  if (env.AI_AGENT) {
    if (name === undefined) return true;
    if (parseAiAgent(env.AI_AGENT).name === name) return true;
  }
  if (env.AGENT) {
    if (name === undefined) return true;
    if (parseAgentVar(env.AGENT).name === name) return true;
  }
  for (const agent of agents) {
    if (name !== undefined && agent.name !== name) continue;
    if (agent.detect(env)) return true;
  }
  return false;
}

// process.env is a proxy into libuv — every property read crosses it (~12µs
// per detect() measured vs ~2µs on a plain object). Copying it per call is
// worse (~26µs: every var crosses the proxy). So: copy ONCE per process —
// the agent's env verdict is fixed at spawn time anyway. An injected env
// (tests, custom sources) bypasses the cache.
let cached;
function snapshot(env) {
  if (env !== undefined) return env;
  if (cached === undefined) {
    const source = globalThis.process?.env;
    cached = source ? { ...source } : {};
  }
  return cached;
}

// AI_AGENT value dialects observed in the wild (2026-07-12):
//   Anthropic:  name_version_mode   claude-code_2-1-205_agent  (dashes = dots)
//   Vercel:     name[@version]      devin@1, custom-agent@2.0, v0
function parseAiAgent(value) {
  const base = {
    vendor: null,
    version: null,
    mode: null,
    source: 'env:AI_AGENT',
    confidence: 'high',
    raw: { AI_AGENT: value },
  };
  if (value.includes('_')) {
    const [name, version, mode] = value.split('_');
    return {
      ...base,
      name: name || null,
      version: version ? version.replaceAll('-', '.') : null,
      mode: mode ?? null,
      confidence: name ? 'high' : 'low',
    };
  }
  if (value.includes('@')) {
    const at = value.lastIndexOf('@');
    return { ...base, name: value.slice(0, at) || null, version: value.slice(at + 1) || null };
  }
  return { ...base, name: value };
}

function parseAgentVar(value) {
  const base = { vendor: null, version: null, mode: null, source: 'env:AGENT', raw: { AGENT: value } };
  if (TRUTHY.has(value.toLowerCase())) {
    // boolean-valued (opencode style): agenthood proven, identity unknown
    return { ...base, name: null, confidence: 'medium' };
  }
  return { ...base, name: value, confidence: 'high' }; // name-valued (goose style)
}

// Primary = first named claim in rung order, enriched by corroborating
// same-name claims. Anonymous claims never displace a named one.
function merge(claims) {
  const named = claims.filter((c) => c.name);
  if (named.length === 0) return { ...claims[0] };
  const primary = { ...named[0] };
  for (const claim of named.slice(1)) {
    if (claim.name !== primary.name) continue;
    primary.version ??= claim.version;
    primary.mode ??= claim.mode;
    primary.vendor ??= claim.vendor;
    primary.raw = { ...primary.raw, ...claim.raw };
    primary.corroborated = true;
  }
  return primary;
}
