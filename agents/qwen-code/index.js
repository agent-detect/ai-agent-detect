// qwen-code — evidence, tiers, and probe TODOs: docs/harnesses/qwen-code.md
export default {
  name: 'qwen-code',
  vendor: 'alibaba',
  procNames: ['qwen'],
  pidEnvVar: null,
  detect(env) {
    if (env.QWEN_CODE !== '1') return null;
    const raw = { QWEN_CODE: env.QWEN_CODE };
    for (const key of ['QWEN_CODE_SESSION_ID', 'QWEN_CODE_AGENT_ID', 'QWEN_CODE_PROMPT_ID']) {
      if (env[key]) raw[key] = env[key];
    }
    return { confidence: 'high', raw };
  },
};
