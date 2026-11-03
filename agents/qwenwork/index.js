export default {
  name: 'qwenwork',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['QODER_WORK_INTEGRATION_PRODUCT']
      ? { confidence: 'medium' }
      : null;
  },
};
