# devin

Autonomous software engineer that works in cloud or local environments, tests changes and prepares pull requests. [Official source](https://devin.ai/).

## Identity signals

- non-empty `DEVIN_DIR` OR non-empty `DEVIN_DISABLE_HISTEXPAND`.

Redacted observation of Devin agent command execution on a Linux cloud VM (2026-10-31). DEVIN_DIR is assigned by non-interactive bash startup; DEVIN_DISABLE_HISTEXPAND arrives in the command environment. Neither name was present in a fresh login shell or inspected global profiles/service environments. This does not establish Outposts, other operating systems, interfaces or human terminals.

The existing `/opt/.devin` disk hint remains available as `filesTells`; it is separate from environment detection.

[Evidence and scope](https://github.com/ai-shifu/detect-agent/blob/8fa5e943e134d97bb92397ca0e0181a8c42f4ec4/detect-agent.md#8-evidence-coverage-and-references).
