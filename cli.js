#!/usr/bin/env node
// CLI — the library's bridge to shell (hooks, Makefiles, CI), a diagnostics
// snapshot for bug reports, and the fixture-contribution funnel (--snapshot).
import { parseArgs } from 'node:util';
import { detect, isAgent } from './index.js';

const HELP = `ai-agent-detect — which AI agent is running this?

Usage:
  npx ai-agent-detect              human-readable verdict (exit 0 detected, 1 not)
  npx ai-agent-detect --format json   full structured result as JSON
  npx ai-agent-detect --check <name>  exit code only: 0 iff running under <name>
  npx ai-agent-detect --check any     exit code only: 0 iff any agent detected
  npx ai-agent-detect --snapshot      dump detection-relevant env (redacted) —
                                      paste into a fixture PR or bug report
`;

const DETECTION_RELEVANT =
  /AGENT|CLAUDE|CODEX|CURSOR|GEMINI|QWEN|KILO|GOOSE|OPENCODE|COPILOT|GROK|AIDER|CLINE|ROO_|CRUSH|CONTINUE|AUGMENT|JUNIE|ANTIGRAVITY|REPL|WARP|CODEIUM|^OH_|^OR_(APP_NAME|SITE_URL)$|^OZ_|^PI_|^TERM_PROGRAM$|^CI$|PAGER|^PS1$|^SHELL$/;
const SECRET = /TOKEN|KEY|SECRET|PASSWORD|PASSWD|CREDENTIAL|AUTH/i;

function main() {
  const { values } = parseArgs({
    options: {
      format: { type: 'string' },
      check: { type: 'string' },
      snapshot: { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
    },
  });

  if (values.help) {
    process.stdout.write(HELP);
    return 0;
  }

  if (values.snapshot) {
    const vars = {};
    for (const [name, value] of Object.entries(process.env)) {
      if (!DETECTION_RELEVANT.test(name)) continue;
      vars[name] = SECRET.test(name) ? '<redacted>' : value;
    }
    process.stdout.write(
      JSON.stringify(
        {
          date: new Date().toISOString().slice(0, 10),
          platform: process.platform,
          node: process.version,
          detected: detect()?.name ?? null,
          env: vars,
        },
        null,
        2,
      ) + '\n',
    );
    return 0;
  }

  if (values.check !== undefined) {
    return (values.check === 'any' ? isAgent() : isAgent(values.check)) ? 0 : 1;
  }

  const result = detect();

  if (values.format === 'json') {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    return result ? 0 : 1;
  }

  if (!result) {
    process.stdout.write('✗ no agent detected\n');
    return 1;
  }

  const named = result.name ?? 'unnamed agent (anonymous claim)';
  const version = result.version ? ` ${result.version}` : '';
  const mode = result.mode ? ` (${result.mode})` : '';
  const extra = result.corroborated ? ', corroborated' : '';
  process.stdout.write(`✓ ${named}${version}${mode} — via ${result.source}, ${result.confidence}${extra}\n`);
  const others = [...new Set(result.claims.map((c) => c.name).filter((n) => n && n !== result.name))];
  if (others.length) process.stdout.write(`  also claimed: ${others.join(', ')}\n`);
  return 0;
}

process.exit(main());
