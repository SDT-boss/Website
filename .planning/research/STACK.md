# Stack Research: B2B Marketing Site

**Domain:** Next.js 14 static B2B marketing site
**Date:** 2026-06-10
**Confidence:** HIGH — Next.js 14 static export is a mature stack; library choices are stable

---

## What Is Already in the Project (Do Not Touch)

| Tool | Version | Status |
|------|---------|--------|
| Next.js | 14.2.29 | Correct — no upgrade needed for v1 |
| React | 18.3.1 | Correct |
| TypeScript | ^5, strict | Correct |
| Tailwind CSS | 3.4.17 | Correct — custom tokens configured |
| `next/font/google` (Inter) | built-in | Correct — self-hosts at build time, `display: swap`, CSS variable wired |
| `next/metadata` | built-in | Partial — base title/description only; OG and canonical missing |
| ESLint + `eslint-config-next` | 14.2.29 | Correct |

---

## SEO / Metadata

**Missing from current `layout.tsx`:**

1. **`metadata.metadataBase`** — Not set. Required to construct absolute OG image URLs. Without it, OG images are relative paths and break in social scrapers. Set to `new URL("https://sdttech.co")`.

2. **OG image** — No `og.png` referenced. Blank link previews on LinkedIn/Slack kill B2B credibility. Place 1200×630 PNG at `/public/og.png` and reference in `metadata.openGraph.images`.

3. **Twitter/X card** — `metadata.twitter` not set. Defaults to `summary`; needs `summary_large_image`.

4. **Per-page metadata** — Each route needs its own exported `metadata` constant. Root layout provides a fallback, not per-page SEO.

5. **`robots.txt`** — Not present. Hand-author `/public/robots.txt`.

6. **`sitemap.xml`** — Not present. Hand-author `/public/sitemap.xml` (6 pages, ~20 lines of XML).

**No additional library needed.** Do not install `next-seo` — it predates Next.js 13's metadata API and is now obsolete.

**OG image generation:** Use a static 1200×630 PNG, not `next/og` with a Route Handler. Static export does not support Route Handlers. A static PNG is simpler and equally effective.

Example metadata object:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://sdttech.co"),
  title: `${siteConfig.name} tech`,
  description: siteConfig.tagline,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    siteName: `${siteConfig.name} tech`,
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};
```

---

## Icon Library

**Recommendation: `lucide-react` at `^0.400`**

```bash
npm install lucide-react
```

- ES modules with named exports — tree-shaking eliminates unused icons
- Inline SVG React components — zero runtime network requests, fully static-export compatible
- Geometric thin-stroke aesthetic matches Palantir-inspired brand direction
- Dominant choice in Next.js/Tailwind ecosystem in 2025

Do NOT use `react-icons` (bundle overhead), `heroicons` (less community adoption), or web font icons (CDN dependency).

---

## Animation

**Recommendation: Tailwind CSS transitions only. Do not install an animation library.**

Design constraint is explicit: `duration-150 ease-out` only. No bounce or spring.

What Tailwind already covers:
```css
transition-colors duration-150 ease-out
transition-opacity duration-150 ease-out
hover:opacity-80
hover:-translate-y-px
```

If Framer Motion is eventually added, constrain strictly: `duration: 0.15`, `ease: "easeOut"`, opacity and translate only — never `type: "spring"`.

---

## Favicon and Web Manifest

Static files in `/public/`. No generator plugin.

| File | Dimensions | Purpose |
|------|-----------|---------|
| `/public/favicon.ico` | 32×32 | Browser tab, bookmarks |
| `/public/icon.png` | 192×192 | Android, PWA fallback |
| `/public/apple-touch-icon.png` | 180×180 | iOS home screen |
| `/public/og.png` | 1200×630 | OG/Twitter link previews |

Generate via realfavicongenerator.net from the LogoMark SVG export.

---

## Font Loading

**Current setup is correct. No changes needed.**

`next/font/google` with `Inter` downloads and self-hosts the font at build time. Never loads from Google's CDN in production.

**Gap:** `tailwind.config.ts` references `--font-geist-mono` for `font-mono`, but the variable is never defined. If `font-mono` classes are not used, remove the `fontFamily.mono` override. If monospace is needed (code/IDs), add `GeistMono` via `next/font`.

---

## Static Asset Optimization

`images.unoptimized: true` is required by static export. Mitigate manually:

- Export images as WebP at actual display sizes before committing
- Keep images under 200KB each (use Squoosh browser tool — free)
- Still use `<Image>` from `next/image` — provides layout shift prevention and native lazy loading even with optimization disabled

Do not add `sharp`, `imagemin`, or Webpack image plugins.

---

## What NOT to Add

| Do NOT add | Why not |
|------------|---------|
| `shadcn/ui` or any component library | Custom design system conflicts with component library tokens |
| `framer-motion` (v1) | Design constraint eliminates its value |
| `next-seo` | Obsolete since Next.js 13 metadata API |
| `react-helmet` | Obsolete with App Router |
| `next-sitemap` | Plugin overkill for 6 static pages |
| `next-pwa` | Not a PWA; service workers add cache-invalidation bugs |
| `@vercel/analytics` npm package | Use Vercel Analytics via dashboard — zero npm install needed |
| `next-intl` or `i18next` | English-only; out of scope |
| CSS-in-JS | Out of scope per project constraints |

---

## Recommended Additions Summary

| Addition | Command | Priority |
|----------|---------|---------|
| `lucide-react` | `npm install lucide-react` | HIGH — needed for UI pages |
| Favicon/icon PNGs in `/public/` | No install — generate from realfavicongenerator.net | HIGH — required before launch |
| `metadataBase` + OG/Twitter in `layout.tsx` | No install — code change | HIGH — required before launch |
| `/public/sitemap.xml` | No install — hand-authored XML | MEDIUM — pre-launch SEO |
| `/public/robots.txt` | No install — hand-authored | MEDIUM — crawl permissions |
| Remove dangling `font-geist-mono` from tailwind config | No install — config cleanup | LOW — minor inconsistency |

---

## Open Questions

- Final production URL (`sdttech.co` assumed — confirm before setting `metadataBase`)
- OG image: LogoMark is SVG; needs to be rendered to 1200×630 PNG with `#0a0a0a` background — design task, not code
- Whether any page will use `font-mono` — if not, remove Tailwind config override

---
*Stack research: 2026-06-10*
