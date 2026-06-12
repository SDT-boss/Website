# Phase 4: Launch Prep — Research

**Researched:** 2026-06-12
**Domain:** Next.js 14 App Router metadata, favicon conventions, SEO files, static asset creation, Vercel deployment
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LAUNCH-01 | Favicon set — favicon.ico (32×32 multi-size ICO), icon.png (512×512), apple-touch-icon.png (180×180) in /public/ | File placement: app/ directory for App Router automatic pickup; existing app/favicon.ico confirmed in out/. icon.png and apple-touch-icon.png go in app/ as `icon.png` and `apple-icon.png`. ICO generation: ImageMagick `convert` confirmed available and capable. |
| LAUNCH-02 | OG metadata — metadataBase + openGraph.images + twitter.card in root layout.tsx; static og.png (1200×630) in /public/ | metadataBase goes in app/layout.tsx (root), confirmed by official docs. og.png must be pre-generated static PNG — no next/og runtime. ImageMagick can produce 1200×630 PNG. og.png goes in /public/ (served at /og.png). |
| LAUNCH-03 | Per-page metadata — unique title + description on all 6 page routes | Static `metadata` export on simple pages; `generateMetadata` with params on slug page. Title template in root layout enables `%s — SDT tech` pattern. Home page uses `title.absolute` to override template. All 8 title/description strings specified in UI-SPEC. |
| LAUNCH-04 | SEO files — /public/sitemap.xml (24 URLs: 8 routes × 3 locales) and /public/robots.txt | Hand-authored XML. Base URL: https://sdt.technology. Locale pattern: /en/, /id/, /zh/ prefix. All 24 URLs enumerated in research. |
| LAUNCH-05 | Branded 404 page — upgrade app/[locale]/not-found.tsx and add root app/not-found.tsx | Existing stub confirmed. Visual spec in UI-SPEC. Root app/not-found.tsx needed for paths outside [locale] segment. No server-only APIs used. |
| LAUNCH-06 | Vercel deploy — site live at sdt.technology via Cloudflare grey-cloud DNS | Cloudflare DNS-only (grey-cloud) required — orange-cloud causes redirect loops. Vercel CLI not installed; deploy via Vercel dashboard or `npx vercel` (one-time). |
| LAUNCH-07 | Deploy hold — site not published publicly until owner approves | Vercel Password Protection or deploy preview URL approach. Owner approves before custom domain traffic goes live. |
</phase_requirements>

---

## Summary

Phase 4 is a pure finishing phase: metadata wiring, static asset creation, SEO files, and a live Vercel deploy. No new UI patterns are introduced beyond the branded 404 upgrade. The codebase already has a working App Router structure with `app/[locale]/` routing, so all metadata tasks follow standard Next.js 14 file-convention and metadata-object patterns.

The biggest practical task is **static image creation** (favicon.ico, icon.png, apple-touch-icon.png, og.png). These cannot be generated at runtime because `output: "export"` prevents it. The local machine has **ImageMagick `convert`** installed and confirmed working for SVG-to-PNG and multi-size ICO creation. The logo SVG geometry is defined in `components/LogoMark.tsx` (two ellipses: volt-green `#96D02C` top-left, cyber-jade `#008684` bottom-right, on `#0a0a0a` background).

The Next.js metadata inheritance model requires careful placement: `metadataBase` and OG defaults in the **root `app/layout.tsx`**, per-page overrides as static `metadata` exports on each page file, and `generateMetadata` only on the solution detail slug page (which needs `params.slug` to construct the title).

