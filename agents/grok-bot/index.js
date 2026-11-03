export default {
  name: 'grok-bot',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['SAND_AGENT'] ||
      (!!env['CURSOR_AGENT'] &&
        !!env['SAND_MANIFEST_V2'] &&
        !!env['SAND_SUPERVISOR_ENABLED'])
      ? { confidence: 'medium' }
      : null;
  },
};
