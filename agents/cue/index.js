export default {
  name: 'cue',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['MANUS_LONG_DESKTOP_WORKER'] ||
      !!env['MANUS_OPERATOR_PLATFORM']
      ? { confidence: 'medium' }
      : null;
  },
};
