# deepseek-harness

DeepSeek Harness: Everything is a Plugin. [Official source](https://github.com/deepseek-ai/deepseek-harness).

## Identity signals

- Non-empty `DSH_SHELL` is documented for model shell calls in the [producer shell environment](https://github.com/deepseek-ai/deepseek-harness/blob/ce7073d51254c26cd63b22a60835b8f948deb447/packages/shell/shell-env/README.md). `DSH_HOME` is configuration and session metadata alone is insufficient. The marker can be inherited and does not authenticate the caller.

[Evidence and scope](https://github.com/ai-shifu/detect-agent/blob/8fa5e943e134d97bb92397ca0e0181a8c42f4ec4/detect-agent.md#8-evidence-coverage-and-references).
