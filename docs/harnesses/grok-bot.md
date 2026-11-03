# grok-bot

AI teammates that retain context and complete tasks across apps and websites on a persistent cloud computer. [Official source](https://cursor.com/docs/grok-bot).

## Identity signals

- non-empty `SAND_AGENT` OR (non-empty `CURSOR_AGENT` AND non-empty `SAND_MANIFEST_V2` AND non-empty `SAND_SUPERVISOR_ENABLED`).

Local SAND_AGENT comes from static inspection of Grok Bot 0.71.2 macOS. The cloud alternative is a user-reported shell observation (2026-10-16) and requires all three markers. The Sand flags alone are not product identity. Grok Bot is separate from Grok Build.

[Evidence and scope](https://github.com/ai-shifu/detect-agent/blob/8fa5e943e134d97bb92397ca0e0181a8c42f4ec4/detect-agent.md#8-evidence-coverage-and-references).
