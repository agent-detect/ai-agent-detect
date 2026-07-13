// cowork — evidence, tiers, and probe TODOs: docs/harnesses/cowork.md
// Runs Claude Code underneath; the claude-code detector defers when the marker is set.
export default {
  name: 'cowork',
  vendor: 'anthropic',
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    if (!env.CLAUDE_CODE_IS_COWORK) return null;
    if (env.CLAUDECODE !== '1' && !env.CLAUDE_CODE) return null;
    const raw = { CLAUDE_CODE_IS_COWORK: env.CLAUDE_CODE_IS_COWORK };
    if (env.CLAUDECODE !== undefined) raw.CLAUDECODE = env.CLAUDECODE;
    if (env.CLAUDE_CODE !== undefined) raw.CLAUDE_CODE = env.CLAUDE_CODE;
    return { confidence: 'medium', raw };
  },
};