**Primary recommendation:** Implement in waves — (1) images first, (2) metadata wiring, (3) SEO files + 404 upgrade, (4) Vercel deploy and DNS.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Favicon set (ICO, PNG) | Static asset / `app/` directory | — | Next.js App Router picks up `favicon.ico`, `icon.png`, `apple-icon.png` from `app/` automatically and emits correct `<link>` tags |
| OG image (og.png) | Static asset / `/public/` | — | Referenced by URL path `/og.png`; must be in `/public/` for static export to serve it |
| metadataBase + OG/Twitter defaults | Root layout (`app/layout.tsx`) | — | `metadataBase` applies site-wide only when set in root layout, not locale layout |
| Per-page title + description | Each page file (`app/[locale]/*/page.tsx`) | — | Metadata exports are per-segment; page-level metadata overrides layout defaults |
| Sitemap + robots.txt | Static files in `/public/` | — | Static export serves `/public/` contents at root URL path; no API route needed |
| 404 page | `app/[locale]/not-found.tsx` + `app/not-found.tsx` | — | Locale not-found catches errors within the locale segment; root not-found catches paths outside it |
| Vercel deploy + DNS | DevOps / external | — | No code changes; Vercel dashboard + Cloudflare DNS panel |

---

## Standard Stack

### Core (already installed — no new packages)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 14.2.29 | App Router metadata API, favicon file conventions | Already in project [VERIFIED: npm registry] |
| next-intl | 4.13.0 | Locale routing (no metadata changes needed) | Already in project [VERIFIED: npm registry] |

### Supporting Tools (external, not npm)

| Tool | Version | Purpose | Availability |
|------|---------|---------|--------------|
| ImageMagick `convert` | 7.1.0-2 | Create favicon.ico (multi-size ICO), resize PNGs, create og.png | Confirmed installed at `/usr/local/bin/convert` [VERIFIED: local env] |

**No new npm packages are required for Phase 4.** All metadata work uses built-in Next.js APIs. Image creation uses the locally available ImageMagick.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| ImageMagick for image creation | Online favicon generators (favicon.io, realfavicongenerator.net) | Online tools require manual upload/download — acceptable if executor prefers; ImageMagick is scriptable and already available |
| Static `metadata` export | `generateMetadata` on all pages | `generateMetadata` is only needed when metadata depends on dynamic params (slug page). Static export is simpler and sufficient for all other routes. |
| Hand-authored sitemap.xml | next-sitemap npm package | next-sitemap is overkill for a 24-URL static site; hand-authoring is the right approach here |

---

## Package Legitimacy Audit

> Phase 4 installs NO new npm packages. This section is not applicable.

No new packages are added in this phase. All capabilities use existing project dependencies (next, next-intl) and local system tools (ImageMagick). No legitimacy gate required.

---

## Architecture Patterns

### System Architecture Diagram

```
Static Asset Creation (ImageMagick)
  SVG source (LogoMark geometry)
    → convert → icon.png (512×512)        → app/icon.png
    → convert → apple-icon.png (180×180)   → app/apple-icon.png
    → convert → favicon.ico (16+32px ICO)  → app/favicon.ico (replace existing stub)
    → convert → og.png (1200×630)          → public/og.png

Build Time (npm run build)
  app/favicon.ico          → Next.js emits <link rel="icon"> in <head>
  app/icon.png             → Next.js emits <link rel="icon" sizes="512x512">
  app/apple-icon.png       → Next.js emits <link rel="apple-touch-icon">
  app/layout.tsx metadata  → metadataBase resolves relative paths to https://sdt.technology
                           → OG + Twitter default tags in all pages' <head>
  app/[locale]/*/page.tsx  → per-page metadata merges with root layout (title, description)
  public/sitemap.xml       → copied as-is to out/sitemap.xml
  public/robots.txt        → copied as-is to out/robots.txt

Runtime (browser / crawler)
  /favicon.ico             → served from out/favicon.ico
  /og.png                  → served from out/og.png
  /sitemap.xml             → served from out/sitemap.xml
  /robots.txt              → served from out/robots.txt
  /en/                     → <title> and <meta> from merged metadata
  invalid path             → 404 page (branded not-found.tsx)
```

### Recommended Project Structure (additions only)

