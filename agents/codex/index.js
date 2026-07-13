// codex — evidence, tiers, and probe TODOs: docs/harnesses/codex.md
// No marker under danger-full-access; CODEX_SANDBOX is macOS-only.
export default {
  name: 'codex',
  vendor: 'openai',
  procNames: ['codex'],
  pidEnvVar: null,
  detect(env) {
    const raw = {};
    if (env.CODEX_SANDBOX_NETWORK_DISABLED === '1') raw.CODEX_SANDBOX_NETWORK_DISABLED = env.CODEX_SANDBOX_NETWORK_DISABLED;
    if (env.CODEX_SANDBOX) raw.CODEX_SANDBOX = env.CODEX_SANDBOX;
    // CODEX_CI / CODEX_THREAD_ID: vercel-rules tier, hence the medium below
    if (env.CODEX_CI) raw.CODEX_CI = env.CODEX_CI;
    if (env.CODEX_THREAD_ID) raw.CODEX_THREAD_ID = env.CODEX_THREAD_ID;
    if (Object.keys(raw).length === 0) return null;
    const sourceConfirmed = raw.CODEX_SANDBOX_NETWORK_DISABLED || raw.CODEX_SANDBOX;
    return { confidence: sourceConfirmed ? 'high' : 'medium', raw };
  },
};
