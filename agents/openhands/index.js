// openhands — evidence, tiers, and probe TODOs: docs/harnesses/openhands.md
// Sandbox-furniture fingerprint, not a deliberate marker — medium.
export default {
  name: 'openhands',
  vendor: 'all-hands',
  procNames: [],
  pidEnvVar: null,
  detect(env) {
    const raw = {};
    for (const key of ['OH_CONVERSATIONS_PATH', 'OH_BASH_EVENTS_DIR', 'OPENVSCODE_SERVER_ROOT']) {
      if (env[key]) raw[key] = env[key];
    }
    if (env.PS1?.includes('###PS1JSON###')) raw.PS1 = '<contains ###PS1JSON### marker>';
    if (Object.keys(raw).length === 0) return null;
    return { confidence: 'medium', raw };
  },
};
