import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const CLI = new URL('../cli.js', import.meta.url).pathname;
const CLEAN = { PATH: process.env.PATH }; // no inherited agent vars
const CLAUDE = { ...CLEAN, AI_AGENT: 'claude-code_2-1-205_agent', CLAUDECODE: '1' };

function run(args, env) {
  try {
    const stdout = execFileSync(process.execPath, [CLI, ...args], { env, encoding: 'utf8' });
    return { code: 0, stdout };
  } catch (e) {
    return { code: e.status, stdout: e.stdout ?? '' };
  }
}

test('default: human verdict + exit codes', () => {
  const hit = run([], CLAUDE);
  assert.equal(hit.code, 0);
  assert.match(hit.stdout, /✓ claude-code 2\.1\.205 \(agent\)/);
  const miss = run([], CLEAN);
  assert.equal(miss.code, 1);
  assert.match(miss.stdout, /✗ no agent detected/);
});

test('--format json: structured result', () => {
  const { code, stdout } = run(['--format', 'json'], CLAUDE);
  assert.equal(code, 0);
  const parsed = JSON.parse(stdout);
  assert.equal(parsed.name, 'claude-code');
  assert.equal(parsed.version, '2.1.205');
  assert.ok(Array.isArray(parsed.claims));
  assert.equal(JSON.parse(run(['--format', 'json'], CLEAN).stdout), null);
});

test('--check: exit code only, no output', () => {
  assert.equal(run(['--check', 'claude-code'], CLAUDE).code, 0);
  assert.equal(run(['--check', 'grok'], CLAUDE).code, 1);
  assert.equal(run(['--check', 'any'], CLAUDE).code, 0);
  assert.equal(run(['--check', 'any'], CLEAN).code, 1);
  assert.equal(run(['--check', 'any'], CLAUDE).stdout, '');
});

test('--snapshot: detection-relevant vars only, secrets redacted', () => {
  const env = { ...CLAUDE, COPILOT_GITHUB_TOKEN: 'ghp_secret', HOME: '/home/u', SOME_RANDOM: 'x' };
  const { code, stdout } = run(['--snapshot'], env);
  assert.equal(code, 0);
  const snap = JSON.parse(stdout);
  assert.equal(snap.detected, 'claude-code');
  assert.equal(snap.env.AI_AGENT, 'claude-code_2-1-205_agent');
  assert.equal(snap.env.COPILOT_GITHUB_TOKEN, '<redacted>');
  assert.ok(!('HOME' in snap.env));
  assert.ok(!('SOME_RANDOM' in snap.env));
});

test('--help prints usage', () => {
  assert.match(run(['--help'], CLEAN).stdout, /Usage:/);
});
