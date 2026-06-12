---
phase: 04-launch-prep
plan: "02"
subsystem: ui
tags: [nextjs, metadata, seo, og, twitter-card, metadata-base]

# Dependency graph
requires:
  - phase: 04-launch-prep/04-01
    provides: public/og.png at /og.png which is referenced by openGraph.images
provides:
  - Root layout metadataBase resolving all relative URLs to https://sdt.technology
  - Site-wide openGraph defaults (og.png 1200x630) inherited by all child pages
  - twitter.card summary_large_image inherited by all child pages
  - title.template "%s — SDT tech" applied to all child page titles
affects: [04-03-per-page-metadata, 04-04-seo-files]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Root layout metadata: metadataBase + openGraph + twitter + title.template as single source of SEO defaults"
    - "Shallow metadata merge: child pages set only title/description — never openGraph — to inherit root OG image"

key-files:
  created: []
  modified:
    - app/layout.tsx

key-decisions:
  - "Removed unused siteConfig import after confirming RootLayout component no longer references it — build was clean"
  - "Used hardcoded description string (longer than siteConfig.tagline) per plan spec — siteConfig.tagline retained in config/site.ts for other uses"

patterns-established:
  - "Pattern 1: Root layout holds metadataBase + OG defaults — child pages never set openGraph to avoid shallow-merge wipe"
  - "Pattern 2: title.template applies to per-page string titles; home page must use title.absolute to bypass it"

requirements-completed: [LAUNCH-02]

# Metrics
duration: 2min
completed: 2026-06-12
---

# Phase 4 Plan 02: Root Layout SEO Metadata Summary

**metadataBase, openGraph (og.png 1200x630), twitter.card summary_large_image, and title template wired into app/layout.tsx as site-wide inherited defaults**

## Performance

- **Duration:** 2 min
- **Started:** 2026-06-12T05:15:26Z
- **Completed:** 2026-06-12T05:17:27Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Replaced minimal 2-field metadata export with full SEO defaults in app/layout.tsx
- metadataBase set to https://sdt.technology — all relative URL paths resolve correctly for crawlers
- openGraph.images references /og.png (1200x630) — every page inherits OG image without per-page duplication
- twitter.card "summary_large_image" set — rich previews on Twitter/X for all pages
- title.template "%s — SDT tech" established — per-page metadata (Plan 04-03) only needs to set title string

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace root layout metadata with full site-wide SEO defaults** - `50f08a5` (feat)

**Plan metadata:** (below)

## Files Created/Modified
- `app/layout.tsx` - Replaced 2-field metadata export with full metadataBase + title.template + openGraph + twitter defaults; removed now-unused siteConfig import

## Decisions Made
- Removed unused siteConfig import after confirming it was only used in the old metadata export and is no longer referenced in the RootLayout component or anywhere else in the file. ESLint/TypeScript would flag the unused import; removing it keeps the build clean.
- Used the hardcoded description string from the plan spec rather than siteConfig.tagline because the description is intentionally longer than the tagline.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed unused siteConfig import**
- **Found during:** Task 1 (Replace root layout metadata)
- **Issue:** After replacing the metadata export, the `import { siteConfig } from "@/config/site"` became unused. The plan said to keep it "unless confirmed unused after reading the full file" — confirmed unused.
- **Fix:** Removed the unused import to prevent ESLint no-unused-vars warning and keep the build clean
- **Files modified:** app/layout.tsx
- **Verification:** npm run build passes with "Compiled successfully" and "Linting and checking validity of types" — no ESLint errors
- **Committed in:** 50f08a5 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 cleanup / Rule 1)
**Impact on plan:** Minor cleanup only. No scope change.

## Issues Encountered
None - the metadata export replaced cleanly and the build passed on first attempt.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Plan 04-03 (per-page metadata) can now proceed: child pages set only `title` and `description` and inherit metadataBase, openGraph, and twitter from this root layout
- Critical: per-page metadata must NOT set `openGraph` at all (shallow merge would wipe the root OG image) — only title + description per Pitfall 1 in RESEARCH.md
- Plan 04-01 (og.png creation) must complete before the OG image reference resolves at runtime

---
*Phase: 04-launch-prep*
*Completed: 2026-06-12*

## Self-Check: PASSED

- app/layout.tsx: FOUND
- .planning/phases/04-launch-prep/04-02-SUMMARY.md: FOUND
- Commit 50f08a5: FOUND
- metadataBase new URL("https://sdt.technology"): FOUND
- twitter.card "summary_large_image": FOUND
- title.template "%s — SDT tech": FOUND
- openGraph.images url "/og.png" 1200x630: FOUND
- npm run build: PASSED (Compiled successfully, Linting and type-checking passed, 29 static pages generated)
