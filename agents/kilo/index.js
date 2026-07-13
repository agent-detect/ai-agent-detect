// kilo — evidence, tiers, and probe TODOs: .kanbento/harnesses/kilo.md
// opencode fork: both detectors fire by design (claims[] represents it; kilo wins by order).
export default {
  name: 'kilo',
  vendor: 'kilo-org',
  procNames: ['kilo'],
  pidEnvVar: 'KILO_PID',
  detect(env) {
    const raw = {};
    for (const key of ['KILO', 'KILO_CLIENT', 'KILO_PLATFORM', 'KILOCODE_FEATURE', 'KILOCODE_VERSION', 'KILO_APP_VERSION', 'KILO_PID']) {
      if (env[key] !== undefined) raw[key] = env[key];
    }
    if (env.KILO !== '1' && !env.KILO_CLIENT && !env.KILOCODE_FEATURE) return null;
    const version = env.KILOCODE_VERSION || env.KILO_APP_VERSION || null;
    return { confidence: 'high', version, raw };
  },
};
