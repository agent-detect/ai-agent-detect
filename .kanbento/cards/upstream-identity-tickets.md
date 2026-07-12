---
kanbento_id: 83c6a525-c8a7-4494-a407-46d3f5c51946
title: upstream identity tickets — for each vendor, find (or file) the ticket asking the harness to set an identity env var; track status per harness
---
grok (added 2026-07-12, probed): no identity var at all AND passes inherited AI_AGENT through — we'd file with xAI: set AGENT=grok (or GROK=1) and override inherited AI_AGENT rather than propagate it. Strongest ticket of the set — we hold live probe evidence for both defects (harness:grok).
