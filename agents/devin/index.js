// devin — evidence, tiers, and probe TODOs: docs/harnesses/devin.md
// Only tell is a file check (/opt/.devin) — outside the env core; never fires here.
export default {
  name: 'devin',
  vendor: 'cognition',
  procNames: [],
  pidEnvVar: null,
  filesTells: ['/opt/.devin'],
  detect() {
    return null;
  },
};
