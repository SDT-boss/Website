# PT SDT Tech Indonesia — Company Website

## What This Is

Marketing and brand website for PT SDT Tech Indonesia, a B2B technology company building intelligent operations software for fleet management, IoT/hardware, logistics, and AI-driven operations. The site presents the company's capabilities to enterprise buyers and operators, establishes credibility through a Palantir/Coinbase-inspired aesthetic (serious, data-confident, dark), and drives inbound contact via a single primary CTA per page.

## Core Value

**A potential enterprise customer lands on the site and immediately understands what SDT tech builds, trusts the quality, and knows how to reach us.**

## Requirements

### Validated

<!-- Shipped and confirmed valuable — inferred from existing codebase -->

- ✓ Design system established — Tailwind custom tokens (cyber-jade, volt-green, grid-violet, surfaces, borders) — existing
- ✓ Root layout shell — `app/layout.tsx` wrapping Navbar + Footer, dark base (`#0a0a0a`) — existing
- ✓ Navbar — sticky header, LogoMark SVG, nav links, "Get in touch" mailto — existing
- ✓ Footer — logo mark, email, tagline, copyright — existing
- ✓ LogoMark SVG — two overlapping ellipses, Volt Green + Cyber Jade — existing
- ✓ Font config — Inter via `next/font/google`, `--font-inter` CSS variable — existing
- ✓ Design spec — `DESIGN.md` with brand, color system, typography, component rules — existing

### Active

<!-- Building toward these — hypotheses until shipped -->

- [ ] Real brand config wired — `config/site.ts` updated with "SDT", `sdttech.co@gmail.com`
- [ ] Build artifacts removed from git — `.gitignore` includes `.next` and `out`
- [ ] Home page fully implemented — hero, solutions strip, approach, work teaser, footer CTA
- [ ] Solutions index page — `/solutions` with 4 solution cards linking to detail pages
- [ ] Solution detail pages — `/solutions/[slug]` for each of 4 solutions with static params
- [ ] Work page — `/work` showcasing EV fleet project + ghost cards for future work
- [ ] About page — `/about` with manifesto tone, belief statements, contact CTA
- [ ] Launch prep — favicon, OG metadata, `not-found.tsx`, mobile navigation
- [ ] Deployed to Vercel — live URL, custom domain via Cloudflare

### Out of Scope

- CMS / content management — all content is code-level; no CMS needed for v1
- Authentication / user accounts — no logged-in state, pure marketing site
- Blog / articles — content is static pages only; blog deferred to v2
- Contact form — `mailto:` link is sufficient; no form backend needed
- Analytics beyond Vercel — Vercel Analytics free tier is enough for v1
- Mobile app — web-first; mobile app is a separate product
- Multi-language / i18n — English-only for v1

## Context

**Tech stack:** Next.js 14 App Router, TypeScript (strict), Tailwind CSS 3, static export (`output: "export"`). No backend, no API routes. Deploys to Vercel free tier; custom domain via Cloudflare.

**Brand identity:** Company name is "PT SDT Tech Indonesia" (legal). Website wordmark is "SDT tech" — `{siteConfig.name} tech` where `siteConfig.name = "SDT"`. Contact: `sdttech.co@gmail.com`.

**Design direction:** Palantir (dark authority, data density) + Coinbase (clean confidence, modern restraint). Not startup-playful. Volt Green (`#96D02C`) is the single primary CTA color — one per page, never decorative.

**Active product domain:** Fleet & EV operations is the live/in-progress solution. IoT, Logistics, and AI Operations are in development. The Work page reflects this accurately.

**Existing codebase state:** Shell is complete (nav, footer, layout, design tokens). All interior pages (home, solutions, work, about) are placeholders or missing. Config has placeholder brand values that need updating before deploy.

## Constraints

- **Tech stack**: Next.js 14 App Router + Tailwind CSS only — no component libraries, no CSS-in-JS
- **Output**: Fully static (`next export`) — no server components with data fetching, no API routes
- **Design**: No box shadows — border + background contrast only. No bouncy animations — `duration-150 ease-out` max
- **CTA rule**: Volt Green used for at most ONE button per page — this is a hard design constraint
- **Deploy target**: Vercel free hobby tier — static export compatible

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fully static export (no SSR) | No dynamic data needed; faster CDN delivery; works on Vercel free tier | — Pending |
| Tailwind-only (no component library) | Design system is custom; importing shadcn/ui etc. would conflict with design tokens | — Pending |
| Volt Green as single-CTA rule | Diluting it across nav/footer kills the visual hierarchy; one CTA draws the eye | — Pending |
| Mailto vs contact form | No backend; form requires API route or third-party; mailto sufficient for v1 lead gen | — Pending |
| Cloudflare + Vercel for domain | Cloudflare free SSL + fast DNS + DDoS protection; Vercel handles deploy | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-10 after initialization*
