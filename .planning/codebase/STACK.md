# Technology Stack

**Analysis Date:** 2026-06-10

## Languages

**Primary:**
- TypeScript 5.x - All source files (`app/`, `components/`, `config/`, `tailwind.config.ts`)

**Secondary:**
- CSS - Global styles via `app/globals.css` (Tailwind directives + custom rules)
- JavaScript - `postcss.config.js` (CommonJS config only)

## Runtime

**Environment:**
- Node.js 18.20.8 (active runtime)

**Package Manager:**
- npm 10.8.2
- Lockfile: `package-lock.json` present (committed)

## Frameworks

**Core:**
- Next.js 14.2.29 - App Router, fully static export (`output: "export"` in `next.config.mjs`)
- React 18.3.1 - UI rendering

**Build/Dev:**
- Tailwind CSS 3.4.17 - Utility-first styling, configured in `tailwind.config.ts`
- PostCSS 8.5.3 - CSS processing pipeline, configured in `postcss.config.js`
- Autoprefixer 10.4.21 - Vendor prefix injection via PostCSS

## Key Dependencies

**Critical:**
- `next` 14.2.29 - Framework, routing, static export, font optimization
- `react` 18.3.1 - Component model and rendering
- `react-dom` 18.3.1 - DOM renderer

**Infrastructure:**
- `tailwindcss` 3.4.17 - Design system utility layer; custom tokens defined in `tailwind.config.ts`
- `autoprefixer` 10.4.21 - Required by PostCSS pipeline alongside Tailwind
- `postcss` 8.5.3 - CSS transformation pipeline

**Type Definitions (devDependencies):**
- `@types/node` ^20 - Node.js types
- `@types/react` ^18 - React types
- `@types/react-dom` ^18 - React DOM types
- `typescript` ^5 - TypeScript compiler
- `eslint` ^8 - Linting
- `eslint-config-next` 14.2.29 - Next.js ESLint ruleset

## Configuration

**TypeScript:**
- `tsconfig.json`: `strict: true`, target `ES2017`, `moduleResolution: bundler`
- Path alias: `@/*` maps to project root (`./`)

**ESLint:**
- `.eslintrc.json`: Extends `next/core-web-vitals` only — no additional rules

**Tailwind:**
- `tailwind.config.ts`: Scans `app/`, `components/`, `config/` for class names
- Custom color tokens: `cyber-jade (#008684)`, `volt-green (#96D02C)`, `grid-violet (#7C3AED)`, `ev-green`, `ev-teal`, `topbar (#1A1A1A)`, `surface (#111111)`, `surface-2`, `border-subtle`, `text-secondary`, `text-muted`
- Custom font families: `font-sans` → `--font-inter`, `font-mono` → `--font-geist-mono`
- Custom `maxWidth.content: 1200px`

**Build:**
- `next.config.mjs`: `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`
- Output directory: `/out` (static HTML/CSS/JS bundle)

**Environment:**
- No `.env` files detected — project has no runtime environment variables
- All configuration is compile-time only via `config/site.ts`

## Platform Requirements

**Development:**
- Node.js 18+ required
- Run `npm install` then `npm run dev` for local server at `http://localhost:3000`

**Production:**
- Pure static site — output in `/out` directory
- Deploy to any static host (Netlify, Vercel static, S3, GitHub Pages, etc.)
- No server process required; no Node.js runtime needed in production

---

*Stack analysis: 2026-06-10*
