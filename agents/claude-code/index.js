// claude-code — evidence, tiers, and probe TODOs: .kanbento/harnesses/claude-code.md
export default {
  name: 'claude-code',
  vendor: 'anthropic',
  procNames: ['claude'],
  pidEnvVar: null,
  detect(env) {
    if (env.CLAUDECODE !== '1' && !env.CLAUDE_CODE) return null;
    // agents/cowork owns the marked case (specificity wins)
    if (env.CLAUDE_CODE_IS_COWORK) return null;
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
