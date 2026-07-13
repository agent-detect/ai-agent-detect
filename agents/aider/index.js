// aider — evidence, tiers, and probe TODOs: .kanbento/harnesses/aider.md
// Accidental fingerprint (OpenRouter attribution vars) — confidence capped at medium.
export default {
  name: 'aider',
  vendor: 'aider',
  procNames: ['aider'],
  pidEnvVar: null,
  detect(env) {
    const raw = {};
    if (env.OR_APP_NAME === 'Aider') raw.OR_APP_NAME = env.OR_APP_NAME;
    if (env.OR_SITE_URL?.includes('aider.chat')) raw.OR_SITE_URL = env.OR_SITE_URL;
    if (Object.keys(raw).length === 0) return null;
    return { confidence: 'medium', raw };
  },
};
