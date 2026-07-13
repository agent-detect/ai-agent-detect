// goose — evidence, tiers, and probe TODOs: .kanbento/harnesses/goose.md
// Vars set on two of three execution paths — absence proves nothing.
export default {
  name: 'goose',
  vendor: 'block',
  procNames: ['goose'],
  pidEnvVar: null,
  detect(env) {
    if (env.GOOSE_TERMINAL !== '1') return null;
    const raw = { GOOSE_TERMINAL: env.GOOSE_TERMINAL };
    if (env.AGENT_SESSION_ID) raw.AGENT_SESSION_ID = env.AGENT_SESSION_ID;
    return { confidence: 'high', raw };
  },
};
