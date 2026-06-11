# Phase 3: Interior Pages — Pattern Map

**Mapped:** 2026-06-11
**Files analyzed:** 17 new/modified files
**Analogs found:** 17 / 17

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `lib/solutions.ts` | utility/data | transform | `i18n/routing.ts` (typed const export) | role-match |
| `components/PageHero.tsx` | component | request-response | `components/home/HeroSection.tsx` | role-match |
| `components/solutions/SolutionsGrid.tsx` | component | request-response | `components/home/SolutionsStrip.tsx` | exact |
| `components/solutions/SolutionDetailHero.tsx` | component | request-response | `components/home/WorkTeaser.tsx` (status badge) | role-match |
| `components/solutions/CapabilityList.tsx` | component | transform | `components/home/ApproachSection.tsx` | exact |
| `components/solutions/WhoThisIsFor.tsx` | component | request-response | `components/home/ApproachSection.tsx` | role-match |
| `components/work/WorkCard.tsx` | component | request-response | `components/home/WorkTeaser.tsx` | exact |
| `components/work/GhostCard.tsx` | component | request-response | `components/home/SolutionCard.tsx` (card shell) | role-match |
| `components/about/BeliefGrid.tsx` | component | request-response | `components/home/ApproachSection.tsx` | exact |
| `components/about/CurrentFocusParagraph.tsx` | component | request-response | `components/home/WorkTeaser.tsx` | role-match |
| `app/[locale]/solutions/page.tsx` | page | request-response | `app/[locale]/page.tsx` | exact |
| `app/[locale]/solutions/[slug]/page.tsx` | page | request-response | `app/[locale]/page.tsx` + `app/[locale]/layout.tsx` | exact |
| `app/[locale]/work/page.tsx` | page | request-response | `app/[locale]/page.tsx` | exact |
| `app/[locale]/about/page.tsx` | page | request-response | `app/[locale]/page.tsx` | exact |
| `messages/en.json` | config | transform | `messages/en.json` (existing file — modify) | exact |
| `messages/id.json` | config | transform | `messages/id.json` (existing file — modify) | exact |
| `messages/zh.json` | config | transform | `messages/zh.json` (existing file — modify) | exact |

---

## Pattern Assignments

### `lib/solutions.ts` (utility/data, transform)

**Analog:** `i18n/routing.ts` (typed const export pattern), icon values confirmed from `components/home/SolutionsStrip.tsx` lines 8–13

**Typed const array pattern** (`i18n/routing.ts` lines 1–6 + `SolutionsStrip.tsx` lines 8–13):
```typescript
// routing.ts — typed defineRouting export
import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["en", "id", "zh"],
  defaultLocale: "en",
});

// SolutionsStrip.tsx lines 8–13 — icon values to reuse in lib/solutions.ts:
{ icon: "⚡", titleKey: "card1Title", ... },  // fleet-mobility
{ icon: "◈",  titleKey: "card2Title", ... },  // iot-hardware
{ icon: "⊞",  titleKey: "card3Title", ... },  // logistics-intelligence
{ icon: "∿",  titleKey: "card4Title", ... },  // ai-operations
```

**Target pattern for `lib/solutions.ts`:**
```typescript
export type SolutionStatus = "live" | "in-development";

export interface Solution {
  slug: string;
  status: SolutionStatus;
  icon: string;
  order: number;
}

export const solutions: Solution[] = [
  { slug: "fleet-mobility",         status: "live",           icon: "⚡", order: 1 },
  { slug: "iot-hardware",           status: "in-development", icon: "◈",  order: 2 },
  { slug: "logistics-intelligence", status: "in-development", icon: "⊞",  order: 3 },
  { slug: "ai-operations",          status: "in-development", icon: "∿",  order: 4 },
];
```

**Key rules:** `@/` alias on all imports. Slugs must match exactly: `fleet-mobility`, `iot-hardware`, `logistics-intelligence`, `ai-operations`.

---

### `components/PageHero.tsx` (component, request-response)

**Analog:** `components/home/HeroSection.tsx`

**Imports pattern** (`HeroSection.tsx` lines 1–2):
```typescript
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
```

