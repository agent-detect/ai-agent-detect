// The trust mechanism: every fixture probe runs against EVERY detector.
// No false positives is as tested as no false negatives.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { agents } from '../agents/index.js';
import { detect, isAgent } from '../index.js';

const fixturesDir = new URL('../fixtures/', import.meta.url);
const fixtures = readdirSync(fixturesDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(new URL(f, fixturesDir))));

for (const fixture of fixtures) {
  for (const probe of fixture.probes) {
    const label = `${fixture.agent}: ${probe.method}`;

    test(`[matrix] ${label} — only expected claims fire`, () => {
      const result = detect({ env: probe.env });
      const claimNames = [...new Set((result?.claims ?? []).map((c) => c.name).filter(Boolean))];
      assert.deepEqual(claimNames.sort(), [...probe.expect.claimNames].sort());
      assert.equal(result?.name ?? null, probe.expect.primary);
      if ('version' in probe.expect) assert.equal(result?.version ?? null, probe.expect.version);
      if ('mode' in probe.expect) assert.equal(result?.mode ?? null, probe.expect.mode);
      assert.equal(isAgent({ env: probe.env }), probe.expect.isAgent);
    });

    test(`[matrix] ${label} — no foreign detector fires`, () => {
      for (const agent of agents) {
        if (probe.expect.claimNames.includes(agent.name)) continue;
        assert.equal(agent.detect(probe.env), null, `${agent.name} must not fire on ${label}`);
      }
    });
  }
}

test('[matrix] every registry entry has a fixture', () => {
  const covered = new Set(fixtures.map((f) => f.agent));
  for (const agent of agents) {
    assert.ok(covered.has(agent.name), `${agent.name} has no fixture — no fixture, no merge`);
  }
});

test('[matrix] empty env detects nothing', () => {
  assert.equal(detect({ env: {} }), null);
  assert.equal(isAgent({ env: {} }), false);
});

test('AGENT value split: name-valued vs boolean (goose vs opencode style)', () => {
  const goose = detect({ env: { AGENT: 'goose' } });
  assert.equal(goose.name, 'goose');
  const anon = detect({ env: { AGENT: '1' } }); // opencode style
  assert.equal(anon.name, null); // agenthood proven, identity unknown
  assert.equal(isAgent({ env: { AGENT: '1' } }), true);
  assert.equal(isAgent('opencode', { env: { AGENT: '1' } }), false);
});

test('AI_AGENT dialects: Vercel name@version and bare name', () => {
  const devin = detect({ env: { AI_AGENT: 'devin@1' } });
  assert.equal(devin.name, 'devin');
  assert.equal(devin.version, '1');
  const bare = detect({ env: { AI_AGENT: 'v0' } });
  assert.equal(bare.name, 'v0');
  assert.equal(bare.version, null);
});
