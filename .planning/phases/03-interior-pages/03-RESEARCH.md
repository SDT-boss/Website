# Phase 3: Interior Pages — Research

**Researched:** 2026-06-11
**Domain:** Next.js 14 App Router static pages, next-intl i18n, Tailwind CSS component patterns
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Claude drafts all solution detail page content from company context (PROJECT.md, existing card descriptions in `messages/en.json`, and the B2B ops domain). Owner reviews and corrects in translation files before launch.
- **D-02:** Status badges — Fleet & EV Mobility = "Live" (ev-teal); IoT & Hardware, Logistics Intelligence, AI Operations = "In Development" (amber soft pill).
- **D-03:** Capability bullet tone: outcome-first, no jargon — per DESIGN.md voice rules and SOL-04. Business operators, not engineers, are the audience.
- **D-04:** Claude drafts the About page belief H1 (observation-as-statement format), 3 BeliefGrid titles + body paragraphs, and current focus paragraph — all from company context. Owner reviews/edits in translation files.
- **D-05:** Current focus paragraph tone: active fleet/EV production work + growing the platform carefully — honest, operator-credible. Not aspirational vision-speak.
- **D-06:** Solution metadata (slug, status, icon emoji, display order) lives in `lib/solutions.ts`. Translation files hold all text content. `generateStaticParams` reads from `lib/solutions.ts`.
- **D-07:** Component organization: `components/solutions/`, `components/work/`, `components/about/`. `PageHero` lives in `components/` root (not in a section subfolder).
- **D-08:** WorkCard tags for EV Fleet Operations: `['Fleet', 'EV', 'Operations']` — grid-violet badge pattern.
- **D-09:** WorkCard expanded description: 2–3 sentences. `evFleetDesc` from en.json serves as opening sentence; Claude adds 1–2 more sentences about scale or integration.
- **UI-SPEC locked:** All visual decisions are locked via the approved `03-UI-SPEC.md`. No deviation permitted.
  - Volt Green: one per page maximum — solutions index only. Detail, Work, About use cyber-jade outline CTAs.
  - Status badges: "Live" = `bg-ev-teal/10 text-ev-teal`; "In Development" = `bg-amber-500/10 text-amber-400`
  - Ghost cards: `border-dashed border-border-subtle`, `text-text-muted`, `cursor-default`, no hover state
  - Card hover: `border-border-subtle → border-cyber-jade`, `duration-150 ease-out` only
  - All section padding: `py-24 md:py-32`, `mx-auto max-w-content px-6`
  - H3-level elements: `text-base font-bold` (not a larger size — 4-row type scale is fixed)
  - Solution detail content order: status badge → H1 → problem statement → WhoThisIsFor → CapabilityList

### Claude's Discretion

- `generateStaticParams` implementation details (how to import from `lib/solutions.ts`, export shape)
- Exact copy for solution problem statements, capabilities, "who this is for" — drafted from context per D-01
- Exact About page belief H1 and BeliefGrid content — drafted from context per D-04
- Exact WorkCard expanded description sentences — drafted from context per D-09
- Whether to modify `SolutionCard` to accept an optional `href` prop or always wrap externally with `<Link>` from `@/i18n/navigation`
- Machine-translated ID and ZH content following Phase 1 pattern

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within Phase 3 scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SOL-01 | Solutions index page (`/[locale]/solutions`) — eyebrow, H1, 4 cards linking to detail pages | `SolutionCard` reuse pattern + `Link` wrapper; `lib/solutions.ts` data; `solutions` translation namespace |
| SOL-02 | Solution detail pages (`/[locale]/solutions/[slug]`) — `generateStaticParams` covering all 4 slugs × 3 locales; `dynamicParams = false` | `generateStaticParams` pattern from `app/[locale]/page.tsx`; `lib/solutions.ts` slug array; static export constraints |
| SOL-03 | Status badge on each solution — "Live" (ev-teal) or "In Development" (amber soft pill) | Tailwind tokens confirmed in `tailwind.config.ts`; `ev-teal = #1A7080`; amber uses `/10` opacity variant |
| SOL-04 | Problem-first content structure on detail pages — problem statement before capabilities; outcome-based capability bullets; "Who this is for" callout | UI-SPEC content order locked; `ApproachSection` numbered-item pattern for `CapabilityList`; `WhoThisIsFor` = `border-l-2 border-cyber-jade pl-4` |
| WORK-01 | Work page (`/[locale]/work`) — EV Fleet Operations as the one real project card with tags and description | `WorkTeaser` pattern for `WorkCard`; existing `work.evFleetTitle` and `work.evFleetDesc` in en.json to expand |
| WORK-02 | Ghost cards for future projects — dashed border, "Coming soon" centered text | `border border-dashed border-border-subtle bg-surface text-text-muted cursor-default` confirmed in tokens |
| ABOUT-01 | About page opens with belief/observation (not founding story); 3 belief statements in grid; current focus mention; no headshots | `ApproachSection` grid pattern for `BeliefGrid`; D-04/D-05 tone locked |
| ABOUT-02 | Contact CTA at bottom of About — cyber-jade outline button | `FooterCTA` component reuse confirmed; cyber-jade outline button already implemented |

