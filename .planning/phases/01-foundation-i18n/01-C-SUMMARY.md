---
plan: 01-C
phase: 01-foundation-i18n
status: complete
completed: 2026-06-10
commits:
  - 3bfd9ab feat(01-C): convert root page to /en redirect and create locale scaffold page
  - 18201e3 feat(01-C): create locale not-found page and add language switcher to Navbar
  - 0273945 fix(01-C): add setRequestLocale for next-intl v4 static export compatibility
---

# Plan 01-C Summary — i18n Routing Wiring

## What Was Built

All i18n routing is wired end-to-end. Three locale routes (`/en`, `/id`, `/zh`) generate static HTML. The language switcher appears in the Navbar on desktop.

## Key Files Created/Modified

- **`app/page.tsx`** — replaced scaffold placeholder with `redirect("/en")` per D-01
- **`app/[locale]/page.tsx`** — async scaffold page accepting `Promise<{locale}> params`, calls `setRequestLocale`
- **`app/[locale]/not-found.tsx`** — branded 404 (static Server Component, no headers/cookies/redirect)
- **`components/Navbar.tsx`** — EN|ID|ZH language switcher pills added after "Get in touch", hidden on mobile

## Deviation: next-intl v4 Static Rendering

Plan B installed next-intl v4.13.0 (latest stable) rather than the v3.x patterns in PATTERNS.md. In v4, `requestLocale` in `getRequestConfig` reads HTTP headers during static generation, causing `NEXT_STATIC_GEN_BAILOUT` errors. Fix: added `setRequestLocale(locale)` in both `app/[locale]/layout.tsx` and `app/[locale]/page.tsx` before any next-intl calls. This is the correct v4 static rendering pattern — sets locale in async-local-storage so `requestLocale` resolves without headers.

## Build Result

```
✓ Generating static pages (7/7)
Route /[locale] → /en, /id, /zh (SSG — static HTML)
Route / → static redirect to /en
```

`npm run build` exits 0. All 7 static pages generated.

## Human Checkpoint

The following items require manual browser verification before Phase 1 can be marked complete:

1. `http://localhost:3000/` → redirects to `http://localhost:3000/en/`
2. `http://localhost:3000/en` → shows "— scaffold ready —" without 404
3. `http://localhost:3000/id` → shows scaffold without 404
4. `http://localhost:3000/zh` → shows scaffold without 404
5. Navbar shows "SDT tech" (not "YourCo tech")
6. EN | ID | ZH pills visible on desktop to the right of "Get in touch"
7. Clicking ID navigates to `/id/`
8. Browser tab reads "SDT tech"
9. Footer tagline reads "Infrastructure for intelligent operations."

## Self-Check: PASSED

- [x] `app/page.tsx` redirects to `/en`
- [x] `app/[locale]/page.tsx` exists, async, awaits params
- [x] `app/[locale]/not-found.tsx` — no `'use client'`, no server-only APIs
- [x] Navbar language switcher present with correct hrefs and styling
- [x] `npm run build` exits 0 — all three locale routes generate static HTML
