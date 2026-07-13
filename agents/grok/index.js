// grok — evidence, tiers, and probe TODOs: .kanbento/harnesses/grok.md
// No identity var (probed) — this detector never fires.
export default {
  name: 'grok',
  vendor: 'xai',
  // binary is literally `agent` (~/.grok/bin/agent) — generic name; the ppid
  // rung must corroborate via the executable path, not the name alone
  procNames: ['agent'],
  pidEnvVar: null,
  detect() {
    return null;
  },
};
