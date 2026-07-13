// gemini-cli — evidence, tiers, and probe TODOs: .kanbento/harnesses/gemini-cli.md
export default {
  name: 'gemini-cli',
  vendor: 'google',
  procNames: ['gemini'],
  pidEnvVar: null,
  detect(env) {
    if (env.GEMINI_CLI !== '1') return null;
    return { confidence: 'high', raw: { GEMINI_CLI: env.GEMINI_CLI } };
  },
};
