# Requirements: PT SDT Technology — Company Website

**Defined:** 2026-06-10
**Core Value:** A potential enterprise customer lands on the site and immediately understands what SDT tech builds, trusts the quality, and knows how to reach us.

---

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Build artifacts removed from git — `.gitignore` includes `.next` and `out`, existing tracked files removed with `git rm -r --cached`
- [ ] **FOUND-02**: Real brand config wired — `config/site.ts` updated: `name: "SDT"`, `email: "sdttech.co@gmail.com"`, domain `sdt.technology`
- [ ] **FOUND-03**: Footer tagline uses `siteConfig.tagline` — hardcoded "Built for intelligent operations." replaced
- [ ] **FOUND-04**: Tailwind token cleanup — `bg-[#0a0a0a]` replaced with a design token; dangling `--font-geist-mono` variable resolved

### Internationalization

- [ ] **I18N-01**: Site supports 3 languages — English (default), Indonesian (id), Chinese Simplified (zh) via `next-intl` with static export mode
- [ ] **I18N-02**: Routing uses `app/[locale]/` structure — all page files moved under locale segment; `generateStaticParams` covers all locale/slug combinations
- [ ] **I18N-03**: Language switcher visible in navbar — allows switching between EN / ID / ZH without full page reload
- [ ] **I18N-04**: All page content (hero, solutions, work, about, nav, footer) available in all 3 languages via translation files

### Navigation

- [ ] **NAV-01**: Sticky navbar with active-state link highlighting — current route's link visually distinguished
- [ ] **NAV-02**: Mobile hamburger menu — nav links visible on mobile via toggle; meets 44×44px touch target; keyboard accessible (`aria-expanded`, `aria-controls`)

### Home Page

- [ ] **HOME-01**: Hero section — full-viewport, CSS dot-grid background, eyebrow label, 2-line headline, 1-line sub, one Volt Green primary CTA
- [ ] **HOME-02**: Solutions strip — section label + 4 solution cards (icon, title, 1-line desc, grid-violet tag); hover shifts border to cyber-jade
- [ ] **HOME-03**: Approach section — "How we work" with 3 numbered items (hardware-aware, data-first, built for scale)
- [ ] **HOME-04**: Work teaser — single EV Fleet Operations card with status tag; "See our work →" link
- [ ] **HOME-05**: Footer CTA section — "Want to work with us?" with cyber-jade outline mailto button (not Volt Green — already used in hero)

### Solutions Pages

- [ ] **SOL-01**: Solutions index page (`/[locale]/solutions`) — eyebrow, H1, 4 cards linking to detail pages
- [ ] **SOL-02**: Solution detail pages (`/[locale]/solutions/[slug]`) — `generateStaticParams` covering all 4 slugs × 3 locales; `dynamicParams = false`
- [ ] **SOL-03**: Status badge on each solution — "Live" (ev-teal) or "In Development" (amber soft pill)
- [ ] **SOL-04**: Problem-first content structure on detail pages — problem statement before capabilities; outcome-based capability bullets; "Who this is for" callout

### Work Page

- [ ] **WORK-01**: Work page (`/[locale]/work`) — EV Fleet Operations as the one real project card with tags and description
- [ ] **WORK-02**: Ghost cards for future projects — dashed border, "Coming soon" centered text

### About Page

- [ ] **ABOUT-01**: About page (`/[locale]/about`) — opens with belief/observation (not founding story); 3 belief statements in grid; current focus mention; no headshots
- [ ] **ABOUT-02**: Contact CTA at bottom of About — cyber-jade outline button (Volt Green already used elsewhere per one-per-page rule)

### Launch Prep

