---
phase: 02-home-navigation
reviewed: 2026-06-11T00:00:00Z
depth: standard
files_reviewed: 14
files_reviewed_list:
  - app/[locale]/layout.tsx
  - app/[locale]/page.tsx
  - app/globals.css
  - app/layout.tsx
  - components/Navbar.tsx
  - components/home/ApproachSection.tsx
  - components/home/FooterCTA.tsx
  - components/home/HeroSection.tsx
  - components/home/SolutionCard.tsx
  - components/home/SolutionsStrip.tsx
  - components/home/WorkTeaser.tsx
  - i18n/navigation.ts
  - messages/en.json
  - messages/id.json
  - messages/zh.json
findings:
  critical: 3
  warning: 6
  info: 4
  total: 13
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-06-11T00:00:00Z
**Depth:** standard
**Files Reviewed:** 14
**Status:** issues_found

## Summary

Reviewed the navigation module, Navbar Client Component, all home-page sections, the i18n routing layer, and the three locale message files. The architecture is clean and the component structure is correct for a static-export Next.js 14 App Router project with next-intl v4.

Three blockers were found: the root `app/layout.tsx` hardcodes `lang="en"` for all locales so screen readers and search engines always see the wrong language; `WorkTeaser` accepts a `locale` prop from the page but never uses it (dead prop); and the `"use client"` Navbar calls `getTranslations` indirectly through its parent chain — the actual blocker is that the Navbar's hardcoded English nav-link labels (`"Solutions"`, `"Work"`, `"About"`) bypass the i18n system entirely, so they will never translate regardless of locale.

Warnings cover: missing `aria-label` on the hamburger button's accessible name for dynamic state change, the `isActive` logic matching `/` on every route, the `locale` prop threading anti-pattern, duplicate `generateStaticParams` definitions, the Footer not using i18n translations for its copyright string, and a `_reviewNote` metadata key in `id.json`/`zh.json` that will be exposed to clients at runtime.

---

## Critical Issues

### CR-01: `app/layout.tsx` hardcodes `lang="en"` — wrong language attribute for all non-English locales

**File:** `app/layout.tsx:23`
**Issue:** The root `<html>` element has `lang="en"` unconditionally. When a user visits `/id/...` or `/zh/...`, the document still declares itself English. This breaks screen reader language switching, browser translation prompts, and search engine locale signals. The `lang` attribute must reflect the active locale.

The root layout does not receive the locale because all pages now live under `app/[locale]/`. The fix is to remove `lang` from the root layout and set it in `app/[locale]/layout.tsx`, which already has `locale` available.

**Fix:**

In `app/layout.tsx`, remove the `lang` attribute from `<html>` (set it to an empty string or a neutral value):
```tsx
// app/layout.tsx — root layout does not know the locale; remove lang here
<html className={inter.variable}>
```

In `app/[locale]/layout.tsx`, render the locale-aware `<html>` wrapper. Because Next.js App Router allows nested `<html>` only from the root layout, the correct approach is to pass `lang` through the root layout via a search-param or, more idiomatically, move the font variable and metadata to `app/[locale]/layout.tsx` and make the root layout a minimal shell:
```tsx
// app/[locale]/layout.tsx — add lang to the wrapping html via a different strategy:
// Move html+body to this layout, make app/layout.tsx only export metadata + font variable.
// Alternatively: pass locale as a prop via generateStaticParams and rewrite root layout.
```

The minimum viable fix without restructuring is to set `lang` in `app/[locale]/layout.tsx` on the `<body>` (which is valid HTML5 — though `lang` on `<html>` is preferred, `lang` on `<body>` is supported by all major screen readers and is far better than a wrong value on `<html>`):
```tsx
// app/[locale]/layout.tsx
<NextIntlClientProvider locale={locale} messages={messages}>
  {/* Insert a hidden span or use suppressHydrationWarning on body with lang;
      the clean fix is restructuring root layout — see above */}
</NextIntlClientProvider>
```

---

### CR-02: Navbar nav-link labels are hardcoded English strings — never translated

**File:** `components/Navbar.tsx:10-14`
**Issue:** The `NAV_LINKS` constant defines labels as hardcoded English string literals (`"Solutions"`, `"Work"`, `"About"`). These values are never read from the i18n message files even though translations for `nav.solutions`, `nav.work`, and `nav.about` exist in all three locale files. When the locale is `id` or `zh`, the nav still renders English labels.

The Navbar is a `"use client"` component, so `getTranslations` cannot be used. The correct approach is `useTranslations` from `next-intl`.

