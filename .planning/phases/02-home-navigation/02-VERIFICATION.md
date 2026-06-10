---
phase: 02-home-navigation
verified: 2026-06-11T00:00:00Z
status: human_needed
score: 7/7 must-haves verified
overrides_applied: 0
re_verification: false
human_verification:
  - test: "Open http://localhost:3000/en and visually inspect the home page"
    expected: "Hero: dot-grid background visible, eyebrow 'INTELLIGENT OPERATIONS', 2-line H1, sub-line, single Volt Green CTA. Solutions strip: 4 cards with icon/title/desc/violet tag, hover shifts border to cyan. Approach: 3 items with large faded cyan numerals 01/02/03. Work teaser: 'EV Fleet Operations' card with teal 'Live' tag, 'See our work' link. Footer CTA: cyber-jade outline button (NOT filled green)."
    why_human: "CSS rendering, color accuracy (volt-green vs cyber-jade), and dot-grid visibility cannot be verified by grep"
  - test: "Resize browser below 768px and test hamburger menu"
    expected: "Hamburger (3-line icon) appears, desktop nav hidden. Tap hamburger — mobile menu opens, icon becomes X, nav links appear stacked. Press Escape — menu closes, focus returns to hamburger button. Touch target is at least 44x44px."
    why_human: "Responsive layout, focus management behavior, and touch target feel require a browser"
  - test: "Test language switcher path preservation"
    expected: "Navigate to /en/solutions. Click 'ID' — URL becomes /id/solutions (not /id/). Click 'ZH' — URL becomes /zh/solutions. Page text changes to Indonesian/Chinese respectively."
    why_human: "router.replace behavior and next-intl locale switching require a running browser session"
  - test: "Visit /id and /zh and confirm translated content"
    expected: "/id hero heading shows Indonesian text ('Infrastruktur untuk' / 'operasi cerdas.' or equivalent). /zh hero heading shows Chinese characters. All sections translated."
    why_human: "Translation rendering requires a browser to verify correct locale is applied to each section"
---

# Phase 2: Home & Navigation Verification Report

**Phase Goal:** A visitor landing on the home page experiences the full intended design — hero, solutions strip, approach section, work teaser, and footer CTA — with a navbar that highlights the current page and collapses correctly on mobile
**Verified:** 2026-06-11
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Hero section renders with dot-grid background, eyebrow label, 2-line H1, sub-line, and exactly one Volt Green CTA button | VERIFIED | `HeroSection.tsx` has `dot-grid` class on section, `t("eyebrow")`, two `<span className="block">` children in H1, `bg-volt-green text-background` on CTA anchor. `globals.css` has `.dot-grid { background-image: radial-gradient(circle, #2a2a2a 1px, transparent 1px); background-size: 24px 24px; }`. `grep -rn 'volt-green' components/home/` returns only `HeroSection.tsx`. |
| 2 | Four solution cards render with icon, title, description, and grid-violet tag; hover shifts border to cyber-jade | VERIFIED | `SolutionCard.tsx` renders `icon`, `title`, `desc`, `tag` props with `bg-grid-violet/10 text-grid-violet` on tag span and `hover:border-cyber-jade` on card wrapper. `SolutionsStrip.tsx` maps 4 cards using `getTranslations("solutions")`, keys `card1Title`–`card4Tag` confirmed present in `messages/en.json`. |
| 3 | Approach section shows 3 numbered items with text-cyber-jade/20 large number accents | VERIFIED | `ApproachSection.tsx` maps 3 items with `num: "01"/"02"/"03"`, renders `<span className="text-4xl font-bold text-cyber-jade/20 leading-none">`. Translation keys `item1Title`–`item3Body` confirmed in `messages/en.json`. |
| 4 | Work teaser section shows the EV Fleet Operations card with bg-ev-teal/10 text-ev-teal status tag and a locale-prefixed link to /work | VERIFIED | `WorkTeaser.tsx` has `<span className="self-start text-xs font-medium bg-ev-teal/10 text-ev-teal ...">Live</span>`, renders `wt("evFleetTitle")` and `wt("evFleetDesc")`. `Link href="/work"` imported from `@/i18n/navigation` (auto-prefixes locale). `hover:text-jade-strong` on "See our work" link. |
| 5 | Footer CTA section uses a cyber-jade outline button (border-cyber-jade text-cyber-jade) — NOT volt-green | VERIFIED | `FooterCTA.tsx` has `<a className="border border-cyber-jade text-cyber-jade ...">`. No `volt-green` in this file. Uses `siteConfig.email` for mailto href. |
| 6 | Navbar visually marks the active route; hamburger collapses correctly on mobile with correct ARIA attributes | VERIFIED | `Navbar.tsx`: `isActive()` helper drives `text-cyber-jade border-b border-cyber-jade pb-1` and `aria-current="page"` on active link. Hamburger: `min-h-[44px] min-w-[44px]`, `aria-expanded={isOpen}`, `aria-controls="mobile-menu"`, `aria-label` toggles. Escape key handler in `useEffect`. `Fragment key={loc}` for language switcher. `router.replace(pathname, { locale: loc })` for path-preserving switch. |
| 7 | All three locale routes (/en, /id, /zh) render translated home page content | VERIFIED | `app/[locale]/page.tsx` calls `setRequestLocale(locale)`, imports and renders all 5 sections. `generateStaticParams` returns `[{ locale: "en" }, { locale: "id" }, { locale: "zh" }]`. `footerCtaHeading` key confirmed present in all three message files. `_reviewNote` confirmed as first key in `id.json` and `zh.json`. |

