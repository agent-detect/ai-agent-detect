// grok (xAI) — probed 2026-07-12 (see .kanbento/harnesses/grok.md).
// Sets NO identity variable (grok 0.2.45, scrubbed-env probe). Its children
// carry only a non-interactive hygiene bundle (CI=true, pagers off, progress
// off) — too weak to name an agent; weak-signal use is parked (note:design).
// It also passes inherited AI_AGENT through — the live proof of nested-harness
// contamination. Env-undetectable, honestly: this detector never fires.
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
