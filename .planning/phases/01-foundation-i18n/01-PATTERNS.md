# Phase 1: Foundation & i18n — Pattern Map

**Mapped:** 2026-06-10
**Files analyzed:** 14
**Analogs found:** 10 / 14 (4 new files with no codebase analog — use research patterns)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `.gitignore` | config | n/a | `.gitignore` (existing) | exact — add lines |
| `config/site.ts` | config | n/a | `config/site.ts` (self) | exact — update values |
| `components/Footer.tsx` | component | request-response | `components/Footer.tsx` (self) | exact — one-line fix |
| `tailwind.config.ts` | config | n/a | `tailwind.config.ts` (self) | exact — add token, remove key |
| `app/layout.tsx` | layout | request-response | `app/layout.tsx` (self) | exact — token substitution |
| `components/Navbar.tsx` | component | request-response | `components/Navbar.tsx` (self) | exact — append switcher |
| `i18n/routing.ts` | config | n/a | none | no analog |
| `i18n/request.ts` | config | n/a | none | no analog |
| `app/[locale]/layout.tsx` | layout | request-response | `app/layout.tsx` | role-match |
| `app/[locale]/page.tsx` | component | request-response | `app/page.tsx` | exact — moved file |
| `app/[locale]/not-found.tsx` | component | request-response | `app/page.tsx` | role-match |
| `app/page.tsx` | route | request-response | `app/page.tsx` (self) | exact — replace body |
| `messages/en.json` | config | n/a | none | no analog |
| `messages/id.json` | config | n/a | none | no analog |
| `messages/zh.json` | config | n/a | none | no analog |

---

## Pattern Assignments

### `.gitignore` (config)

**Analog:** `.gitignore` (existing file — lines 1)

**Existing content** (line 1):
```
node_modules
```

**What to add** — append these two lines:
```
.next
out
```

After editing, run:
```bash
git rm -r --cached .next out
git commit -m "chore: remove build artifacts from tracking"
```

---

### `config/site.ts` (config)

**Analog:** `config/site.ts` (self — lines 1–6)

**Current pattern** (lines 1–6):
```typescript
// Replace "YourCo" with the actual company name.
export const siteConfig = {
  name: "YourCo",
  tagline: "Infrastructure for intelligent operations.",
  email: "hello@yourco.com",
} as const;
```

**Target pattern** — replace values in place, preserve structure exactly:
```typescript
// SDT tech — sdt.technology
export const siteConfig = {
  name: "SDT",
  tagline: "Infrastructure for intelligent operations.",
  email: "sdttech.co@gmail.com",
} as const;
```

Key rules:
- `as const` is required — all downstream consumers rely on literal-type inference
- `tagline` does NOT change — it is already the canonical copy
- No new fields needed at runtime; domain is a code comment only

---

### `components/Footer.tsx` (component, request-response)

**Analog:** `components/Footer.tsx` (self — lines 1–48)

**Full file — read once, change one line.**

Import block (lines 1–2) — unchanged:
```typescript
import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/config/site";
```

Named export pattern (line 4) — unchanged:
```typescript
export function Footer() {
```

**Only change** (line 31) — replace hardcoded string with config reference:
```tsx
// Before:
<p className="text-text-muted text-xs">
  Built for intelligent operations.
</p>

// After:
<p className="text-text-muted text-xs">
  {siteConfig.tagline}
</p>
```

Tailwind token pattern to observe — these classes are already correct and must NOT change:
- `bg-surface-2` — semantic token, not arbitrary value
- `border-border-subtle` — semantic token
- `text-cyber-jade` — brand color
- `text-text-muted` — muted text token
- `transition-colors duration-150 ease-out` — mandated transition spec

---

### `tailwind.config.ts` (config)

**Analog:** `tailwind.config.ts` (self — lines 1–43)

**Colors block** (lines 11–26) — add `background` token inside `colors: {}`:
```typescript
colors: {
  "cyber-jade":    "#008684",
  "jade-strong":   "#007069",
  "volt-green":    "#96D02C",
  "volt-strong":   "#557A12",
  "grid-violet":   "#7C3AED",
  "violet-strong": "#5B21B6",
  "ev-green":      "#7CC242",
  "ev-teal":       "#1A7080",
  topbar:          "#1A1A1A",
  surface:         "#111111",
  "surface-2":     "#1A1A1A",
  "border-subtle": "#2a2a2a",
  "text-secondary":"#a1a1aa",
  "text-muted":    "#52525b",
  background:      "#0a0a0a",   // ← ADD THIS LINE
},
```

**fontFamily block** (lines 27–30) — remove the `mono` key entirely:
```typescript
// Before:
fontFamily: {
  sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
  mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
},

// After:
fontFamily: {
  sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
},
```

The `mono` key is removed because `--font-geist-mono` is never defined and no page uses `font-mono`. If mono is needed later, wire GeistMono via `next/font` first.