**Score:** 7/7 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `i18n/navigation.ts` | createNavigation exports: Link, redirect, usePathname, useRouter | VERIFIED | `export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)` |
| `app/[locale]/layout.tsx` | setRequestLocale called before getMessages() | VERIFIED | Line 24: `setRequestLocale(locale)` — imports `setRequestLocale` from `next-intl/server` on line 2 |
| `components/Navbar.tsx` | Client Component with active state, hamburger, language switcher | VERIFIED | First line: `"use client";`, all required attributes present |
| `app/globals.css` | .dot-grid CSS class | VERIFIED | Lines 18–21: `.dot-grid { radial-gradient(circle, #2a2a2a 1px, transparent 1px); background-size: 24px 24px; }` |
| `components/home/HeroSection.tsx` | Hero with dot-grid, eyebrow, 2-line H1, Volt Green CTA | VERIFIED | `bg-volt-green` on CTA, `dot-grid` on section, `getTranslations("home")` |
| `components/home/SolutionsStrip.tsx` | 4-card solutions grid | VERIFIED | Maps 4 cards, uses `getTranslations("solutions")` |
| `components/home/SolutionCard.tsx` | Card with bg-grid-violet/10 text-grid-violet | VERIFIED | Tag span has `bg-grid-violet/10 text-grid-violet` |
| `components/home/ApproachSection.tsx` | 3-item approach with text-cyber-jade/20 | VERIFIED | Number accents: `text-cyber-jade/20` |
| `components/home/WorkTeaser.tsx` | Work card + locale-prefixed /work link | VERIFIED | `bg-ev-teal/10 text-ev-teal`, `Link` from `@/i18n/navigation` |
| `components/home/FooterCTA.tsx` | Cyber-jade outline button, NOT volt-green | VERIFIED | `border-cyber-jade text-cyber-jade`, zero volt-green references |
| `app/[locale]/page.tsx` | Home page Server Component, setRequestLocale, all sections | VERIFIED | Async with `await params`, `setRequestLocale`, all 5 imports and renders |
| `messages/en.json` | footerCtaHeading, heroLine1/2, approach and solutions keys | VERIFIED | All required keys present |
| `messages/id.json` | Indonesian translations, _reviewNote first key | VERIFIED | _reviewNote on line 2, footerCtaHeading present |
| `messages/zh.json` | Chinese translations, _reviewNote first key | VERIFIED | _reviewNote on line 2, footerCtaHeading present |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `components/Navbar.tsx` | `i18n/navigation.ts` | `import { usePathname, useRouter, Link } from "@/i18n/navigation"` | WIRED | Line 5 of Navbar.tsx |
| `components/Navbar.tsx` | `next-intl` | `import { useLocale } from "next-intl"` | WIRED | Line 6 of Navbar.tsx |
| `app/[locale]/layout.tsx` | `next-intl/server` | `import { setRequestLocale } from "next-intl/server"` | WIRED | Line 2, called on line 24 |
| `app/[locale]/page.tsx` | `components/home/HeroSection.tsx` | `import { HeroSection } from "@/components/home/HeroSection"` | WIRED | Line 2 of page.tsx; rendered in JSX |
| `components/home/HeroSection.tsx` | `messages/en.json` | `getTranslations("home")` | WIRED | `t("eyebrow")`, `t("heroLine1")`, `t("heroLine2")`, `t("heroSub")`, `t("ctaLabel")` |
| `components/home/FooterCTA.tsx` | `config/site.ts` | `siteConfig.email in mailto href` | WIRED | `href={\`mailto:${siteConfig.email}\`}` |
| `components/home/WorkTeaser.tsx` | `i18n/navigation.ts` | `import { Link } from "@/i18n/navigation"` | WIRED | Line 2 of WorkTeaser.tsx; `<Link href="/work">` |

### Data-Flow Trace (Level 4)

