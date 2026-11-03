export default {
  name: 'lingguang',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['EXEC_FROM'] ? { confidence: 'medium' } : null;
  },
};