**Section + container pattern** (`HeroSection.tsx` lines 8–10):
```typescript
<section className="dot-grid bg-background min-h-screen flex flex-col items-center justify-center py-24 md:py-32 px-6">
  <div className="mx-auto max-w-content flex flex-col items-center text-center">
```
**Note for PageHero:** Use `bg-background py-24 md:py-32 px-6` — no `dot-grid`, no `min-h-screen`. PageHero is a shared interior hero, not the home hero.

**Eyebrow pattern** (`HeroSection.tsx` line 12):
```typescript
<p className="text-xs font-medium tracking-widest text-text-secondary uppercase mb-6">
  {t("eyebrow")}
</p>
```

**H1 pattern** (`HeroSection.tsx` lines 16–18):
```typescript
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none text-center mb-6 max-w-content">
  {heading}
</h1>
```
**Note:** Interior pages use `text-5xl md:text-6xl` (no lg size). Max-w-3xl for heading, max-w-xl for sub.

**Sub-line pattern** (`HeroSection.tsx` line 22):
```typescript
<p className="text-base font-medium leading-relaxed text-text-secondary text-center max-w-2xl mb-10">
  {t("heroSub")}
</p>
```

**Export convention:** Named export — `export function PageHero(...)`. PageHero receives props (`eyebrow`, `heading`, `sub?`) — it does NOT call `getTranslations` internally; translation calls happen in the page and passed as props.

---

### `components/solutions/SolutionsGrid.tsx` (component, request-response)

**Analog:** `components/home/SolutionsStrip.tsx`

**Imports pattern** (`SolutionsStrip.tsx` lines 1–3):
```typescript
import { getTranslations } from "next-intl/server";
import { SolutionCard } from "@/components/home/SolutionCard";
```
**SolutionsGrid also needs:**
```typescript
import { Link } from "@/i18n/navigation";
import { solutions } from "@/lib/solutions";
```

**const data array above component** (`SolutionsStrip.tsx` lines 8–13):
```typescript
const cards = [
  { icon: "⚡", titleKey: "card1Title", descKey: "card1Desc", tagKey: "card1Tag" },
  { icon: "◈",  titleKey: "card2Title", descKey: "card2Desc", tagKey: "card2Tag" },
  // ...
] as const;
```
**SolutionsGrid uses `solutions` from `lib/solutions.ts` instead of a local const.**

**Section + grid pattern** (`SolutionsStrip.tsx` lines 16–39):
```typescript
<section className="py-24 md:py-32 px-6 bg-background">
  <div className="mx-auto max-w-content">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card) => (
        <SolutionCard key={card.titleKey} ... />
      ))}
    </div>
  </div>
</section>
```
**SolutionsGrid wraps each SolutionCard externally in `<Link>`:**
```typescript
<Link href={`/solutions/${solution.slug}`} className="block">
  <SolutionCard
    icon={solution.icon}
    title={st(`${solution.slug}.title`)}
    desc={st(`${solution.slug}.desc`)}
    tag={st(`${solution.slug}.tag`)}
  />
</Link>
```

**Volt Green CTA:** Solutions index gets the one Volt Green CTA per page (see `HeroSection.tsx` lines 27–31 for Volt Green button pattern).

---

### `components/solutions/SolutionDetailHero.tsx` (component, request-response)

**Analog:** `components/home/WorkTeaser.tsx` (status badge + card structure)

**Imports pattern** (`WorkTeaser.tsx` lines 1–2):
```typescript
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
```

**Status badge pattern** (`WorkTeaser.tsx` lines 25–27):
```typescript
{/* Live badge — ev-teal */}
<span className="self-start text-xs font-medium bg-ev-teal/10 text-ev-teal px-2 py-1 rounded">
  Live
</span>
```
**Two variants (locked by UI-SPEC):**
```typescript
{/* Live — ev-teal */}
<span className="self-start text-xs font-normal tracking-widest uppercase px-2 py-1 rounded bg-ev-teal/10 text-ev-teal">
  {t("common.status.live")}
</span>

{/* In Development — amber */}
<span className="self-start text-xs font-normal tracking-widest uppercase px-2 py-1 rounded bg-amber-500/10 text-amber-400">
  {t("common.status.inDevelopment")}
</span>
```
**Note:** `common.status.live` and `common.status.inDevelopment` keys already exist in `messages/en.json` lines 61–65.

