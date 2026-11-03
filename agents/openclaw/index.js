export default {
  name: 'openclaw',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['OPENCLAW_SHELL'] ? { confidence: 'medium' } : null;
  },
};
