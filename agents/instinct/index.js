export default {
  name: 'instinct',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['INSTINCT_OUTER_TOOL_USE_ID'] ||
      !!env['INSTINCT_OUTER_TOOL_USE_STARTED_AT'] ||
      !!env['INSTINCT_OUTER_TOOL_USE_TIMEOUT_SECONDS']
      ? { confidence: 'medium' }
      : null;
  },
};