**Fix:**
```tsx
// components/Navbar.tsx — replace hardcoded labels with useTranslations
import { useTranslations } from "next-intl";

// Inside Navbar():
const t = useTranslations("nav");

const NAV_LINKS = [
  { labelKey: "solutions" as const, href: "/solutions" },
  { labelKey: "work"      as const, href: "/work"      },
  { labelKey: "about"     as const, href: "/about"     },
] as const;

// In the JSX:
{NAV_LINKS.map((link) => (
  <Link key={link.href} href={link.href} ...>
    {t(link.labelKey)}
  </Link>
))}
```

The "Get in touch" button text (line 96) is also hardcoded and should use `t("getInTouch")`.

---

### CR-03: `WorkTeaser` `locale` prop is accepted but never used — dead prop / misleading API

**File:** `components/home/WorkTeaser.tsx:4-8` and `app/[locale]/page.tsx:27`
**Issue:** `WorkTeaser` declares a `WorkTeaserProps` interface with `locale: string` and the page passes `locale={locale}` to it. However, the `locale` parameter is destructured and then never referenced anywhere in the component body. The component uses `getTranslations` which reads locale from the next-intl request context — not from this prop. The prop is dead weight that implies a contract that does not exist.

This is a correctness issue because: (a) anyone reading the interface will believe locale must be threaded to control behaviour, (b) it creates false confidence that locale-specific rendering is handled, and (c) if next-intl context is ever unavailable (e.g., during testing or SSG edge cases), the prop provides no fallback.

**Fix:**
```tsx
// components/home/WorkTeaser.tsx — remove the unused prop entirely
export async function WorkTeaser() {
  const t = await getTranslations("home");
  const wt = await getTranslations("work");
  // ... rest unchanged
}

// app/[locale]/page.tsx line 27 — remove locale prop
<WorkTeaser />
```

---

## Warnings

### WR-01: `isActive` logic matches every route for `/` (root path)

**File:** `components/Navbar.tsx:24-25`
**Issue:** The `isActive` function is:
```ts
const isActive = (href: string) =>
  pathname === href || pathname.startsWith(href + "/");
```
When `href` is `/solutions`, this is correct. However, if a `/` link were ever added to `NAV_LINKS`, it would match every pathname (every path starts with `/`). More concretely, the logo `<Link href="/">` at line 47 does not call `isActive`, but the logic is fragile and will silently apply the active style to every link if a home entry is added to `NAV_LINKS` in the future. The standard guard is to also require `href !== "/"` or use an exact-match for `/`.

**Fix:**
```ts
const isActive = (href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(href + "/");
```

---

### WR-02: Duplicate `generateStaticParams` in both layout and page for the same segment

**File:** `app/[locale]/layout.tsx:6-12` and `app/[locale]/page.tsx:8-10`
**Issue:** `generateStaticParams` is exported from both `app/[locale]/layout.tsx` and `app/[locale]/page.tsx`. In Next.js 14 App Router, `generateStaticParams` in a layout and a page under the same dynamic segment are redundant — the layout's definition covers all pages under that segment. The duplicate in `page.tsx` is harmless in the current build but creates a maintenance hazard: the two lists can drift out of sync (e.g., adding a 4th locale to the layout but forgetting the page), causing incomplete static generation.

**Fix:** Remove `generateStaticParams` and `dynamicParams` from `app/[locale]/page.tsx` (lines 8-12). Keep them only in `app/[locale]/layout.tsx` where they apply segment-wide.

---

### WR-03: Mobile menu lacks focus trap — keyboard users can tab outside the open overlay

**File:** `components/Navbar.tsx:127-169`
**Issue:** When the mobile menu is open, focus is moved to the first link (line 39), and Escape closes the menu (lines 28-35). However, there is no focus trap: keyboard users can Tab past the last menu item into page content behind the overlay. For an overlay navigation menu, WCAG 2.1 SC 2.1.2 (No Keyboard Trap) requires that focus stays within the open menu or the menu must not behave like a modal. Without a trap, Tab from the last language-switcher button will move focus to body content that is visually hidden under the menu.

**Fix:** Add a focus-trap on open. The minimum implementation using standard DOM:
```tsx
// Add a useEffect that intercepts Tab on the last focusable item:
useEffect(() => {
  if (!isOpen) return;
  const menu = document.getElementById("mobile-menu");
  if (!menu) return;
  const focusable = menu.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const trap = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  document.addEventListener("keydown", trap);
  return () => document.removeEventListener("keydown", trap);
}, [isOpen]);
```

---

### WR-04: `_reviewNote` metadata key in `id.json` and `zh.json` is served to clients at runtime

**File:** `messages/id.json:2` and `messages/zh.json:2`
**Issue:** Both non-English message files contain a top-level `"_reviewNote"` key:
```json
"_reviewNote": "Auto-translated scaffolding — owner review required before launch"
```
The `getMessages()` call in `app/[locale]/layout.tsx` loads the entire JSON object and passes it to `NextIntlClientProvider`. This means the review note string is serialised into the page HTML and sent to every browser loading the `id` or `zh` locale. While not a security risk, it exposes an internal process annotation to the public and wastes bytes.