</phase_requirements>

---

## Summary

Phase 3 builds 6 interior pages on top of an established foundation: solutions index, 4 solution detail pages (with static params), a work page, and an about page. The codebase is already well-structured after Phases 1 and 2, with all design tokens, i18n infrastructure, and reusable components in place. Phase 3 is primarily additive — new page files, new components, and new translation keys. No existing code needs modification.

The key technical challenge is the `[slug]` dynamic segment under a `[locale]` segment in a fully static export. The pattern is well-established in the existing `app/[locale]/page.tsx`: export `generateStaticParams` returning all slug × locale pairs, set `dynamicParams = false`, and call `setRequestLocale(locale)` at the top of each async server component. The `lib/solutions.ts` data file will be the single source of truth for static params.

All visual decisions are locked by the approved UI-SPEC. The planner does not need to make any visual choices — the component specification, typography rules, color usage, and interaction patterns are fully defined. The focus for planning is correct task sequencing: data file first, then translation keys, then components, then pages.

**Primary recommendation:** Structure tasks as vertical feature slices (one slice per page type). Each slice: (1) add translation keys to messages/*.json, (2) build components in the correct subdirectory, (3) assemble the page in `app/[locale]/`. Start with `lib/solutions.ts` as Wave 0 since it is a dependency for both the solutions index and the detail slug pages.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Static route generation (slug × locale) | Frontend Server (SSR/static) | — | `generateStaticParams` runs at build time in Next.js App Router; no browser involvement |
| Translation content | Frontend Server (SSR/static) | — | `getTranslations()` is a server-only API; called inside async server components |
| Solution metadata (slug, status, order) | Frontend Server (SSR/static) | — | `lib/solutions.ts` is a build-time data file; read by server components only |
| Card rendering (solutions index) | Browser / Client | Frontend Server | Components hydrated from server HTML; hover states are CSS transitions, no JS needed |
| Status badges | Browser / Client | Frontend Server | Pure CSS classes; rendered server-side, displayed in browser |
| Ghost cards | Browser / Client | — | Static DOM; `cursor-default`, no state |
| Contact CTA (mailto) | Browser / Client | — | `<a href="mailto:...">` is a browser-side link |
| i18n locale routing | Frontend Server (SSR/static) | Browser / Client | `next-intl` handles both at build time (static params) and runtime (locale context) |
| All page content | Frontend Server (SSR/static) | — | All pages are async server components; no client-side data fetching |

---

## Standard Stack

### Core (already installed — no new packages needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | 14.2.29 | App Router, static export, `generateStaticParams` | Project foundation — locked |
| `next-intl` | ^4.13.0 | `getTranslations`, `setRequestLocale`, `createNavigation` | Project i18n layer — locked |
| `react` | ^18.3.1 | Component rendering | Project foundation — locked |
| `tailwindcss` | ^3.4.17 | All styling via utility classes | Project design system — locked |

[VERIFIED: package.json in codebase]

### No New Packages Required

Phase 3 adds zero new npm dependencies. All functionality is achieved through:
- Existing Next.js App Router primitives (`generateStaticParams`, `dynamicParams`)
- Existing next-intl server APIs (`getTranslations`, `setRequestLocale`)
- Existing Tailwind tokens (all confirmed in `tailwind.config.ts`)
- Hand-authored components following existing patterns

**Installation:** `npm install` is already complete. No additional installs needed for this phase.

---

## Package Legitimacy Audit

> Phase 3 installs zero new external packages. This section is not applicable.

**No new packages to audit.** All dependencies were established in Phases 1 and 2.

---

## Architecture Patterns

### System Architecture Diagram

```
messages/*.json (EN/ID/ZH translation files)
         │
         ▼
lib/solutions.ts ──────────────────────────────────────────────┐
  [slug, status, icon, order]                                    │
         │                                                        │
         ▼                                                        ▼
app/[locale]/solutions/page.tsx            app/[locale]/solutions/[slug]/page.tsx
  generateStaticParams → locales ×           generateStaticParams → locales × slugs
  setRequestLocale(locale)                   setRequestLocale(locale)
  getTranslations("solutions")               getTranslations("solutions.{slug}")
         │                                        │
         ▼                                        ▼
  components/solutions/SolutionsGrid.tsx   components/solutions/SolutionDetailHero.tsx
  └─ SolutionCard (from Phase 2)           └─ CapabilityList
     wrapped in <Link href="/solutions/{slug}"> └─ WhoThisIsFor
         │
         ▼
  components/PageHero.tsx (shared)
  [eyebrow + H1 + sub]
         │
         ▼
  components/home/FooterCTA.tsx (reused)

app/[locale]/work/page.tsx
  getTranslations("work")
  │
  ▼
  components/work/WorkCard.tsx (EV Fleet — live)
  components/work/GhostCard.tsx × 2 (static — no translations)

app/[locale]/about/page.tsx
  getTranslations("about")
  │
  ▼
  components/about/BeliefGrid.tsx
  components/about/CurrentFocusParagraph.tsx
  components/home/FooterCTA.tsx (reused)
```

### Recommended Project Structure

```
lib/
└── solutions.ts              # Solution metadata (slug, status, icon, order) — NEW

components/
├── PageHero.tsx              # Shared interior page hero — NEW (root level, not in /home/)
├── solutions/
│   ├── SolutionsGrid.tsx     # 2-col grid of linked SolutionCards — NEW
│   ├── SolutionDetailHero.tsx # Status badge + H1 + problem statement — NEW
│   ├── CapabilityList.tsx    # Numbered 01/02/03 items — NEW
│   └── WhoThisIsFor.tsx      # Left-bordered callout block — NEW
├── work/
│   ├── WorkCard.tsx          # Real project card with tags + expanded description — NEW
│   └── GhostCard.tsx         # Dashed border placeholder — NEW
└── about/
    ├── BeliefGrid.tsx        # 3-col belief statements — NEW
    └── CurrentFocusParagraph.tsx  # Current focus text block — NEW

app/[locale]/
├── solutions/
│   ├── page.tsx              # Solutions index — NEW
│   └── [slug]/
│       └── page.tsx          # Solution detail — NEW
├── work/
│   └── page.tsx              # Work page — NEW
└── about/
    └── page.tsx              # About page — NEW
```

### Pattern 1: Nested generateStaticParams for `[locale]/[slug]`

**What:** The `[slug]` page lives under `[locale]`, so `generateStaticParams` must return all locale × slug combinations.
**When to use:** Any dynamic segment that requires static generation in a nested locale route.

```typescript
// Source: app/[locale]/solutions/[slug]/page.tsx
// Based on Next.js App Router static export pattern — [VERIFIED: existing app/[locale]/page.tsx]

import { setRequestLocale } from "next-intl/server";
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

  // ...
}
```

**Key detail:** `params` is a `Promise` in Next.js 14.2+ — must `await params` before destructuring. This matches the pattern in `app/[locale]/page.tsx`.

### Pattern 2: lib/solutions.ts Data File

**What:** Typed data array for solution metadata. All text stays in translation files; only structural/metadata values live here.
**When to use:** Any build-time data that needs to be read by `generateStaticParams` and by component code.

```typescript
// Source: lib/solutions.ts — new file, based on NAV_LINKS pattern in Navbar.tsx [ASSUMED: pattern inference from codebase conventions]

export type SolutionStatus = "live" | "in-development";

export interface Solution {
  slug: string;
  status: SolutionStatus;
  icon: string;
  order: number;
}

export const solutions: Solution[] = [
  { slug: "fleet-mobility",        status: "live",           icon: "⚡", order: 1 },
  { slug: "iot-hardware",          status: "in-development", icon: "◈",  order: 2 },
  { slug: "logistics-intelligence",status: "in-development", icon: "⊞",  order: 3 },
  { slug: "ai-operations",         status: "in-development", icon: "∿",  order: 4 },
];
```

**Note:** Icons match those used in `SolutionsStrip.tsx` — confirmed by reading the existing component. [VERIFIED: codebase — SolutionsStrip.tsx line 8-13]

### Pattern 3: Async Server Component with getTranslations

**What:** Standard pattern for all Phase 3 page and section components.
**When to use:** Every component that renders translated content.

```typescript
// Source: Pattern from components/home/WorkTeaser.tsx [VERIFIED: codebase]

import { getTranslations } from "next-intl/server";

export async function MySection() {
  const t = await getTranslations("namespace");

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-content">
        {/* content */}
      </div>
    </section>
  );
}
```

### Pattern 4: Locale-Aware Link

**What:** All internal `<Link>` elements must use the i18n-aware Link from `@/i18n/navigation`, never from `next/link`.
**When to use:** Every internal navigation link in Phase 3.

```typescript
// Source: CONTEXT.md D-07, i18n/navigation.ts [VERIFIED: codebase]
import { Link } from "@/i18n/navigation";

