---
phase: 02-home-navigation
plan: 02
subsystem: home-page
tags: [home, i18n, components, server-components, translations]
dependency-graph:
  requires: [02-01]
  provides: [home-page-live, dot-grid-css, translation-keys-phase2]
  affects: [app/[locale]/page.tsx, messages/, components/home/]
tech-stack:
  added: []
  patterns: [getTranslations-server-component, async-server-component, named-export-pattern]
key-files:
  created:
    - components/home/HeroSection.tsx
    - components/home/SolutionCard.tsx
    - components/home/SolutionsStrip.tsx
    - components/home/ApproachSection.tsx
    - components/home/WorkTeaser.tsx
    - components/home/FooterCTA.tsx
  modified:
    - app/globals.css
    - messages/en.json
    - messages/id.json
    - messages/zh.json
    - app/[locale]/page.tsx
decisions:
  - key: volt-green-hero-only
    choice: bg-volt-green used exclusively in HeroSection CTA; FooterCTA uses border-cyber-jade outline button
    rationale: One primary CTA per page rule from DESIGN.md — volt-green is a visual hierarchy anchor, not a general button style
  - key: keep-generateStaticParams-in-page
    choice: Kept generateStaticParams and dynamicParams=false from Phase 1 scaffold in page.tsx
    rationale: Plan explicitly instructs to keep generateStaticParams if it exists; these were already correct in the scaffold
metrics:
  duration: 293s
  completed: 2026-06-10T16:56:10Z
  tasks-completed: 3
  files-changed: 11
---

# Phase 2 Plan 2: Home Page Sections Summary

**One-liner:** Five async Server Component home sections with dot-grid CSS, expanded i18n keys across 3 locales, and full page assembly at /en, /id, /zh.

## What Was Built

Complete home page implementation for the SDT Tech website. Three task groups:

**Task 1 — CSS + Translations:**
- Appended `.dot-grid` class to `app/globals.css` using `radial-gradient(circle, #2a2a2a 1px, transparent 1px)` at 24px grid
- Replaced `messages/en.json` home namespace with Phase 2 keys (heroLine1/2, eyebrow, ctaLabel, seeOurWork, footerCtaHeading, footerCtaSub, footerCtaButton, etc.)
- Added `solutions` namespace (4 cards with title/desc/tag keys), `approach` namespace (3 items with title/body keys), `work.evFleetTitle/evFleetDesc`
- Replaced `messages/id.json` and `messages/zh.json` with matching structure; `_reviewNote` updated to standard value

**Task 2 — Components:**
- `HeroSection.tsx`: dot-grid + bg-background section, eyebrow, 2-line H1 with `<span className="block">`, sub-line, volt-green CTA (ONLY volt-green on page)
- `SolutionCard.tsx`: synchronous component with typed props, `bg-grid-violet/10 text-grid-violet` tag, `hover:border-cyber-jade`
- `SolutionsStrip.tsx`: async Server Component, `getTranslations("solutions")` for card content, responsive 4-column grid
- `ApproachSection.tsx`: `text-cyber-jade/20` numbered accents (01/02/03), `bg-surface` section
- `WorkTeaser.tsx`: `bg-ev-teal/10 text-ev-teal` Live tag, `Link` from `@/i18n/navigation`, `hover:text-jade-strong` on See our work link
- `FooterCTA.tsx`: `border border-cyber-jade text-cyber-jade` outline button using `siteConfig.email`

**Task 3 — Page Assembly:**
- Replaced scaffold in `app/[locale]/page.tsx` with async Server Component composing all 5 sections
- Kept `generateStaticParams` and `dynamicParams = false` from Phase 1 scaffold
- `setRequestLocale(locale)` called before any next-intl API
- `WorkTeaser` receives `locale` prop; all other sections are zero-prop Server Components

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | a94e55d | feat(02-02): add .dot-grid CSS class and expand translation keys across all 3 locales |
| 2 | 43a6933 | feat(02-02): create all five home section components as Server Components |
| 3 | 34f3e89 | feat(02-02): assemble app/[locale]/page.tsx with all five home sections |

## Build Verification

`npm run build` exits 0. Static pages emitted:
- `/en` — English home page
- `/id` — Indonesian home page
- `/zh` — Chinese Simplified home page

## Design System Compliance

- Volt Green (`bg-volt-green`) appears **only** in `HeroSection.tsx` CTA — confirmed by `grep -rn 'volt-green' components/home/`
- `FooterCTA.tsx` uses `border-cyber-jade text-cyber-jade` outline style — no volt-green
- `hover:bg-volt-strong` in HeroSection and `hover:text-jade-strong` in WorkTeaser — both tokens confirmed registered in tailwind.config.ts
- No box shadows added — depth achieved via border + background contrast per CLAUDE.md
- All transitions use `duration-150 ease-out` exclusively

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all sections wire to real translation keys; translations are complete for en/id/zh.

## Threat Flags

None. No new network endpoints, auth paths, file access patterns, or schema changes beyond what was described in the plan's threat model. All mailto hrefs use `siteConfig.email` (static, non-user-controlled).

## Self-Check: PASSED

Files exist:
- components/home/HeroSection.tsx — FOUND
- components/home/SolutionCard.tsx — FOUND
- components/home/SolutionsStrip.tsx — FOUND
- components/home/ApproachSection.tsx — FOUND
- components/home/WorkTeaser.tsx — FOUND
- components/home/FooterCTA.tsx — FOUND
- app/globals.css (.dot-grid) — FOUND
- messages/en.json (footerCtaHeading) — FOUND
- messages/id.json (footerCtaHeading) — FOUND
- messages/zh.json (footerCtaHeading) — FOUND

Commits: a94e55d, 43a6933, 34f3e89 — all verified in git log.