---

### `app/layout.tsx` (layout, request-response)

**Analog:** `app/layout.tsx` (self — lines 1–33)

**Full file pattern** (lines 1–33):
```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} tech`,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0a0a0a] text-white antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Only change** (line 26) — swap arbitrary value for semantic token:
```tsx
// Before:
<body className="bg-[#0a0a0a] text-white antialiased min-h-screen flex flex-col">

// After:
<body className="bg-background text-white antialiased min-h-screen flex flex-col">
```

Everything else in this file is unchanged. Navbar and Footer stay in the root layout — they are NOT moved to `app/[locale]/layout.tsx`. The locale layout only wraps `NextIntlClientProvider`.

---

### `components/Navbar.tsx` (component, request-response)

**Analog:** `components/Navbar.tsx` (self — lines 1–49)

**Full existing structure** (lines 1–49):
```typescript
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/config/site";

const NAV_LINKS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Work",      href: "/work"      },
  { label: "About",     href: "/about"     },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-topbar border-b border-border-subtle">
      <div className="mx-auto max-w-content px-6 h-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <LogoMark size={32} />
          <span className="text-[15px] font-semibold tracking-tight leading-none">
            <span className="text-white">{siteConfig.name} </span>
            <span className="text-cyber-jade font-medium">tech</span>
          </span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white hover:text-cyber-jade transition-colors duration-150 ease-out"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Get in touch — outline button, Cyber Jade. NOT Volt Green (CTA rule). */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="hidden md:inline-flex items-center px-4 py-1.5 rounded-md text-sm font-medium text-cyber-jade border border-cyber-jade hover:bg-cyber-jade/10 transition-colors duration-150 ease-out shrink-0"
        >
          Get in touch
        </a>

      </div>
    </header>
  );
}
```

**Language switcher — append after the mailto `<a>` tag** (after line 44, before closing `</div>`):

Pattern rules from D-05 and D-06:
- Inline text pills: `EN | ID | ZH`
- Far-right, after "Get in touch" button
- `hidden md:flex` to match the CTA's mobile visibility rule (D-07: mobile hamburger integration is Phase 2)
- Active locale uses `text-white font-medium`; inactive locales use `text-text-secondary hover:text-white`
- Pipe separators are decorative `<span>` elements — not interactive
- Use `<Link>` from `next/link` (not `<a>`) for locale switching so Next.js trailing slash is applied automatically
- No border, no button — plain text pills per Palantir minimal aesthetic

```tsx
{/* Language switcher — hidden on mobile (Phase 2 adds to hamburger) */}
<div className="hidden md:flex items-center gap-1 text-xs font-medium shrink-0">
  <Link href="/en" className="text-white">EN</Link>
  <span className="text-text-muted">|</span>
  <Link href="/id" className="text-text-secondary hover:text-white transition-colors duration-150 ease-out">ID</Link>
  <span className="text-text-muted">|</span>
  <Link href="/zh" className="text-text-secondary hover:text-white transition-colors duration-150 ease-out">ZH</Link>
</div>
```

Note: In Phase 2, when the active locale is known via `usePathname()` or next-intl's `useLocale()`, the active pill styling (`text-white` vs `text-text-secondary`) will be driven dynamically. For Phase 1, a static version is acceptable because no live locale switching exists yet.

---

### `app/[locale]/layout.tsx` (layout, request-response)

**Analog:** `app/layout.tsx` (role-match — lines 1–33)

This is a NEW file. There is no existing locale layout to copy from. The closest analog is the root `app/layout.tsx` for its structural conventions.

Pattern rules from D-03 and D-04:
- `generateStaticParams` exports `['en', 'id', 'zh']` — required for static export
- Wraps `NextIntlClientProvider` only — does NOT re-render `<html>`, `<body>`, Navbar, or Footer
- `params` is a `Promise` in Next.js 14+ — always `await params`
- Named export is NOT used for layouts — use `export default`
- Import path for messages: `../../messages/${locale}.json` (relative, because `next-intl` static pattern requires direct JSON import)

**Pattern to implement:**
```typescript
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "id" },
    { locale: "zh" },
  ];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

Source for `getMessages` pattern: next-intl v3 static export docs (no codebase analog exists).

---

### `i18n/routing.ts` (config)

**Analog:** None in codebase.

This is a NEW file with no codebase analog. Pattern is from next-intl v3 static routing docs.

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id", "zh"],
  defaultLocale: "en",
});
```

---

### `i18n/request.ts` (config)

**Analog:** None in codebase.

This is a NEW file with no codebase analog. Pattern is from next-intl v3 static export docs. Required because middleware is not supported with `output: "export"`.

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "id" | "zh")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

---

### `app/[locale]/page.tsx` (component, request-response)

