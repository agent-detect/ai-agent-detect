export default {
  name: 'workbuddy',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['WORKBUDDY_APPLICATION_NAME'] || !!env['WORKBUDDY_APP_NAME']
      ? { confidence: 'medium' }
      : null;
  },
};
