---
phase: 04-launch-prep
plan: "04"
subsystem: seo-and-404
tags: [sitemap, robots-txt, not-found, seo, static-export]
dependency_graph:
  requires: [04-01]
  provides: [sitemap-xml, robots-txt, branded-404]
  affects:
    - public/sitemap.xml
    - public/robots.txt
    - app/not-found.tsx
    - app/[locale]/not-found.tsx
tech_stack:
  added: []
  patterns: [hand-authored-sitemap, next-not-found-file-convention]
key_files:
  created:
    - public/sitemap.xml
    - public/robots.txt
    - app/not-found.tsx
  modified:
    - app/[locale]/not-found.tsx
decisions:
  - "Hand-authored sitemap.xml over next-sitemap package — 24 URLs is trivially small; static XML works with static export and has no dependency overhead"
  - "app/not-found.tsx at root level catches paths outside [locale] segment — required because app/[locale]/not-found.tsx only handles locale-prefixed routes"
  - "LogoMark size={40} per UI-SPEC — matches the branded 404 visual spec gap-8 layout"
metrics:
  duration: "~4 minutes"
  completed: "2026-06-12T11:46:23Z"
  tasks_completed: 2
  files_created: 3
  files_modified: 1
---

# Phase 4 Plan 04: SEO Files + Branded 404 Summary

Hand-authored sitemap.xml with 24 locale-grouped URLs, permissive robots.txt, upgraded branded 404 page with LogoMark and corrected copy, and new root-level not-found.tsx for paths outside the locale segment.

## What Was Built

| Artifact | Path | Details |
|----------|------|---------|
| Sitemap | `public/sitemap.xml` | 24 URLs across 3 locales (en/id/zh), all with trailing slashes, priority grouping per spec |
| Robots | `public/robots.txt` | 3 lines: User-agent *, Allow: /, Sitemap reference |
| Root 404 | `app/not-found.tsx` | New file — catches paths outside [locale] segment (e.g., /invalid-path) |
| Locale 404 | `app/[locale]/not-found.tsx` | Upgraded stub: LogoMark + gap-8 + Page not found h1 + corrected body + Back to home link |

The sitemap groups URLs by priority: home (1.0), solutions index (0.9), 4 solution slugs × 3 locales (0.8), work × 3 locales (0.8), about × 3 locales (0.7). Every `<loc>` entry uses a trailing slash matching `trailingSlash: true` in next.config.mjs.

The 404 pages use the identical visual spec: LogoMark at size={40}, font-mono "404" error code, "Page not found" h1, corrected body copy "The URL you followed doesn't exist or has moved.", and "Back to home" link in cyber-jade. No Volt Green (no primary CTA on error pages). No box shadows.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create public/sitemap.xml and public/robots.txt | 550f47c | public/sitemap.xml, public/robots.txt |
| 2 | Upgrade locale not-found and create root not-found | 50a8789 | app/[locale]/not-found.tsx, app/not-found.tsx |

## Verification

All success criteria met:

- `grep -c '<loc>' public/sitemap.xml` outputs 24
- All loc entries end with trailing slash (0 entries without trailing slash)
- `public/robots.txt` contains "Sitemap: https://sdt.technology/sitemap.xml"
- `app/not-found.tsx` exists with LogoMark import
- `app/[locale]/not-found.tsx` contains "Page not found" and "Back to home"
- `npm run build` exits 0

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. All files are complete implementations. The 404 pages have all required visual elements wired. The sitemap contains all 24 real route URLs.

## Threat Flags

None. These are static read-only files with no executable surface:
- `public/sitemap.xml` — URL enumeration is the intended purpose (T-04-07: accepted)
- `public/robots.txt` — Allow: / is appropriate for a public marketing site (T-04-08: accepted)
- `app/not-found.tsx` / `app/[locale]/not-found.tsx` — static error pages with no user input or server APIs

## Self-Check: PASSED

- [x] public/sitemap.xml exists: FOUND
- [x] public/robots.txt exists: FOUND
- [x] app/not-found.tsx exists: FOUND
- [x] app/[locale]/not-found.tsx modified: CONFIRMED
- [x] Commit 550f47c exists: FOUND
- [x] Commit 50a8789 exists: FOUND
- [x] npm run build exits 0: CONFIRMED