**Content order (locked by UI-SPEC D-48):** status badge → H1 → problem statement → WhoThisIsFor → CapabilityList.

**Section + container** (`WorkTeaser.tsx` lines 13–14):
```typescript
<section className="py-24 md:py-32 px-6 bg-background">
  <div className="mx-auto max-w-content">
```

**H1 on detail page:** `text-5xl md:text-6xl font-bold tracking-tighter leading-none` (same as PageHero heading, not `text-3xl` from section headings).

---

### `components/solutions/CapabilityList.tsx` (component, transform)

**Analog:** `components/home/ApproachSection.tsx`

**Imports pattern** (`ApproachSection.tsx` lines 1–2):
```typescript
import { getTranslations } from "next-intl/server";
```
**CapabilityList receives props — it does NOT call `getTranslations` itself. Translation calls happen in the detail page.**

**Numbered item pattern** (`ApproachSection.tsx` lines 22–39):
```typescript
<div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-8">
  {items.map((item) => (
    <div key={item.num} className="flex flex-col gap-3">
      {/* Large number accent — cyber-jade/20 opacity */}
      <span className="text-4xl font-bold text-cyber-jade/20 leading-none">
        {item.num}
      </span>
      <h3 className="text-lg font-bold tracking-tight leading-snug">
        {at(item.titleKey)}
      </h3>
      <p className="text-base font-medium leading-relaxed text-text-secondary">
        {at(item.bodyKey)}
      </p>
    </div>
  ))}
</div>
```
**Key difference for CapabilityList:** H3 must use `text-base font-bold` (not `text-lg font-bold`) — UI-SPEC mandates 4-row type scale for new Phase 3 components. Layout is `flex-col` only (not 3-col grid) as capabilities are a vertical list within the detail page.

**const array pattern** (`ApproachSection.tsx` lines 7–11):
```typescript
const items = [
  { num: "01", titleKey: "item1Title", bodyKey: "item1Body" },
  { num: "02", titleKey: "item2Title", bodyKey: "item2Body" },
  { num: "03", titleKey: "item3Title", bodyKey: "item3Body" },
] as const;
```

---

### `components/solutions/WhoThisIsFor.tsx` (component, request-response)

**Analog:** `components/home/ApproachSection.tsx` (structural pattern), `tailwind.config.ts` (cyber-jade token)

**Token reference** (`tailwind.config.ts` line 12): `"cyber-jade": "#008684"`

**Pattern (from UI-SPEC + token confirmation):**
```typescript
export function WhoThisIsFor({ text }: { text: string }) {
  return (
    <div className="border-l-2 border-cyber-jade pl-4 py-2">
      <p className="text-xs font-normal tracking-widest uppercase text-text-secondary mb-2">
        Who this is for
      </p>
      <p className="text-base font-normal leading-relaxed text-text-secondary">
        {text}
      </p>
    </div>
  );
}
```
**Export convention:** Named export. Receives `text` as a prop (the translated string from the detail page).

---

### `components/work/WorkCard.tsx` (component, request-response)

**Analog:** `components/home/WorkTeaser.tsx`

**Imports pattern** (`WorkTeaser.tsx` lines 1–2):
```typescript
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
```

**Card shell pattern** (`WorkTeaser.tsx` lines 23–34):
```typescript
<div className="max-w-2xl mx-auto bg-surface border border-border-subtle rounded-lg p-6 flex flex-col gap-4 mb-8">
  {/* Status tag */}
  <span className="self-start text-xs font-medium bg-ev-teal/10 text-ev-teal px-2 py-1 rounded">
    Live
  </span>
  <h3 className="text-lg font-bold tracking-tight leading-snug">
    {wt("evFleetTitle")}
  </h3>
  <p className="text-base font-medium leading-relaxed text-text-secondary">
    {wt("evFleetDesc")}
  </p>
</div>
```
**WorkCard additions vs WorkTeaser card:** tags array (grid-violet pills per D-08) + hover border transition. Tags pattern from `SolutionCard.tsx` line 21:
```typescript
{/* Tag — grid-violet soft pill */}
<span className="self-start text-xs font-medium bg-grid-violet/10 text-grid-violet px-2 py-1 rounded">
  {tag}
</span>
```
**Card hover** (`SolutionCard.tsx` line 10):
```typescript
className="bg-surface border border-border-subtle rounded-lg p-6 flex flex-col gap-4 hover:border-cyber-jade transition-colors duration-150 ease-out"
```

