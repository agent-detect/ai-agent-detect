import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import claudeCode from '../agents/claude-code/index.js';
import { detect } from '../index.js';

const fixture = JSON.parse(readFileSync(new URL('../fixtures/claude-code.json', import.meta.url)));

test('fires on its own probes with high confidence', () => {
  for (const probe of fixture.probes) {
    const hit = claudeCode.detect(probe.env);
    assert.ok(hit, probe.method);
    assert.equal(hit.confidence, 'high');
  }
});

test('recovers version from CLAUDE_CODE_EXECPATH when AI_AGENT is absent', () => {
  const probe = fixture.probes.find((p) => !p.env.AI_AGENT);
  const result = detect({ env: probe.env });
  assert.equal(result.name, 'claude-code');
  assert.equal(result.version, '2.1.205');
  assert.equal(result.source, 'env:vendor');
});

test('AI_AGENT triple and vendor tell corroborate into one primary', () => {
  const probe = fixture.probes.find((p) => p.env.AI_AGENT);
  const result = detect({ env: probe.env });
  assert.equal(result.name, 'claude-code');
  assert.equal(result.version, '2.1.205'); // dashes decoded to dots
  assert.equal(result.mode, 'agent');
  assert.equal(result.source, 'env:AI_AGENT'); // rung 1 leads
  assert.equal(result.corroborated, true);
  assert.equal(result.claims.length, 2);
});

test('does not fire without CLAUDECODE=1', () => {
  assert.equal(claudeCode.detect({}), null);
  assert.equal(claudeCode.detect({ CLAUDECODE: '0' }), null);
  assert.equal(claudeCode.detect({ CLAUDE_CODE_ENTRYPOINT: 'cli' }), null);
});
