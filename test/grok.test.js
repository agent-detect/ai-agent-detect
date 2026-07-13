import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import grok from '../agents/grok/index.js';
import { detect, isAgent } from '../index.js';

const fixture = JSON.parse(readFileSync(new URL('../fixtures/grok.json', import.meta.url)));

test('grok is env-undetectable — the detector never fires (honesty over reach)', () => {
  for (const probe of fixture.probes) {
    assert.equal(grok.detect(probe.env), null, probe.method);
  }
});

test('clean grok env: no agent detected at all', () => {
  const probe = fixture.probes.find((p) => !p.env.AI_AGENT);
  assert.equal(detect({ env: probe.env }), null);
  assert.equal(isAgent({ env: probe.env }), false);
});

test('nested contamination: inherited AI_AGENT names the OUTER harness', () => {
  const probe = fixture.probes.find((p) => p.env.AI_AGENT);
  const result = detect({ env: probe.env });
  assert.equal(result.name, 'claude-code'); // the documented limitation
  assert.equal(isAgent('grok', { env: probe.env }), false); // inner layer invisible to env
});
