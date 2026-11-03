export default {
  name: 'hermes',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['HERMES_SESSION_ID'] || !!env['HERMES_AGENT']
      ? { confidence: 'medium' }
      : null;
  },
};
