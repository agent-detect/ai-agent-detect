export default {
  name: 'muse',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['JARVIS_IS_ASSIGNED'] || !!env['JARVIS_TOOL_CALL_ID']
      ? { confidence: 'medium' }
      : null;
  },
};
