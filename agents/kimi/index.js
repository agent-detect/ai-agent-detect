export default {
  name: 'kimi',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['KIMI_PLUGIN_ROOT'] ? { confidence: 'medium' } : null;
  },
};
