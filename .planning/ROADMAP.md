# Roadmap: PT SDT Technology — Company Website

## Overview

Four phases deliver a fully static, multi-language B2B marketing site from a broken shell to a live, enterprise-credible web presence. Phase 1 fixes the codebase foundation and establishes i18n routing before any page is written. Phase 2 builds the home page and polishes navigation — the primary conversion surface. Phase 3 fills every interior page (solutions, work, about) so the site has complete depth. Phase 4 completes launch prep and deploys to production under owner approval.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & i18n** - Fix codebase defects, wire real brand config, and establish the app/[locale]/ routing structure with next-intl
- [ ] **Phase 2: Home & Navigation** - Build the fully-implemented home page and complete navbar (active states, hamburger menu, language switcher)
- [ ] **Phase 3: Interior Pages** - Build solutions index + 4 detail pages, work page, and about page
- [ ] **Phase 4: Launch Prep** - Favicon, OG metadata, per-page titles, sitemap, robots.txt, 404 page, Vercel deploy to sdt.technology (hold until owner approves)

## Phase Details

### Phase 1: Foundation & i18n
**Goal**: The codebase is clean, brand-correct, and ready for page development — with i18n routing in place so every subsequent page is built in the right structure from the start
**Mode**: mvp
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, I18N-01, I18N-02, I18N-03, I18N-04
**Success Criteria** (what must be TRUE):
  1. `git status` shows `.next/` and `out/` are untracked; neither directory is committed
  2. The site renders "SDT tech" (not "YourCo") in the browser tab and footer tagline pulls from `siteConfig`
  3. Navigating to `localhost:3000/en`, `localhost:3000/id`, and `localhost:3000/zh` all resolve without 404
  4. Switching language via the navbar switcher updates visible page text without a full reload
  5. `npm run build` completes without errors after all foundation changes
**Plans**: 3 plans
Plans:
- [ ] 01-PLAN-A.md — Foundation cleanup: .gitignore, brand config, Footer tagline, Tailwind tokens
- [ ] 01-PLAN-B.md — i18n infrastructure: next-intl install, routing/request config, messages, locale layout
- [ ] 01-PLAN-C.md — i18n wiring: root redirect, locale pages, not-found, language switcher in Navbar

### Phase 2: Home & Navigation
**Goal**: A visitor landing on the home page experiences the full intended design — hero, solutions strip, approach section, work teaser, and footer CTA — with a navbar that highlights the current page and collapses correctly on mobile
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, HOME-01, HOME-02, HOME-03, HOME-04, HOME-05
**Success Criteria** (what must be TRUE):
  1. The home page hero renders with a CSS dot-grid background, a single Volt Green CTA button, and no second Volt Green element on the page
  2. All 4 solution cards appear in the solutions strip with hover border shift to cyber-jade
  3. The navbar visually marks the active route and the language switcher is visible
  4. On a mobile viewport, tapping the hamburger opens nav links; the touch target is at least 44×44 px; keyboard focus is managed correctly
  5. The footer CTA section uses the cyber-jade outline button (not Volt Green)
**Plans**: 2 plans
Plans:
- [ ] 02-01-PLAN.md — Navigation foundation: i18n/navigation.ts + Navbar refactor (active state, hamburger, language switcher upgrade)
- [ ] 02-02-PLAN.md — Home page sections: .dot-grid CSS, translation key expansion, all 5 home sections, app/[locale]/page.tsx assembly

### Phase 3: Interior Pages
**Goal**: Every interior page — solutions index, 4 solution detail pages, work, and about — is fully built and navigable so a buyer can explore the full company narrative
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: SOL-01, SOL-02, SOL-03, SOL-04, WORK-01, WORK-02, ABOUT-01, ABOUT-02
**Success Criteria** (what must be TRUE):
  1. `/[locale]/solutions` lists all 4 solution cards and each links to its correct detail page
  2. Each of the 4 solution detail pages loads at its slug (e.g., `/en/solutions/fleet-mobility`) with a problem statement before capabilities and a status badge ("Live" or "In Development")
  3. `/[locale]/work` shows the EV Fleet Operations project card plus at least 2 ghost "Coming soon" cards with dashed borders
  4. `/[locale]/about` opens with a belief statement (not a founding story) and its contact CTA uses the cyber-jade outline button
  5. `generateStaticParams` covers all slug × locale combinations and `dynamicParams = false` is set; `npm run build` succeeds
**Plans**: TBD
**UI hint**: yes

### Phase 4: Launch Prep
**Goal**: The site is technically complete for public launch — proper metadata, SEO files, a branded 404, and a live Vercel deploy connected to sdt.technology — but held from public traffic until the owner gives explicit approval
**Mode**: mvp
**Depends on**: Phase 3
**Requirements**: LAUNCH-01, LAUNCH-02, LAUNCH-03, LAUNCH-04, LAUNCH-05, LAUNCH-06, LAUNCH-07
**Success Criteria** (what must be TRUE):
  1. The browser tab, OG link preview, and Twitter card all show correct title and the 1200×630 `og.png` for any page shared
  2. Every route (home, solutions index, 4 detail slugs, work, about) has a unique `<title>` and `<meta name="description">`
  3. `/sitemap.xml` and `/robots.txt` are reachable in the deployed build
  4. Navigating to an invalid URL returns the branded 404 page without a server error
  5. The site is live on Vercel with `sdt.technology` resolving via Cloudflare DNS-only (grey-cloud) records — traffic is live only after owner approves
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & i18n | 0/3 | Ready to execute | - |
| 2. Home & Navigation | 0/2 | Ready to execute (after Phase 1) | - |
| 3. Interior Pages | 0/TBD | Not started | - |
| 4. Launch Prep | 0/TBD | Not started | - |
