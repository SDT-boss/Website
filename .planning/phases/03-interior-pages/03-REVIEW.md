---
phase: 03-interior-pages
reviewed: 2026-06-11T00:00:00Z
depth: standard
files_reviewed: 14
files_reviewed_list:
  - lib/solutions.ts
  - components/PageHero.tsx
  - components/solutions/SolutionsGrid.tsx
  - components/solutions/SolutionDetailHero.tsx
  - components/solutions/CapabilityList.tsx
  - components/solutions/WhoThisIsFor.tsx
  - components/work/WorkCard.tsx
  - components/work/GhostCard.tsx
  - components/about/BeliefGrid.tsx
  - components/about/CurrentFocusParagraph.tsx
  - app/[locale]/solutions/page.tsx
  - app/[locale]/solutions/[slug]/page.tsx
  - app/[locale]/work/page.tsx
  - app/[locale]/about/page.tsx
findings:
  critical: 4
  warning: 6
  info: 4
  total: 14
status: issues_found
---

# Phase 03: Code Review Report

**Reviewed:** 2026-06-11T00:00:00Z
**Depth:** standard
**Files Reviewed:** 14
**Status:** issues_found

## Summary

Fourteen source files covering the interior pages implementation (solutions index, solution detail, work, about) were reviewed at standard depth. The implementation is largely coherent but contains four critical issues: a hardcoded English string that bypasses the i18n system, a missing `await` on `setRequestLocale` that silently breaks locale resolution in every async server component, an `h1` rendered inside a wrapping `<Link>` which is invalid HTML and triggers accessibility errors, and a `WorkCard` component that hard-codes its translation namespace call-site without accepting a locale, which will silently fall back to the default locale regardless of the active request locale. Six warnings cover i18n pattern inconsistencies, type-safety gaps, and structural rigidity in the capabilities array. Four info items note minor quality issues.

---

## Critical Issues

### CR-01: `setRequestLocale` called without `await` in every page component

**File:** `app/[locale]/solutions/page.tsx:18`, `app/[locale]/solutions/[slug]/page.tsx:24`, `app/[locale]/work/page.tsx:18`, `app/[locale]/about/page.tsx:19`

**Issue:** `setRequestLocale(locale)` is called as a plain synchronous call, but next-intl v3's `setRequestLocale` is an async function that must be awaited. Omitting `await` means the request locale is never actually registered before `getTranslations` runs. `getTranslations` then silently resolves to the default locale (`en`) for all requests, making the entire i18n implementation non-functional for `id` and `zh` locales despite the build succeeding with no error.

**Fix:**
```ts
// Every page component — pattern is identical in all four files
const { locale } = await params;
await setRequestLocale(locale);          // <-- add await
const st = await getTranslations("solutions");
```

---

### CR-02: `WhoThisIsFor` label is a hardcoded English string

**File:** `components/solutions/WhoThisIsFor.tsx:6`

**Issue:** The eyebrow label `"Who this is for"` is a plain string literal embedded directly in JSX. It is not passed via props and is not fetched from the translation system. On Indonesian and Chinese pages this label will always display in English, which is a user-visible localisation defect.

**Fix:** Either accept a translated `label` prop passed from `SolutionDetailPage` (preferred — keeps this component presentational), or call `getTranslations` inside the component:

```tsx
// Option A — prop (recommended)
export function WhoThisIsFor({ label, text }: { label: string; text: string }) {
  return (
    <section className="py-12 md:py-16 px-6 bg-background">
      <div className="mx-auto max-w-content">
        <div className="border-l-2 border-cyber-jade pl-4 py-2">
          <p className="text-xs font-normal tracking-widest uppercase text-text-secondary mb-2">
            {label}
          </p>
          <p className="text-base font-normal leading-relaxed text-text-secondary">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}

// In SolutionDetailPage — add to the `ct` / `st` call:
<WhoThisIsFor label={ct("whoThisIsFor")} text={t("whoThisIsFor")} />
```

---

### CR-03: `<h1>` nested inside `<Link>` is invalid HTML

**File:** `components/solutions/SolutionsGrid.tsx:14-25`

