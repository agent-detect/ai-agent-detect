// roo — evidence, tiers, and probe TODOs: .kanbento/harnesses/roo.md
// The execa inline provider sets neither var — absence proves nothing.
export default {
  name: 'roo',
  vendor: 'roo-code',
  procNames: ['roo'],
  pidEnvVar: null,
  detect(env) {
    const raw = {};
    if (env.ROO_ACTIVE === 'true') raw.ROO_ACTIVE = env.ROO_ACTIVE;
    if (env.ROO_CLI_RUNTIME === '1') raw.ROO_CLI_RUNTIME = env.ROO_CLI_RUNTIME;
    if (Object.keys(raw).length === 0) return null;
    const mode = raw.ROO_CLI_RUNTIME ? 'agent' : null;
    return { confidence: 'high', mode, raw };
  },
};
