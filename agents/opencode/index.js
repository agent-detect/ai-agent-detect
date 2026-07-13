// opencode — evidence, tiers, and probe TODOs: docs/harnesses/opencode.md
export default {
  name: 'opencode',
  vendor: 'anomaly',
  procNames: ['opencode'],
  pidEnvVar: 'OPENCODE_PID',
  detect(env) {
    // OPENCODE_CLIENT is the vercel-rules-tier sibling (detect-agent@1.0.1)
    if (env.OPENCODE !== '1' && !env.OPENCODE_CLIENT) return null;
    const raw = {};
    for (const key of ['OPENCODE', 'OPENCODE_CLIENT', 'OPENCODE_PID']) {
      if (env[key] !== undefined) raw[key] = env[key];
    }
    return { confidence: 'high', raw };
  },
};
