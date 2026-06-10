---
phase: 01-foundation-i18n
plan: B
subsystem: i18n
tags: [next-intl, i18n, routing, static-export, translations, typescript]

# Dependency graph
requires: []
provides:
  - next-intl v4.13.0 installed with static-export-compatible configuration
  - i18n/routing.ts defining locales [en, id, zh] with en as default
  - i18n/request.ts using getRequestConfig (no middleware, static export compatible)
  - messages/en.json with real English content across nav/home/solutions/work/about/footer/common namespaces
  - messages/id.json as Indonesian auto-translated scaffold (_reviewNote first key)
  - messages/zh.json as Chinese auto-translated scaffold (_reviewNote first key)
  - app/[locale]/layout.tsx with NextIntlClientProvider, generateStaticParams, dynamicParams=false
affects: [02-home-navigation, 03-interior-pages, 04-launch-prep]

# Tech tracking
tech-stack:
  added: [next-intl v4.13.0]
  patterns:
    - Static export i18n routing via i18n/routing.ts + i18n/request.ts (no middleware)
    - Locale layout wrapping children in NextIntlClientProvider
    - generateStaticParams + dynamicParams=false for static locale enumeration
    - Flat namespace message files per locale (nav/home/solutions/work/about/footer/common)
    - _reviewNote first key in non-English files to signal human review required

key-files:
  created:
    - i18n/routing.ts
    - i18n/request.ts
    - messages/en.json
    - messages/id.json
    - messages/zh.json
    - app/[locale]/layout.tsx
  modified:
    - next.config.mjs
    - package.json
    - package-lock.json

key-decisions:
  - "Used next-intl v4.13.0 (latest stable — npm resolved v4 not v3 as plan suggested; v4 has same static export API surface)"
  - "No middleware — i18n/request.ts uses getRequestConfig; required for output: 'export' compatibility"
  - "params typed as Promise<{ locale: string }> and awaited — Next.js 14+ requirement"
  - "Translation scaffold for id.json and zh.json marked with _reviewNote as first key"

patterns-established:
  - "i18n routing: import { routing } from '@/i18n/routing' to access locale list"
  - "i18n messages: useTranslations('namespace') in client components; getTranslations('namespace') in server components"
  - "Locale layout: app/[locale]/layout.tsx wraps NextIntlClientProvider — root layout retains html/body/Navbar/Footer"
  - "Message key schema: en.json is canonical; id.json and zh.json must match all keys (excluding _reviewNote)"

requirements-completed: [I18N-01, I18N-02, I18N-04]

# Metrics
duration: 25min
completed: 2026-06-10
---

# Phase 1 Plan B: i18n Infrastructure Summary

**next-intl v4 static routing infrastructure with locale layout, three translation files, and no-middleware request config compatible with Next.js output: "export"**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-06-10T17:35:00Z
- **Completed:** 2026-06-10T18:00:00Z
- **Tasks:** 3
- **Files modified/created:** 9

## Accomplishments

- next-intl v4.13.0 installed; next.config.mjs wrapped with createNextIntlPlugin pointing at i18n/request.ts
- Complete i18n routing infrastructure: defineRouting (en/id/zh, default en) + getRequestConfig for static export (no middleware)
- Three translation files with matching key schema: en.json (real content), id.json and zh.json (auto-translated scaffolds with _reviewNote first key)
- app/[locale]/layout.tsx wraps NextIntlClientProvider; exports generateStaticParams returning all three locales; dynamicParams=false

## Task Commits

Each task was committed atomically:

1. **Task 1: Install next-intl and update next.config.mjs** - `4bda6a2` (chore)
2. **Task 2: Create i18n config files and translation messages** - `92a51a8` (feat)
3. **Task 3: Create app/[locale]/layout.tsx with NextIntlClientProvider** - `bc183bf` (feat)

## Files Created/Modified

