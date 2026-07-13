// continue — evidence, tiers, and probe TODOs: docs/harnesses/continue.md
// No env signal exists — this detector never fires.
export default {
  name: 'continue',
  vendor: 'continue',
  procNames: ['cn'],
  pidEnvVar: null,
  detect() {
    return null;
  },
};