**Issue:** Each grid item wraps a `<SolutionCard>` in a `<Link>` (which renders as `<a>`). `SolutionCard` renders an `<h3>` — that is fine in isolation — but at the *solutions index page* level `SolutionDetailHero` (rendered on the detail page) and the solutions *index* page both use `<h1>` within `PageHero`. The direct issue here is structural: wrapping an interactive element (`<a>`) around block-level headings is valid HTML5, BUT `SolutionCard` contains a semantic block (`<div>` with a heading and paragraph). More importantly, the entire card — including the heading — is the link's accessible name. Screen readers will announce the full card text as a single link label (title + description + tag concatenated), making it extremely verbose and unusable. There is no `aria-label` scoping the link to just the solution title.

**Fix:** Scope the link to a named target using `aria-label`, or restructure so only the heading is the anchor:

```tsx
<Link
  key={solution.slug}
  href={`/solutions/${solution.slug}`}
  className="block"
  aria-label={st(`${solution.slug}.title` as Parameters<typeof st>[0])}
>
  <SolutionCard ... />
</Link>
```

---

### CR-04: `WorkCard` calls `getTranslations` without locale context — always renders in English

**File:** `components/work/WorkCard.tsx:1-32`

**Issue:** `WorkCard` is an async server component that directly calls `getTranslations("work")` and `getTranslations("common")` with no locale parameter. In next-intl v3, these calls rely on the request locale being set via `setRequestLocale` earlier in the render tree. However, because CR-01 shows `setRequestLocale` is never awaited in `WorkPage`, the locale context is never established. Even if CR-01 were fixed, `WorkCard` takes no locale prop and cannot be tested or reused in a context where locale is explicitly threaded through. Combined with CR-01 this guarantees English-only rendering for all three translations of the Work page.

**Fix:** This component is only fixable in conjunction with CR-01. Once CR-01 is fixed (await setRequestLocale in WorkPage), `WorkCard` will correctly inherit request locale. No structural change is required to `WorkCard` itself provided CR-01 is resolved first — document this dependency clearly.

---

## Warnings

### WR-01: `GhostCard` has a hardcoded English "Coming soon" string

**File:** `components/work/GhostCard.tsx:4`

**Issue:** The text `"Coming soon"` is a bare string literal not sourced from the translation system. While this is a placeholder component, it is rendered on the live Work page for `id` and `zh` locales and will display English text.

**Fix:** Accept a translated prop:
```tsx
export function GhostCard({ label }: { label: string }) {
  return (
    <div className="border border-dashed border-border-subtle bg-surface rounded-lg p-6 flex items-center justify-center cursor-default min-h-[200px]">
      <span className="text-sm font-normal text-text-muted">{label}</span>
    </div>
  );
}
// WorkPage: <GhostCard label={ct("status.comingSoon")} />
```

---

### WR-02: Capabilities array is always exactly 3 items — missing translations silently produce empty strings

**File:** `app/[locale]/solutions/[slug]/page.tsx:38-42`

**Issue:** The capabilities array is hard-coded to keys `capability1Title` through `capability3Title/Body`. If a translation file omits any of these keys (or a solution has fewer than 3 capabilities), `st()` returns an empty string with no error. The `CapabilityList` component will then render 3 items, with some showing an empty title and body — a silent display defect.

**Fix:** Either validate that all keys exist after construction (at build time), or move the number of capabilities into `lib/solutions.ts` per solution and guard:
```ts
// lib/solutions.ts
export interface Solution {
  slug: string;
  status: SolutionStatus;
  icon: string;
  order: number;
  capabilityCount: number; // 1–N
}
```

---

### WR-03: `CapabilityList` accepts an empty array with no empty-state guard

**File:** `components/solutions/CapabilityList.tsx:7-27`

**Issue:** If `capabilities` is an empty array (possible given WR-02), the component renders a `<section>` with an empty `<div>`, producing a tall blank space with `py-24` padding on the page with no content. There is no conditional render or empty state.

**Fix:**
```tsx
if (capabilities.length === 0) return null;
```
Add this guard before the return statement.

---

### WR-04: `SolutionDetailPage` calls `getTranslations` after `notFound()` branch but TypeScript does not narrow

**File:** `app/[locale]/solutions/[slug]/page.tsx:26-29`

