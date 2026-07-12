// claude-code (Anthropic) — probed 2026-07-12 (see .kanbento/harnesses/claude-code.md).
// Sets the full AI_AGENT triple (handled by core rung 1); this detector owns
// the vendor tells, which also work when AI_AGENT is stripped or inherited-over.
export default {
  name: 'claude-code',
  vendor: 'anthropic',
  procNames: ['claude'],
  pidEnvVar: null,
  detect(env) {
    if (env.CLAUDECODE !== '1') return null;
    const raw = {};
    for (const key of [
      'CLAUDECODE',
      'CLAUDE_CODE_ENTRYPOINT',
      'CLAUDE_CODE_EXECPATH',
      'CLAUDE_CODE_CHILD_SESSION',
    ]) {
      if (env[key] !== undefined) raw[key] = env[key];
    }
    // richer than a condition engine: the exec path carries the version
    const version = env.CLAUDE_CODE_EXECPATH?.match(/\/versions\/(\d[\d.]*)/)?.[1] ?? null;
    return { confidence: 'high', version, raw };
  },
};
