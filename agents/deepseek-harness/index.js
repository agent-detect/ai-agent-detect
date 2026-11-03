export default {
  name: 'deepseek-harness',
  vendor: 'deepseek',
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    return env.DSH_SHELL ? { confidence: 'medium' } : null;
  },
};
