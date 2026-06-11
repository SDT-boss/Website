---
plan: 03-02
phase: 03-interior-pages
status: complete
completed: "2026-06-11"
---

# Plan 03-02: Solutions Index Slice

## What Was Built

Complete solutions index page as a vertical slice: translation keys in all 3 locales, PageHero shared component, SolutionsGrid component, and solutions/page.tsx.

## Key Files Created

- `components/PageHero.tsx` — shared interior page hero (eyebrow + H1 + optional sub), synchronous, no dot-grid
- `components/solutions/SolutionsGrid.tsx` — 2-col grid of 4 linked SolutionCards using `lib/solutions` array
- `app/[locale]/solutions/page.tsx` — solutions index route with generateStaticParams for 3 locales

## Key Files Modified

- `messages/en.json` — added `solutions.pageEyebrow`, `solutions.pageSub`, and 4 slug sub-objects
- `messages/id.json` — translated matching keys
- `messages/zh.json` — translated matching keys

## Decisions Made

- SolutionsGrid wraps each SolutionCard in `<Link href="/solutions/{slug}">` from `@/i18n/navigation`
- 2-column grid on sm+ per UI-SPEC (not 4-col like the home SolutionsStrip)
- Template literal translation key lookup with type cast to satisfy next-intl strict typing
- FooterCTA reused as-is (cyber-jade outline button per UI-SPEC)

## Self-Check: PASSED

- /en/solutions, /id/solutions, /zh/solutions emit in build ✓
- 4 linked SolutionCards render ✓
- PageHero component reusable by work and about pages ✓
- Link from @/i18n/navigation (not next/link) ✓
- npm run build exits 0 ✓
- Existing card1Title keys untouched ✓