```
app/
  favicon.ico              # REPLACE existing 16px stub with proper 32+16 multi-size ICO
  icon.png                 # NEW — 512×512 logo mark on #0a0a0a
  apple-icon.png           # NEW — 180×180 logo mark on #0a0a0a (20px padding)
  layout.tsx               # MODIFY — add metadataBase + openGraph + twitter defaults
  not-found.tsx            # NEW — root 404 for paths outside [locale] segment
  [locale]/
    not-found.tsx          # MODIFY — upgrade existing stub to branded spec
    page.tsx               # MODIFY — add metadata export (title.absolute + description)
    solutions/
      page.tsx             # MODIFY — add metadata export
      [slug]/
        page.tsx           # MODIFY — add generateMetadata (needs params.slug)
    work/
      page.tsx             # MODIFY — add metadata export
    about/
      page.tsx             # MODIFY — add metadata export
public/
  og.png                   # NEW — 1200×630 static OG image
  sitemap.xml              # NEW — hand-authored, 24 URLs
  robots.txt               # NEW
```

### Pattern 1: Root Layout Metadata with Title Template

**What:** Set `metadataBase`, OG defaults, Twitter defaults, and a title template in the root layout so all child pages inherit them.
**When to use:** Always — this is the single source of site-wide SEO defaults.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
// app/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://sdt.technology"),
  title: {
    template: "%s — SDT tech",
    default: "SDT tech — Infrastructure for intelligent operations.",
  },
  description: "SDT tech builds hardware-aware fleet mobility, IoT, logistics, and AI operations systems for enterprise operators.",
  openGraph: {
    siteName: "SDT tech",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SDT tech — Infrastructure for intelligent operations.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};
```

### Pattern 2: Static Per-Page Metadata (simple pages)

**What:** Export a static `metadata` object from each page file.
**When to use:** All pages except solution detail slug (which needs params).

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// app/[locale]/solutions/page.tsx (example)

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  // Result: "Solutions — SDT tech" (template applied)
  description: "Four production-grade systems covering fleet mobility, IoT hardware, logistics intelligence, and AI-driven operations.",
};
```

### Pattern 3: Home Page Uses title.absolute (not template)

**What:** The home page title "SDT tech — Infrastructure for intelligent operations." does not use the `%s —` template pattern — it IS the full title. Use `title.absolute` to bypass the template.
**When to use:** Home page only.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#absolute
// app/[locale]/page.tsx

export const metadata: Metadata = {
  title: {
    absolute: "SDT tech — Infrastructure for intelligent operations.",
  },
  description: "SDT tech builds hardware-aware fleet mobility, IoT, logistics, and AI operations systems for enterprise operators.",
};
```

### Pattern 4: generateMetadata for Solution Detail Page

**What:** The solution detail page needs `params.slug` to look up the correct title and description.
**When to use:** `app/[locale]/solutions/[slug]/page.tsx` only.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
// app/[locale]/solutions/[slug]/page.tsx

import type { Metadata } from "next";

const slugMeta: Record<string, { title: string; description: string }> = {
  "fleet-mobility": {
    title: "Fleet Mobility",
    description: "Real-time fleet tracking and dispatch for EV and mixed fleets. Built for operators managing high-utilisation vehicles at scale.",
  },
  "iot-hardware": {
    title: "IoT Hardware",
    description: "Industrial IoT devices and edge firmware for connected operations. Hardened for field deployment in transport and logistics.",
  },
  "logistics-intelligence": {
    title: "Logistics Intelligence",
    description: "Data pipelines and routing logic that turn raw fleet telemetry into operational decisions. Built for last-mile and mid-mile operations.",
  },
  "ai-operations": {
    title: "AI Operations",
    description: "Machine learning systems that surface anomalies, forecast demand, and automate triage for complex transport operations.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = slugMeta[slug];
  if (!meta) return {};
  return {
    title: meta.title,
    // Result: "Fleet Mobility — SDT tech" (template applied)
    description: meta.description,
  };
}
```

### Pattern 5: Next.js App Router Favicon File Conventions

**What:** Place image files in `app/` directory (not `public/`). Next.js auto-generates the correct `<link>` tags.
**When to use:** All favicon/icon assets.

```
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
app/favicon.ico       → <link rel="icon" href="/favicon.ico" sizes="any" />
app/icon.png          → <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
app/apple-icon.png    → <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
```

