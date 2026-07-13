// replit — evidence, tiers, and probe TODOs: .kanbento/harnesses/replit.md
// REPL_ID marks the Replit platform, not agent operation — medium.
export default {
  name: 'replit',
  vendor: 'replit',
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    if (!env.REPL_ID) return null;
    return { confidence: 'medium', raw: { REPL_ID: env.REPL_ID } };
  },
};