**Analog:** `app/page.tsx` (exact — moved file, lines 1–9)

**Existing file to move** (lines 1–9):
```typescript
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-text-muted text-sm font-mono tracking-widest">
        — scaffold ready —
      </p>
    </div>
  );
}
```

This file moves verbatim from `app/page.tsx` to `app/[locale]/page.tsx`. No changes to the JSX content in Phase 1 — home page content is Phase 2+.

Note: `font-mono` appears in the current placeholder. Since the page content is scaffold-only and will be replaced in Phase 2, leave it as-is for now. The `tailwind.config.ts` cleanup (removing the `mono` key) will make `font-mono` fall back to `ui-monospace`, which is acceptable for a scaffold placeholder.

---

### `app/[locale]/not-found.tsx` (component, request-response)

**Analog:** `app/page.tsx` (role-match — same static Server Component shape)

This is a NEW file. The existing `app/page.tsx` shows the minimal Server Component pattern to follow.

Pattern rules from PITFALLS.md #4 and CONTEXT.md Claude's Discretion:
- Pure static Server Component — no `headers()`, no `cookies()`, no `redirect()`, no data fetching
- No `'use client'` directive
- Branded but minimal — detailed styling is Phase 4

Import pattern to follow (same as all components):
```typescript
import Link from "next/link";
import { siteConfig } from "@/config/site";
```

Tailwind class conventions from existing components:
- Body text: `text-text-muted` or `text-text-secondary` for secondary copy
- Links: `text-cyber-jade hover:text-jade-strong transition-colors duration-150 ease-out`
- Page wrapper: `flex items-center justify-center min-h-[60vh]` (matches `app/page.tsx` layout)

**Pattern to implement:**
```typescript
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
      <p className="text-text-muted text-sm tracking-widest font-mono">404</p>
      <p className="text-text-secondary text-base">This page does not exist.</p>
      <Link
        href="/"
        className="text-cyber-jade text-sm hover:text-jade-strong transition-colors duration-150 ease-out"
      >
        Return to {siteConfig.name} tech
      </Link>
    </div>
  );
}
```

---

### `app/page.tsx` (route, request-response)

**Analog:** `app/page.tsx` (self — replace body per D-01)

**Current file** (lines 1–9) — entire content will be replaced:
```typescript
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-text-muted text-sm font-mono tracking-widest">
        — scaffold ready —
      </p>
    </div>
  );
}
```

**Replacement** — redirect to `/en/` per D-01. Static export does not support middleware or `next.config.mjs` redirects, so use `redirect()` from Next.js inside a Server Component:
```typescript
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
```

`redirect()` from `next/navigation` is supported in Server Components in static export (it produces a static HTML meta-refresh + JS redirect, compatible with `output: "export"`).

---

### `messages/en.json` (config)

**Analog:** None in codebase.

**Structure** from D-08 — flat namespaces, English content is real, skeleton keys for Phase 2+ content:
```json
{
  "nav": {
    "solutions": "Solutions",
    "work": "Work",
    "about": "About",
    "getInTouch": "Get in touch"
  },
  "home": {
    "heroTitle": "Infrastructure for intelligent operations.",
    "heroSub": "SDT builds software for fleet mobility, IoT hardware, logistics intelligence, and AI operations.",
    "ctaLabel": "See our solutions"
  },
  "solutions": {
    "pageTitle": "Solutions"
  },
  "work": {
    "pageTitle": "Work"
  },
  "about": {
    "pageTitle": "About"
  },
  "footer": {
    "tagline": "Infrastructure for intelligent operations.",
    "allRightsReserved": "All rights reserved."
  },
  "common": {
    "status": {
      "live": "Live",
      "inDevelopment": "In development"
    }
  }
}
```

---

### `messages/id.json` and `messages/zh.json` (config)

**Analog:** `messages/en.json` (structural — mirror the English schema exactly)

Per D-09: auto-translated scaffolding. Owner reviews before launch. Every key must exist in all three files — missing keys cause next-intl to throw at runtime.

`messages/id.json` — Indonesian scaffold:
```json
{
  "nav": {
    "solutions": "Solusi",
    "work": "Pekerjaan",
    "about": "Tentang",
    "getInTouch": "Hubungi kami"
  },
  "home": {
    "heroTitle": "Infrastruktur untuk operasi yang cerdas.",
    "heroSub": "SDT membangun perangkat lunak untuk mobilitas armada, perangkat keras IoT, kecerdasan logistik, dan operasi AI.",
    "ctaLabel": "Lihat solusi kami"
  },
  "solutions": {
    "pageTitle": "Solusi"
  },
  "work": {
    "pageTitle": "Pekerjaan"
  },
  "about": {
    "pageTitle": "Tentang"
  },
  "footer": {
    "tagline": "Infrastruktur untuk operasi yang cerdas.",
    "allRightsReserved": "Hak cipta dilindungi undang-undang."
  },
  "common": {
    "status": {
      "live": "Aktif",
      "inDevelopment": "Dalam pengembangan"
    }
  }
}
```

