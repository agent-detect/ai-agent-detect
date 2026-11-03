// devin — evidence, tiers, and probe TODOs: docs/harnesses/devin.md
export default {
  name: 'devin',
  vendor: 'cognition',
  procNames: [],
  pidEnvVar: null,
  filesTells: ['/opt/.devin'],
  detect(env) {
    return !!env['DEVIN_DIR'] || !!env['DEVIN_DISABLE_HISTEXPAND']
      ? { confidence: 'medium' }
      : null;
  },
};