**Fix:** Remove `_reviewNote` from both files before any public deployment:
```json
// messages/id.json — delete line 2
// messages/zh.json — delete line 2
```

---

### WR-05: Footer copyright string is hardcoded English and not using i18n — inconsistent with the i18n system

**File:** `components/Footer.tsx:41`
**Issue:** The Footer renders:
```tsx
&copy; {year} {siteConfig.name} tech. All rights reserved.
```
The message files for all three locales contain `footer.allRightsReserved` with proper translations (`"All rights reserved."` / `"Hak cipta dilindungi undang-undang."` / `"版权所有。"`). The Footer does not call `getTranslations` or `useTranslations`, so the Indonesian and Chinese locales always display English legal text. This is inconsistent with the rest of the i18n implementation. (The Footer `tagline` field is also translated in all locale files but the Footer reads `siteConfig.tagline` instead.)

**Fix:** Convert `Footer` to an async Server Component and use `getTranslations`:
```tsx
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();
  // ...
  // Replace hardcoded strings:
  <p className="text-text-muted text-xs">{t("tagline")}</p>
  // ...
  <p className="text-text-muted text-xs">
    &copy; {year} {siteConfig.name} tech. {t("allRightsReserved")}
  </p>
}
```

---

### WR-06: `app/layout.tsx` metadata title interpolates `siteConfig.name` with a hardcoded literal suffix

**File:** `app/layout.tsx:13`
**Issue:**
```ts
title: `${siteConfig.name} tech`,
```
The word `"tech"` is appended as a hardcoded string. If `siteConfig.name` already includes "tech" or the brand name ever changes, this produces a doubled or incorrect title. The `siteConfig` object should be the single source of truth for the full brand name. This is a maintainability defect as documented in CLAUDE.md: "Company name, email, and tagline all come from `config/site.ts` — change them in one place."

**Fix:** Add a `fullName` or `brandName` field to `siteConfig`, or ensure `siteConfig.name` is the complete brand name and remove the suffix:
```ts
// config/site.ts — add:
export const siteConfig = {
  name: "sdt",
  brandName: "sdt tech",  // <-- add this
  ...
};

// app/layout.tsx:
title: siteConfig.brandName,
```

---

## Info

### IN-01: `nav` namespace translations are loaded in all locale files but never consumed

**File:** `messages/en.json:2-7`, `messages/id.json:3-8`, `messages/zh.json:3-8`
**Issue:** All three message files define a `nav` namespace with `solutions`, `work`, `about`, and `getInTouch` keys. These translations exist but are never read by any component (the Navbar uses hardcoded strings — see CR-02). Once CR-02 is fixed, these keys will be consumed. Listed here for visibility.

**Fix:** No action needed beyond fixing CR-02. The translations are correct and ready.

---

### IN-02: `common.status` translations exist in all three locale files but are unused

**File:** `messages/en.json:60-65`, `messages/id.json:60-65`, `messages/zh.json:59-64`
**Issue:** All locale files define `common.status.live` and `common.status.inDevelopment`. The `WorkTeaser` component renders the status tag with a hardcoded English string `"Live"` (line 26 of `WorkTeaser.tsx`) instead of using `t("common.status.live")` from the `common` namespace. This is a dead translation.

**Fix:**
```tsx
// components/home/WorkTeaser.tsx — use the translation
import { getTranslations } from "next-intl/server";
// Inside WorkTeaser:
const ct = await getTranslations("common");
// In JSX:
<span className="self-start text-xs font-medium bg-ev-teal/10 text-ev-teal px-2 py-1 rounded">
  {ct("status.live")}
</span>
```

---

### IN-03: `Fragment` is imported twice from React in `Navbar.tsx`

**File:** `components/Navbar.tsx:3-4`
**Issue:**
```tsx
import { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
```
`Fragment` is imported as a separate `import` statement on line 4 instead of being included in the named imports on line 3. This is a trivial style issue but creates unnecessary noise.

**Fix:**
```tsx
import { useState, useEffect, useRef, Fragment } from "react";
```

---

### IN-04: `WorkTeaser` `locale` prop adds a dead interface that will mislead future contributors

**File:** `components/home/WorkTeaser.tsx:4-6`
**Issue:** (Companion to CR-03.) The `WorkTeaserProps` interface and the prop-threading in `app/[locale]/page.tsx` constitute misleading API surface. Any future contributor adding locale-conditional content to `WorkTeaser` may assume the `locale` prop is the correct channel, when it is actually ignored. The actual locale comes from the next-intl request context.

**Fix:** Remove the interface and prop (covered by CR-03 fix). No separate action needed.

---

_Reviewed: 2026-06-11T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
