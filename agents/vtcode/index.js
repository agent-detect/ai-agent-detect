export default {
  name: 'vtcode',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['VTCODE'] ? { confidence: 'medium' } : null;
  },
};
