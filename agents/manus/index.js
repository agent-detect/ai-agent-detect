export default {
  name: 'manus',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['MANUS_ADDON_RUNTIME_SPEC_PATH'] ||
      !!env['MANUS_ADDON_RUNTIME_SPECS_REVISION']
      ? { confidence: 'medium' }
      : null;
  },
};
