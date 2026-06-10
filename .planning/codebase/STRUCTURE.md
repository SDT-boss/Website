# Project Structure

**Analysis Date:** 2026-06-10

## Directory Layout

```
/Users/shannendorothee/Projects/Website/
├── app/                        # Next.js App Router pages + global styles
│   ├── globals.css             # Tailwind base/components/utilities + selection color
│   ├── layout.tsx              # Root layout — Navbar + Footer shell, font loading
│   └── page.tsx                # Home page (placeholder "scaffold ready")
│
├── components/                 # Shared React components
│   ├── Footer.tsx              # Site footer — logo, email, tagline, copyright
│   ├── LogoMark.tsx            # SVG logo mark — two overlapping ellipses
│   └── Navbar.tsx              # Sticky header — logo, nav links, CTA button
│
├── config/                     # Project-wide constants
│   └── site.ts                 # siteConfig: name, tagline, email
│
├── .planning/                  # GSD project planning artifacts
│   └── codebase/               # Codebase map documents (this directory)
│
├── out/                        # Static export output (git-ignored)
│   └── (generated HTML/CSS/JS)
│
├── node_modules/               # Dependencies (git-ignored)
│
├── CLAUDE.md                   # Claude Code instructions for this repo
├── DESIGN.md                   # Full design system spec
├── README.md                   # Minimal readme
│
├── .eslintrc.json              # ESLint config (next/core-web-vitals)
├── .gitignore                  # Ignores node_modules, .next, out
├── next-env.d.ts               # Next.js TypeScript env declarations
├── next.config.mjs             # Next.js config — static export, unoptimized images
├── package.json                # Scripts + dependencies
├── package-lock.json           # Lockfile
├── postcss.config.js           # PostCSS: tailwindcss + autoprefixer
├── tailwind.config.ts          # Tailwind: custom design tokens + content paths
└── tsconfig.json               # TypeScript: strict, bundler module resolution, @/ alias
```

## Key Locations

| Location | Purpose |
|----------|---------|
| `config/site.ts` | Brand config — change company name/email here |
| `tailwind.config.ts` | Design tokens — add new colors/sizes here |
| `app/layout.tsx` | Global shell — add persistent UI elements here |
| `components/` | Shared components — new reusable UI goes here |
| `app/` | New pages go here as `app/[route]/page.tsx` |
| `DESIGN.md` | Full design system spec — read before adding new UI |

## Naming Conventions

**Files:**
- React components: PascalCase (`Navbar.tsx`, `LogoMark.tsx`)
- Config/utility modules: camelCase (`site.ts`, `globals.css`)
- Next.js special files: lowercase (`layout.tsx`, `page.tsx`, `globals.css`)

**Exports:**
- Components: named exports (`export function Navbar()`) — no default exports in components
- Pages: default exports (`export default function Home()`) — required by Next.js App Router
- Config: named const exports (`export const siteConfig`)

**Path Alias:**
- `@/` maps to project root — use `@/components/Navbar` not relative paths

## File Counts

| Directory | .tsx | .ts | .css | .js |
|-----------|------|-----|------|-----|
| `app/` | 2 | 0 | 1 | 0 |
| `components/` | 3 | 0 | 0 | 0 |
| `config/` | 0 | 1 | 0 | 0 |
| Root config | 0 | 2 | 0 | 2 |

Total source files: ~11 (very small codebase, early stage)

---

*Structure analysis: 2026-06-10*
