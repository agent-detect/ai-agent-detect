// cursor — evidence, tiers, and probe TODOs: docs/harnesses/cursor.md
// All tells are community-tier (none on an official reference page).
export default {
  name: 'cursor',
  vendor: 'anysphere',
  procNames: ['cursor-agent', 'agent'],
  pidEnvVar: null,
  detect(env) {
    const raw = {};
    for (const key of ['CURSOR_AGENT', 'CURSOR_TRACE_ID', 'CURSOR_CLI', 'CURSOR_EXTENSION_HOST_ROLE']) {
      if (env[key] !== undefined) raw[key] = env[key];
    }
    if (env.CURSOR_AGENT === '1') return { confidence: 'high', raw };
    // vercel-rules tier (detect-agent@1.0.1): the CLI in extension-host mode
    if (env.CURSOR_EXTENSION_HOST_ROLE === 'agent-exec') return { confidence: 'high', raw };
    if (env.CURSOR_TRACE_ID) return { confidence: 'medium', raw };
    return null;
  },
};
