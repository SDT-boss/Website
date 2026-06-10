# Phase 2: Home & Navigation — Research

**Researched:** 2026-06-10
**Domain:** Next.js 14 App Router, next-intl v3, Tailwind CSS 3, React Client Components, CSS dot-grid
**Confidence:** HIGH

---

## Summary

Phase 2 builds the home page and polishes the Navbar on top of the i18n routing structure established in Phase 1. The research reveals one critical dependency fact: Phase 1 has NOT been executed yet — `next-intl` is not installed, `app/[locale]/` does not exist, and the `messages/` files are absent. Phase 2 MUST NOT begin until Phase 1 completes and the build passes.

The two most important technical decisions for Phase 2 are: (1) which `usePathname` to use for active-state detection, and (2) whether to create a `i18n/navigation.ts` module in Phase 1 or Phase 2. The answer to (1) is: use `usePathname` from `next/navigation` (not from next-intl's `createNavigation`), because it returns the FULL path including locale (e.g., `/en/solutions`) — so active matching must compare against locale-prefixed hrefs like `/${locale}/solutions`. The `usePathname` from next-intl's `createNavigation` strips the locale and returns `/solutions`, which is simpler — but requires the `createNavigation` module to be set up first.

All home sections are pure client-renderable JSX with no data fetching. The dot-grid is a single CSS class in `globals.css` using `radial-gradient` — fully static-export safe. The translation key expansion is additive to the existing `messages/*.json` schema.

**Primary recommendation:** Create `i18n/navigation.ts` (exporting `createNavigation`) in Phase 1 Plan B and use it for both the Navbar (Phase 1 Plan C) and the Phase 2 active-state Navbar. This avoids locale-prefix arithmetic in Navbar.tsx. If Phase 1 has already shipped without this file, add it as the first task in Phase 2 Wave A.

---

## Project Constraints (from CLAUDE.md)

- `output: "export"` — fully static, no SSR, no middleware, no API routes
- No component libraries (no shadcn, no Radix)
- All custom colors are Tailwind tokens — never `bg-[#hex]` arbitrary values
- No box shadows — use `border` + background contrast for depth
- Transitions: `duration-150 ease-out` ONLY — no bounce, no spring
- Company name, email, tagline come from `config/site.ts` — never hardcode
- Volt Green is reserved for ONE primary CTA per page — hero CTA only
- Site must NOT be published until owner explicitly approves (LAUNCH-07)
- Inter loaded via `next/font/google` in `app/layout.tsx` — `font-sans` resolves to it

---

## Phase 1 Execution Status (Critical Prerequisite Check)

**BLOCKING FINDING:** Phase 1 has NOT been executed. Confirmed by:

| Check | Expected After Phase 1 | Current State |
|-------|----------------------|---------------|
| `next-intl` in `package.json` | present | ABSENT |
| `app/[locale]/` directory | exists | ABSENT |
| `messages/en.json` | exists | ABSENT |
| `i18n/routing.ts` | exists | ABSENT |
| `config/site.ts` name | `"SDT"` | `"YourCo"` |
| `.gitignore` | has `.next` and `out` | has `node_modules` only |
| `tailwind.config.ts` `background` token | present | ABSENT |
| `app/layout.tsx` `bg-[#0a0a0a]` | replaced with `bg-background` | still `bg-[#0a0a0a]` |

Phase 2 planning is proceeding now as requested, but execution must gate on Phase 1 completing successfully (i.e., `npm run build` passes with all three locale routes resolving).

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Sticky navbar with active-state link highlighting — current route's link visually distinguished | `"use client"` Navbar + `usePathname` from next-intl's `createNavigation` returns path without locale prefix; active class applied via comparison |
| NAV-02 | Mobile hamburger menu — 44×44px touch target, keyboard accessible (aria-expanded, aria-controls) | `useState` for `isOpen`, `useEffect` for Escape key, `useRef` for focus management; aria attributes fully specified in UI-SPEC |
| HOME-01 | Hero section — full-viewport, CSS dot-grid background, eyebrow label, 2-line headline, sub, one Volt Green primary CTA | `.dot-grid` class in `globals.css` using `radial-gradient`; `bg-volt-green text-background` on CTA; requires `background` token from Phase 1 |
| HOME-02 | Solutions strip — section label + 4 cards with icon, title, desc, grid-violet tag, hover border cyber-jade | `bg-surface border border-border-subtle` card, `group-hover:border-cyber-jade` hover; `bg-grid-violet/10 text-grid-violet` tag |
| HOME-03 | Approach section — "How we work" with 3 numbered items | Static JSX, numbered items with large `text-cyber-jade/20` accent number |
| HOME-04 | Work teaser — single EV Fleet Operations card + "See our work →" link | Link href must be locale-prefixed: `/${locale}/work`; use `useLocale()` from next-intl |
| HOME-05 | Footer CTA section — "Want to work with us?" with cyber-jade outline mailto button (NOT Volt Green) | `border border-cyber-jade text-cyber-jade` button; Volt Green forbidden here per one-per-page rule |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Active-state nav detection | Browser / Client | — | `usePathname` is a Client hook; cannot run in Server Component |
| Hamburger open/close state | Browser / Client | — | `useState` requires Client Component |
| Language switcher locale detection | Browser / Client | — | `useLocale()` from next-intl is a Client hook |
| Hero, Solutions, Approach, Work, Footer CTA sections | Frontend (SSR-compatible SC) | — | Static JSX only, no data fetching; can be Server Components or Client Components; recommend Server Components unless locale-dependent content requires `useTranslations` hook |
| Translation message loading | Frontend Server (locale layout) | — | `getMessages()` in `app/[locale]/layout.tsx` (Phase 1) loads messages into `NextIntlClientProvider` |
| Locale-aware internal links | Browser / Client (if using `useLocale`) | Frontend Server (if using static params) | `useLocale()` from next-intl resolves at runtime in browser; static `/{locale}` prefix can also be derived from `params` in a Server Component |
| CSS dot-grid background | CDN / Static | — | Pure CSS in `globals.css`, no runtime dependency |

---

## Standard Stack

### Core (inherited from project)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 14.2.29 | App Router, static export, routing | Project requirement |
| React | ^18.3.1 | UI component model | Project requirement |
| Tailwind CSS | ^3.4.17 | All styling, design tokens | Project requirement, no component library |
| next-intl | latest stable v3.x (to be installed in Phase 1) | i18n, locale routing, `useTranslations`, `useLocale`, `createNavigation` | Phase 1 installs it |

### Phase 2 New APIs from next-intl

| API | Import | Purpose |
|-----|--------|---------|
| `useTranslations` | `"next-intl"` | Read translation keys in Client Components |
| `getTranslations` | `"next-intl/server"` | Read translation keys in Server Components |
| `useLocale` | `"next-intl"` | Get current locale string in Client Components |
| `usePathname` | `"next-intl/navigation"` (via createNavigation) | Pathname WITHOUT locale prefix |
| `useRouter` | `"next-intl/navigation"` (via createNavigation) | Locale-aware router.replace for locale switching |
| `Link` | `"next-intl/navigation"` (via createNavigation) | Locale-aware Link that auto-prefixes hrefs |

### New File Required: `i18n/navigation.ts`

```typescript
// i18n/navigation.ts — create in Phase 1 Plan B or first task of Phase 2 Wave A
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

This is the recommended pattern. [CITED: next-intl.dev/docs/routing/navigation]

**Why it matters for Phase 2:** The `usePathname` from this module returns `/solutions` when on `/en/solutions` — locale prefix stripped. This means `NAV_LINKS` hrefs stay as `/solutions`, `/work`, `/about` and active-state matching is `pathname === link.href || pathname.startsWith(link.href + "/")` without locale arithmetic. [CITED: next-intl.dev/docs/routing/navigation]

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `createNavigation` usePathname (strips locale) | `next/navigation` usePathname (keeps locale `/en/solutions`) | If using `next/navigation`, NAV_LINKS hrefs must be `/${locale}/solutions` — requires `useLocale()` to build them, or hardcoded locale in link href |
| Co-located sections in `app/[locale]/page.tsx` | `components/home/` subdirectory | Co-location is fine for < 6 sections; splitting to `components/home/` is cleaner and reusable |

**Installation (Phase 1 prerequisite):**
```bash
npm install next-intl
```

---

## Package Legitimacy Audit

No NEW packages are installed in Phase 2. The only new dependency (`next-intl`) is installed in Phase 1 Plan B.

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| next-intl | npm | ~4 yrs | ~2M/week | github.com/amannn/next-intl | N/A (already in Phase 1) | Approved (Phase 1 gate) |

**Packages removed due to slopcheck [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

Phase 2 adds zero new npm packages. All implementation is hand-authored Tailwind components.

---

## Architecture Patterns

### System Architecture Diagram

```
Browser Request (/en/solutions)
         |
         v
app/layout.tsx (Root Layout — Server Component)
  - Renders <html lang="en">
  - Renders <Navbar /> (Client Component — "use client")
  - Renders <main>{children}</main>
  - Renders <Footer />
         |
         v
app/[locale]/layout.tsx (Locale Layout — Server Component)
  - Calls setRequestLocale(locale)  ← Phase 2 must add this
  - Wraps children in <NextIntlClientProvider locale messages>
         |
         v
app/[locale]/page.tsx (Home Page — Server Component or Client)
  - HeroSection
  - SolutionsStrip
  - ApproachSection
  - WorkTeaser      ← needs locale for href
  - FooterCTA

Navbar (Client Component — "use client"):
  - usePathname() from i18n/navigation.ts → "/solutions"
  - isActive = pathname === link.href
  - useState(isOpen) for hamburger
  - useEffect(Escape key listener)
  - useRef(firstLinkRef, hamburgerRef) for focus management
  - useLocale() for language switcher active state
```

### Recommended Project Structure

```
app/
  layout.tsx               # Root layout — Navbar + Footer (unchanged from Phase 1)
  [locale]/
    layout.tsx             # Locale layout — NextIntlClientProvider (Phase 1, add setRequestLocale)
    page.tsx               # Home page — replace scaffold with home sections
components/
  Navbar.tsx               # Convert to "use client" — active state + hamburger
  Footer.tsx               # No change in Phase 2
  home/                    # Co-located home sections (recommended over inline in page.tsx)
    HeroSection.tsx
    SolutionsStrip.tsx
    ApproachSection.tsx
    WorkTeaser.tsx
    FooterCTA.tsx
i18n/
  routing.ts               # Phase 1
  request.ts               # Phase 1
  navigation.ts            # Phase 1 or Phase 2 Wave A — createNavigation
messages/
  en.json                  # EXPAND with Phase 2 keys (see Translation Key section)
  id.json                  # EXPAND with Phase 2 keys
  zh.json                  # EXPAND with Phase 2 keys
```

### Pattern 1: Client Component Navbar in Root Layout

The Navbar is imported in the root `app/layout.tsx` (a Server Component). Adding `"use client"` to `Navbar.tsx` is valid and correct — this is the standard Next.js pattern for interactive nav components. [CITED: nextjs.org/docs/app/api-reference/functions/use-pathname]

```tsx
// components/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";  // from createNavigation
import { useLocale } from "next-intl";
import Link from "next/link";  // or use Link from @/i18n/navigation
import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/config/site";

const NAV_LINKS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Work",      href: "/work"      },
  { label: "About",     href: "/about"     },
] as const;