**WorkCard H3:** Use `text-base font-bold` (UI-SPEC 4-row scale for new Phase 3 components — not `text-lg` from WorkTeaser which is Phase 2 code).

---

### `components/work/GhostCard.tsx` (component, request-response)

**Analog:** `components/home/SolutionCard.tsx` (card shell structure)

**Card shell from SolutionCard** (`SolutionCard.tsx` line 10):
```typescript
className="bg-surface border border-border-subtle rounded-lg p-6 flex flex-col gap-4 hover:border-cyber-jade transition-colors duration-150 ease-out"
```
**GhostCard differs:** `border-dashed`, no hover, `cursor-default`, content is centered "Coming soon" text.

**Token references** (`tailwind.config.ts`):
- `"border-subtle": "#2a2a2a"` — dashed border color
- `"text-muted": "#52525b"` — "Coming soon" text color
- `surface: "#111111"` — background

**Pattern:**
```typescript
export function GhostCard() {
  return (
    <div className="border border-dashed border-border-subtle bg-surface rounded-lg p-6 flex items-center justify-center cursor-default min-h-[200px]">
      <span className="text-sm font-normal text-text-muted">Coming soon</span>
    </div>
  );
}
```
**Note:** "Coming soon" is static English text — no translation needed per CONTEXT.md specifics section. `min-h-[200px]` prevents ghost cards from collapsing shorter than WorkCard (Pitfall 6 in RESEARCH.md).

---

### `components/about/BeliefGrid.tsx` (component, request-response)

**Analog:** `components/home/ApproachSection.tsx`

**Imports + getTranslations pattern** (`ApproachSection.tsx` lines 1–6):
```typescript
import { getTranslations } from "next-intl/server";

export async function ApproachSection() {
  const t = await getTranslations("home");
  const at = await getTranslations("approach");
```

**3-column grid pattern** (`ApproachSection.tsx` lines 22–39):
```typescript
<div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-8">
  {items.map((item) => (
    <div key={item.num} className="flex flex-col gap-3">
      <span className="text-4xl font-bold text-cyber-jade/20 leading-none">
        {item.num}
      </span>
      <h3 className="text-lg font-bold tracking-tight leading-snug">
        {at(item.titleKey)}
      </h3>
      <p className="text-base font-medium leading-relaxed text-text-secondary">
        {at(item.bodyKey)}
      </p>
    </div>
  ))}
</div>
```
**Key difference for BeliefGrid:** H3 must use `text-base font-bold` (not `text-lg font-bold`) — UI-SPEC mandates this for new Phase 3 components. No number accent needed if beliefs use a different visual treatment; if numbered, use the same `text-4xl font-bold text-cyber-jade/20` pattern.

**const beliefs array** (above component, same as ApproachSection `items` pattern):
```typescript
const beliefs = [
  { num: "01", titleKey: "belief1Title", bodyKey: "belief1Body" },
  { num: "02", titleKey: "belief2Title", bodyKey: "belief2Body" },
  { num: "03", titleKey: "belief3Title", bodyKey: "belief3Body" },
] as const;
```

---

### `components/about/CurrentFocusParagraph.tsx` (component, request-response)

**Analog:** `components/home/WorkTeaser.tsx` (prose paragraph block within a section)

**Section + container pattern** (`WorkTeaser.tsx` lines 13–14):
```typescript
<section className="py-24 md:py-32 px-6 bg-background">
  <div className="mx-auto max-w-content">
```

**Prose paragraph pattern** (`WorkTeaser.tsx` lines 31–33):
```typescript
<p className="text-base font-medium leading-relaxed text-text-secondary">
  {wt("evFleetDesc")}
</p>
```

**CurrentFocusParagraph pattern:** Simple section with a heading label and a paragraph. Receives translated `text` as prop (called from the about page which holds the `getTranslations` call).

---

### `app/[locale]/solutions/page.tsx` (page, request-response)

**Analog:** `app/[locale]/page.tsx`