// Correct — locale prefix is injected automatically:
<Link href="/solutions/fleet-mobility">Fleet & EV Mobility</Link>
// Renders as /en/solutions/fleet-mobility, /id/solutions/fleet-mobility, etc.

// WRONG — never use this for internal links:
import Link from "next/link";
```

### Pattern 5: SolutionCard Wrapping (External Link)

**What:** `SolutionCard` does not manage its own href. Wrap each card externally with `<Link>` from `@/i18n/navigation`.
**When to use:** Solutions index `SolutionsGrid` component.

```typescript
// Source: CONTEXT.md code_context section [VERIFIED: codebase — SolutionCard.tsx has no href prop]

<Link href={`/solutions/${solution.slug}`} className="block">
  <SolutionCard
    icon={solution.icon}
    title={st(`${solution.slug}.title`)}
    desc={st(`${solution.slug}.desc`)}
    tag={st(`${solution.slug}.tag`)}
  />
</Link>
```

### Pattern 6: Status Badge

**What:** Static pill with soft fill, no interaction. Two variants only.
**When to use:** SolutionDetailHero and WorkCard.

```typescript
// Source: UI-SPEC color contract [VERIFIED: tailwind.config.ts — ev-teal token confirmed]

// Live:
<span className="self-start text-xs font-normal tracking-widest uppercase px-2 py-1 rounded bg-ev-teal/10 text-ev-teal">
  {t("status.live")}
