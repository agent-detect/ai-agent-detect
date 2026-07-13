// junie — evidence, tiers, and probe TODOs: .kanbento/harnesses/junie.md
export default {
  name: 'junie',
  vendor: 'jetbrains',
  procNames: ['junie'],
  pidEnvVar: null,
  detect(env) {
    const raw = {};
    if (env.JUNIE_DATA) raw.JUNIE_DATA = env.JUNIE_DATA;
    if (env.JUNIE_SHIM_PATH) raw.JUNIE_SHIM_PATH = env.JUNIE_SHIM_PATH;
    if (Object.keys(raw).length === 0) return null;
    return { confidence: 'medium', raw };
  },
};
