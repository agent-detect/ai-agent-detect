export default {
  name: 'grok-build',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return env['GROK_AGENT'] === '1' ||
      !!env['GROK_PLUGIN_ROOT'] ||
      !!env['GROK_PLUGIN_DATA']
      ? { confidence: 'medium' }
      : null;
  },
};
