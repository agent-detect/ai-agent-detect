// augment — evidence, tiers, and probe TODOs: .kanbento/harnesses/augment.md
export default {
  name: 'augment',
  vendor: 'augment',
  procNames: ['auggie'],
  pidEnvVar: null,
  detect(env) {
    if (!env.AUGMENT_AGENT) return null;
    return { confidence: 'medium', raw: { AUGMENT_AGENT: env.AUGMENT_AGENT } };
  },
};