**Full page pattern** (`app/[locale]/page.tsx` lines 1–31):
```typescript
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
// ... other section imports

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "zh" }];
}

export const dynamicParams = false;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      {/* ... sections */}
    </>
  );
}
```
**Solutions page calls `getTranslations("solutions")` before passing props to PageHero and SolutionsGrid.**
**Export convention:** `export default async function SolutionsPage(...)` — default export.

---

### `app/[locale]/solutions/[slug]/page.tsx` (page, request-response)

**Analog:** `app/[locale]/page.tsx` + `app/[locale]/layout.tsx` (nested generateStaticParams pattern)

**Full page pattern** (`app/[locale]/page.tsx` lines 1–31 + RESEARCH.md Pattern 1):
```typescript
import { setRequestLocale, getTranslations } from "next-intl/server";
import { solutions } from "@/lib/solutions";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    solutions.map((solution) => ({ locale, slug: solution.slug }))
  );
}

export const dynamicParams = false;

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  const t = await getTranslations(`solutions.${slug}`);
  // ...
}
```
**Key detail:** `params` is `Promise<{...}>` — must `await params`. Already established in `app/[locale]/page.tsx` line 19.
**`routing.locales`** from `i18n/routing.ts` = `["en", "id", "zh"]`.
**Export convention:** `export default async function SolutionDetailPage(...)`.

---

### `app/[locale]/work/page.tsx` (page, request-response)

**Analog:** `app/[locale]/page.tsx`

**Page pattern** (same as `app/[locale]/page.tsx` lines 1–31):
```typescript
import { setRequestLocale, getTranslations } from "next-intl/server";
import { WorkCard } from "@/components/work/WorkCard";
import { GhostCard } from "@/components/work/GhostCard";
import { PageHero } from "@/components/PageHero";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "zh" }];
}

export const dynamicParams = false;

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("work");
  // ...
}
```
**Export convention:** `export default async function WorkPage(...)`.

---

### `app/[locale]/about/page.tsx` (page, request-response)

**Analog:** `app/[locale]/page.tsx`

**Same pattern as work/page.tsx.** Calls `getTranslations("about")`.
**Export convention:** `export default async function AboutPage(...)`.

---

### `messages/en.json`, `messages/id.json`, `messages/zh.json` (config, transform)

**Analog:** `messages/en.json` (existing file — additions only)

**Existing structure** (`messages/en.json` lines 25–47):
```json
"solutions": {
  "pageTitle": "Solutions",
  "card1Title": "Fleet & EV Mobility",
  ...
},
"work": {
  "pageTitle": "Work",
  "evFleetTitle": "EV Fleet Operations",
  "evFleetDesc": "End-to-end operations platform..."
},
"about": {
  "pageTitle": "About"
}
```

**New keys to add (Phase 3 additions):**
```json
"solutions": {
  "pageTitle": "Solutions",
  "pageEyebrow": "SOLUTIONS",
  "pageSub": "...",
  "card1Title": "...",  // existing — do not remove
  "fleet-mobility": {
    "title": "Fleet & EV Mobility",
    "problemStatement": "...",
    "whoThisIsFor": "...",
    "capability1Title": "...",
    "capability1Body": "...",
    "capability2Title": "...",
    "capability2Body": "...",
    "capability3Title": "...",
    "capability3Body": "..."
  },
  "iot-hardware": { ... },
  "logistics-intelligence": { ... },
  "ai-operations": { ... }
},
"work": {
  "pageTitle": "Work",
  "pageEyebrow": "WORK",
  "pageSub": "...",
  "evFleetTitle": "...",  // existing
  "evFleetDesc": "...",   // existing
  "evFleetExpandedDesc": "...",
  "evFleetTag1": "Fleet",
  "evFleetTag2": "EV",
  "evFleetTag3": "Operations"
},
"about": {
  "pageTitle": "About",
  "pageEyebrow": "ABOUT",
  "beliefH1": "...",
  "beliefSub": "...",
  "belief1Title": "...", "belief1Body": "...",
  "belief2Title": "...", "belief2Body": "...",
  "belief3Title": "...", "belief3Body": "...",
  "currentFocus": "..."
}
```
**All 3 locale files must be updated in the same task** (Pitfall 7 in RESEARCH.md).

---

## Shared Patterns

### Async Server Component with `getTranslations`

**Source:** `components/home/WorkTeaser.tsx` lines 1, 8–11; `components/home/SolutionsStrip.tsx` lines 1–6
**Apply to:** All new component files that render translated content

