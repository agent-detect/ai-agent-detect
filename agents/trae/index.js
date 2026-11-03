export default {
  name: 'trae',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['TRAE_AI_SHELL_ID'] ? { confidence: 'medium' } : null;
  },
};
