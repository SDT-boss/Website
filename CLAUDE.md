# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies (required after first clone)
npm run dev        # dev server at http://localhost:3000
npm run build      # static export → /out directory
npm run lint       # ESLint via next lint
```

## Architecture

Next.js 14 App Router, fully static (`output: "export"`). No backend, no API routes, no server components with data fetching.

```
app/
  layout.tsx       # root layout — wraps every page with Navbar + Footer
  page.tsx         # home page (placeholder)
  globals.css      # Tailwind base/components/utilities + selection color
components/
  LogoMark.tsx     # shared SVG logo mark — two overlapping ellipses, exported as named export
  Navbar.tsx       # sticky header — imports LogoMark + siteConfig
  Footer.tsx       # footer — imports LogoMark + siteConfig
config/
  site.ts          # siteConfig: name, tagline, email — single source of truth
tailwind.config.ts # all custom design tokens (cyber-jade, volt-green, etc.)
next.config.mjs    # static export config, images.unoptimized: true
```

## Design system

Full spec lives in `DESIGN.md`. Key rules for this codebase:

- **Volt Green (`volt-green` / `#96D02C`) is reserved for one primary CTA per page.** Never use it in nav, footer, badges, or decoration.
- Custom colors are registered in `tailwind.config.ts` and available as Tailwind utilities: `bg-cyber-jade`, `text-volt-green`, `border-border-subtle`, etc.
- No box shadows — use `border` + background contrast for depth.
- Transitions: `duration-150 ease-out` only. No bounce or spring effects.
- Company name, email, and tagline all come from `config/site.ts` — change them in one place.

## Font setup

Inter is loaded via `next/font/google` in `app/layout.tsx` and exposed as `--font-inter`. Tailwind's `font-sans` resolves to it. Monospace (`font-mono`) falls back to `ui-monospace` until Geist Mono is added.