</span>

// In Development:
<span className="self-start text-xs font-normal tracking-widest uppercase px-2 py-1 rounded bg-amber-500/10 text-amber-400">
  {t("status.inDevelopment")}
</span>
```

**Note:** `common.status.live` and `common.status.inDevelopment` translation keys already exist in all 3 locale files. [VERIFIED: codebase — messages/en.json line 61-65]

### Pattern 7: PageHero (Shared Interior Hero)

**What:** Reusable hero for all 3 interior page types. No dot-grid. Centered layout.
**When to use:** Solutions index, work page, and about page. NOT used on solution detail (that uses `SolutionDetailHero`).

```typescript
// Source: UI-SPEC component inventory + HeroSection.tsx reference [VERIFIED: codebase]

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  sub?: string;
}

export function PageHero({ eyebrow, heading, sub }: PageHeroProps) {
  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-content text-center flex flex-col items-center gap-4">
        <p className="text-xs font-normal tracking-widest uppercase text-text-secondary">
          {eyebrow}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none max-w-3xl">
          {heading}
        </h1>
        {sub && (
          <p className="text-base font-normal leading-relaxed text-text-secondary max-w-xl">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
```

### Pattern 8: GhostCard (No Interaction)

**What:** Static placeholder with dashed border, "Coming soon" text centered.
**When to use:** Work page — 2 ghost cards alongside the real `WorkCard`.

```typescript
// Source: UI-SPEC ghost card spec + tailwind.config.ts [VERIFIED: codebase]

export function GhostCard() {
  return (
    <div
      className="border border-dashed border-border-subtle bg-surface rounded-lg p-6 flex items-center justify-center cursor-default"
      style={{ minHeight: "200px" }}
    >
      <span className="text-sm font-normal text-text-muted">Coming soon</span>
    </div>
  );
}
```

**Note:** GhostCard has no translations — "Coming soon" is static text per CONTEXT.md specifics section.

### Pattern 9: BeliefGrid (About Page)

**What:** 3-column grid of belief statements. Numbered accent in cyber-jade/20. H3-equivalent titles at `text-base font-bold`.
**When to use:** About page only.

```typescript
// Source: ApproachSection.tsx pattern + UI-SPEC [VERIFIED: codebase — ApproachSection.tsx]

<div className="md:grid md:grid-cols-3 gap-8">
  {beliefs.map((belief, i) => (
    <div key={i} className="flex flex-col gap-3">
      <span className="text-4xl font-bold text-cyber-jade/20 leading-none">
        {String(i + 1).padStart(2, "0")}
      </span>
      <h3 className="text-base font-bold">{t(belief.titleKey)}</h3>
      <p className="text-base font-normal leading-relaxed text-text-secondary">
        {t(belief.bodyKey)}
      </p>
    </div>
  ))}
</div>
```

### Anti-Patterns to Avoid

- **Using `next/link` for internal links:** Always use `import { Link } from "@/i18n/navigation"` — otherwise locale prefix is stripped from navigation and pages 404 in non-English locales.
- **Relative imports:** Always use `@/` path alias. `import { solutions } from "../../lib/solutions"` is wrong.
- **CSS modules or inline styles:** Tailwind utilities only. No `style={{}}` except where Tailwind can't express the value (e.g., `minHeight` if not in the scale — but prefer Tailwind classes).
- **Default exports for components:** Named exports only for components (`export function PageHero`). Default exports only for page files (`export default function SolutionsPage`).
- **Client components when not needed:** All Phase 3 components are server components. Do not add `"use client"` — there is no interactivity that requires client state.
- **Hardcoding text strings in TSX:** All displayed text goes through `getTranslations`. No hardcoded English strings in components (exception: "Coming soon" on GhostCard per CONTEXT.md decision).
- **Adding Volt Green to detail/work/about pages:** The UI-SPEC is explicit — Volt Green is solutions index only. Detail, Work, and About pages use cyber-jade outline buttons.
- **`SolutionCard` title at `text-lg`:** The existing `SolutionCard.tsx` uses `text-lg font-bold` for card titles. The UI-SPEC mandates `text-base font-bold` for H3-level elements. If `SolutionCard` is reused as-is, the existing `text-lg` is an existing inconsistency from Phase 2 — do NOT change `SolutionCard.tsx` (out of scope), but new components (`WorkCard`, `BeliefGrid` titles) must use `text-base font-bold`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale-prefixed links | Custom href string concatenation | `<Link>` from `@/i18n/navigation` | `createNavigation` handles locale injection correctly; string concat breaks on default locale and locale-strip patterns |
| Static param generation | Manual array of all 12 locale/slug combos | `routing.locales.flatMap(locale => solutions.map(s => ({ locale, slug: s.slug })))` | Derived directly from source-of-truth arrays; adding a locale or solution automatically extends coverage |
| Translation fallback | Custom undefined-check logic | next-intl's built-in fallback | next-intl handles missing keys gracefully with warnings; hand-rolling duplicates framework logic |
| Request locale setup | Manual cookie/header parsing | `setRequestLocale(locale)` from `next-intl/server` | Required for static export + next-intl to work correctly; already established in Phase 1 |

**Key insight:** The entire i18n + static param infrastructure is already built in Phases 1 and 2. Phase 3 consumes it; it does not rebuild any of it.

---

## Common Pitfalls

### Pitfall 1: Missing `setRequestLocale` Call

**What goes wrong:** Components throw at build time or render in the wrong locale, or next-intl `getTranslations` returns the wrong language.
**Why it happens:** Static export requires `setRequestLocale` to be called before any translation API in each page component. It's easy to copy just the JSX from a reference and miss this call.
**How to avoid:** Every `app/[locale]/*/page.tsx` file must call `setRequestLocale(locale)` before the return statement — exactly as in `app/[locale]/page.tsx`.
**Warning signs:** Build warnings from next-intl about missing request locale; translations rendering in English for ID/ZH locales.

### Pitfall 2: `params` Must Be Awaited

**What goes wrong:** TypeScript error or runtime crash when destructuring `params`.
**Why it happens:** In Next.js 14.2+, `params` is typed as `Promise<{...}>`. The existing `app/[locale]/page.tsx` already uses `await params` — but it's easy to miss when writing new files.
**How to avoid:** Always `const { locale } = await params;` — never `const { locale } = params;`.
**Warning signs:** TypeScript error "Type 'Promise<{ locale: string }>' is not assignable to..."

### Pitfall 3: Translation Key Namespace Mismatch

**What goes wrong:** `getTranslations("solutions")` returns a function `t` that does not find keys like `solutions.fleet-mobility.title` — instead it looks for `fleet-mobility.title` within the `solutions` namespace.
**Why it happens:** next-intl namespaced access strips the namespace prefix. `t("fleet-mobility.title")` within `getTranslations("solutions")` maps to `messages.solutions["fleet-mobility"].title`.
**How to avoid:** Keep translation key structure consistent with how `getTranslations` is called. If using `getTranslations("solutions")`, the key `fleet-mobility.title` maps to `messages.solutions["fleet-mobility"]["title"]` in the JSON.
**Warning signs:** Missing translation warnings for keys that appear to exist; undefined rendered in the UI.

### Pitfall 4: Hyphenated JSON Keys

**What goes wrong:** `messages/en.json` with keys like `"fleet-mobility"` may be misread in some editors, but JSON supports any string as a key — hyphenated keys are valid and work correctly with next-intl.
**Why it happens:** JavaScript object property access uses dot notation for valid identifiers, but JSON keys can be any string. next-intl uses bracket notation internally.
**How to avoid:** Hyphenated slugs are fine as JSON keys. No workaround needed.
**Warning signs:** Not a real issue — document to prevent unnecessary refactoring.

### Pitfall 5: SolutionCard h3 Font Size Inconsistency

**What goes wrong:** `SolutionCard.tsx` uses `text-lg font-bold` for the card title. The UI-SPEC mandates `text-base font-bold` for H3-level elements in Phase 3.
**Why it happens:** `SolutionCard` was built in Phase 2 before the UI-SPEC enforced the 4-row type scale constraint.
**How to avoid:** Do NOT modify `SolutionCard.tsx` (Phase 2 code, out of scope). Accept the existing `text-lg` on solutions index cards. All NEW components in Phase 3 (`WorkCard`, `BeliefGrid` titles, `CapabilityList` item titles) must use `text-base font-bold`. Document this discrepancy for Phase 4 or v2 cleanup.
**Warning signs:** This is a known pre-existing inconsistency — not a bug introduced in Phase 3.

### Pitfall 6: Ghost Card Dimensions Must Match WorkCard

**What goes wrong:** Ghost cards render at a different height than the WorkCard, breaking the visual grid.
**Why it happens:** Without explicit min-height, the ghost card's minimal content collapses shorter than the real WorkCard.
**How to avoid:** Set `min-h-[200px]` or equivalent on GhostCard, or use flexbox with the same padding as WorkCard. Ghost cards should feel like real cards with placeholder content, not shrunken boxes.
**Warning signs:** Visual inspection — ghost cards appear significantly shorter than the EV Fleet card.

### Pitfall 7: Forgetting ID and ZH Translation Keys

**What goes wrong:** Build passes but visiting `/id/solutions` or `/zh/about` shows key names instead of text, or next-intl throws missing-key warnings.
**Why it happens:** It's easy to add keys to `en.json` and forget to add corresponding keys to `id.json` and `zh.json`.
**How to avoid:** Add translation keys to all 3 locale files in the same task. The plan should explicitly list updating all 3 files.
**Warning signs:** next-intl missing key warnings in build output; English text appears on ID/ZH pages.

---

## Code Examples

### Solution Detail Page (complete structure)

```typescript
// Source: Pattern from app/[locale]/page.tsx + generateStaticParams for nested [slug]
// [VERIFIED: codebase — app/[locale]/page.tsx]

import { setRequestLocale, getTranslations } from "next-intl/server";
import { solutions } from "@/lib/solutions";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero"; // NOT SolutionDetailHero — see note
import { CapabilityList } from "@/components/solutions/CapabilityList";
import { WhoThisIsFor } from "@/components/solutions/WhoThisIsFor";
import { FooterCTA } from "@/components/home/FooterCTA";

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

  return (
    <>
      {/* SolutionDetailHero: status badge + H1 + problem statement */}
      {/* WhoThisIsFor callout */}
      {/* CapabilityList */}
      {/* FooterCTA or cyber-jade CTA */}
    </>
  );
}
```

### Translation Key Structure for Solution Detail

```json
// Source: Inferred from existing en.json structure + CONTEXT.md D-06
// [ASSUMED: exact key nesting pattern — needs validation against next-intl getTranslations("solutions.fleet-mobility") behavior]

