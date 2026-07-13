// github-copilot — evidence, tiers, and probe TODOs: docs/harnesses/github-copilot.md
// COPILOT_CLI=1 is vendor-documented; the COPILOT_MODEL trio is an unverified fallback.
export default {
  name: 'github-copilot',
  vendor: 'github',
  procNames: ['copilot'],
  pidEnvVar: null,
  detect(env) {
    const raw = {};
    if (env.COPILOT_CLI === '1') raw.COPILOT_CLI = env.COPILOT_CLI;
    if (env.COPILOT_AGENT_SESSION_ID) raw.COPILOT_AGENT_SESSION_ID = env.COPILOT_AGENT_SESSION_ID;
    if (Object.keys(raw).length > 0) return { confidence: 'high', raw };
    // vercel-rules tier, unverified in vendor sources
    for (const key of ['COPILOT_MODEL', 'COPILOT_ALLOW_ALL', 'COPILOT_GITHUB_TOKEN']) {
      if (env[key]) raw[key] = env[key];
    }
    if (Object.keys(raw).length === 0) return null;
    return { confidence: 'medium', raw };
  },
};
