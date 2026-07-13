// amp — evidence, tiers, and probe TODOs: .kanbento/harnesses/amp.md
// AGENT=amp is generic (core rung 2); no vendor var exists — this detector never fires.
export default {
  name: 'amp',
  vendor: 'sourcegraph',
  procNames: ['amp'],
  pidEnvVar: null,
  detect() {
    return null;
  },
};
