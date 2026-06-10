# Walking Skeleton: PT SDT Technology — Company Website

**Phase:** 1 — Foundation & i18n
**Written:** 2026-06-10
**Status:** Defines the architectural baseline all subsequent phases build on

---

## What Is a Walking Skeleton?

The thinnest possible end-to-end slice that proves the architecture works. For this static marketing site, the skeleton is:

> A local dev server where navigating to `/en`, `/id`, or `/zh` renders a branded placeholder page with translated text visible in the browser, and `npm run build` completes without errors.

No real page content. No hero, no solutions, no fancy UI. Just: routing works, translations load, brand config is correct, build is clean.

---

## Architectural Decisions (Locked — All Subsequent Phases Build On These)

### Runtime

| Decision | Value | Rationale |
|----------|-------|-----------|
| Framework | Next.js 14.2.29 App Router | Already in place; stable for static export |
| Rendering | `output: "export"` (fully static) | No backend required; Vercel serves pre-built HTML |
| React | 18.3.1 | Correct; no upgrade needed |
| TypeScript | strict mode | Existing — enforce throughout |

### i18n

| Decision | Value | Rationale |
|----------|-------|-----------|
| Library | next-intl v3 (latest stable ^3.x) | Only library with first-class static export support |
| Routing mode | `app/[locale]/` path-based (no middleware) | Middleware not supported with `output: "export"` |
| Locales | `en` (default), `id`, `zh` | English + Indonesian + Chinese Simplified |
| Message files | `messages/{locale}.json` (top-level folder) | next-intl convention; all three files ship in Phase 1 |
| Root redirect | `/` → `/en` via `redirect()` in Server Component | Static-compatible; no middleware needed |
| Provider placement | `app/[locale]/layout.tsx` wraps `NextIntlClientProvider` | Root layout stays font-only |
| Static params | `generateStaticParams` in `app/[locale]/layout.tsx` returns `['en', 'id', 'zh']` | Required for `output: "export"` |

### Styling

| Decision | Value | Rationale |
|----------|-------|-----------|
| CSS framework | Tailwind CSS 3.4.17 | Already in place with custom design tokens |
| Background token | `background: "#0a0a0a"` in `tailwind.config.ts` | Removes arbitrary `bg-[#0a0a0a]` value; use `bg-background` |
| Font | Inter via `next/font/google` | Self-hosted at build time; CSS variable `--font-inter` |
| Mono font | Removed from `tailwind.config.ts` | `--font-geist-mono` undefined; no page uses `font-mono` |
| Transitions | `duration-150 ease-out` only | DESIGN.md constraint — no bounce, spring, or other easings |

### Brand Config

| Decision | Value | Rationale |
|----------|-------|-----------|
| Single source of truth | `config/site.ts` | All components import from here |
| `siteConfig.name` | `"SDT"` | Real company name |
| `siteConfig.email` | `"sdttech.co@gmail.com"` | Real contact email |
| `siteConfig.tagline` | `"Infrastructure for intelligent operations."` | Unchanged — already correct |
| Domain | `sdt.technology` (code comment only in Phase 1) | Used in `metadataBase` in Phase 4 |

### Directory Layout

```
/
├── app/
│   ├── layout.tsx              # Root: fonts, <html>, <body>, Navbar, Footer
│   ├── page.tsx                # redirect("/en") — root catch
│   └── [locale]/
│       ├── layout.tsx          # NextIntlClientProvider + generateStaticParams
│       ├── page.tsx            # Scaffold placeholder (Phase 2 builds real home)
│       └── not-found.tsx       # Basic branded 404
├── components/
│   ├── LogoMark.tsx            # Unchanged
│   ├── Navbar.tsx              # + language switcher pills (EN | ID | ZH)
│   └── Footer.tsx              # tagline → siteConfig.tagline
├── config/
│   └── site.ts                 # Updated: name, email
├── i18n/
│   ├── routing.ts              # defineRouting({ locales, defaultLocale })
│   └── request.ts              # getRequestConfig (static export pattern)
├── messages/
│   ├── en.json                 # Real English content
│   ├── id.json                 # Machine-translated Indonesian scaffold
│   └── zh.json                 # Machine-translated Chinese scaffold
├── tailwind.config.ts          # + background token, - mono fontFamily
└── .gitignore                  # + .next, out
```

### What Is Deliberately NOT in the Skeleton

| Item | Deferred To |
|------|------------|
| Real home page content (hero, solutions strip) | Phase 2 |
| Mobile hamburger menu | Phase 2 |
| `lib/solutions.ts`, `lib/work.ts` data layer | Phase 3 |
| OG metadata, favicon, sitemap, robots.txt | Phase 4 |
| Vercel deploy | Phase 4 |
| Any page beyond `/[locale]` index | Phase 2–3 |

---

## Skeleton Verification

After Phase 1 executes, these must all be TRUE:

1. `git status` shows `.next/` and `out/` are untracked (not in git)
2. Browser tab shows "SDT tech" (not "YourCo tech")
3. `localhost:3000/en` renders the scaffold placeholder without errors
4. `localhost:3000/id` renders the scaffold placeholder without errors
5. `localhost:3000/zh` renders the scaffold placeholder without errors
6. `localhost:3000/` redirects to `localhost:3000/en`
7. The Navbar shows `EN | ID | ZH` pills on desktop (hidden on mobile)
8. Clicking `ID` in the navbar updates the URL to `/id/...`
9. `npm run build` exits with code 0

---

*Walking Skeleton defined: 2026-06-10*
*Architecture decisions recorded here are binding for all subsequent phases.*
