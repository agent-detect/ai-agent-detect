# grok-build

SpaceXAI's coding agent harness and TUI. Fullscreen, mouse interactive, extensible. [Official source](https://github.com/xai-org/grok-build).

## Identity signals

- `GROK_AGENT` equals `1` OR non-empty `GROK_PLUGIN_ROOT` OR non-empty `GROK_PLUGIN_DATA`.

[Published producer path](https://github.com/xai-org/grok-build/blob/2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8/crates/codegen/xai-grok-tools/src/computer/local/terminal.rs#L3315-L3323). The terminal launcher writes GROK_AGENT=1. GROK_AGENT has agent-selector uses elsewhere, so this alternative requires exactly 1; plugin-root/data markers are non-empty alternatives. Grok Build is distinct from Grok Bot.

[Evidence and scope](https://github.com/ai-shifu/detect-agent/blob/8fa5e943e134d97bb92397ca0e0181a8c42f4ec4/detect-agent.md#8-evidence-coverage-and-references).