- [ ] **LAUNCH-01**: Favicon set — `favicon.ico`, `apple-touch-icon.png`, `icon.png` in `/public/`
- [ ] **LAUNCH-02**: OG metadata — `metadataBase: new URL("https://sdt.technology")`, `openGraph.images`, `twitter.card: "summary_large_image"` in root layout; static `og.png` (1200×630) in `/public/`
- [ ] **LAUNCH-03**: Per-page metadata — unique `title` and `description` on all 6 page routes (home, solutions, /solutions/[slug]×4, work, about)
- [ ] **LAUNCH-04**: SEO files — hand-authored `/public/sitemap.xml` and `/public/robots.txt`
- [ ] **LAUNCH-05**: `app/[locale]/not-found.tsx` — branded 404 page; no server-only APIs
- [ ] **LAUNCH-06**: Vercel deploy — site live on Vercel; `sdt.technology` custom domain connected via Cloudflare (DNS-only grey-cloud records)
- [ ] **LAUNCH-07**: Deploy hold — site not published publicly until owner explicitly approves

---

## v2 Requirements

### Content & SEO
- **SEO-01**: JSON-LD Organization schema in `layout.tsx`
- **SEO-02**: Per-page OG images (pre-generated PNGs per route)
- **SEO-03**: Google Search Console setup and sitemap submission

### Content Marketing
- **BLOG-01**: Blog / articles section
- **TEAM-01**: Team page with headshots (when team is 10+ people)
- **PRESS-01**: Press / media page (when first coverage lands)
- **CAREERS-01**: Careers listings (when real roles are open)

### Conversion
- **CONV-01**: Calendar booking integration (Calendly or equivalent)
- **CONV-02**: Contact form with backend (when static mailto is insufficient)

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS / content management | All content is code-level; static is sufficient for v1 |
| Authentication / user accounts | Pure marketing site; no logged-in state |
| Contact form with backend | Requires API route; mailto sufficient for v1 |
| Analytics beyond Vercel | Vercel Analytics (cookieless) adequate for v1; no tracking banner needed |
| Mobile app | Web-first; mobile app is a separate product |
| Pricing page | Bespoke B2B product; public pricing anchors negotiations unfavorably |
| Social links in header | Sends buyers away from conversion path |
| Dark-mode toggle | Site is dark-only by design |
| Newsletter signup | No content pipeline exists for v1 |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 — Foundation & i18n | Pending |
| FOUND-02 | Phase 1 — Foundation & i18n | Pending |
| FOUND-03 | Phase 1 — Foundation & i18n | Pending |
| FOUND-04 | Phase 1 — Foundation & i18n | Pending |
| I18N-01 | Phase 1 — Foundation & i18n | Pending |
| I18N-02 | Phase 1 — Foundation & i18n | Pending |
| I18N-03 | Phase 1 — Foundation & i18n | Pending |
| I18N-04 | Phase 1 — Foundation & i18n | Pending |
| NAV-01 | Phase 2 — Home & Navigation | Pending |
| NAV-02 | Phase 2 — Home & Navigation | Pending |
| HOME-01 | Phase 2 — Home & Navigation | Pending |
| HOME-02 | Phase 2 — Home & Navigation | Pending |
| HOME-03 | Phase 2 — Home & Navigation | Pending |
| HOME-04 | Phase 2 — Home & Navigation | Pending |
| HOME-05 | Phase 2 — Home & Navigation | Pending |
| SOL-01 | Phase 3 — Interior Pages | Pending |
| SOL-02 | Phase 3 — Interior Pages | Pending |
| SOL-03 | Phase 3 — Interior Pages | Pending |
| SOL-04 | Phase 3 — Interior Pages | Pending |
| WORK-01 | Phase 3 — Interior Pages | Pending |
| WORK-02 | Phase 3 — Interior Pages | Pending |
| ABOUT-01 | Phase 3 — Interior Pages | Pending |
| ABOUT-02 | Phase 3 — Interior Pages | Pending |
| LAUNCH-01 | Phase 4 — Launch Prep | Pending |
| LAUNCH-02 | Phase 4 — Launch Prep | Pending |
| LAUNCH-03 | Phase 4 — Launch Prep | Pending |
| LAUNCH-04 | Phase 4 — Launch Prep | Pending |
| LAUNCH-05 | Phase 4 — Launch Prep | Pending |
| LAUNCH-06 | Phase 4 — Launch Prep | Pending |
| LAUNCH-07 | Phase 4 — Launch Prep | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-10*
*Last updated: 2026-06-10 after roadmap creation — traceability expanded to per-requirement rows*
