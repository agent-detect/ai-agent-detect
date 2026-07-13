// pi — evidence, tiers, and probe TODOs: .kanbento/harnesses/pi.md
// PATH fingerprint — weak-signal class, low.
export default {
  name: 'pi',
  vendor: null,
  procNames: ['pi'],
  pidEnvVar: null,
  detect(env) {
    if (!env.PATH || !/\.pi[\\/]agent/.test(env.PATH)) return null;
    return { confidence: 'low', raw: { PATH: '<contains .pi/agent>' } };
  },
};