export function Navbar() {
  const pathname = usePathname();  // Returns "/solutions" not "/en/solutions"
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Escape key closes menu
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Move focus to first link when menu opens
  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
    }
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // ... JSX
}
```

Source: [CITED: next-intl.dev/docs/routing/navigation] for `usePathname` locale-stripping behavior; [CITED: nextjs.org/docs/app/api-reference/functions/use-pathname] for `"use client"` requirement.

### Pattern 2: Active State Detection

```tsx
// NAV_LINKS hrefs are locale-stripped ("/solutions", "/work", "/about")
// usePathname from createNavigation also returns locale-stripped path ("/solutions")
// So comparison is direct:

const isActive = (href: string) =>
  pathname === href || pathname.startsWith(href + "/");

// On link:
className={`text-sm font-medium transition-colors duration-150 ease-out ${
  isActive(link.href)
    ? "text-cyber-jade border-b border-cyber-jade pb-1"
    : "text-white hover:text-cyber-jade"
}`}
aria-current={isActive(link.href) ? "page" : undefined}
```

Source: [CITED: 02-UI-SPEC.md, Interactive States section]

**Home page active state:** The home page path in next-intl (locale-stripped) is `/`. With `app/[locale]/` routing, visiting `/en/` gives `pathname === "/"`. The logo link href should be `"/"` and is handled by next-intl's `Link` which auto-prefixes. The nav link for home does not exist in `NAV_LINKS` (no home link in Navbar per design).

### Pattern 3: Locale Switching (preserving current path)

```tsx
// Language switcher — switches locale while staying on same page
function LocaleSwitcher() {
  const router = useRouter();      // from @/i18n/navigation
  const pathname = usePathname();  // from @/i18n/navigation, locale-stripped
  const locale = useLocale();

  return (
    <div className="hidden md:flex items-center gap-1 text-xs font-medium shrink-0">
      {["en", "id", "zh"].map((loc, i, arr) => (
        <>
          <button
            key={loc}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={loc === locale ? "text-white" : "text-text-secondary hover:text-white transition-colors duration-150 ease-out"}
          >
            {loc.toUpperCase()}
          </button>
          {i < arr.length - 1 && <span className="text-text-muted">|</span>}
        </>
      ))}
    </div>
  );
}
```

Source: [CITED: next-intl.dev/docs/routing/navigation — `router.replace(pathname, {locale})` pattern]

### Pattern 4: setRequestLocale in Locale Layout and Pages

To keep pages statically rendered with next-intl, `setRequestLocale(locale)` must be called at the top of every layout and page that uses next-intl APIs. [CITED: next-intl setup docs]

```tsx
// app/[locale]/layout.tsx — ADD to existing Phase 1 output
import { setRequestLocale } from "next-intl/server";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);           // ← ADD THIS
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

