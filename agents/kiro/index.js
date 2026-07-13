// kiro — evidence, tiers, and probe TODOs: .kanbento/harnesses/kiro.md
// TERM_PROGRAM is ambience, not identity (their TTY gate is impossible env-only) — low.
export default {
  name: 'kiro',
  vendor: 'aws',
  procNames: ['kiro'],
  pidEnvVar: null,
  detect(env) {
    if (!env.TERM_PROGRAM || !env.TERM_PROGRAM.includes('kiro')) return null;
    return { confidence: 'low', raw: { TERM_PROGRAM: env.TERM_PROGRAM } };
  },
};