**Critical:** `favicon` can ONLY be in `app/` root (not in subdirectories). [VERIFIED: official docs]
**Critical:** The existing `app/favicon.ico` is a 16×16 stub and must be replaced with a multi-size ICO. [VERIFIED: local env — `file app/favicon.ico` output: "1 icon, 16x16"]

### Pattern 6: ImageMagick Commands for Asset Creation

**What:** Confirmed working ImageMagick commands for all required image assets.
**When to use:** During asset creation subtask.

```bash
# Step 1: Create SVG source for logo mark (two ellipses from LogoMark.tsx geometry)
# Write SVG to temp file, then convert

# Step 2: Create icon.png (512×512)
convert -size 512x512 xc:"#0a0a0a" \
  -fill "#008684" -draw "ellipse 341,341 85,142 0,360" \
  -fill "#96D02C" -draw "ellipse 171,171 85,142 0,360" \
  public_icon_512.png

# Note: For accurate logo mark rendering matching LogoMark.tsx (rotated ellipses),
# create an intermediate SVG and convert:
# Step 2a: Write SVG matching LogoMark.tsx viewBox="0 0 36 36" geometry
# Step 2b: convert -background "#0a0a0a" -density 300 logo.svg -resize 512x512 app/icon.png

# Step 3: Create apple-icon.png (180×180, 20px padding = logo at 140×140)
convert app/icon.png -resize 140x140 -gravity center \
  -background "#0a0a0a" -extent 180x180 app/apple-icon.png

# Step 4: Create favicon.ico (multi-size: 16×16 + 32×32)
convert app/icon.png -resize 32x32 /tmp/icon32.png
convert app/icon.png -resize 16x16 /tmp/icon16.png
convert /tmp/icon32.png /tmp/icon16.png app/favicon.ico
# Verified: ImageMagick produces valid multi-size ICO [VERIFIED: local env test]

# Step 5: Create og.png (1200×630)
# Use ImageMagick with Inter font substitute (Helvetica or system sans-serif)
# OR create a minimal HTML file and use a browser screenshot tool
# OR use the approach below with convert:
convert -size 1200x630 xc:"#0a0a0a" \
  -fill white -font Helvetica-Bold -pointsize 36 \
  -gravity center -annotate +0-40 "SDT tech" \
  -fill "#a1a1aa" -font Helvetica -pointsize 20 \
  -gravity center -annotate +0+20 "Infrastructure for intelligent operations." \
  public/og.png
# Note: Inter font not available to ImageMagick; Helvetica is acceptable fallback for a static OG image.
# For pixel-perfect Inter, use the Node.js approach documented in Anti-Patterns section.
```

### Pattern 7: Sitemap XML Structure

**What:** Hand-authored XML with all 24 URLs (8 routes × 3 locales).
**When to use:** Create `/public/sitemap.xml`.

```xml
<!-- Source: https://www.sitemaps.org/protocol.html — standard sitemap schema -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home: priority 1.0 -->
  <url><loc>https://sdt.technology/en/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://sdt.technology/id/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://sdt.technology/zh/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <!-- Solutions index: priority 0.9 -->
  <url><loc>https://sdt.technology/en/solutions/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://sdt.technology/id/solutions/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://sdt.technology/zh/solutions/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <!-- Solution details: priority 0.8 — 4 slugs × 3 locales = 12 URLs -->
  <url><loc>https://sdt.technology/en/solutions/fleet-mobility/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <!-- ... (full list in PLAN) -->
  <!-- Work: priority 0.8 -->
  <!-- About: priority 0.7 -->
</urlset>
```

**Note on trailing slashes:** `next.config.mjs` has `trailingSlash: true` — all URLs in the sitemap MUST use trailing slashes. [VERIFIED: local env — next.config.mjs confirmed]

### Anti-Patterns to Avoid

