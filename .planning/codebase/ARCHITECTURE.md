# Architecture

**Analysis Date:** 2026-06-10

## Pattern

**Static Site Generation (SSG)** — Next.js 14 App Router configured with `output: "export"`. No server-side rendering, no API routes, no dynamic data fetching. All pages compile to flat HTML/CSS/JS at build time.

## Layers

```
┌─────────────────────────────────────┐
│  Config Layer                       │
│  config/site.ts — single source of  │
│  truth for name, tagline, email     │
├─────────────────────────────────────┤
│  Layout Layer                       │
│  app/layout.tsx — root shell        │
│  Wraps every page: Navbar + main    │
│  + Footer. Font loaded here.        │
├─────────────────────────────────────┤
│  Page Layer                         │
│  app/page.tsx (home, placeholder)   │
│  Future: app/solutions/, /work/,    │
│  /about/ — each gets own page.tsx   │
├─────────────────────────────────────┤
│  Component Layer                    │
│  components/ — shared UI pieces     │
│  LogoMark, Navbar, Footer           │
├─────────────────────────────────────┤
│  Style Layer                        │
│  tailwind.config.ts — design tokens │
│  app/globals.css — base resets      │
└─────────────────────────────────────┘
```

## Data Flow

- No runtime data fetching — all content is hardcoded or from `config/site.ts`
- `siteConfig` is a typed const object imported directly into components at build time
- No state management library — React component state only (currently none needed)
- No API routes, no backend calls, no database

## Entry Points

| Entry | Purpose |
|-------|---------|
| `app/layout.tsx` | Root layout — wraps all pages with Navbar + Footer |
| `app/page.tsx` | Home page — currently a placeholder scaffold |
| `app/globals.css` | Global CSS — Tailwind imports + selection color |

## Abstractions

**`siteConfig`** (`config/site.ts`) — The only shared data abstraction. All components that need company name, email, or tagline import from here. Single place to update brand identity.

**`LogoMark`** (`components/LogoMark.tsx`) — Reusable SVG logo component with `size` and `className` props. Used in both Navbar and Footer at different sizes.

**`Navbar` / `Footer`** — Layout-level components, rendered once per page via root layout. Not composable at the page level.

## Design Constraints

- No box shadows — use `border` + background contrast for depth
- No bounce/spring transitions — `duration-150 ease-out` only
- `volt-green` reserved for primary CTA only (never in nav/footer/badges)
- Max content width: `1200px` (`max-w-content`)
- Dark-first: `bg-[#0a0a0a]` body, surfaces use `surface` / `surface-2` tokens

## Build Output

```
npm run build  →  /out/
  index.html
  404.html
  _next/static/  (chunked JS + CSS)
```

Static files can be deployed to any CDN/static host — no Node.js process needed.

---

*Architecture analysis: 2026-06-10*