All home section components are async Server Components using `getTranslations` from `next-intl/server`. Translation data flows from `messages/*.json` files through next-intl at build/render time — no state or fetch involved. All data sources are real translation files with complete key sets (verified above).

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `HeroSection.tsx` | `t(...)` | `messages/[locale].json` home namespace | Yes — keys verified in en/id/zh | FLOWING |
| `SolutionsStrip.tsx` | `st(...)` | `messages/[locale].json` solutions namespace | Yes — card1Title–card4Tag verified | FLOWING |
| `ApproachSection.tsx` | `at(...)` | `messages/[locale].json` approach namespace | Yes — item1Title–item3Body verified | FLOWING |
| `WorkTeaser.tsx` | `wt(...)` | `messages/[locale].json` work namespace | Yes — evFleetTitle/evFleetDesc verified | FLOWING |
| `FooterCTA.tsx` | `t(...)` | `messages/[locale].json` home namespace | Yes — footerCtaHeading/Sub/Button verified | FLOWING |

### Behavioral Spot-Checks

Step 7b skipped — verifying a Next.js static export requires a running dev server or completed build. Build pass is documented in SUMMARY.md (`npm run build` exits 0 per 02-02-SUMMARY commit 34f3e89). No runnable entry point can be exercised without starting a server.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| NAV-01 | 02-01-PLAN.md | Sticky navbar with active-state link highlighting | SATISFIED | `isActive()` helper, `text-cyber-jade border-b border-cyber-jade pb-1`, `aria-current="page"` in Navbar.tsx |
| NAV-02 | 02-01-PLAN.md | Mobile hamburger menu — 44px touch target, keyboard accessible | SATISFIED | `min-h-[44px] min-w-[44px]`, `aria-expanded`, `aria-controls="mobile-menu"`, Escape key handler, focus management via refs |
| HOME-01 | 02-02-PLAN.md | Hero — full-viewport, CSS dot-grid, eyebrow, 2-line headline, Volt Green CTA | SATISFIED | `dot-grid` class, `.dot-grid` CSS in globals.css, `bg-volt-green` on CTA, 2x `<span className="block">` in H1 |
| HOME-02 | 02-02-PLAN.md | Solutions strip — 4 cards with grid-violet tag; hover border to cyber-jade | SATISFIED | `SolutionCard.tsx` renders `bg-grid-violet/10 text-grid-violet` tag, `hover:border-cyber-jade` on card wrapper |
| HOME-03 | 02-02-PLAN.md | Approach section — 3 numbered items | SATISFIED | `ApproachSection.tsx` maps 3 items with `text-cyber-jade/20` number accents |
| HOME-04 | 02-02-PLAN.md | Work teaser — EV Fleet Operations card with status tag | SATISFIED | `bg-ev-teal/10 text-ev-teal` on "Live" tag, `wt("evFleetTitle")`, Link to /work |
| HOME-05 | 02-02-PLAN.md | Footer CTA — cyber-jade outline mailto button (not Volt Green) | SATISFIED | `border-cyber-jade text-cyber-jade`, zero volt-green in FooterCTA.tsx |

### Anti-Patterns Found

No `TBD`, `FIXME`, or `XXX` markers found in any files modified by this phase (grep returned 0). No stub patterns found. All components render real translated content from message files.

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | None found | — | — |

### Human Verification Required

Automated checks verified all structural, wiring, and content requirements. The following behaviors require a browser to confirm:

#### 1. Full Home Page Visual Inspection

**Test:** Run `npm run dev`, open http://localhost:3000/en
**Expected:** Hero shows dot-grid background (subtle dark dots on black), "INTELLIGENT OPERATIONS" eyebrow, 2-line H1, sub-line, single Volt Green (bright yellow-green) CTA. Solutions: 4 cards, hover shifts border to teal/cyan. Approach: 3 items with large faded cyan numbers. Work teaser: teal "Live" badge on EV Fleet card, cyan "See our work" link. Footer CTA: cyber-jade outline button (cyan border/text, NOT filled green).
**Why human:** CSS color rendering, dot-grid visibility, volt-green vs cyber-jade visual distinction cannot be verified by grep.

#### 2. Mobile Hamburger Menu Behavior

**Test:** Resize browser to < 768px, interact with hamburger
**Expected:** Hamburger button (3 lines) appears, desktop nav disappears. Click opens mobile menu (icon becomes X). Press Escape — menu closes, focus returns to hamburger. Touch target feels at least 44×44 px.
**Why human:** Responsive layout, focus management behavior, and visual icon toggle require a live browser.

#### 3. Language Switcher Path Preservation

**Test:** Navigate to /en/solutions, click "ID" then "ZH" in the language switcher
**Expected:** URL becomes /id/solutions (not /id/). Then /zh/solutions. Page text changes to Indonesian and Chinese respectively.
**Why human:** `router.replace` behavior and locale routing require a running Next.js session.

#### 4. Translated Page Content at /id and /zh

**Test:** Visit http://localhost:3000/id and http://localhost:3000/zh
**Expected:** All sections render in the correct language — Indonesian on /id, Chinese on /zh. Confirm hero, solutions, approach, work teaser, and footer CTA all show translated strings.
**Why human:** next-intl locale selection at runtime requires a browser to confirm correct locale is applied to each Server Component section.

---

_Verified: 2026-06-11_
_Verifier: Claude (gsd-verifier)_
