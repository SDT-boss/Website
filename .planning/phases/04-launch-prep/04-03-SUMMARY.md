---
phase: 04-launch-prep
plan: "03"
subsystem: ui
tags: [nextjs, metadata, seo, title, description, generateMetadata]

# Dependency graph
requires:
  - phase: 04-launch-prep/04-02
    provides: Root layout title.template "%s — SDT tech" and openGraph defaults inherited by all child pages
provides:
  - Per-page title and description metadata on all 5 routes (home, solutions index, solution detail, work, about)
  - Home page title.absolute bypasses template — renders "SDT tech — Infrastructure for intelligent operations."
  - Solution detail generateMetadata with slugMeta lookup — unique title/description per slug
affects: [04-05-vercel-deploy]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Per-page metadata: set only title + description — never openGraph — to inherit root OG image via shallow merge"
    - "title.absolute on home page bypasses the root title.template ('%s — SDT tech')"
    - "generateMetadata with await params for dynamic slug-keyed metadata on static export"
    - "slugMeta lookup table: Record<string, {title, description}> defined above generateMetadata"

key-files:
  created: []
  modified:
    - app/[locale]/page.tsx
    - app/[locale]/solutions/page.tsx
    - app/[locale]/work/page.tsx
    - app/[locale]/about/page.tsx
    - app/[locale]/solutions/[slug]/page.tsx

key-decisions:
  - "Used title.absolute on home page to avoid doubling the brand suffix (would otherwise render 'SDT tech — Infrastructure for intelligent operations. — SDT tech')"
  - "slugMeta is a module-level const (not inside generateMetadata) for clarity and to avoid object recreation on each call"
  - "generateMetadata returns {} (empty object) for unknown slugs rather than throwing — unknown slugs hit notFound() in the default export anyway"

patterns-established:
  - "Pattern: Per-page metadata exports only set title + description; openGraph is never set at page level"
  - "Pattern: Dynamic metadata via generateMetadata awaits params — required for Next.js 14 App Router static export"

requirements-completed: [LAUNCH-03]

# Metrics
duration: 12min
completed: 2026-06-12
---

# Phase 4 Plan 03: Per-Page Metadata Summary

**Unique title and description metadata added to all 5 routes — home uses title.absolute, solution detail uses generateMetadata with inline slugMeta lookup, 3 static pages use export const metadata**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-06-12T10:35:00Z
- **Completed:** 2026-06-12T11:47:06Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Home page (`app/[locale]/page.tsx`) now has `title.absolute` — browser tab shows "SDT tech — Infrastructure for intelligent operations." without the template suffix doubling
- Solutions index, Work, and About pages have `export const metadata` with distinct title strings and content-specific descriptions
- Solution detail page has `export async function generateMetadata` with a 4-entry `slugMeta` lookup table — each of fleet-mobility, iot-hardware, logistics-intelligence, and ai-operations gets its own unique title and description
- Zero page-level metadata objects set `openGraph` — inherited OG image from root layout is fully preserved
- `npm run build` passes: Compiled successfully, 31 static pages generated

## Task Commits

Each task was committed atomically:

1. **Task 1: Add static metadata to home, solutions, work, and about pages** - `1680c46` (feat)
2. **Task 2: Add generateMetadata to solution detail page with slug lookup table** - `64528c3` (feat)

**Plan metadata:** (docs commit follows SUMMARY creation)

## Files Created/Modified
- `app/[locale]/page.tsx` - Added `Metadata` import + `export const metadata` with `title.absolute` and description
- `app/[locale]/solutions/page.tsx` - Added `Metadata` import + `export const metadata` title "Solutions" + description
- `app/[locale]/work/page.tsx` - Added `Metadata` import + `export const metadata` title "Work" + description
- `app/[locale]/about/page.tsx` - Added `Metadata` import + `export const metadata` title "About" + description
- `app/[locale]/solutions/[slug]/page.tsx` - Added `Metadata` import + `slugMeta` lookup table + `export async function generateMetadata`

## Decisions Made
- Used `title.absolute` on the home page because the root layout sets `title.template: "%s — SDT tech"`. Without `absolute`, the home title would render "SDT tech — Infrastructure for intelligent operations. — SDT tech" — the template suffix would be appended to an already-suffixed string.
- Placed `slugMeta` as a module-level const above `generateMetadata` rather than inside it. This avoids recreating the object on every metadata call and keeps the function body clean.
- `generateMetadata` returns `{}` for unrecognised slugs. Unknown slugs are caught by `notFound()` in the default export component, so the metadata fallback is only a safety net and will never render in production.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Rebase onto main before editing page files**
- **Found during:** Task 1 setup
- **Issue:** Worktree was branched from commit `725a5e7` (Phase 3 docs commit), before Phase 3 page content (solutions, work, about, solution detail) and Phase 4 Wave 1 (root layout metadata, favicon, OG image) were merged to main. The page files did not exist in the worktree.
- **Fix:** Ran `git rebase main` — rebased successfully onto `5eb0631`, bringing in all Phase 3 page files and Phase 4 Wave 1 changes. Worktree remained on `worktree-agent-adb0db56f70707b29` branch after rebase.
- **Files modified:** None (rebase only); existing files were made available
- **Verification:** `find app -name "*.tsx"` confirmed all 5 target page files present; `git rev-parse --abbrev-ref HEAD` confirmed still on agent branch
- **Committed in:** Not a separate commit — rebase is a structural setup step; task commits follow

---

**Total deviations:** 1 auto-fixed (1 blocking setup issue)
**Impact on plan:** Necessary setup step. No scope change. All plan-specified metadata values applied exactly as specified.

## Issues Encountered
None after rebase. All metadata exports applied cleanly and build passed on first attempt.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 5 routes now have distinct titles and descriptions — ready for Vercel deploy verification (Plan 04-05)
- Plan 04-04 (SEO files + 404) can proceed independently — it does not depend on per-page metadata
- The metadata inheritance chain is complete: root layout (metadataBase + OG + twitter + template) → per-page (title + description only)
- Critical invariant maintained: no page-level metadata sets openGraph — the root layout OG image is inherited by all pages

---
*Phase: 04-launch-prep*
*Completed: 2026-06-12*

## Self-Check: PASSED

- app/[locale]/page.tsx: FOUND — contains title.absolute
- app/[locale]/solutions/page.tsx: FOUND — contains export const metadata
- app/[locale]/work/page.tsx: FOUND — contains export const metadata
- app/[locale]/about/page.tsx: FOUND — contains export const metadata
- app/[locale]/solutions/[slug]/page.tsx: FOUND — contains export async function generateMetadata
- slugMeta with all 4 slugs: FOUND
- await params pattern: FOUND (2 occurrences — generateMetadata + default export)
- openGraph in any of 5 files: NOT FOUND — GOOD
- npm run build: PASSED (Compiled successfully, 31 static pages generated)
- Task 1 commit 1680c46: FOUND
- Task 2 commit 64528c3: FOUND