```typescript
import { getTranslations } from "next-intl/server";

export async function MyComponent() {
  const t = await getTranslations("namespace");
  return ( /* ... */ );
}
```

### Page Setup (locale + translations)

**Source:** `app/[locale]/page.tsx` lines 1–20
**Apply to:** `solutions/page.tsx`, `work/page.tsx`, `about/page.tsx`

```typescript
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "zh" }];
}

export const dynamicParams = false;

export default async function MyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;   // await — never destructure directly
  setRequestLocale(locale);           // must come before any getTranslations call
  // ...
}
```

### Locale-Aware Internal Links

**Source:** `i18n/navigation.ts` line 6; `components/home/WorkTeaser.tsx` lines 2, 38–43
**Apply to:** Every internal `<Link>` in Phase 3 files (SolutionsGrid, SolutionDetailHero back-link, WorkTeaser link, etc.)

```typescript
// ALWAYS use this — never import Link from "next/link"
import { Link } from "@/i18n/navigation";

<Link href="/solutions/fleet-mobility">Fleet & EV Mobility</Link>
// Renders as /en/solutions/fleet-mobility, /id/solutions/fleet-mobility, etc.
```

### Section + Container Layout

**Source:** `components/home/WorkTeaser.tsx` lines 13–14; `components/home/SolutionsStrip.tsx` lines 16–17; `components/home/ApproachSection.tsx` lines 14–15
**Apply to:** All new section components

```typescript
<section className="py-24 md:py-32 px-6 bg-background">
  <div className="mx-auto max-w-content">
    {/* content */}
  </div>
</section>
```
**Alternate background for visual separation:** `bg-surface` (used in `ApproachSection.tsx` line 14).

### Card Shell

**Source:** `components/home/SolutionCard.tsx` line 10; `components/home/WorkTeaser.tsx` line 23
**Apply to:** `WorkCard.tsx`, `GhostCard.tsx`

```typescript
className="bg-surface border border-border-subtle rounded-lg p-6 flex flex-col gap-4 hover:border-cyber-jade transition-colors duration-150 ease-out"
```
**No `shadow-*` classes** — border + background contrast only (CLAUDE.md design rule).

### Email CTA (mailto link)

**Source:** `components/home/FooterCTA.tsx` lines 2, 17–21; `components/home/HeroSection.tsx` lines 2, 27–31
**Apply to:** Any CTA that links to contact email

```typescript
import { siteConfig } from "@/config/site";

// Cyber-jade outline button (detail/work/about pages):
<a
  href={`mailto:${siteConfig.email}`}
  className="border border-cyber-jade text-cyber-jade rounded-md px-6 py-3 text-sm font-medium hover:bg-cyber-jade/10 transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade"
>
  {t("footerCtaButton")}
</a>

// Volt Green filled button (solutions index only — ONE per page):
<a
  href={`mailto:${siteConfig.email}`}
  className="bg-volt-green text-background font-medium px-6 py-3 rounded-md text-sm hover:bg-volt-strong transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt-green"
>
  {t("ctaLabel")}
</a>
```
**Never hardcode the email address** — always use `siteConfig.email`.

### Export Conventions

**Source:** `app/[locale]/page.tsx` line 14; `components/home/SolutionCard.tsx` line 8; `components/home/WorkTeaser.tsx` line 8
**Apply to:** All Phase 3 files

```typescript
// Pages: default export
export default async function SolutionsPage(...) { ... }

// Components: named export
export function PageHero(...) { ... }
export async function SolutionsGrid() { ... }
```

### Path Aliases

**Source:** `app/[locale]/page.tsx` lines 2–6; every component file
**Apply to:** All Phase 3 files — zero exceptions

```typescript
// CORRECT — always use @/ alias
import { solutions } from "@/lib/solutions";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";

// WRONG — never use relative paths
import { solutions } from "../../lib/solutions";
```

---

## No Analog Found

All 17 files have analogs in the existing codebase. No files require falling back to RESEARCH.md patterns alone.

---

## Metadata

**Analog search scope:** `app/`, `components/`, `i18n/`, `config/`, `messages/`, `tailwind.config.ts`
**Files scanned:** 16 existing files read
**Pattern extraction date:** 2026-06-11
