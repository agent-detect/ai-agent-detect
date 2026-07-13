// antigravity — evidence, tiers, and probe TODOs: docs/harnesses/antigravity.md
export default {
  name: 'antigravity',
  vendor: 'google',
  procNames: ['antigravity'],
  pidEnvVar: null,
  detect(env) {
    if (!env.ANTIGRAVITY_AGENT) return null;
    return { confidence: 'medium', raw: { ANTIGRAVITY_AGENT: env.ANTIGRAVITY_AGENT } };
  },
};
