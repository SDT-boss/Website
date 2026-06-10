# Pitfalls: Next.js 14 Static B2B Marketing Site

**Domain:** Next.js 14 App Router + static export + Vercel + Cloudflare
**Date:** 2026-06-10
**Confidence:** HIGH — verified against official Next.js 14 docs, Vercel docs, direct codebase inspection

---

## Critical Pitfalls

### 1. Build Artifacts Committed to Git
**Files affected:** `.next/`, `out/`
**Issue:** `.gitignore` currently only excludes `node_modules`. Both build output directories are tracked by git.
**Impact:** Large diffs on every build, repo bloat, CI/CD confusion.
**Prevention:** Add `.next` and `out` to `.gitignore` immediately. Then:
```bash
git rm -r --cached .next out
git commit -m "chore: remove build artifacts from tracking"
```
**Phase:** Phase 1 (Foundation cleanup) — do this before any other work.

### 2. Placeholder Brand Config in Production
**Files affected:** `config/site.ts`, `components/Footer.tsx`
**Issue:** `siteConfig.name = "YourCo"`, `siteConfig.email = "hello@yourco.com"` — these propagate to page `<title>`, OG tags, navbar, footer, and `mailto:` links. Will index in Google with wrong brand.
**Secondary issue:** `Footer.tsx` has a hardcoded tagline "Built for intelligent operations." that diverges from `siteConfig.tagline`.
**Prevention:** Update `config/site.ts` to `name: "SDT"`, `email: "sdttech.co@gmail.com"` before any deploy. Replace hardcoded tagline in `Footer.tsx` with `{siteConfig.tagline}`.
**Phase:** Phase 1 (Foundation) — first task.

### 3. `next/og` ImageResponse Broken for Dynamic Routes in Static Export
**Issue:** Route Handlers that depend on `Request` are not supported in `output: "export"`. `next/og` with dynamic parameters (e.g., `/api/og?title=...`) fails at build time.
**Prevention:** Use a **static PNG** at `/public/og.png` (1200×630). Reference it in `metadata.openGraph.images`. Do not attempt to generate per-page OG images dynamically in static export. For per-page OG images in the future, pre-generate PNGs at build time and reference them statically.
**Phase:** Launch prep.

### 4. `not-found.tsx` Must Be Server-API-Free
**Issue:** Next.js examples sometimes show `headers()` usage in not-found pages. `headers()` and `cookies()` are not available in static export — they trigger a build error.
**Prevention:** Keep `app/not-found.tsx` as a pure static Server Component — no `headers()`, no `cookies()`, no `redirect()`, no data fetching.
**Phase:** Add before launch.

### 5. Cloudflare Orange-Cloud Proxy Conflicts with Vercel SSL
**Issue:** "Proxied" (orange cloud) DNS records in Cloudflare intercept HTTPS traffic before it reaches Vercel. Causes "too many redirects" loops and Vercel domain verification failures.
**Prevention:** Set DNS A records and CNAME records to **DNS only (grey cloud)** in Cloudflare. Vercel handles SSL termination. Only use Cloudflare proxy (orange cloud) if you specifically need Cloudflare's WAF/caching — and even then, disable it during initial domain verification.
**Phase:** Deploy phase.

---

## High Pitfalls

### 6. No Mobile Navigation
**Issue:** `components/Navbar.tsx` hides nav links and CTA below `md` breakpoint with `hidden md:flex`. Mobile users see only the logo — no navigation.
**Warning signs:** Any mobile browser (or Chrome DevTools responsive mode) shows a logo-only header.
**Prevention:** Add a hamburger button (`<button>`) that toggles a mobile menu (`useState`). Menu needs `aria-expanded` and `aria-controls` for keyboard accessibility.
**Phase:** Home page phase or dedicated launch prep.

### 7. Tailwind Purge Removes Dynamically Constructed Class Names
**Issue:** Tailwind's content scanner reads literal strings only. Dynamic class construction is invisible to the scanner:
```tsx
// ✗ Will be purged in production
className={`text-${color}-500`}
className={`bg-${status === 'active' ? 'green' : 'red'}-100`}
```
**Prevention:** Always use full literal class names. Use a lookup object for dynamic values:
```tsx
const colorMap = { jade: "text-cyber-jade", violet: "text-grid-violet" };
className={colorMap[solution.color]}
```
**Phase:** All page-building phases — enforce as a code convention.

### 8. Dark Theme Contrast Failures
**Issue:** Several design token combinations fail WCAG AA (4.5:1 for normal text):
- `text-muted` (`#52525b`) on `surface` (`#111111`) ≈ 2.5:1 — FAIL
- `text-cyber-jade` (`#008684`) on dark backgrounds — borderline for interactive elements
- Missing focus rings on interactive elements
**Prevention:**
- Use `text-muted` only for truly decorative/secondary content — never for functional text
- Use `text-secondary` (`#a1a1aa`) for readable secondary text — passes AA
- Add visible focus rings: `focus-visible:ring-2 focus-visible:ring-cyber-jade focus-visible:ring-offset-2 focus-visible:ring-offset-black`
**Phase:** All page-building phases — build with contrast in mind.

### 9. Static Export Unsupported Features
**Issue:** These Next.js features break or cause build errors with `output: "export"`:
- `headers()`, `cookies()` — not available
- `redirects:` and `rewrites:` in `next.config.mjs` — not supported
- Middleware — not supported
- Server Actions — not supported
- ISR (Incremental Static Regeneration) — not supported
- `generateStaticParams()` missing on dynamic routes — build error

