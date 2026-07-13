// cline — evidence, tiers, and probe TODOs: docs/harnesses/cline.md
// Marker exists on VS Code integrated terminals only — absence proves nothing.
export default {
  name: 'cline',
  vendor: 'cline',
  procNames: ['cline'],
  pidEnvVar: null,
  detect(env) {
    if (env.CLINE_ACTIVE !== 'true') return null;
    return { confidence: 'high', raw: { CLINE_ACTIVE: env.CLINE_ACTIVE } };
  },
};
