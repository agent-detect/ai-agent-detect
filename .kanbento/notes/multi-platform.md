---
kanbento_id: 43aa1c1c-01b6-4afb-8cbe-156b0dd338af
title: Multi-platform direction — one detection commons (registry+fixtures as JSON), thin language ports; decided — dedicated repos in a GH org, ua-parser model
refs:
  about:
    - note:design
revised: 2026-07-12
---
# Multi-platform direction — one detection commons, many language ports

Future direction (George + session, 2026-07-12): cover Python and possibly
more platforms. Pros: larger addressable audience, more stars. Cons weighed
and deferred — see sequencing.

## The precedent

Browser detection solved exactly this: **ua-parser** is a language-neutral
core (spec + `regexes.yaml`) with thin per-language implementations under one
org. Our shape is better positioned still: the entire detection surface is
environment variables, which are language-independent by nature. `AI_AGENT`
reads the same from JS, Python, Go, or a shell script.

## What ports and what doesn't

- **Language-neutral (the commons):** registry entries, capability data, env
  fixtures, the `AI_AGENT` grammar, probe provenance dates. Stored as JSON at
  repo root (`registry/`, `fixtures/`) — a design principle from day one.
- **Per-language (the cost):** detector code and the process-tree walk.
  An earlier sketch here proposed data-driven condition rules for the
  simple 80% — **retracted (George, 2026-07-12): no rules engine.** The
  ecosystem is wild west (per-path signal coverage, AI_AGENT value
  dialects, inherited-signal contamination); declarative would be
  premature. So ports port code — accepted cost; the detectors are small
  functions over an env map, mechanical to translate, and the shared
  fixture corpus verifies every port against the same evidence.

## Repo shape: DECIDED — dedicated repos inside a GitHub org

**Decision (George, 2026-07-12): if we go multi-platform, dedicated repos
inside a GH org — a monorepo's mixed tooling reads as messy and loses
trust.** This is the ua-parser org model, and it is self-consistent with the
requirement stack: "tests/quality ⇒ trust" doesn't stop at code — a Python
dev landing in a repo full of pnpm workspace files reads it as not-for-me.
Per-language repos let each port be idiomatic (its ecosystem's CI, badges,
lockfiles, conventions) — each looks *native*, which is what earns trust in
each community.

npm / PyPI distribution decouples code location from the user contract
anyway — consumers see `npm i` / `pip install`, never the repo layout — so
the org split costs nothing on the consumption side.

What the org model costs, and ua-parser's answer: the shared fixture corpus
would fragment across repos. Answer — a **core/registry repo** in the org
holds the commons (registry JSON, fixtures, the AI_AGENT grammar spec,
capability data, probe dates); language repos consume it (vendored snapshot
leans simpler than submodule). A vendor PR lands once, in core; ports pull.
This also cleanly splits the two contributor types: vendor updates go to
core (no code knowledge needed — the 15-minute promise), code changes go to
the language repo.

Sequencing:

1. **Now** — single repo, JS only, data as JSON files at root. The JSON
   split *is* the future core repo, incubating in place.
2. **When Python is real** — create the GH org, extract `registry/` +
   `fixtures/` into the core repo, the JS repo becomes its first consumer,
   the Python repo starts native. Check `ai-agent-detect` GH-org name
   parity at that point.
3. Stars spread across the org rather than concentrating on one repo —
   accepted cost; ua-parser proves the org model compounds anyway.

Mini side effect: **backlinks.** Each repo carries its own board, so the
knowledge graph spans boards — the cross-board network case (`kanbento
network`) rather than one board's backlinks. The org becomes a live
multi-board network example — the same showcase move as the dotagents repo
carrying a root `.kanbento/`.

## Name status across ecosystems

PyPI: `ai-agent-detect`, `agent-detect`, `which-agent`, `unharness` all 404
(checked 2026-07-12). Caveat from the npm campaign: 404 ≠ claimable — only a
publish proves it; PyPI normalizes names (`ai_agent_detect` ≡
`ai-agent-detect`) but has no npm-style hyphen-similarity freeze. Claim
urgency lower than npm was: Vercel shipped JS-only, no PyPI race observed.
Open: whether to stub-claim on PyPI as insurance (George's call).

## Candidate platforms beyond Python

Go (CLI tooling world, single-binary agents), Rust (same), shell (a
`detect-agent.sh` one-liner sourced from the same registry JSON — cheap,
high-utility for scripts). Each is a consumer of the same commons; none
before JS v0 ships.
