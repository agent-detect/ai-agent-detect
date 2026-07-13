# qwen-code

Alibaba's fork of Gemini CLI (TypeScript). Source-audited 2026-07-12.

## Identity signals (what a child process sees)

- `QWEN_CODE=1` — renamed from Gemini's flag (zero GEMINI_CLI hits in the
  fork); set on every shell child, background monitor, and hook runner.
  [source: shellExecutionService.ts:723,1426; monitor.ts:369]
- `QWEN_CODE_SESSION_ID` + `QWEN_CODE_AGENT_ID` + `QWEN_CODE_PROMPT_ID` —
  the session family; **_AGENT_ID/_PROMPT_ID are ALWAYS set, empty-string
  when absent, deliberately overwriting inherited stale values** — the only
  anti-nested-contamination design surveyed. [source: shellContextEnv.ts:41-55]
- Monitor sets TERM=dumb. Optional TRACEPARENT/TRACESTATE. No AI_AGENT, no
  AGENT, no version var on children.

## Context files & config

- Default context: `QWEN.md` first, then `AGENTS.md` (both in the default
  discovery list; QWEN.md first for backward compat). [source: memory/const.ts]
- Dirs: `~/.qwen` global, `.qwen` project. [source: storage.ts]
- Skills: `SKILL_PROVIDER_CONFIG_DIRS = ['.qwen', '.agents']` → native
  `.agents/skills` reader. [source: storage.ts:17,424-427]

## Headless

- `-p/--prompt` one-shot; `--prompt-interactive`; `--json-schema`
  (headless-only). Inherits Gemini CLI's shape.

## Meta

- Vendor: Alibaba · repo: github.com/QwenLM/qwen-code · detector shipped
  (source tier). Probe TODO: live env snapshot.
