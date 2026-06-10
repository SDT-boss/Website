---
phase: 02-home-navigation
plan: 01
subsystem: ui
tags: [next-intl, navbar, i18n, navigation, client-component, accessibility, hamburger-menu]

# Dependency graph
requires:
  - phase: 01-foundation-i18n
    provides: next-intl installed, i18n/routing.ts with defineRouting, app/[locale]/layout.tsx with NextIntlClientProvider, setRequestLocale already wired

provides:
  - i18n/navigation.ts — createNavigation wrapper exporting locale-aware Link, redirect, usePathname, useRouter
  - components/Navbar.tsx — Client Component with active state, hamburger, focus management, path-preserving language switcher
  - app/[locale]/layout.tsx — updated to include Navbar + Footer inside NextIntlClientProvider context
  - app/layout.tsx — simplified to HTML shell only (Navbar/Footer moved to locale layout)

affects: [02-02-home-sections, all future pages using Navbar or locale-aware navigation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "createNavigation(routing) wrapper in i18n/navigation.ts — all client components import usePathname/useRouter from here, not from next/navigation"
    - "Client Component Navbar with usePathname for active-state detection"
    - "Fragment-keyed .map() pattern for language switcher (named Fragment import, not bare <>)"
    - "router.replace(pathname, {locale}) for path-preserving locale switching"
    - "Navbar + Footer rendered inside NextIntlClientProvider scope (locale layout, not root layout)"

key-files:
  created:
    - i18n/navigation.ts
  modified:
    - components/Navbar.tsx
    - app/[locale]/layout.tsx
    - app/layout.tsx

key-decisions:
  - "Moved Navbar+Footer from root layout (app/layout.tsx) into locale layout (app/[locale]/layout.tsx) so that next-intl's usePathname/useLocale hooks have NextIntlClientProvider context during SSR"
  - "usePathname and useRouter must always be imported from @/i18n/navigation (not next/navigation) to get locale-stripped paths"
  - "Fragment named import (not bare <>) required for keyed .map() in language switcher"

patterns-established:
  - "Pattern: All client hooks needing locale context must be in components rendered inside NextIntlClientProvider"
  - "Pattern: i18n/navigation.ts is the single source for locale-aware navigation primitives"
  - "Pattern: Active nav state via isActive() helper comparing usePathname() result (locale-stripped)"

requirements-completed: [NAV-01, NAV-02]

# Metrics
duration: 30min
completed: 2026-06-10
---

# Phase 02 Plan 01: Navigation Foundation Summary

**Locale-aware Navbar as a Client Component with active-state detection, 44px hamburger menu, Escape-key focus management, and path-preserving language switcher via router.replace — all backed by i18n/navigation.ts createNavigation wrapper**

## Performance

- **Duration:** ~30 min
- **Started:** 2026-06-10
- **Completed:** 2026-06-10
- **Tasks:** 3 (Task 1: navigation.ts, Task 2: verify layout, Task 3: Navbar rewrite)
- **Files modified:** 4

## Accomplishments

- Created `i18n/navigation.ts` — single source of locale-aware Link, redirect, usePathname, useRouter (strips locale prefix so pathname is "/solutions" not "/en/solutions")
- Refactored `components/Navbar.tsx` to Client Component with: active-state cyber-jade underline + aria-current="page", 44x44px hamburger button with aria-expanded/controls, Escape key focus return, mobile menu with focus management, Fragment-keyed language switcher using router.replace
- Fixed build breakage by moving Navbar+Footer from root layout into the locale layout where NextIntlClientProvider context is available

## Task Commits

Each task was committed atomically:

1. **Task 1: Create i18n/navigation.ts** - `63b943f` (feat)
2. **Task 3: Refactor Navbar.tsx** - `c88a566` (feat) — includes Task 2 verification (no changes needed) and deviation fix

## Files Created/Modified

- `i18n/navigation.ts` — createNavigation wrapper; exports locale-aware Link, redirect, usePathname, useRouter
- `components/Navbar.tsx` — Client Component with active state, hamburger, language switcher, mobile menu
- `app/[locale]/layout.tsx` — Added Navbar + Footer imports; renders them inside NextIntlClientProvider
- `app/layout.tsx` — Simplified to HTML shell; Navbar/Footer moved to locale layout

## Decisions Made

- **Moved Navbar from root to locale layout:** The root `app/layout.tsx` renders before `NextIntlClientProvider` is available. After converting Navbar to use `usePathname` from `next-intl/navigation`, the build failed with a prerender error because hooks ran without provider context. Fix: move Navbar+Footer into `app/[locale]/layout.tsx` inside the provider.
- **Named Fragment import required:** `.map()` needs keyed fragments; bare `<>` cannot accept `key` prop. Always use `import { Fragment } from "react"` and `<Fragment key={...}>`.
- **router.replace vs Link for language switching:** Switching locale must preserve the current path. `router.replace(pathname, { locale })` achieves this; a plain `<Link href="/en">` would always go to the locale root.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Moved Navbar+Footer from root layout to locale layout**

- **Found during:** Task 3 (Navbar rewrite) — during `npm run build`
- **Issue:** After adding `"use client"` and `usePathname` from `next-intl/navigation`, Next.js static prerendering failed with `usePathname` error on `/en`, `/id`, `/zh`, `/_not-found`, and `/`. Root cause: `app/layout.tsx` renders `<Navbar />` before the `NextIntlClientProvider` provided by `app/[locale]/layout.tsx` is in scope. Even though Navbar is a Client Component, React runs it server-side during SSR/static generation, and the hook fails without context.
- **Fix:** Removed `<Navbar />` and `<Footer />` from `app/layout.tsx` and added them inside `app/[locale]/layout.tsx` within the `<NextIntlClientProvider>` wrapper. Root layout is now a minimal HTML shell.
- **Files modified:** `app/layout.tsx`, `app/[locale]/layout.tsx`
- **Verification:** `npm run build` exits 0; static pages generated for `/en`, `/id`, `/zh`
- **Committed in:** `c88a566` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Fix was necessary for correctness. The plan's intent (Navbar in the shell) is preserved — it just lives in the locale layout instead of the root layout. No scope creep.

## Issues Encountered

None beyond the blocking deviation documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `i18n/navigation.ts` is ready — Wave 2 home section components that need locale-aware links can `import { Link } from "@/i18n/navigation"`
- Navbar is stable with active state — Wave 2 pages (/solutions, /work, /about) will automatically get active highlighting when implemented
- Build is clean (lint 0, build 0, 8 static pages)

---
*Phase: 02-home-navigation*
*Completed: 2026-06-10*
