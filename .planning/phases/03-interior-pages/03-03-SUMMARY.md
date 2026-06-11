---
plan: 03-03
phase: 03-interior-pages
status: complete
completed: "2026-06-11"
---

# Plan 03-03: Work Page Slice

## What Was Built

Complete work page as a vertical slice: translation keys in all 3 locales, WorkCard (EV Fleet), GhostCard (placeholder), and work/page.tsx.

## Key Files Created

- `components/work/WorkCard.tsx` — async server component with Live badge (ev-teal), 3 grid-violet tags (Fleet/EV/Operations), expanded 2-sentence description
- `components/work/GhostCard.tsx` — dashed-border placeholder with "Coming soon" text, no hover, cursor-default
- `app/[locale]/work/page.tsx` — work page route, 3-col lg / 2-col md grid layout

## Key Files Modified

- `messages/en.json` — added `work.pageEyebrow`, `work.pageSub`, `work.evFleetExpandedDesc`, `work.evFleetTag1/2/3`
- `messages/id.json` — translated matching keys
- `messages/zh.json` — translated matching keys

## Decisions Made

- WorkCard renders two paragraphs: evFleetDesc (opening) + evFleetExpandedDesc (scale/integration detail)
- GhostCard uses static text (no translation) per CONTEXT.md specifics
- Work page ends with the cards grid — no FooterCTA per UI-SPEC

## Self-Check: PASSED

- /en/work, /id/work, /zh/work emit in build ✓
- WorkCard has Live badge (bg-ev-teal/10 text-ev-teal) ✓
- WorkCard has 3 tag pills Fleet/EV/Operations ✓
- WorkCard title uses text-base font-bold ✓
- GhostCard has border-dashed and cursor-default ✓
- 2 GhostCards alongside WorkCard in grid ✓
- npm run build exits 0 ✓