**Prevention:** For every dynamic route, add `generateStaticParams` returning an array and `export const dynamicParams = false`. Never use server-only APIs in page files.
**Phase:** Solutions [slug] page — highest risk point.

### 10. Missing Per-Page Metadata
**Issue:** All pages inherit the same `<title>` from `layout.tsx`. B2B SEO requires unique titles and descriptions per page. Google uses page title in its index — generic titles reduce click-through rate.
**Prevention:** Use `title.template` pattern in root layout. Export `metadata` constant from each static page. Use `generateMetadata` on dynamic pages.
```tsx
// layout.tsx
title: { template: "%s | SDT tech", default: "SDT tech" }

// about/page.tsx
export const metadata = { title: "About", description: "..." }
```
**Phase:** Each page-building phase — add metadata when building each page.

---

## Medium Pitfalls

### 11. Geist Mono CSS Variable Undefined
**Issue:** `tailwind.config.ts` maps `font-mono` to `var(--font-geist-mono)`, but `--font-geist-mono` is never defined in `layout.tsx`. Any `font-mono` class silently falls back to `ui-monospace`.
**Fix:** Either load Geist Mono via `next/font` and expose `--font-geist-mono`, or remove the `fontFamily.mono` override from `tailwind.config.ts` and use `ui-monospace` directly.
**Phase:** Phase 1 (Foundation cleanup).

### 12. Arbitrary Values Create Design Drift
**Issue:** `bg-[#0a0a0a]` in `layout.tsx` body bypasses the design token system. If the background changes in `tailwind.config.ts`, `layout.tsx` won't update.
**Fix:** Add a `background: "#0a0a0a"` token to `tailwind.config.ts` and use `bg-background` in `layout.tsx`.
**Phase:** Phase 1 (Foundation cleanup).

### 13. Hydration Errors from Browser API Access
**Issue:** Accessing `window`, `localStorage`, `document` outside `useEffect` causes hydration errors on pre-rendered HTML. Even static export pages are hydrated on first client render.
**Prevention:** Wrap browser API access in `useEffect` or use a custom `useMounted` hook. Alternatively, mark the component `'use client'` only when genuinely needed.
**Phase:** Relevant when adding any interactive client component (mobile menu toggle, etc.).

### 14. `trailingSlash: true` Consistency
**Issue:** `next.config.mjs` has `trailingSlash: true`. Internal `<a href>` tags (e.g., `mailto:` anchors, external links) bypass Next.js's automatic trailing slash handling. Sitemap URLs must use trailing slashes to match canonical form.
**Prevention:** Use `<Link>` from `next/link` for all internal navigation — it applies trailing slash automatically. Hand-author `sitemap.xml` with trailing slashes.
**Phase:** Each page-building phase + launch prep.

### 15. Performance Traps on Dark CSS-Heavy Sites
**Issues:**
- Font swap CLS: Inter with `display: swap` causes layout shift without `size-adjust` — `next/font` handles this automatically
- Images without explicit dimensions cause CLS — always provide `width` and `height` on `<Image>`
- Sticky navbar with `position: sticky` triggers compositor layer — use `will-change: transform` only if scroll jank occurs
- CSS bundle size: Tailwind's purge removes unused classes, but double-check `content` paths include all template files

**Phase:** All page-building phases — discipline issue, not a one-time fix.

---

## Minor Pitfalls

### 16. Email Exposed to Scrapers
**Issue:** `mailto:sdttech.co@gmail.com` in nav and footer is trivially scraped by bots.
**Risk:** Spam. Low risk accepted per PROJECT.md — mailto is the intended conversion mechanism.
**Mitigation (if spam becomes a problem):** JavaScript obfuscation or a contact form redirect.

### 17. No `robots.txt` and No Google Search Console Setup
**Issue:** Without `robots.txt`, crawl behavior is unpredictable (though default is allow-all). Without Search Console, you can't monitor indexing, manual actions, or Core Web Vitals in Google's data.
**Fix:** Hand-author `/public/robots.txt` (allow all for v1). Submit sitemap in Google Search Console post-launch.
**Phase:** Launch prep.

### 18. Tagline Divergence in Footer
**Issue:** `Footer.tsx` hardcodes "Built for intelligent operations." — different from `siteConfig.tagline` ("Infrastructure for intelligent operations.").
**Fix:** Replace with `{siteConfig.tagline}`.
**Phase:** Phase 1 (Foundation cleanup).

---

## Phase-Specific Warning Map

| Pitfall | Phase |
|---------|-------|
| Build artifacts in git (#1) | Phase 1 — FIRST |
| Placeholder brand config (#2) | Phase 1 — FIRST |
| Tagline divergence (#18) | Phase 1 |
| Geist Mono undefined (#11) | Phase 1 |
| Arbitrary values (#12) | Phase 1 |
| Per-page metadata (#10) | Every page phase |
| Tailwind dynamic classes (#7) | Every page phase |
| Contrast (#8) | Every page phase |
| Hydration errors (#13) | Client component phases |
| Trailing slash consistency (#14) | Every page phase |
| Performance traps (#15) | Every page phase |
| `generateStaticParams` (#9) | Solutions [slug] phase |
| Mobile navigation (#6) | Home/launch prep |
| `next/og` broken (#3) | Launch prep |
| `not-found.tsx` (#4) | Launch prep |
| Cloudflare orange-cloud (#5) | Deploy phase |
| robots.txt + Search Console (#17) | Launch prep |
| Email scrapers (#16) | Accept or v2 |

---
*Pitfalls research: 2026-06-10 — verified against official Next.js 14 docs and Vercel docs*