**Issue:** `notFound()` is called when `solution` is not found (line 27), which throws internally and aborts the render. However, TypeScript does not know that `notFound()` never returns — it is typed `() => never` in Next.js 14, but the `solution` variable is still typed `Solution | undefined` after the `if (!solution) notFound()` check. The subsequent `solution.status` access on line 35 requires a non-null assertion or proper narrowing. If a future change removes the `notFound()` call (e.g., during refactor), TypeScript will not catch the resulting null dereference.

**Fix:** Assert after the guard to be explicit:
```ts
const solution = solutions.find((s) => s.slug === slug);
if (!solution) notFound();
// solution is Solution here — add assertion if TS doesn't narrow:
const resolvedSolution = solution!;
```
Or restructure: `const solution = solutions.find(...); if (!solution) { notFound(); }` — Next.js 14 types `notFound` as `() => never` so TypeScript should narrow, but verify the installed `@types/next` version supports this.

---

### WR-05: `SolutionsGrid` does not wrap card content with an accessible list structure

**File:** `components/solutions/SolutionsGrid.tsx:12-29`

**Issue:** Four solution links are rendered inside a `grid` div with no surrounding `<ul>/<li>` or `role="list"` semantics. Screen readers present this as four sequential links with no relationship, losing the "4 items in a list" context that helps users understand page structure before navigating.

**Fix:**
```tsx
<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
  {solutions.map((solution) => (
    <li key={solution.slug}>
      <Link href={`/solutions/${solution.slug}`} className="block" aria-label={...}>
        <SolutionCard ... />
      </Link>
    </li>
  ))}
</ul>
```

---

### WR-06: `WorkPage` missing `FooterCTA` — inconsistent page structure

**File:** `app/[locale]/work/page.tsx:21-38`

**Issue:** The Solutions page, About page, and Solution Detail page all end with `<FooterCTA />`. The Work page omits it entirely. This is almost certainly an oversight (not a design decision) and will result in an abrupt page ending with no conversion path from the Work page — the only interior page without a call to action.

**Fix:** Import and append `FooterCTA`:
```tsx
import { FooterCTA } from "@/components/home/FooterCTA";
// ...
      </section>
      <FooterCTA />
    </>
```

---

## Info

### IN-01: `PageHero` props accept raw strings — no protection against XSS-equivalent injection via translation values

**File:** `components/PageHero.tsx:1-25`

**Issue:** `eyebrow`, `heading`, and `sub` are rendered as text content inside JSX, which React escapes automatically. However, if translation values ever contain HTML (e.g., injected via a CMS source later), they will be rendered as escaped literal text rather than markup — a latent usability issue if rich text formatting is ever needed. This is info-only since there is currently no CMS or dynamic source.

---

### IN-02: `lib/solutions.ts` — Unicode symbols in `icon` field are not accessibility-annotated

**File:** `lib/solutions.ts:11-14`

**Issue:** The icon field contains Unicode symbols (`⚡`, `◈`, `⊞`, `∿`). When rendered by `SolutionCard`, the `<span>` carrying the icon has `aria-hidden="true"` (good). However, the icon data itself has no human-readable alt text in `lib/solutions.ts`. If any future consumer renders the icon without `aria-hidden`, screen readers will announce the raw Unicode character name (e.g., "HIGH VOLTAGE SIGN"). Consider adding an `iconLabel` field to the `Solution` interface as a future-proofing measure.

---

### IN-03: `BeliefGrid` — belief data is module-level constant, not driven by translation keys discovery

**File:** `components/about/BeliefGrid.tsx:3-7`

**Issue:** The `beliefs` array is a static constant defined outside the component with hard-coded key names. Adding a fourth belief requires editing both the array and all three translation files. This tight coupling between component code and translation keys is not a bug but makes the system brittle to content changes.

---

### IN-04: Magic numbers for `capabilities` count not documented

**File:** `app/[locale]/solutions/[slug]/page.tsx:38-42`

**Issue:** The number `3` (capabilities per solution) appears as an implicit constraint repeated across the capability key names (`capability1`, `capability2`, `capability3`) with no constant or comment documenting that all solution translation entries must provide exactly 3 capabilities. A future author adding a new solution will not know this requirement without reading existing translation files.

---

_Reviewed: 2026-06-11T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