- **next/og or @vercel/og for og.png**: These require a runtime server. `output: "export"` mode has no runtime. Using these will cause a build error. [VERIFIED: official docs — "ImageResponse requires a server environment"]
- **Placing favicon.ico in /public/ instead of app/**: The App Router picks up favicon files from `app/`, not `public/`. A `public/favicon.ico` is served as a plain static file but does NOT get the `<link rel="icon">` tag injected automatically. [VERIFIED: official docs]
- **Using title.template on the home page title**: The home page title "SDT tech — Infrastructure for intelligent operations." must use `title.absolute` — using a plain string would produce "SDT tech — Infrastructure for intelligent operations. — SDT tech" (double suffix). [VERIFIED: official docs — template applies to the string, absolute bypasses it]
- **Putting metadataBase in app/[locale]/layout.tsx**: This would only apply to locale routes, not the root redirect at `/`. Root layout is correct. [VERIFIED: official docs — "metadataBase is typically set in root app/layout.js"]
- **Orange-cloud (proxied) DNS in Cloudflare**: Vercel custom domains require DNS-only grey-cloud records. Orange-cloud routes through Cloudflare's proxy, which conflicts with Vercel's SSL termination and causes redirect loops. [ASSUMED — from STATE.md documented concern, standard Vercel guidance]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Favicon `<link>` tag injection | Custom `<link>` tags in layout.tsx `<head>` | Place `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` files | Next.js App Router auto-generates correct `rel`, `type`, `sizes` attributes from file metadata |
| Per-page OG metadata inheritance | Duplicate OG image fields on every page | Set once in root layout `openGraph.images`; child pages inherit unless they override | Next.js shallowly merges metadata objects — root layout openGraph is inherited by pages that don't override it |
| Dynamic sitemap generation | Sitemap API route or next-sitemap package | Hand-authored `/public/sitemap.xml` | 24 URLs is trivially small; static XML is simpler, faster, and works with static export |
| Runtime OG image | `next/og`, `@vercel/og` | Pre-generated static `/public/og.png` | Static export has no runtime |

**Key insight:** Next.js 14 App Router handles all favicon and metadata tag generation automatically from file conventions and metadata object exports. The entire phase is wiring and file placement — no custom rendering logic needed.

---

## Common Pitfalls

### Pitfall 1: Metadata Merge Overwrites Entire openGraph Object
**What goes wrong:** A page-level `metadata` export sets only `title` and `description`, intending to inherit the root layout's `openGraph.images`. But it also sets `openGraph: { title: "..." }` — this replaces the ENTIRE `openGraph` object, losing the `images` field.
**Why it happens:** Next.js metadata merging is **shallow**, not deep. Setting any `openGraph` key in a child wipes all `openGraph` keys from the parent.
**How to avoid:** Either (a) repeat `openGraph.images` on every page that sets `openGraph`, or (b) only override `title` and `description` at page level (do not set `openGraph` at page level at all — inherit the full root layout openGraph). Option (b) is correct for this project.
**Warning signs:** OG previews show no image for specific pages even though og.png exists.
[VERIFIED: official docs — "openGraph fields from app/layout.js are replaced in app/blog/page.js because app/blog/page.js sets openGraph metadata"]

### Pitfall 2: Existing favicon.ico Is a 16×16 Stub
**What goes wrong:** The existing `app/favicon.ico` was auto-generated as a placeholder (confirmed: "1 icon, 16x16, 24 bits/pixel"). Modern browsers expect 32×32 minimum; some expect a multi-size ICO.
**Why it happens:** Next.js `create-next-app` places a generic stub favicon.
**How to avoid:** Replace `app/favicon.ico` with a proper multi-size ICO (16×16 + 32×32) created from the logo mark SVG.
**Warning signs:** Browser tab shows a blurry or generic icon.
[VERIFIED: local env — `file app/favicon.ico` confirms stub]

### Pitfall 3: trailingSlash Must Match Sitemap URLs
**What goes wrong:** Sitemap lists `https://sdt.technology/en` but the site serves `https://sdt.technology/en/`. Crawlers follow the redirect and may downrank or skip indexing.
**Why it happens:** `next.config.mjs` has `trailingSlash: true`, which means all routes have a trailing slash in the static export.
**How to avoid:** All sitemap `<loc>` values must end with `/`.
**Warning signs:** Redirect chains in Google Search Console after sitemap submission.
[VERIFIED: local env — next.config.mjs confirmed `trailingSlash: true`]

### Pitfall 4: app/not-found.tsx Root 404 Is Missing
**What goes wrong:** A user navigates to `/invalid-path` (outside the `[locale]` segment). Only `app/[locale]/not-found.tsx` exists — it only catches 404s within locale routes. Root-level invalid paths fall back to Next.js's default empty 404.
**Why it happens:** The existing stub was placed in `app/[locale]/` only.
**How to avoid:** Add `app/not-found.tsx` at the root level with the same visual spec (or a minimal equivalent). It does not need to be locale-aware.
**Warning signs:** `/undefined-path` shows a blank page or the Next.js default 404 instead of the branded page.
[CITED: nextjs.org/docs/app/api-reference/file-conventions/not-found]

### Pitfall 5: generateMetadata params Is Now a Promise (Next.js 14 / 15)
**What goes wrong:** The solution detail `generateMetadata` function tries `params.slug` (synchronous access) — this may fail or produce undefined in newer Next.js versions where `params` is a Promise.
**Why it happens:** The codebase already uses `await params` in page components (confirmed in solution detail page). `generateMetadata` must do the same.
**How to avoid:** Always `const { slug } = await params` in `generateMetadata`.
**Warning signs:** TypeScript error or undefined slug at build time.
[VERIFIED: official docs — version history "v16.0.0: params is now a promise that resolves to an object"; the project is on 14.2.29 where this behavior was being introduced]

### Pitfall 6: Vercel + Cloudflare Orange-Cloud Redirect Loop
**What goes wrong:** Cloudflare DNS set to orange-cloud (proxied) for the `sdt.technology` A/CNAME record causes Vercel to issue an SSL certificate for a domain it can't verify, and Cloudflare creates a redirect loop with its own SSL termination.
**Why it happens:** Both Vercel and Cloudflare want to handle SSL at the edge.
**How to avoid:** Set Cloudflare DNS record to grey-cloud (DNS Only) mode. Vercel handles SSL directly.
**Warning signs:** ERR_TOO_MANY_REDIRECTS in browser; Vercel domain verification fails.
[ASSUMED — documented in STATE.md as known concern; consistent with standard Vercel documentation guidance]

---

## SEO Files: Complete URL List

The planner will use this to generate the sitemap.xml directly.

**All 24 URLs** (`trailingSlash: true` confirmed):

```
https://sdt.technology/en/           priority 1.0
https://sdt.technology/id/           priority 1.0
https://sdt.technology/zh/           priority 1.0
https://sdt.technology/en/solutions/ priority 0.9
https://sdt.technology/id/solutions/ priority 0.9
https://sdt.technology/zh/solutions/ priority 0.9
https://sdt.technology/en/solutions/fleet-mobility/        priority 0.8
https://sdt.technology/id/solutions/fleet-mobility/        priority 0.8
https://sdt.technology/zh/solutions/fleet-mobility/        priority 0.8
https://sdt.technology/en/solutions/iot-hardware/          priority 0.8
https://sdt.technology/id/solutions/iot-hardware/          priority 0.8
https://sdt.technology/zh/solutions/iot-hardware/          priority 0.8
https://sdt.technology/en/solutions/logistics-intelligence/ priority 0.8
https://sdt.technology/id/solutions/logistics-intelligence/ priority 0.8
https://sdt.technology/zh/solutions/logistics-intelligence/ priority 0.8
https://sdt.technology/en/solutions/ai-operations/         priority 0.8
https://sdt.technology/id/solutions/ai-operations/         priority 0.8
https://sdt.technology/zh/solutions/ai-operations/         priority 0.8
https://sdt.technology/en/work/      priority 0.8
https://sdt.technology/id/work/      priority 0.8
https://sdt.technology/zh/work/      priority 0.8
https://sdt.technology/en/about/     priority 0.7
https://sdt.technology/id/about/     priority 0.7
https://sdt.technology/zh/about/     priority 0.7
```

---

## Per-Page Metadata Reference (from UI-SPEC)

Complete set — executor transcribes exactly:

| Route | title value | description |
|-------|-------------|-------------|
| Home (`app/[locale]/page.tsx`) | `{ absolute: "SDT tech — Infrastructure for intelligent operations." }` | `"SDT tech builds hardware-aware fleet mobility, IoT, logistics, and AI operations systems for enterprise operators."` |
| Solutions index | `"Solutions"` → "Solutions — SDT tech" | `"Four production-grade systems covering fleet mobility, IoT hardware, logistics intelligence, and AI-driven operations."` |
| Fleet Mobility | `"Fleet Mobility"` → "Fleet Mobility — SDT tech" | `"Real-time fleet tracking and dispatch for EV and mixed fleets. Built for operators managing high-utilisation vehicles at scale."` |
| IoT Hardware | `"IoT Hardware"` → "IoT Hardware — SDT tech" | `"Industrial IoT devices and edge firmware for connected operations. Hardened for field deployment in transport and logistics."` |
| Logistics Intelligence | `"Logistics Intelligence"` → "Logistics Intelligence — SDT tech" | `"Data pipelines and routing logic that turn raw fleet telemetry into operational decisions. Built for last-mile and mid-mile operations."` |
| AI Operations | `"AI Operations"` → "AI Operations — SDT tech" | `"Machine learning systems that surface anomalies, forecast demand, and automate triage for complex transport operations."` |
| Work | `"Work"` → "Work — SDT tech" | `"Production deployments built by SDT tech. Starting with EV Fleet Operations — a live system managing electric vehicle fleets."` |
| About | `"About"` → "About — SDT tech" | `"SDT tech builds infrastructure-grade software for operators who run complex systems at scale. Jakarta-based. Production-focused."` |

---

## 404 Page Upgrade Spec

Current `app/[locale]/not-found.tsx` has the right structure but needs:
1. Gap increased: `gap-4` → `gap-8`
2. `<LogoMark />` component added above the error block (40px height)
3. Heading `<h1>` element added: "Page not found" — 20px, weight 600, text-white
4. Body copy updated: "The URL you followed doesn't exist or has moved." (current: "This page does not exist.")
5. Return link text updated: "Back to home" (current: "Return to SDT tech")
6. Remove `siteConfig` import (no longer needed for the link text)

New root `app/not-found.tsx`: same visual spec, no locale-awareness needed (plain `href="/"`).

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual `<head>` tags in `_document.js` (Pages Router) | `metadata` export / file conventions in App Router | Next.js 13.2 | No `_document.js` in this project — use metadata object |
| `next/og` runtime generation | Pre-generated static PNG for static export | Always required for `output: "export"` | Must use ImageMagick or equivalent |
| Separate `next-sitemap` package | Hand-authored XML in /public/ | Not applicable (small site) | No dependency needed |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Cloudflare grey-cloud (DNS-only) records required to avoid redirect loops with Vercel | Common Pitfalls #6 | If wrong, executor would need to troubleshoot DNS/SSL setup — but this is the universal Vercel+Cloudflare guidance |
| A2 | `generateMetadata` with `await params` is the correct pattern for the slug page (not synchronous params access) | Pattern 4 | Synchronous access may work on Next.js 14.2.29 — but async is forward-compatible and matches how page components already work in this codebase |
| A3 | Helvetica is an acceptable font substitute for Inter in ImageMagick-generated og.png | Pattern 6 | OG images are decorative previews; the minor font difference is not visible at the compression level social platforms apply. If pixel-perfect is required, executor should use a browser screenshot approach. |

---

## Open Questions

1. **Who creates the favicon/OG images — the executor or the owner?**
   - What we know: ImageMagick is available locally and capable of rendering SVG geometry to PNG/ICO.
   - What's unclear: Whether the owner wants design review before the images are committed.
   - Recommendation: Planner should include image creation as a code task (ImageMagick script); if the owner wants to manually review, add a checkpoint before committing to `app/`.

2. **Deploy hold mechanism (LAUNCH-07)**
   - What we know: The site goes live on Vercel, but public traffic to `sdt.technology` should not start until owner approves.
   - What's unclear: The preferred hold mechanism — (a) don't set the custom domain in Vercel until approval, (b) use Vercel Password Protection, or (c) deploy to a Vercel preview URL first.
   - Recommendation: Option (a) is simplest — deploy to Vercel, confirm it works on the `*.vercel.app` URL, then add the custom domain only after owner approval. No Vercel config changes needed.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | npm run build | Yes | v18.20.8 | — |
| npm | package install | Yes | 10.8.2 | — |
| ImageMagick `convert` | Favicon + OG image creation | Yes | 7.1.0-2 | Online favicon generator (manual) |
| Vercel CLI | LAUNCH-06 deploy | No | — | Use Vercel dashboard UI or `npx vercel` |
| Ghostscript (gs) | ImageMagick SVG rendering | Yes | 9.54.0 | — (confirmed SVG→PNG works via test) |

**Missing dependencies with no fallback:** None that block execution.

**Missing dependencies with fallback:**
- Vercel CLI: Not installed. Use Vercel dashboard (browser) or `npx vercel` for one-time deploy. No code changes required.

---

## Validation Architecture

> `workflow.nyquist_validation` is `false` in `.planning/config.json`. This section is skipped per config.

---

## Security Domain

> Phase 4 adds no authentication, no user input handling, no API endpoints, and no secrets to the codebase. Static metadata and SEO files present no ASVS-relevant threat surface.

The only externally-visible changes (og.png, sitemap.xml, robots.txt) are public read-only files. No security domain analysis is required for this phase.

---

## Project Constraints (from CLAUDE.md)

All of the following remain in force for Phase 4:

- **Static export only**: `output: "export"` in next.config.mjs. No API routes, no server components with data fetching, no `next/og` runtime generation.
- **Volt Green rule**: One `volt-green` / `#96D02C` CTA per page maximum. Phase 4 introduces no new CTAs; the 404 page uses cyber-jade per rule.
- **No box shadows**: Use `border` + background contrast only.
- **Transitions**: `duration-150 ease-out` only.
- **Config/copy single source of truth**: Company name, email, tagline from `config/site.ts`.
- **Tailwind tokens**: Use design tokens (`bg-background`, `text-cyber-jade`, etc.) — no raw hex values in className.
- **Font**: `font-sans` (Inter via `--font-inter`). Monospace via `font-mono` for code/ID strings (used in 404 error code).
- **Emoji restriction**: No emojis in code or copy (relevant: 404 page copy confirmed emoji-free in UI-SPEC).

---

## Sources

### Primary (HIGH confidence)
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons — favicon, icon, apple-icon file conventions (fetched 2026-06-12)
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata — metadataBase, openGraph, twitter, title template, generateMetadata patterns (fetched 2026-06-12)
- Local env: `file app/favicon.ico` confirmed 16×16 stub; `ls out/favicon.ico` confirmed App Router emits favicon to static output
- Local env: `convert` tested — multi-size ICO and PNG creation both confirmed working

### Secondary (MEDIUM confidence)
- next.config.mjs in project — `trailingSlash: true` and `output: "export"` confirmed
- `lib/solutions.ts` in project — 4 solution slugs confirmed: fleet-mobility, iot-hardware, logistics-intelligence, ai-operations
- `app/[locale]/not-found.tsx` in project — existing stub structure confirmed
- `components/LogoMark.tsx` in project — SVG geometry (two ellipses, viewBox 0 0 36 36) confirmed

### Tertiary (LOW confidence — noted as ASSUMED)
- Cloudflare grey-cloud guidance (A1): from STATE.md documented concern; consistent with Vercel docs but not independently fetched

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified package versions from npm registry and local environment
- Architecture: HIGH — metadata patterns verified directly from official Next.js docs (fetched current)
- Pitfalls: HIGH for code pitfalls (verified docs); MEDIUM for DevOps pitfall (Cloudflare — documented concern)
- Image creation: HIGH — ImageMagick commands tested locally

**Research date:** 2026-06-12
**Valid until:** 2026-07-12 (stable APIs — 30 days)
