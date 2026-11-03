# hermes

The agent that grows with you [Official source](https://github.com/NousResearch/hermes-agent).

## Identity signals

- non-empty `HERMES_SESSION_ID` OR non-empty `HERMES_AGENT`.

[Published producer path](https://github.com/NousResearch/hermes-agent/blob/e5eb6b36fe78eb012cefd1f5f436cd458411b8b3/tools/environments/base_session_env.py#L132-L159). The terminal wrapper injects HERMES_SESSION_ID. HERMES_AGENT is an additional registry-derived alternative, not independently established by that producer source.

[Evidence and scope](https://github.com/ai-shifu/detect-agent/blob/8fa5e943e134d97bb92397ca0e0181a8c42f4ec4/detect-agent.md#8-evidence-coverage-and-references).