`messages/zh.json` — Chinese scaffold:
```json
{
  "nav": {
    "solutions": "解决方案",
    "work": "项目案例",
    "about": "关于我们",
    "getInTouch": "联系我们"
  },
  "home": {
    "heroTitle": "智能运营基础设施。",
    "heroSub": "SDT 构建面向车队管理、物联网硬件、物流智能和 AI 运营的软件。",
    "ctaLabel": "查看我们的解决方案"
  },
  "solutions": {
    "pageTitle": "解决方案"
  },
  "work": {
    "pageTitle": "项目案例"
  },
  "about": {
    "pageTitle": "关于我们"
  },
  "footer": {
    "tagline": "智能运营基础设施。",
    "allRightsReserved": "版权所有。"
  },
  "common": {
    "status": {
      "live": "已上线",
      "inDevelopment": "开发中"
    }
  }
}
```

---

## Shared Patterns

### Named Export Convention
**Source:** `components/LogoMark.tsx` line 6, `components/Navbar.tsx` line 11, `components/Footer.tsx` line 4
**Apply to:** All new component files (NOT layouts — layouts use default export)
```typescript
export function ComponentName() {
```
Exception: `app/*/layout.tsx` and `app/*/page.tsx` use `export default function`.

### `@/` Path Alias
**Source:** `components/Navbar.tsx` lines 1–3, `components/Footer.tsx` lines 1–2, `app/layout.tsx` lines 4–6
**Apply to:** All new files — never use relative `../` paths for cross-directory imports
```typescript
import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/config/site";
```

### siteConfig Import
**Source:** `config/site.ts` lines 1–6, consumed by `components/Navbar.tsx` line 3, `components/Footer.tsx` line 2, `app/layout.tsx` line 6
**Apply to:** Any file that renders brand name, tagline, email, or mailto link
```typescript
import { siteConfig } from "@/config/site";
// then use: siteConfig.name, siteConfig.tagline, siteConfig.email
```

### Tailwind Token Convention (no arbitrary values)
**Source:** `components/Footer.tsx` lines 8–46, `components/Navbar.tsx` lines 13–48
**Apply to:** All new and modified files
```typescript
// Use semantic tokens:
bg-background        // ← #0a0a0a (add in this phase)
bg-topbar            // ← #1A1A1A
bg-surface           // ← #111111
bg-surface-2         // ← #1A1A1A
border-border-subtle // ← #2a2a2a
text-cyber-jade      // ← #008684
text-text-secondary  // ← #a1a1aa
text-text-muted      // ← #52525b

// Never use:
bg-[#0a0a0a]   // ← replace with bg-background
```

### Transition Convention
**Source:** `components/Navbar.tsx` lines 31, 41; `components/Footer.tsx` line 26
**Apply to:** All interactive elements in new files
```typescript
className="... transition-colors duration-150 ease-out"
```
No other transition duration or easing is permitted (DESIGN.md constraint).

### Static Server Component Shape
**Source:** `app/page.tsx` lines 1–9; `app/layout.tsx` lines 19–33
**Apply to:** `app/[locale]/page.tsx`, `app/[locale]/not-found.tsx`
```typescript
// No 'use client' directive
// No async if no data fetching needed
export default function PageName() {
  return (/* JSX */);
}
```

### `generateStaticParams` + `dynamicParams` Pattern
**Source:** ARCHITECTURE.md (no codebase example yet — first dynamic route in project)
**Apply to:** `app/[locale]/layout.tsx`
```typescript
export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "id" },
    { locale: "zh" },
  ];
}
export const dynamicParams = false;
```

### Await `params` Pattern
**Source:** ARCHITECTURE.md (Next.js 14+ requirement — `params` is a Promise)
**Apply to:** `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`
```typescript
export default async function Layout({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // ...
}
```

---

## No Analog Found

Files with no codebase analog — planner must use RESEARCH.md and next-intl v3 docs patterns:

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `i18n/routing.ts` | config | n/a | No i18n infrastructure exists in project yet |
| `i18n/request.ts` | config | n/a | No i18n infrastructure exists in project yet |
| `messages/en.json` | config | n/a | No translation files exist in project yet |
| `messages/id.json` | config | n/a | No translation files exist in project yet |
| `messages/zh.json` | config | n/a | No translation files exist in project yet |

Patterns for these files are fully specified above using D-08/D-09 decisions and next-intl v3 static export docs.

---

## Metadata

**Analog search scope:** `app/`, `components/`, `config/`, project root
**Files scanned:** 7 TypeScript/TSX source files (complete codebase — no files excluded)
**Pattern extraction date:** 2026-06-10
