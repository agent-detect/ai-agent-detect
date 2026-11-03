// crush — evidence, tiers, and probe TODOs: docs/harnesses/crush.md
export default {
  name: 'crush',
  vendor: 'charm',
  procNames: ['crush'],
  pidEnvVar: null,
  detect(env) {
    return !!env['CRUSH'] ? { confidence: 'medium' } : null;
  },
};
