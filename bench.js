// Micro-benchmark for detect()/isAgent() — run before and after touching the
// core or the registry: `npm run bench`.
// History (2026-07-12, Node 22, M-series): naive per-call {...process.env}
// snapshot DOUBLED cost to ~26µs (copying ~60 vars crosses the proxy more
// than a handful of targeted reads) — hence the once-per-process cache.
import { detect, isAgent } from './index.js';
import { agents } from './agents/index.js';

const FIXTURE_ENV = {
  AI_AGENT: 'claude-code_2-1-205_agent',
  CLAUDECODE: '1',
  CLAUDE_CODE_ENTRYPOINT: 'cli',
  CLAUDE_CODE_EXECPATH: '/x/versions/2.1.205',
};

function bench(label, fn, n = 1e6) {
  for (let i = 0; i < 1e4; i++) fn(); // warmup
  const t = performance.now();
  for (let i = 0; i < n; i++) fn();
  const us = ((performance.now() - t) / n) * 1e3;
  console.log(`${label.padEnd(44)} ${us.toFixed(2).padStart(7)} µs/call`);
}

bench('detect() — real process.env (cached)', () => detect());
bench('detect() — injected env (no cache)', () => detect({ env: FIXTURE_ENV }));
bench('detect() — injected empty env (miss)', () => detect({ env: {} }));
bench("isAgent('claude-code') — short-circuit", () => isAgent('claude-code'));
bench("isAgent('nope') — full miss", () => isAgent('nope'));

// registry-growth simulation: how does a full-width registry scan scale?
const PAD = 74;
agents.push(
  ...Array.from({ length: PAD }, (_, i) => ({
    name: `pad-${i}`,
    detect: (env) => (env[`PAD_${i}`] === '1' ? {} : null),
  })),
);
bench(`detect() — registry padded to ${agents.length} detectors`, () => detect({ env: FIXTURE_ENV }));
