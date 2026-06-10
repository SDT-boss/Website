# Project Research Summary

**Project:** PT SDT Tech Indonesia — Company Website
**Domain:** B2B enterprise tech marketing site (dark aesthetic, static export)
**Researched:** 2026-06-10
**Confidence:** HIGH

---

## Executive Summary

This is a dark-aesthetic B2B marketing site for an Indonesian intelligent-operations software company targeting enterprise fleet, IoT, logistics, and AI buyers. The stack is already well-chosen — Next.js 14 App Router with static export, TypeScript strict, Tailwind CSS — and needs only one dependency added (`lucide-react`) before page-building begins. The architecture is simple: typed TypeScript constants in `lib/` drive all content, a single root layout handles all pages, and `generateStaticParams` is mandatory on the dynamic solutions route.

The primary build risk is that several foundation issues exist in the current codebase that will compound if not fixed first: build artifacts are tracked in git, `config/site.ts` still contains placeholder brand values, and `Footer.tsx` tagline is hardcoded and wrong. Fix these in Phase 1 before writing any page — this is how production sites index with "YourCo" in the title.

The conversion pattern for B2B buyer credibility: problem statement before solution, outcome-based capability bullets, a single Volt Green CTA per page, and honest status signals for solutions not yet in production. The EV fleet project is the one live proof point and should anchor all social proof. Defer everything that signals neglect when sparse — blog, team headshots, press, careers, newsletter.

---

## Key Findings

### 1. Recommended Stack Additions

**Install one package:**
- `lucide-react ^0.400` — inline SVG icons, tree-shakeable, static-export safe

**Do NOT install:** `shadcn/ui`, `framer-motion`, `next-seo`, `next-sitemap`, `@vercel/analytics` npm package, `next/og` Route Handler (breaks static export — use static PNG instead)

**No-install tasks required before launch:** `metadataBase` + OG/Twitter in `layout.tsx`, static `og.png` 1200×630 in `/public/`, favicon set, `/public/sitemap.xml`, `/public/robots.txt`, Geist Mono CSS variable fix in `tailwind.config.ts`

### 2. Table Stakes vs Differentiators vs Anti-Features

**Table stakes (missing = trust failure):**
- Hero with one-sentence mission
- Solutions nav — visible, domain-routable
- Mailto CTA in nav and per-page
- Mobile-responsive layout with hamburger menu
- Per-page `<title>` and `<meta description>`
- 404 page that doesn't break

**Differentiators (separate credible from generic):**
- Problem statement before solution on solutions pages
- Outcome-based capability bullets
- Honest status badges ("Live" / "In development")
- One real proof point on homepage (EV fleet numbers)
- JSON-LD Organization schema
- Open Graph tags for link sharing

**Anti-features — do not build for v1:**
- Blog, team headshots, press, careers, newsletter, pricing, Calendly
- Social links in header (sends buyers away from conversion path)
- Per-page dynamic OG image generation (use shared static PNG)
- Dark-mode toggle (dark-only by design)
- Cookie consent banner (Vercel Analytics is cookieless)

### 3. Build Order

1. Foundation cleanup — remove `.next/`+`out/` from git, fix `config/site.ts`, fix `Footer.tsx` tagline, fix Tailwind token issues
2. Data layer — `lib/solutions.ts` + `lib/work.ts` (agree on slugs before creating)
3. Component atoms — `components/ui/Button`, `Badge`, `Card`, `SectionHeader`
4. Solutions pages — `/solutions` index + `/solutions/[slug]` ×4 (highest SEO value)
5. Work page — EV fleet anchor + ghost cards
6. About page — manifesto tone, belief statements
7. Home page — build last (teases content from every other page)
8. Launch prep — mobile nav, `not-found.tsx`, OG PNG, per-page metadata, JSON-LD, sitemap, robots.txt, favicon, Cloudflare DNS grey-cloud

### 4. Top 5 Pitfalls

1. **Build artifacts in git** — `.next/` and `out/` are tracked. `git rm -r --cached .next out` in Phase 1, before anything else.
2. **Placeholder brand config in production** — `siteConfig.name = "YourCo"` + hardcoded Footer tagline will index in Google. Fix `config/site.ts` and `Footer.tsx` immediately.
3. **`generateStaticParams` missing on `[slug]`** — omitting it is a build error on static export. Add `generateStaticParams` + `export const dynamicParams = false`. Await the `params` Promise before accessing `slug`.
4. **Tailwind dynamic class purging** — `` className={`text-${color}-500`} `` is purged in production. Use full literal class strings or a lookup object. Enforce from the first component.
5. **Cloudflare orange-cloud DNS** — causes redirect loops and blocks Vercel domain verification. Set all DNS records to "DNS only (grey cloud)" during setup.

### 5. Key Open Questions Before Starting

1. **Production domain confirmed?** `sdttech.co` assumed — confirm before setting `metadataBase` in `layout.tsx`.
2. **Solution slugs agreed?** Must be set before `lib/solutions.ts` is created — changing later breaks Work page links. Proposed: `fleet-mobility`, `iot-hardware`, `logistics-intelligence`, `ai-operations`.
3. **OG image designed?** Needs LogoMark SVG exported to 1200×630 PNG on `#0a0a0a` background — design task, not code. Block launch prep on this.
4. **`font-mono` used anywhere?** If no, remove `fontFamily.mono` from `tailwind.config.ts`. If yes, load Geist Mono via `next/font`.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified against Next.js 14 docs; existing stack correct |
| Features | MEDIUM-HIGH | Palantir/Coinbase/Anduril pattern analysis |
| Architecture | HIGH | Verified against official Next.js docs |
| Pitfalls | HIGH | Verified against official docs + direct codebase inspection |

**Overall: HIGH**

---
*Research completed: 2026-06-10 — Ready for roadmap: yes*
