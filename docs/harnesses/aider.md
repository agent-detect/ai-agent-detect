# aider

The original terminal pair-programmer (Python). Source-audited 2026-07-12.

## Identity signals (what a child process sees)

- No deliberate marker. But: `OR_SITE_URL=https://aider.chat` +
  `OR_APP_NAME=Aider` — OpenRouter attribution vars written to os.environ
  AT IMPORT TIME (aider/llm.py:9-13), inherited by every /run and /! child
  (run_cmd.py spawns with no env override). The defining case of the
  **accidental fingerprint** signal class — reliable in practice, not
  identity by intent, confidence capped medium.
- /git subprocess gets GIT_EDITOR=true. AIDER_* is a READ prefix
  (auto_env_var_prefix for config), not set on children. No version var.

## Context files & config

- **No automatic AGENTS.md/CONVENTIONS.md loading** — CONVENTIONS.md is a
  documented manual pattern via --read. Auto-loads .env files (cwd, git
  root, home) and honors .aiderignore.
- Config: .aider.conf.yml (cwd → git root → ~); global ~/.aider/ (caches);
  .aider.model.settings.yml, .aider.input.history.
- Skills: none.

## Headless

- `aider --message/-m` one-shot; --yes-always for auto-approve.

## Meta

- Vendor: Aider-AI · repo: github.com/Aider-AI/aider · detector shipped
  (source tier). Probe TODO: live snapshot; watch whether the OR_* vars
  survive an OpenRouter-config refactor — classic accidental-signal risk.