// messages/en.json — additions for Phase 3
{
  "solutions": {
    "pageTitle": "Solutions",
    "pageEyebrow": "SOLUTIONS",
    "pageSub": "The software layer for real-world operations.",
    "card1Title": "Fleet & EV Mobility",   // existing keys
    "card1Desc": "...",                     // existing
    "card1Tag": "Fleet",                    // existing
    // ... other existing card keys ...

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
    "iot-hardware": { /* ... same structure ... */ },
    "logistics-intelligence": { /* ... */ },
    "ai-operations": { /* ... */ }
  },
  "work": {
    "pageTitle": "Work",
    "pageEyebrow": "WORK",
    "pageSub": "One project in production. More on the way.",
    "evFleetTitle": "EV Fleet Operations",  // existing
    "evFleetDesc": "...",                    // existing
    "evFleetExpandedDesc": "...",            // new — expanded 1-2 sentences
    "evFleetTag1": "Fleet",
    "evFleetTag2": "EV",
    "evFleetTag3": "Operations"
  },
  "about": {
    "pageTitle": "About",
    "pageEyebrow": "ABOUT",
    "beliefH1": "...",
    "beliefSub": "...",
    "belief1Title": "...",
    "belief1Body": "...",
    "belief2Title": "...",
    "belief2Body": "...",
    "belief3Title": "...",
    "belief3Body": "...",
    "currentFocus": "..."
  }
}
```

### WhoThisIsFor Callout

```typescript
// Source: UI-SPEC color contract — border-l-2 border-cyber-jade
// [VERIFIED: tailwind.config.ts — cyber-jade token confirmed]

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