- `next.config.mjs` - Added createNextIntlPlugin wrapper; preserved output: "export", trailingSlash, images config
- `package.json` - Added next-intl ^4.13.0 to dependencies
- `package-lock.json` - Updated with next-intl and transitive dependencies
- `i18n/routing.ts` - defineRouting with locales: ["en", "id", "zh"], defaultLocale: "en"
- `i18n/request.ts` - getRequestConfig with requestLocale guard, dynamic JSON import for messages
- `messages/en.json` - Real English content: nav (4 keys), home (3 keys), solutions/work/about (pageTitle), footer (2 keys), common.status (2 keys)
- `messages/id.json` - Indonesian scaffold with _reviewNote as first key; all content namespaces match en.json
- `messages/zh.json` - Chinese Simplified scaffold with _reviewNote as first key; all content namespaces match en.json
- `app/[locale]/layout.tsx` - NextIntlClientProvider wrapper; generateStaticParams (en/id/zh); dynamicParams=false; async with await params

## Decisions Made

- **next-intl v4 vs v3:** npm resolved v4.13.0 (latest stable) rather than v3.x as the plan suggested. v4 has the same static export API surface (defineRouting, getRequestConfig, NextIntlClientProvider, getMessages are all present and identical). Proceeded with v4.
- **No middleware:** Confirmed i18n/request.ts pattern without middleware.ts — required for output: "export" since Next.js Middleware is not supported in static export mode.
- **Translation scaffold approach:** id.json and zh.json use auto-translated content from PATTERNS.md. _reviewNote placed as first key in both files to signal human review required before launch (per D-09).
- **params awaiting:** LocaleLayout is async and awaits params as `Promise<{ locale: string }>` per Next.js 14+ contract.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Re-committed Task 1 changes to worktree branch**
- **Found during:** Post-task verification
- **Issue:** Task 1 commit (`04bc2c2`) landed on `main` branch because the worktree HEAD check reset to `b5a7df3` but the branch at that point was `main`. Tasks 2 and 3 committed correctly on the worktree branch. The working tree had correct next.config.mjs content but it was not committed on the worktree branch.
- **Fix:** Staged next.config.mjs, package.json (with next-intl entry added), and copied updated package-lock.json from project root to worktree; committed as `4bda6a2` on the worktree branch.
- **Files modified:** next.config.mjs, package.json, package-lock.json
- **Verification:** git log confirms all three task commits on worktree branch; TypeScript noEmit passes
- **Committed in:** `4bda6a2` (Task 1 proper commit on worktree branch)

---

**Total deviations:** 1 auto-fixed (Rule 1 - git branch targeting issue)
**Impact on plan:** All content correct; deviation was administrative (branch targeting), not a code correctness issue. No scope creep.

## Issues Encountered

- Initial `npm install next-intl` ran in the project root (correct) but the first Task 1 commit went to `main` rather than the worktree branch. Discovered during post-task verification by checking `git log --all --oneline --decorate`. Fixed by re-committing Task 1 changes on the worktree branch.

## Known Stubs

- `messages/id.json` and `messages/zh.json` are machine-translated scaffolds. All translation values are auto-generated and require human review before launch. Marked with `_reviewNote` as first key. Will be reviewed during Phase 4 (Launch Prep) or earlier when pages are content-reviewed.

## Threat Flags

None — all new surface is developer-authored JSON translation files rendered as React text nodes (not innerHTML). next-intl is a well-known package (2M+ weekly downloads). No new network endpoints, auth paths, or trust boundary crossings introduced.

## Self-Check

- `i18n/routing.ts` exists: FOUND
- `i18n/request.ts` exists: FOUND
- `messages/en.json` exists: FOUND
- `messages/id.json` exists: FOUND
- `messages/zh.json` exists: FOUND
- `app/[locale]/layout.tsx` exists: FOUND
- `next.config.mjs` contains createNextIntlPlugin: FOUND
- Commits `4bda6a2`, `92a51a8`, `bc183bf` on worktree branch: FOUND

## Self-Check: PASSED

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- i18n infrastructure is complete. Plan C (locale page migration) can now create `app/[locale]/page.tsx` and redirect `app/page.tsx` to `/en`.
- Phase 2 (Home & Navigation) can use `useTranslations('nav')` and `useTranslations('home')` in client components; translation keys are ready.
- Language switcher in Navbar (I18N-03) is Phase 2 — the locale URLs /en, /id, /zh are now valid static routes.
- id.json and zh.json are scaffolded but need human review before public launch (Phase 4).

---
*Phase: 01-foundation-i18n*
*Completed: 2026-06-10*
