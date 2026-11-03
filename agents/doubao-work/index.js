export default {
  name: 'doubao-work',
  vendor: null,
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return !!env['DOUBAO_OFFICE_AGENT_NAME'] ? { confidence: 'medium' } : null;
  },
};