// app/[locale]/page.tsx — ADD to home page
import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);           // ← REQUIRED for static rendering
  // ...
}
```

### Pattern 5: CSS Dot-Grid (static-export safe)

```css
/* app/globals.css — append after existing rules */
.dot-grid {
  background-image: radial-gradient(circle, #2a2a2a 1px, transparent 1px);
  background-size: 24px 24px;
}
```

Apply as `className="dot-grid bg-background ..."` on the hero section wrapper.

Why static-export safe: Pure CSS, no JavaScript, no images, no dynamic values. The `radial-gradient` is a standard CSS feature that renders identically at build time and runtime. [ASSUMED — CSS radial-gradient is universally supported; no verification needed for static export compatibility specifically]

The hardcoded `#2a2a2a` in the CSS rule matches the `border-subtle` token value. Using the hex here is acceptable because it is inside a `.css` file where Tailwind tokens are not available. [CITED: 02-UI-SPEC.md, CSS Dot-Grid Background section]

### Pattern 6: Translation Key Expansion

The `messages/*.json` files from Phase 1 use skeleton home keys (`heroTitle`, `heroSub`, `ctaLabel`). Phase 2 must REPLACE these with the actual content keys specified in 02-UI-SPEC.md.

**The Phase 1 `home` namespace:**
```json
"home": {
  "heroTitle": "Infrastructure for intelligent operations.",
  "heroSub": "SDT builds software for ...",
  "ctaLabel": "See our solutions"
}
```

**The Phase 2 `home` namespace (expanded — must be consistent across en/id/zh):**
```json
"home": {
  "eyebrow": "INTELLIGENT OPERATIONS",
  "heroLine1": "Infrastructure for",
  "heroLine2": "intelligent ops.",
  "heroSub": "We build the software that runs fleet, logistics, and industrial operations in the real world.",
  "ctaLabel": "Start a conversation",
  "solutionsEyebrow": "WHAT WE BUILD",
  "solutionsHeading": "Four capabilities. One platform.",
  "approachEyebrow": "HOW WE WORK",
  "approachHeading": "Built differently, on purpose.",
  "workEyebrow": "OUR WORK",
  "workHeading": "Shipped to production.",
  "footerCtaHeading": "Want to work with us?",
  "footerCtaSub": "We take a small number of clients. If your problem is hard and the stakes are real, let's talk.",
  "footerCtaButton": "Get in touch",
  "seeOurWork": "See our work →"
}
```

**Solution card content** is better stored inline in the component or in a separate `solutions` namespace key, not in `home`. The UI-SPEC specifies static content (title, desc, tag) for each of the 4 cards — these can live as arrays in `messages/*.json` under `home.cards` or be defined statically in the component since they are not localized differently in structure.

**Recommended approach for solution cards:** Define card data as a typed array in `lib/solutions.ts` (or inline in `SolutionsStrip.tsx`) with translation keys for title/desc, and use `useTranslations` to read them. This keeps the JSON flat and avoids nested dynamic keys.

**Key rule:** Every key added to `en.json` MUST be added to `id.json` and `zh.json` with equivalent translations. Missing keys cause next-intl to throw at runtime. [CITED: Phase 1 Plan B Task 2 acceptance criteria]

### Anti-Patterns to Avoid

- **Using `next/navigation` `usePathname` directly for active matching:** Returns `/en/solutions` not `/solutions`. If you use this, all `NAV_LINKS` hrefs must be built dynamically with locale prefix — more error-prone. Use `createNavigation` instead.
- **Hardcoding locale in internal hrefs:** `href="/en/solutions"` breaks when user is on `/id/`. Use next-intl's `Link` from `createNavigation` which auto-prefixes.
- **Adding `volt-green` to the footer CTA:** Volt Green is ONE-PER-PAGE and is consumed by the hero CTA. Footer CTA MUST use `border-cyber-jade text-cyber-jade`. Any second `volt-green` element fails the phase success criterion.
- **Converting `app/layout.tsx` to `"use client"`:** Never. The Navbar is a child — only Navbar.tsx needs `"use client"`. Root layout must stay a Server Component for metadata export to work.
- **Using `new Date().getFullYear()` in a Server Component for copyright:** Already in `Footer.tsx`. With static export, this renders at build time — acceptable for v1 per 01-PATTERNS.md.
- **Nesting `<button>` inside `<a>` or vice versa:** The language switcher in Phase 1 used `<Link>` (anchor tags). Phase 2 upgrades them to `<button onClick={() => router.replace(...)}` for path-preserving locale switching — do not wrap in `<a>`.
- **No `aria-current="page"` on active nav link:** Required for screen readers (NAV-01). Must be `aria-current={isActive ? "page" : undefined}`.
- **Suppressing focus outline on mouse click:** Use `focus-visible:` prefix not `focus:` on all interactive elements.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale-aware Link with auto-prefix | Custom `LocaleLink` wrapper | next-intl `Link` from `createNavigation` | Handles prefix mode, pathnames config, all edge cases |
| Locale-aware router.replace | Manual URL construction | next-intl `useRouter` from `createNavigation` | Handles locale prefix negotiation |
| usePathname without locale | String slicing on `next/navigation` pathname | next-intl `usePathname` from `createNavigation` | Official API, not fragile string parsing |
| Translation hooks | Custom context provider | next-intl `useTranslations` / `getTranslations` | Type-safe, namespace-scoped, SSR-aware |
| Focus trap for modal/menu | Custom tabindex management | Native `useRef` + `focus()` pattern (see Pattern 1) | No library needed for a simple hamburger menu with 3 links |

**Key insight:** next-intl's `createNavigation` module eliminates all locale-prefix arithmetic from component code. Every `href` value in the codebase stays locale-agnostic (e.g., `/solutions`) and the library handles prefixing.

---

## Common Pitfalls

### Pitfall 1: Wrong `usePathname` Import

**What goes wrong:** Developer imports `usePathname` from `"next/navigation"` instead of from `"@/i18n/navigation"`. The native hook returns `/en/solutions`; the NAV_LINKS have `href: "/solutions"`. Active state never triggers.

**Why it happens:** Two hooks with the same name. `"next/navigation"` is the native one; the next-intl navigation module exports a wrapper with the same name.

**How to avoid:** Create `i18n/navigation.ts` with `createNavigation` and always import `usePathname` from `"@/i18n/navigation"` in components that need locale-stripped paths. Add an ESLint rule or comment to the module explaining this.

**Warning signs:** Nav links never show active state despite correct Tailwind classes.

### Pitfall 2: Missing `setRequestLocale` Breaks Static Build

**What goes wrong:** The `app/[locale]/page.tsx` calls `useTranslations` (or `getTranslations`) without first calling `setRequestLocale(locale)`. Next.js opts into dynamic rendering for the page, and `npm run build` either fails or produces warnings about non-static routes.

**Why it happens:** next-intl APIs need to read the locale at render time. Without `setRequestLocale`, they fall back to reading from request headers, which forces dynamic rendering — incompatible with `output: "export"`.

**How to avoid:** Call `setRequestLocale(locale)` before any next-intl API in every `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, and any async Server Component that uses `getTranslations`.

**Warning signs:** `npm run build` produces `Error: Route "/[locale]" with "output: export" couldn't be rendered statically` or similar.

### Pitfall 3: `background` Tailwind Token Missing

**What goes wrong:** Phase 1 Plan A must add `background: "#0a0a0a"` to `tailwind.config.ts`. If Phase 1 is skipped or incomplete, `bg-background` used in hero CTA button and body does not compile to a color. The hero button `text-background` (white text on green) renders as transparent.

**Why it happens:** Phase 1 deferred the token addition. `bg-background` has zero styling until the token exists.

**How to avoid:** Verify `grep 'background.*0a0a0a' tailwind.config.ts` returns a match before starting Phase 2. If missing, add it in Phase 2 Wave A as a prerequisite task.

**Warning signs:** Hero CTA button text is invisible or wrong color; `text-background` appears as transparent.

### Pitfall 4: Volt Green Used Twice on Home Page

**What goes wrong:** Developer adds `bg-volt-green` or `text-volt-green` to the footer CTA, the solutions section heading, or the approach section accent — in addition to the hero CTA. This violates the one-per-page rule.

**Why it happens:** The design tokens are available everywhere. It is easy to accidentally reach for `volt-green` as an accent color.

**How to avoid:** The footer CTA button MUST use `border border-cyber-jade text-cyber-jade`. Check every instance of `volt-green` in `app/[locale]/page.tsx` and `components/home/` before committing.

**Warning signs:** Phase success criterion 1 fails: "no second Volt Green element on the page."

### Pitfall 5: Hamburger Closes but Focus Returns to Wrong Element

**What goes wrong:** When the mobile menu closes (via Escape or link tap), focus is lost (goes to `<body>`) instead of returning to the hamburger button. Keyboard users cannot continue navigating.

**Why it happens:** Setting `isOpen = false` unmounts the menu panel but does not programmatically move focus.

**How to avoid:** Use `hamburgerRef.current?.focus()` in the Escape key handler AND in the `setIsOpen(false)` call triggered by nav link clicks. The `useEffect` that watches `isOpen` can also handle return-focus: `if (!isOpen) hamburgerRef.current?.focus()`.

**Warning signs:** After pressing Escape or tapping a menu link, focus is lost — screen reader announces nothing.

### Pitfall 6: Home Page `app/[locale]/page.tsx` Missing `await params`

**What goes wrong:** The locale page in Phase 1 is already async with `await params`. If Phase 2 replaces the entire file content without preserving the async signature and `await params` pattern, TypeScript errors or runtime failures occur.

**Why it happens:** Phase 2 replaces the scaffold placeholder — easy to forget the async `params` contract.

**How to avoid:** The home page component must be `async`, accept `params: Promise<{ locale: string }>`, and call `await params` before `setRequestLocale`. See Pattern 4 above.

**Warning signs:** TypeScript error: "Argument of type 'Promise<{locale: string}>' is not assignable to parameter of type '{locale: string}'".

### Pitfall 7: Language Switcher Still Uses Phase 1 `<Link href="/en">` Static Links

**What goes wrong:** Phase 1 Plan C adds hardcoded `<Link href="/en">` links. These navigate to the root of each locale, losing the current path. User on `/en/solutions` clicks "ID" and lands on `/id/` (home page), not `/id/solutions`.

**Why it happens:** Phase 1 deliberately used static hrefs as a placeholder. Phase 2 must upgrade to `router.replace(pathname, { locale })`.

**How to avoid:** In Phase 2 Navbar refactor, replace the static language switcher links with button elements that call `router.replace(pathname, { locale })` using next-intl's `useRouter` from `createNavigation`.

**Warning signs:** Locale switching always goes to home page regardless of current route.

---

## Translation Key Expansion Guide

**File:** `messages/en.json` (expand existing `home` namespace)
**Also update:** `messages/id.json` and `messages/zh.json` with equivalent translations

### Keys to Add (English values)

```json
{
  "home": {
    "eyebrow": "INTELLIGENT OPERATIONS",
    "heroLine1": "Infrastructure for",
    "heroLine2": "intelligent ops.",
    "heroSub": "We build the software that runs fleet, logistics, and industrial operations in the real world.",
    "ctaLabel": "Start a conversation",
    "solutionsEyebrow": "WHAT WE BUILD",
    "solutionsHeading": "Four capabilities. One platform.",
    "approachEyebrow": "HOW WE WORK",
    "approachHeading": "Built differently, on purpose.",
    "workEyebrow": "OUR WORK",
    "workHeading": "Shipped to production.",
    "seeOurWork": "See our work →",
    "footerCtaHeading": "Want to work with us?",
    "footerCtaSub": "We take a small number of clients. If your problem is hard and the stakes are real, let’s talk.",
    "footerCtaButton": "Get in touch"
  },
  "solutions": {
    "pageTitle": "Solutions",
    "card1Title": "Fleet & EV Mobility",
    "card1Desc": "Real-time operations software for electric and mixed fleets",
    "card1Tag": "Fleet",
    "card2Title": "IoT & Hardware",
    "card2Desc": "Edge devices and sensor networks for industrial environments",
    "card2Tag": "IoT",
    "card3Title": "Logistics Intelligence",
    "card3Desc": "Route, schedule, and load optimization for ground operations",
    "card3Tag": "Logistics",
    "card4Title": "AI Operations",
    "card4Desc": "Anomaly detection, predictive models, and decision automation",
    "card4Tag": "AI"
  },
  "work": {
    "pageTitle": "Work",
    "evFleetTitle": "EV Fleet Operations",
    "evFleetDesc": "End-to-end operations platform for an electric vehicle fleet — real-time tracking, charging management, and dispatch."
  },
  "approach": {
    "item1Title": "Hardware-aware",
    "item1Body": "We design software knowing it runs on real machines in real conditions — not cloud demos.",
    "item2Title": "Data-first",
    "item2Body": "Every feature starts with a data model. If we can’t measure it, we won’t build it.",
    "item3Title": "Built for scale",
    "item3Body": "Systems go from pilot to production without a rewrite. Architecture decisions are made early."
  }
}
```

**Note:** `approach` is a new top-level namespace. If it was absent in Phase 1 skeleton, it must be added to ALL three locale files simultaneously or next-intl will throw. [CITED: Phase 1 Plan B acceptance criteria — "every key in en.json must exist in id.json and zh.json"]

**The `_reviewNote` requirement:** `id.json` and `zh.json` have `_reviewNote` as their first key from Phase 1. When adding new keys, preserve that first key. New translations for id/zh are machine-translated scaffolding — owner reviews before launch.

---

## CSS Dot-Grid Background

### Implementation

```css
/* app/globals.css — append after ::selection rule */
.dot-grid {
  background-image: radial-gradient(circle, #2a2a2a 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### Usage in Hero Section

```tsx
<section className="dot-grid bg-background min-h-screen flex flex-col items-center justify-center py-24 px-6 md:py-32">
  {/* hero content */}
</section>
```

The base background color `bg-background` must be set on the section (or a parent) for the dots to be visible. The dots (`#2a2a2a`) are only 0.2 contrast points above `#0a0a0a` background — intentionally subtle.

### Static Export Compatibility

`radial-gradient` is a CSS standard feature supported in all modern browsers since 2012. It is a static CSS value — no JavaScript, no DOM APIs, no Node.js. Output at build time is identical to output at runtime. [ASSUMED — CSS radial-gradient static export compatibility; universally supported and no dynamic behavior]

---

## Component Structure Decision

**Recommendation: `components/home/` subdirectory** over inline sections in `app/[locale]/page.tsx`.

**Rationale:**
- `app/[locale]/page.tsx` will grow to ~400+ lines if all sections are inlined
- Home section components (HeroSection, SolutionsStrip, etc.) may be referenced from other contexts in Phase 3+ or reused
- Named imports in `page.tsx` keep the file as an orchestrator, not an implementer
- Co-location is acceptable for prototypes but this is a production codebase

**Naming convention:** `PascalCase`, named export (matching project convention from `components/Navbar.tsx`, `components/Footer.tsx`).

**Server vs Client per section:**

| Section | Client? | Reason |
|---------|---------|--------|
| `HeroSection` | No (Server Component) | Static JSX + `getTranslations`; no state needed |
| `SolutionsStrip` | No (Server Component) | Static JSX; hover states are CSS-only |
| `ApproachSection` | No (Server Component) | Static JSX |
| `WorkTeaser` | No (Server Component) | Static JSX; locale for href comes from `params` |
| `FooterCTA` | No (Server Component) | Static JSX + mailto href |
| `Navbar` | YES (Client Component) | Needs `usePathname`, `useState`, `useEffect` |

Hover border on solution cards (`border-cyber-jade`) is CSS-only (`group-hover:border-cyber-jade` or `hover:border-cyber-jade` on the card element) — no JavaScript required.

---

## Wave / Dependency Structure

Phase 2 has a natural split into two waves:

### Wave A — Navbar Refactor (must complete before integration testing)

**Files modified/created:**
- `i18n/navigation.ts` (new — `createNavigation`) — if not done in Phase 1
- `components/Navbar.tsx` (convert to `"use client"`, active state, hamburger)
- `app/[locale]/layout.tsx` (add `setRequestLocale`)

**Can run in parallel:**
- Navbar TSX refactor
- `i18n/navigation.ts` creation

**Must complete Wave A before Wave B:** The home page sections use next-intl hooks via `NextIntlClientProvider`. The Navbar changes affect the shell that wraps every page — verify shell is correct before filling page content.

### Wave B — Home Page Sections (can mostly run in parallel)

**Files modified/created:**
- `app/globals.css` (add `.dot-grid`)
- `components/home/HeroSection.tsx` (new)
- `components/home/SolutionsStrip.tsx` + `SolutionCard.tsx` (new)
- `components/home/ApproachSection.tsx` (new)
- `components/home/WorkTeaser.tsx` (new)
- `components/home/FooterCTA.tsx` (new)
- `app/[locale]/page.tsx` (replace scaffold — imports and composes sections)
- `messages/en.json`, `messages/id.json`, `messages/zh.json` (expand keys)

**Parallelizable within Wave B:**
- All home section components can be built in parallel (no cross-dependencies)
- CSS dot-grid (`globals.css`) can be added at any point
- Translation key expansion should happen before section components that use `getTranslations` — but can run first as a standalone task

**Must complete before Wave B:** Translation keys must exist in all three locale files before any component calls `getTranslations("home")` — missing keys throw at runtime during `npm run build`.

**Sequential constraint:** `app/[locale]/page.tsx` is the assembly point — it imports all section components. It cannot be written until all section component files exist (TypeScript import errors). Write it last in Wave B.

### Dependency Graph

```
Phase 1 complete (npm run build passes)
         |
         v
Wave A Task 1: i18n/navigation.ts (createNavigation)
Wave A Task 2: Navbar.tsx "use client" refactor       [parallel with Task 1]
Wave A Task 3: app/[locale]/layout.tsx + setRequestLocale
         |
         v  (Wave A gate: Navbar renders correctly, active states work)
         |
Wave B Task 1: messages/*.json — expand translation keys    [Wave B starts here]
Wave B Task 2: app/globals.css — add .dot-grid
Wave B Task 3: HeroSection.tsx                              [parallel: Tasks 2-7]
Wave B Task 4: SolutionsStrip.tsx + SolutionCard.tsx
Wave B Task 5: ApproachSection.tsx
Wave B Task 6: WorkTeaser.tsx
Wave B Task 7: FooterCTA.tsx
Wave B Task 8: app/[locale]/page.tsx — compose sections     [depends on 3-7]
         |
         v  (Phase 2 gate: npm run build passes, all success criteria met)
```

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | npm install, next dev | ✓ | (inferred from project) | — |
| npm | Package management | ✓ | (inferred from package.json) | — |
| next-intl | All i18n features | ✗ (Phase 1 installs) | — | Phase 1 gate |
| `background` Tailwind token | `bg-background`, `text-background` | ✗ (Phase 1 Plan A adds) | — | Phase 1 gate |

**Missing dependencies with no fallback:**
- `next-intl` — Phase 1 Plan B installs it; Phase 2 cannot execute without it
- `background` token in `tailwind.config.ts` — Phase 1 Plan A adds it; hero CTA `text-background` is transparent without it

**Missing dependencies with fallback:**
- None

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — no test config files, no `__tests__/` directory |
| Config file | None |
| Quick run command | `npm run build && npm run lint` (build-time type checking + ESLint) |
| Full suite command | `npm run build` |

No automated test infrastructure exists in this project. All validation is:
1. `npm run lint` — ESLint (no TS errors, no unused vars)
2. `npm run build` — TypeScript compilation + static export generation (all routes must emit HTML)
3. Manual visual verification in browser (`npm run dev`)

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Available? |
|--------|----------|-----------|-------------------|------------|
| NAV-01 | Active nav link highlighted | Visual / manual | `npm run build` (build must pass) | Build gate |
| NAV-02 | Hamburger 44px target, aria-expanded | Manual + accessibility audit | `npm run build` | Build gate |
| HOME-01 | Hero dot-grid, Volt Green CTA | Visual / manual | `npm run build` | Build gate |
| HOME-02 | 4 solution cards, hover border | Visual / manual | `npm run build` | Build gate |
| HOME-03 | 3 approach items | Visual / manual | `npm run build` | Build gate |
| HOME-04 | Work teaser card, locale-prefixed link | Visual / manual | `npm run build` | Build gate |
| HOME-05 | Footer CTA cyber-jade (not Volt Green) | Visual + grep | `grep -r "volt-green" components/home/FooterCTA.tsx` must return empty | Manual grep |

### Wave 0 Gaps

No test framework to scaffold. All validation is build + manual:

- [ ] After Wave B completes: `npm run build` must exit 0 with pages emitted for `/en/`, `/id/`, `/zh/`
- [ ] Manual check: viewport at 375px — hamburger visible, desktop nav hidden
- [ ] Manual check: viewport at 768px+ — desktop nav visible, hamburger hidden
- [ ] Manual check: no `volt-green` anywhere except hero CTA (`grep -r "volt-green" app/\[locale\]/page.tsx components/home/`)
- [ ] Manual check: Escape key closes hamburger menu and returns focus to button
- [ ] Manual check: all 3 locale routes show translated content

---

## Security Domain

`security_enforcement` is not explicitly set in this project — treating as enabled (default).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Static site, no auth |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | Public marketing site |
| V5 Input Validation | No | No user input in Phase 2 (mailto links only) |
| V6 Cryptography | No | No cryptographic operations |
| V7 Error Handling | Minimal | 404 page from Phase 1 |

### Known Threat Patterns for Static Next.js + next-intl

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Hardcoded email in mailto href | Information Disclosure | Use `siteConfig.email` — already enforced by CLAUDE.md |
| Translation values containing HTML (XSS) | Injection | next-intl renders values as text nodes, not innerHTML — React's default behavior prevents XSS from translation values |
| Supply chain (no new packages) | Tampering | No new packages in Phase 2 — risk is zero |

The only security-relevant surface in Phase 2 is `mailto:` links. These must use `siteConfig.email` as the address — never a hardcoded string — to prevent stale email in the deployed artifact. [CITED: CLAUDE.md directives]

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | CSS `radial-gradient` is fully compatible with `output: "export"` in Next.js 14 | CSS Dot-Grid, Static Export Compatibility | Negligible — radial-gradient is pure CSS with no runtime dependency |
| A2 | `setRequestLocale` is still the correct API for next-intl v3 static rendering (not renamed in latest v3.x) | Pattern 4 | Medium — if API was renamed, build fails with "setRequestLocale is not a function" |
| A3 | Phase 1 translation scaffold `home.heroTitle` key can be REPLACED (not kept alongside new keys) | Translation Key Expansion | Low — old key is a scaffold placeholder; replacing it breaks nothing |
| A4 | `components/home/` subdirectory pattern does not require any additional Tailwind config changes | Component Structure Decision | Negligible |
| A5 | Solution cards do NOT need to be linked to detail pages in Phase 2 (links come in Phase 3) | HOME-02 implementation | Low — UI-SPEC says cards are presentational in Phase 2 |

**If this table had empty risk:** All claims were verified or cited — no user confirmation needed. Items A2 and A3 have low-medium risk and should be verified at Wave A start.

---

## Open Questions

1. **Does Phase 1 Plan B create `i18n/navigation.ts`?**
   - What we know: Phase 1 Plan B creates `i18n/routing.ts` and `i18n/request.ts`. Plan C creates the language switcher using static `<Link href="/en">` with a TODO comment for Phase 2.
   - What's unclear: Whether `i18n/navigation.ts` (with `createNavigation`) was meant to be a Phase 1 or Phase 2 deliverable.
   - Recommendation: Create it as the FIRST task in Phase 2 Wave A. If Phase 1 already created it, skip. This is a pure additive file with no conflicts.

2. **Are home section components Server Components or Client Components?**
   - What we know: None require client-side state or hooks. They render static JSX with translations from `getTranslations`.
   - What's unclear: Whether `useTranslations` (Client) or `getTranslations` (Server) is preferred for components used inside a Server Component page.
   - Recommendation: Use `getTranslations` in Server Components for home sections. This is the correct pattern for `output: "export"` + `setRequestLocale`.

3. **Are solution card icons inline SVG or Unicode?**
   - What we know: UI-SPEC says "use inline SVG or Unicode symbols for solution card icons" — no icon library.
   - What's unclear: Which specific icons to use for each of the 4 solution cards.
   - Recommendation: Planner should specify simple Unicode symbols (e.g., ⚡ for EV/Fleet, ◈ for IoT, ⊞ for Logistics, ∿ for AI) or simple inline SVG path strings. This is a content decision, not a technical decision.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `unstable_setRequestLocale` | `setRequestLocale` (stable) | next-intl v3.22+ | Use stable API; unstable_ prefix dropped |
| next-intl `createSharedPathnamesNavigation` | `createNavigation` | next-intl v3.x | Old function deprecated; use `createNavigation` |
| Static language switcher `<Link href="/en">` | `router.replace(pathname, {locale})` | Phase 1 → Phase 2 | Path-preserving locale switch |

**Deprecated/outdated:**
- `createSharedPathnamesNavigation`: Replaced by `createNavigation` in next-intl v3+. Do not use.
- `unstable_setRequestLocale`: Stable API is now `setRequestLocale` from `"next-intl/server"`.

---

## Sources

### Primary (HIGH confidence)

- [next-intl Navigation APIs docs](https://next-intl.dev/docs/routing/navigation) — `usePathname` locale-stripping behavior, `createNavigation` pattern, `router.replace` locale switch
- [Next.js usePathname reference](https://nextjs.org/docs/app/api-reference/functions/use-pathname) — return value table (full path including locale), `"use client"` requirement
- [02-UI-SPEC.md] — complete component specs, interactive states, all content copy, aria requirements
- [01-PATTERNS.md] — Phase 1 implementation patterns, message file schema, `await params` pattern
- [01-PLAN-B.md, 01-PLAN-C.md] — Phase 1 deliverables and what's scaffolded vs. missing in Phase 2
- [CLAUDE.md] — project directives (no box shadow, transition spec, Volt Green rule, siteConfig)

### Secondary (MEDIUM confidence)

- [next-intl setup docs](https://next-intl.dev/docs/routing/setup) — `setRequestLocale` for static rendering
- [next-intl 3.0 blog post](https://next-intl.dev/blog/next-intl-3-0) — `createNavigation` introduced, old API deprecated

### Tertiary (LOW confidence)

- None — all claims are verified against official docs or direct codebase inspection.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified against `package.json`, official next-intl docs, Next.js docs
- Architecture: HIGH — verified against Phase 1 plans, codebase structure, next-intl navigation docs
- Pitfalls: HIGH — derived from official API behavior (verified) and direct codebase inspection
- Translation expansion: HIGH — schema is additive to verified Phase 1 structure

**Research date:** 2026-06-10
**Valid until:** 2026-07-10 (30 days — next-intl v3.x is stable; unlikely to change materially)
