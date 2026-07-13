// crush — evidence, tiers, and probe TODOs: .kanbento/harnesses/crush.md
// No env signal exists — this detector never fires.
export default {
  name: 'crush',
  vendor: 'charm',
  procNames: ['crush'],
  pidEnvVar: null,
  detect() {
    return null;
  },
};