### CapabilityList

```typescript
// Source: ApproachSection.tsx numbered item pattern
// [VERIFIED: codebase — ApproachSection.tsx lines 23-38]

interface Capability {
  num: string;  // "01", "02", etc.
  title: string;
  body: string;
}

export function CapabilityList({ capabilities }: { capabilities: Capability[] }) {
  return (
    <div className="flex flex-col gap-8">
      {capabilities.map((cap) => (
        <div key={cap.num} className="flex flex-col gap-3">
          <span className="text-4xl font-bold text-cyber-jade/20 leading-none">
            {cap.num}
          </span>
          <h3 className="text-base font-bold">{cap.title}</h3>
          <p className="text-base font-normal leading-relaxed text-text-secondary">
            {cap.body}
          </p>
        </div>
      ))}
    </div>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `params` as plain object | `params` as `Promise<{...}>` | Next.js 14.2+ | Must `await params` before destructuring — already done in existing `app/[locale]/page.tsx` |
| `getStaticPaths` + `getServerSideProps` | `generateStaticParams` + async server components | Next.js 13 App Router | Entire pattern is already established in Phase 1/2; Phase 3 follows it |
| `next/link` for all links | `@/i18n/navigation` Link | next-intl v3+ | Locale-aware Link is required for static i18n export; established in Phase 1 |

**Deprecated/outdated patterns (do not use):**
- `getStaticPaths`: Pages Router pattern — not applicable to App Router
- `useRouter` from `next/navigation`: Use from `@/i18n/navigation` instead for locale-aware routing
- `import Link from "next/link"`: Use `import { Link } from "@/i18n/navigation"` for all internal links

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `lib/solutions.ts` should import from `@/i18n/routing` to derive locales in `generateStaticParams` | Architecture Patterns, Pattern 1 | Minor — could pass locales as a constant instead; same outcome |
| A2 | `getTranslations("solutions.fleet-mobility")` works as a sub-namespace call in next-intl 4.x | Code Examples, Translation Key Structure | Medium — if sub-namespace syntax changed, keys would need to be restructured. Validate early in Wave 0 |
| A3 | Translation key structure for solution detail (nested under slug in solutions namespace) | Code Examples | Medium — if a flatter namespace is preferred (e.g., `"fleetMobility"` namespace), translation files need different structure |
| A4 | `GhostCard` "Coming soon" text is not translated (per CONTEXT.md specifics) | Architecture Patterns, Pattern 8 | Low — if localized, add keys; static text is simpler and explicitly decided in CONTEXT.md |
| A5 | `SolutionCard` h3 uses `text-lg` in Phase 2 (not `text-base`) — discrepancy with UI-SPEC | Common Pitfalls, Pitfall 5 | Low — documented discrepancy; do not fix in Phase 3 |

**If A2 is wrong:** The fallback is to use a flat namespace like `getTranslations("fleetMobility")` with a separate namespace per solution. This is less DRY but equally functional. Validate by checking next-intl 4.x docs or testing in dev server before building all detail pages.

---

## Open Questions

1. **Sub-namespace syntax validation for next-intl 4.x**
   - What we know: next-intl supports nested message objects and `getTranslations("namespace")` where namespace can be a dot-path
   - What's unclear: Whether `getTranslations("solutions.fleet-mobility")` (with hyphen in the path) works correctly in next-intl 4.13.x, or if only dot-separated alphanumeric paths are supported
   - Recommendation: In Wave 0, write a single test translation key and verify `getTranslations("solutions.fleet-mobility")` works. If not, use flat namespaces per solution (e.g., `getTranslations("solutionFleetMobility")`). This is a 5-minute validation, not a blocker.

2. **FooterCTA hardcodes `getTranslations("home")`**
   - What we know: `FooterCTA.tsx` calls `getTranslations("home")` for its heading, sub, and button text — all from the `home.*` namespace
   - What's unclear: The solutions index and about page will reuse `FooterCTA`. When called from those pages, it will still fetch `home.footerCtaHeading` etc. This is fine if the copy is the same — and it should be (same "Want to work with us?" text). No change needed.
   - Recommendation: Confirm `FooterCTA` content is identical on all pages where it appears. If not, `FooterCTA` would need a props override or a new translation namespace — but per current design this is not needed.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | npm scripts, build | Yes | v18.20.8 | — |
| npm | Package management | Yes | 10.8.2 | — |
| next | App Router + static export | Yes | 14.2.29 | — |
| next-intl | i18n server APIs | Yes | ^4.13.0 | — |
| tailwindcss | All styling | Yes | ^3.4.17 | — |
| TypeScript | Strict typing | Yes | ^5 | — |

**Missing dependencies with no fallback:** None.

All required dependencies are installed. `npm run dev` and `npm run build` are available. Phase 3 can begin immediately after planning is complete.

---

## Validation Architecture

> `workflow.nyquist_validation` is explicitly `false` in `.planning/config.json`. This section is skipped.

---

## Security Domain

This is a fully static marketing site with no authentication, no user input, no API routes, and no dynamic data. All Phase 3 pages are async server components rendered at build time. There are no applicable ASVS categories for this phase:

- V2 Authentication: Not applicable — no authentication
- V3 Session Management: Not applicable — no sessions
- V4 Access Control: Not applicable — public pages only
- V5 Input Validation: Not applicable — no user input forms (mailto CTA is a browser-native `<a href="mailto:">`)
- V6 Cryptography: Not applicable — no credentials, no data storage

The only security-relevant consideration is the mailto link: `siteConfig.email` is already defined as `sdttech.co@gmail.com` in `config/site.ts`. The mailto href is constructed as `href={\`mailto:${siteConfig.email}\`}` — already the established pattern in `FooterCTA.tsx` and `HeroSection.tsx`. No new security surface is introduced.

---

## Project Constraints (from CLAUDE.md)

| Directive | Impact on Phase 3 |
|-----------|-------------------|
| `npm run dev` for dev server, `npm run build` for static export | Verify each wave with `npm run build` — the `output: "export"` config catches static generation errors |
| No backend, no API routes, no server components with data fetching | All Phase 3 pages are async server components that call `getTranslations` (build-time i18n) — no runtime data fetching |
| `output: "export"` (production only; dev mode uses standard Next.js) | `generateStaticParams` + `dynamicParams = false` required on `[slug]` page |
| Volt Green reserved for one primary CTA per page | Solutions index: Volt Green CTA allowed. Detail, Work, About: cyber-jade outline only. Locked in UI-SPEC. |
| No box shadows — use border + background contrast | All cards use `border border-border-subtle` and `bg-surface`. No `shadow-*` classes. |
| Transitions: `duration-150 ease-out` only | All hover and focus transitions use exactly these values. |
| Company config from `config/site.ts` | All mailto CTAs use `siteConfig.email` — never hardcode the email address |
| Custom colors from `tailwind.config.ts` only | Use design tokens (`bg-ev-teal/10`, `text-ev-teal`, etc.) — never hex literals in className |
| `@/` path alias for all imports | Never use relative paths (`../../lib/solutions`) |
| Named exports for components, default exports for pages | `export function PageHero` in components; `export default function SolutionsPage` in page files |
| Tailwind utility classes only — no CSS modules, no inline styles | No `styles/` files, no `style={{}}` (except minimal exceptions where Tailwind can't express the value) |

---

## Sources

### Primary (HIGH confidence)
- [VERIFIED: codebase] `app/[locale]/page.tsx` — `generateStaticParams` pattern, `await params`, `setRequestLocale`
- [VERIFIED: codebase] `components/home/SolutionCard.tsx` — props interface, className pattern, no href prop
- [VERIFIED: codebase] `components/home/FooterCTA.tsx` — cyber-jade outline button implementation
- [VERIFIED: codebase] `components/home/WorkTeaser.tsx` — status badge, card structure, `getTranslations` pattern
- [VERIFIED: codebase] `components/home/ApproachSection.tsx` — numbered item pattern (cyber-jade/20 accent, `text-base font-bold` H3)
- [VERIFIED: codebase] `components/home/HeroSection.tsx` — PageHero reference, display heading classes
- [VERIFIED: codebase] `components/home/SolutionsStrip.tsx` — solution card icons (⚡ ◈ ⊞ ∿), `getTranslations` pattern
- [VERIFIED: codebase] `tailwind.config.ts` — all custom tokens (`cyber-jade`, `ev-teal`, `border-subtle`, `text-muted`, `surface`, `surface-2`, `background`)
- [VERIFIED: codebase] `messages/en.json` — existing keys (`solutions.*`, `work.*`, `about.*`, `common.status.*`)
- [VERIFIED: codebase] `messages/id.json`, `messages/zh.json` — i18n file structure and existing translations
- [VERIFIED: codebase] `i18n/navigation.ts` — `createNavigation` locale-aware `Link`
- [VERIFIED: codebase] `i18n/routing.ts` — locales array `["en", "id", "zh"]`
- [VERIFIED: codebase] `i18n/request.ts` — message loading pattern
- [VERIFIED: codebase] `app/[locale]/layout.tsx` — locale layout, `NextIntlClientProvider`, `getMessages`
- [VERIFIED: codebase] `package.json` — exact dependency versions
- [VERIFIED: codebase] `next.config.mjs` — `output: "export"` for production, `trailingSlash: true`
- [VERIFIED: codebase] `.planning/config.json` — `nyquist_validation: false`, `commit_docs: true`
- [VERIFIED: codebase] `.planning/phases/03-interior-pages/03-UI-SPEC.md` — all visual decisions locked
- [VERIFIED: codebase] `.planning/phases/03-interior-pages/03-CONTEXT.md` — all locked decisions
- [CITED: DESIGN.md] Design system spec — color tokens, typography rules, voice guidelines

### Secondary (MEDIUM confidence)
- [ASSUMED] `getTranslations("solutions.fleet-mobility")` dot-path sub-namespace syntax works in next-intl 4.13.x — validate in Wave 0

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages are already installed and confirmed via package.json
- Architecture: HIGH — patterns are directly derived from verified existing codebase code
- Pitfalls: HIGH — derived from actual code analysis (existing SolutionCard text-lg, existing params-as-Promise pattern)
- Translation key structure: MEDIUM — sub-namespace with hyphen needs validation (flagged as A2)

**Research date:** 2026-06-11
**Valid until:** 2026-07-11 (stable stack; next-intl 4.x is current)
