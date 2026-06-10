# Architecture Research: Next.js 14 Static Marketing Site

**Domain:** Next.js 14 App Router static export, B2B marketing site
**Date:** 2026-06-10
**Confidence:** HIGH — verified against official Next.js documentation

---

## Key Findings

### 1. File/Folder Conventions

App Router uses folder-per-segment under `app/`. A route is public only when it contains a `page.tsx`. Everything else (components, data helpers) lives outside `app/` or in `_prefixed` private folders inside it.

Keep `app/` purely for routing:
```
app/
  layout.tsx          ← already exists
  page.tsx            ← home
  not-found.tsx       ← add before launch
  solutions/
    page.tsx          ← solutions index
    [slug]/
      page.tsx        ← solution detail
  work/
    page.tsx
  about/
    page.tsx
```

### 2. Data Layer — TypeScript Constants in `lib/`

No CMS, no MDX, no JSON. Four solutions + one work entry = small, stable, developer-owned content.

**Pattern: typed `const` arrays in `lib/` with exported helper functions:**

```
lib/
  solutions.ts   ← SOLUTIONS array + getSolution(slug) + getSolutionSlugs()
  work.ts        ← PROJECTS array
```

Pages import helpers, not raw arrays. Gives compile-time validation and a clean adapter boundary if a CMS is ever added later.

### 3. `generateStaticParams` — Required, Not Optional

With `output: "export"`, every dynamic route **must** have `generateStaticParams`. Omitting it causes a build error.

```tsx
// app/solutions/[slug]/page.tsx
export async function generateStaticParams() {
  return getSolutionSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false; // 404 for unknown slugs, not 500
```

The `params` prop is a `Promise` in Next.js 14+ — always `await params` before accessing fields:

```tsx
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // ...
}
```

### 4. Component Organization

Three tiers:

| Tier | Location | Contents |
|------|----------|---------|
| Layout-level | `components/` root | `Navbar`, `Footer`, `LogoMark` — already here |
| Atoms | `components/ui/` | `Button`, `Badge`, `Card` |
| Composites | `components/sections/` | `Hero`, `SolutionCard`, `WorkCard`, `SectionHeader` |
| Page-specific | `app/[route]/_components/` | Underscore opts them out of routing |

### 5. Image Handling

`images: { unoptimized: true }` in `next.config.mjs` (already set). Use `next/image` with explicit `width`/`height` props. Static assets in `public/images/`.

No Cloudinary loader needed at this scale.

### 6. Layout Nesting — Single Root Layout Only

All pages share the same Navbar + Footer shell. No section has a persistent sidebar or secondary nav.

**Do not add `app/solutions/layout.tsx`.** Add nested layouts only when a section genuinely needs UI absent from all other sections. For this site, one root layout is correct.

### 7. Per-Page SEO

```tsx
// root layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://sdttech.co"),
  title: { template: "%s | SDT tech", default: "SDT tech" },
  description: siteConfig.tagline,
};

// app/solutions/page.tsx
export const metadata: Metadata = {
  title: "Solutions",
  description: "Intelligent operations software for fleet, IoT, logistics, and AI.",
};

// app/solutions/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  return { title: solution.title, description: solution.tagline };
}
```

Both are Server Component-only APIs — **never add `'use client'` to page files**.

### 8. Suggested Build Order

Build in this sequence to eliminate rework:

1. `config/site.ts` — brand values (name, email) updated to real values
2. `lib/solutions.ts` + `lib/work.ts` — data layer
3. `components/ui/Button`, `Badge`, `Card` — atoms
4. `components/sections/SectionHeader` — shared section header
5. `app/not-found.tsx` — required before any deploy
6. `app/solutions/page.tsx` + `SolutionCard` — solutions index
7. `app/solutions/[slug]/page.tsx` — solution detail pages
8. `app/work/page.tsx` + `WorkCard` — work page
9. `app/about/page.tsx` — about page
10. `app/page.tsx` — home (builds last; teases content from every other page)
11. Launch prep: favicon, OG metadata, mobile nav, `.gitignore` audit, `sitemap.xml`, `robots.txt`

---

## Open Questions

- **Git:** `.next/` and `out/` appear tracked by git — add to `.gitignore` before first deploy (concrete action, not research question)
- **Domain:** `sdttech.co` needs confirmation before setting `metadataBase` in root layout
- **Solution slugs:** Final naming agreement (`fleet-mobility`, `iot-hardware`, `logistics-intelligence`, `ai-operations`) needed before `lib/solutions.ts` is created — changing slugs after the Work page links to them requires updating both files

---
*Architecture research: 2026-06-10 — verified against official Next.js docs*
