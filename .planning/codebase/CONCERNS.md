# Concerns & Technical Debt

**Analysis Date:** 2026-06-10

## Critical

### Placeholder Brand Config
**File:** `config/site.ts`
**Issue:** `siteConfig.name`, `siteConfig.email`, and `siteConfig.tagline` contain placeholder values (`"YourCo"`, `"hello@yourco.com"`, `"Infrastructure for intelligent operations."`). These propagate to page `<title>`, navbar, footer, and `mailto:` links.
**Risk:** Will ship with wrong branding if not updated before launch.
**Fix:** Update `config/site.ts` with real values before any public deployment.

### Build Artifacts Committed to Git
**Files:** `.next/`, `out/`
**Issue:** `.gitignore` only excludes `node_modules` — both build output directories are tracked by git and show as dirty in the current working tree.
**Risk:** Large diffs on every build, repo bloat, misleading git history.
**Fix:** Add `.next` and `out` to `.gitignore`.

### Broken Navigation Links
**File:** `components/Navbar.tsx`
**Issue:** `NAV_LINKS` references `/solutions`, `/work`, `/about` — none of these pages exist yet. Clicking any nav link results in a 404.
**Risk:** Unusable navigation if the site is deployed before pages are built.
**Fix:** Either build the pages or remove/disable links until pages exist.

## High

### Empty Home Page
**File:** `app/page.tsx`
**Issue:** Home page renders only `"— scaffold ready —"`. No real content, no hero, no CTA.
**Risk:** Not suitable for any real visitor.
**Fix:** Implement actual home page content before launch.

### No Mobile Navigation
**File:** `components/Navbar.tsx`
**Issue:** Nav links and CTA button are hidden below `md` breakpoint (`hidden md:flex`) with no hamburger menu or mobile alternative. Mobile users see only the logo.
**Risk:** Complete navigation failure on mobile devices.
**Fix:** Add mobile menu (hamburger / drawer) or at minimum expose key links on mobile.

### Missing `not-found.tsx`
**Issue:** No custom 404 page. Next.js static export will fall back to a generic error or broken page on unknown routes.
**Fix:** Add `app/not-found.tsx` with on-brand 404 experience.

## Medium

### Geist Mono Font Never Loaded
**Files:** `tailwind.config.ts`, `app/layout.tsx`
**Issue:** `font-mono` is mapped to `var(--font-geist-mono)` in Tailwind, but `--font-geist-mono` is never defined anywhere. `layout.tsx` loads only Inter. Any `font-mono` class will fall back to `ui-monospace`.
**Fix:** Either load Geist Mono via `next/font/google` and expose the CSS variable, or remap `font-mono` to a system stack.

### Hardcoded Hex in Layout
**File:** `app/layout.tsx`
**Issue:** Body background uses `bg-[#0a0a0a]` (arbitrary Tailwind value) instead of a design token. This creates drift if the background color changes in `tailwind.config.ts`.
**Fix:** Add a `background` or `bg-base` token to `tailwind.config.ts` and use it here.

### Raw Hex SVG Fills in LogoMark
**File:** `components/LogoMark.tsx`
**Issue:** SVG `fill` attributes use raw hex strings (`#008684`, `#96D02C`) instead of `currentColor` or CSS custom properties. Color changes require updating both the SVG and `tailwind.config.ts`.
**Fix:** Reference CSS variables or accept the redundancy as acceptable for a locked logo.

### Tagline Divergence in Footer
**File:** `components/Footer.tsx`
**Issue:** The "Built for intelligent operations." tagline in the footer is hardcoded directly, separate from `siteConfig.tagline` ("Infrastructure for intelligent operations."). Two different taglines already diverging.
**Fix:** Replace the hardcoded string with `siteConfig.tagline`.

## Low

### Email Exposed to Scrapers
**Files:** `components/Navbar.tsx`, `components/Footer.tsx`
**Issue:** `mailto:` links with the real email will be scraped by bots once the site is public.
**Risk:** Spam. Acceptable tradeoff for most small sites but worth noting.
**Mitigation options:** Obfuscation via JS, contact form, or accept the risk.

### No Favicon or OG Metadata
**Issue:** No `favicon.ico`, no `apple-touch-icon`, no `og:image`, no `twitter:card`. Social sharing and browser tabs will use defaults.
**Fix:** Add favicon to `public/` and extend `metadata` in `app/layout.tsx`.

### No Tests, No CI
**Issue:** Zero test coverage, no CI pipeline. Regressions will only be caught by manual checking.
**Fix:** Add Jest + React Testing Library for component tests; add GitHub Actions for lint + build checks on push.

## Summary

| Severity | Count | Most Urgent |
|----------|-------|-------------|
| Critical | 3 | Fix gitignore + real brand config before first deploy |
| High | 3 | Mobile nav + 404 page + home content |
| Medium | 4 | Font fix + token cleanup |
| Low | 3 | Nice-to-have polish |

---

*Concerns analysis: 2026-06-10*
