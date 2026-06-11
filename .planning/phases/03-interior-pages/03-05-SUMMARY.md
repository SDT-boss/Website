---
plan: 03-05
phase: 03-interior-pages
status: complete
completed: "2026-06-11"
---

# Plan 03-05: Solution Detail Slice

## What Was Built

All 4 solution detail pages in all 3 locales (12 static pages). Translation keys, 3 components, and the [slug] page with correct generateStaticParams and notFound guard.

## Key Files Created

- `components/solutions/SolutionDetailHero.tsx` — status badge (ev-teal/amber), H1, problem statement; synchronous, accepts props
- `components/solutions/WhoThisIsFor.tsx` — left-bordered cyber-jade callout block
- `components/solutions/CapabilityList.tsx` — numbered capability items, text-base font-bold titles, cyber-jade/20 accents
- `app/[locale]/solutions/[slug]/page.tsx` — generateStaticParams covers all 12 combinations; dynamicParams=false; notFound guard

## Key Files Modified

- `messages/en.json` — added problemStatement, whoThisIsFor, capability1-3 Title/Body to all 4 slug sub-objects
- `messages/id.json` / `messages/zh.json` — translated matching keys

## Decisions Made

- Used `getTranslations("solutions")` + template literal key with type cast (`\`${slug}.${key}\` as SKey`) rather than `getTranslations(\`solutions.${slug}\`)` to avoid hyphenated namespace issues
- Content order locked: SolutionDetailHero → WhoThisIsFor → CapabilityList → FooterCTA (SOL-04)
- fleet-mobility = ev-teal Live badge; iot-hardware/logistics-intelligence/ai-operations = amber In Development

## Self-Check: PASSED

- All 12 slug×locale combinations emit in build ✓
- dynamicParams = false ✓
- notFound() guard present ✓
- SolutionDetailHero ev-teal for live, amber for in-development ✓
- WhoThisIsFor has border-l-2 border-cyber-jade ✓
- CapabilityList H3 uses text-base font-bold ✓
- Content order: Hero → WhoThisIsFor → CapabilityList → FooterCTA ✓
- npm run build exits 0 (29 pages) ✓
