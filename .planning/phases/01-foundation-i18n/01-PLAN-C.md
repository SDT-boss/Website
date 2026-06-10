---
phase: 01-foundation-i18n
plan: C
type: execute
wave: 2
depends_on:
  - 01-PLAN-A
  - 01-PLAN-B
files_modified:
  - app/page.tsx
  - app/[locale]/page.tsx
  - app/[locale]/not-found.tsx
  - components/Navbar.tsx
autonomous: true
requirements:
  - I18N-02
  - I18N-03

must_haves:
  truths:
    - "Navigating to localhost:3000/ redirects to localhost:3000/en"
    - "localhost:3000/en renders the scaffold placeholder without a 404"
    - "localhost:3000/id renders the scaffold placeholder without a 404"
    - "localhost:3000/zh renders the scaffold placeholder without a 404"
    - "The Navbar shows EN | ID | ZH pills on desktop viewport (hidden on mobile)"
    - "Clicking EN navigates to /en/..., clicking ID navigates to /id/..., clicking ZH navigates to /zh/..."
    - "npm run build completes with exit code 0"
  artifacts:
    - path: "app/page.tsx"
      provides: "Root redirect to /en"
      contains: "redirect"
    - path: "app/[locale]/page.tsx"
      provides: "Locale-scoped scaffold placeholder"
    - path: "app/[locale]/not-found.tsx"
      provides: "Branded 404 for locale segment"
      contains: "NotFound"
    - path: "components/Navbar.tsx"
      provides: "Navbar with language switcher pills"
      contains: "EN"
  key_links:
    - from: "app/page.tsx"
      to: "app/[locale]/page.tsx"
      via: "redirect('/en')"
      pattern: "redirect.*en"
    - from: "components/Navbar.tsx"
      to: "app/[locale]/"
      via: "Link href='/en', '/id', '/zh'"
      pattern: "href.*/(en|id|zh)"
---

<objective>
Wire the i18n routing into the app by converting the root page to a redirect, creating the locale-scoped page and not-found files, and adding the language switcher to the Navbar. This plan completes Phase 1 — after it executes, all three locale routes resolve, the language switcher is visible, and the build passes.

Depends on Plan A (brand config + Tailwind tokens correct) and Plan B (next-intl installed, i18n config files present, locale layout exists).

Purpose: Make the walking skeleton fully navigable. A user visiting the site sees the scaffold under `/en`, `/id`, or `/zh`, can switch locales from the Navbar, and the build is clean.
Output: 4 modified/created files. Full Phase 1 skeleton working end-to-end.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/phases/01-foundation-i18n/01-CONTEXT.md
@.planning/phases/01-foundation-i18n/01-PATTERNS.md
@.planning/phases/01-foundation-i18n/01-A-SUMMARY.md
@.planning/phases/01-foundation-i18n/01-B-SUMMARY.md
</context>

<interfaces>
Relevant patterns from Plan A and Plan B outputs:

From Plan A (config/site.ts — updated values):
  siteConfig.name = "SDT"
  siteConfig.email = "sdttech.co@gmail.com"
  siteConfig.tagline = "Infrastructure for intelligent operations."
  Import: import { siteConfig } from "@/config/site"

From Plan B (app/[locale]/layout.tsx — already exists):
  - generateStaticParams returns [{locale:"en"},{locale:"id"},{locale:"zh"}]
  - Children are wrapped in NextIntlClientProvider
  - app/[locale]/ directory is already created

Navbar.tsx current structure (lines 1-49):
  - Named export: export function Navbar()
  - Imports: Link from "next/link", LogoMark, siteConfig
  - Desktop nav: hidden md:flex
  - CTA: hidden md:inline-flex items-center ... text-cyber-jade border border-cyber-jade
  - Switcher appends AFTER the mailto <a> tag, inside the same flex container

Language switcher pattern (D-05, D-06, D-07):
  - hidden md:flex items-center gap-1 text-xs font-medium shrink-0
  - Active locale: text-white (hard-coded for Phase 1 — dynamic in Phase 2)
  - Inactive locale: text-text-secondary hover:text-white transition-colors duration-150 ease-out
  - Pipe separators: <span className="text-text-muted">|</span>
  - Links use next/link <Link href="/en"> etc.
  - Phase 2 note: comment that hamburger integration comes in Phase 2

not-found.tsx pattern:
  - Pure Server Component, no 'use client'
  - No headers(), cookies(), redirect(), or data fetching
  - Import: Link from "next/link", siteConfig from "@/config/site"
  - Layout: flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6
  - 404 label: text-text-muted text-sm tracking-widest font-mono
  - Body text: text-text-secondary text-base
  - Return link: text-cyber-jade text-sm hover:text-jade-strong transition-colors duration-150 ease-out
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Convert root page to /en redirect and create locale page</name>
  <files>app/page.tsx, app/[locale]/page.tsx</files>

  <read_first>
    - `app/page.tsx` — current scaffold placeholder content (9 lines). Will be fully replaced.
    - `app/[locale]/layout.tsx` — confirms the [locale] directory exists and the layout is in place.
  </read_first>

  <action>
    **Edit 1 — Replace `app/page.tsx` entirely (per D-01, PATTERNS.md "app/page.tsx" section):**
    The file body becomes:
    - Import `redirect` from `"next/navigation"`
    - Export default function `RootPage()` that immediately calls `redirect("/en")`
    - No JSX return — `redirect()` throws internally and Next.js handles the response
    - No other imports needed

    Note: `redirect()` from `next/navigation` is supported in Server Components in static export. It produces a static HTML meta-refresh + JS redirect in the output bundle. Do NOT use `middleware.ts` (unsupported with `output: "export"`). Do NOT use `next.config.mjs` redirects (unsupported with static export).

    **Edit 2 — Create `app/[locale]/page.tsx` (per PATTERNS.md "app/[locale]/page.tsx" section):**
    Create the file as an async default export that accepts params. The function signature must be:

      export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
        const { locale } = await params;
        return (
          <main className="flex items-center justify-center min-h-[60vh]">
            <p className="text-text-muted text-sm font-mono tracking-widest">— scaffold ready —</p>
          </main>
        );
      }

    The page MUST be async and MUST accept and await params typed as `Promise<{ locale: string }>` because it lives under the dynamic `[locale]` segment in Next.js 14+ App Router. The `locale` variable is available for Phase 2 when translation consumption is added; it is not used in the scaffold body beyond destructuring.

    The `font-mono` class in the placeholder is acceptable because it falls back to `ui-monospace` after Plan A removed the undefined `--font-geist-mono` reference. This scaffold will be replaced entirely in Phase 2.
  </action>

  <verify>
    <automated>grep -c 'redirect.*\/en' /Users/shannendorothee/Projects/Website/app/page.tsx && test -f /Users/shannendorothee/Projects/Website/app/\[locale\]/page.tsx && echo "locale page exists"</automated>
    First command outputs `1`. Second command outputs `locale page exists`.
    Also verify: `grep -c 'async function Home' /Users/shannendorothee/Projects/Website/app/\[locale\]/page.tsx` outputs `1`.
    Also verify: `grep -c 'await params' /Users/shannendorothee/Projects/Website/app/\[locale\]/page.tsx` outputs `1`.
  </verify>

  <acceptance_criteria>
    - `app/page.tsx` imports `redirect` from `"next/navigation"`
    - `app/page.tsx` calls `redirect("/en")` in the function body
    - `app/page.tsx` does NOT contain any JSX (no `<div>`, no `<p>`)
    - `app/page.tsx` does NOT import React or any component
    - `app/[locale]/page.tsx` exists
    - `app/[locale]/page.tsx` exports an async default function named `Home`
    - `app/[locale]/page.tsx` accepts params typed as `Promise<{ locale: string }>` and awaits params before using locale
    - `app/[locale]/page.tsx` contains `— scaffold ready —` text
    - `app/[locale]/page.tsx` does NOT have `'use client'` directive
    - `app/[locale]/page.tsx` does NOT import next-intl (Phase 2 adds translation consumption)
  </acceptance_criteria>

  <done>Root URL redirects to /en. Each of /en, /id, /zh serves the scaffold placeholder page through the locale layout's NextIntlClientProvider wrapper. The locale page is async with proper params typing per Next.js 14+ App Router contract.</done>
</task>

<task type="auto">
  <name>Task 2: Create locale not-found page and add language switcher to Navbar</name>
  <files>app/[locale]/not-found.tsx, components/Navbar.tsx</files>

  <read_first>
    - `components/Navbar.tsx` — read entire file (49 lines) before editing. The switcher is appended inside the top-level flex `<div>` after the mailto `<a>` tag, before the closing `</div>`.
    - `config/site.ts` — confirm `siteConfig.name` is now `"SDT"` (written by Plan A). The not-found page uses `siteConfig.name`.
  </read_first>

  <action>
    **Edit 1 — Create `app/[locale]/not-found.tsx` (per Claude's Discretion, PATTERNS.md "app/[locale]/not-found.tsx" section):**
    New file. Pure static Server Component:
    - Import `Link` from `"next/link"`
    - Import `siteConfig` from `"@/config/site"`
    - Export default function `NotFound()` (no async, no `'use client'`)
    - Outer wrapper: `<div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">`
    - 404 label paragraph: `<p className="text-text-muted text-sm tracking-widest font-mono">404</p>`
    - Message paragraph: `<p className="text-text-secondary text-base">This page does not exist.</p>`
    - Return link: `<Link href="/" className="text-cyber-jade text-sm hover:text-jade-strong transition-colors duration-150 ease-out">Return to {siteConfig.name} tech</Link>`

    Important constraints from PITFALLS.md #4:
    - NO `headers()`, `cookies()`, `redirect()`, or data fetching
    - NO `'use client'` directive
    - Detailed branded styling is Phase 4 — this is the basic functional version

    **Edit 2 — Add language switcher to `components/Navbar.tsx` (per D-05, D-06, D-07):**
    Edit the Navbar file. Find the closing `</div>` of the outermost header content div (the one with `flex items-center justify-between gap-8`). Insert the language switcher block AFTER the existing mailto `<a>` tag and BEFORE the closing `</div>`.

    The switcher block to insert:
    A `<div>` with `className="hidden md:flex items-center gap-1 text-xs font-medium shrink-0"`:
    - `<Link href="/en" className="text-white">EN</Link>` — EN is shown as active/default in Phase 1 (dynamic active state comes in Phase 2)
    - `<span className="text-text-muted">|</span>`
    - `<Link href="/id" className="text-text-secondary hover:text-white transition-colors duration-150 ease-out">ID</Link>`
    - `<span className="text-text-muted">|</span>`
    - `<Link href="/zh" className="text-text-secondary hover:text-white transition-colors duration-150 ease-out">ZH</Link>`

    Add an inline comment before the div: `{/* Language switcher — hidden on mobile (Phase 2: integrate into hamburger menu) */}`

    The switcher uses `<Link>` from `next/link` (already imported in Navbar.tsx). No new imports needed.

    TODO Phase 2: Replace hardcoded `href='/en'`, `href='/id'`, `href='/zh'` with path-aware locale switching using next-intl `usePathname()` + `useRouter()`. The current hardcoded hrefs always navigate to the locale root rather than preserving the current path — acceptable for the Phase 1 skeleton, not for production navigation.

    After editing, verify: the Navbar file still has the `export function Navbar()` named export. Do NOT convert to a default export or add `'use client'` — the Navbar is a Server Component in Phase 1 (Phase 2 adds client state for active locale).
  </action>

  <verify>
    <automated>grep -c 'hidden md:flex items-center gap-1' /Users/shannendorothee/Projects/Website/components/Navbar.tsx && grep -c 'NotFound' /Users/shannendorothee/Projects/Website/app/\[locale\]/not-found.tsx</automated>
    Both commands must output `1`. Also: `grep -c "href=\"/en\"" /Users/shannendorothee/Projects/Website/components/Navbar.tsx` must output at least `1`.
  </verify>

  <acceptance_criteria>
    - `app/[locale]/not-found.tsx` exists
    - `app/[locale]/not-found.tsx` exports default function `NotFound`
    - `app/[locale]/not-found.tsx` does NOT contain `'use client'`
    - `app/[locale]/not-found.tsx` does NOT contain `headers(`, `cookies(`, `redirect(` 
    - `app/[locale]/not-found.tsx` contains `<Link href="/"` with `Return to` text
    - `app/[locale]/not-found.tsx` uses `siteConfig.name` in the return link text
    - `components/Navbar.tsx` contains a div with `hidden md:flex items-center gap-1`
    - `components/Navbar.tsx` contains `<Link href="/en"` with text `EN`
    - `components/Navbar.tsx` contains `<Link href="/id"` with text `ID`
    - `components/Navbar.tsx` contains `<Link href="/zh"` with text `ZH`
    - `components/Navbar.tsx` still uses `export function Navbar()` named export (not default)
    - `components/Navbar.tsx` does NOT have `'use client'` directive
    - The language switcher `<div>` appears AFTER the mailto `<a>` tag in the DOM order
    - Pipe `<span>` separators use `text-text-muted` class
    - Inactive locale links use `text-text-secondary hover:text-white transition-colors duration-150 ease-out`
  </acceptance_criteria>

  <done>The locale segment has a basic branded 404 page. The Navbar shows the EN | ID | ZH language switcher pills on desktop. Clicking each pill navigates to the corresponding locale root URL. A Phase 2 TODO is embedded in the action for path-aware locale switching.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
    Plan C has wired i18n routing end-to-end: root redirect, locale pages, not-found, and the language switcher. Combined with Plan A (brand cleanup) and Plan B (next-intl infrastructure), Phase 1 should be fully complete.

    Before this checkpoint, Claude will run `npm run build` and report the result.
  </what-built>

  <how-to-verify>
    Run these steps in sequence:

    1. In terminal at project root: `npm run build`
       Expected: exits with code 0, no TypeScript errors, no "Missing generateStaticParams" errors, static pages generated for /en/, /id/, /zh/

    2. Start dev server: `npm run dev`
       Then open a browser and verify:

    3. Visit `http://localhost:3000/` — should redirect to `http://localhost:3000/en/`

    4. Visit `http://localhost:3000/en` — should show the scaffold placeholder ("— scaffold ready —") without a 404 or white screen

    5. Visit `http://localhost:3000/id` — should show the same scaffold placeholder without a 404

    6. Visit `http://localhost:3000/zh` — should show the same scaffold placeholder without a 404

    7. On each locale page, look at the Navbar:
       - The "SDT tech" wordmark should appear (not "YourCo tech")
       - To the right of "Get in touch", the pills `EN | ID | ZH` should be visible on a desktop viewport
       - The pipe separators should appear in a muted color

    8. Click the `ID` pill — URL should update to `/id/` and page content should reload correctly

    9. Check the browser tab title — should read "SDT tech" (not "YourCo tech")

    10. In the footer, the tagline should read "Infrastructure for intelligent operations." (not "Built for intelligent operations.")
  </how-to-verify>

  <resume-signal>
    Type "approved" if all 10 checks pass.
    Describe any issues if checks fail (e.g., "build error: [paste error]", "route 404: /id", "navbar missing pills").
  </resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Navbar → locale routes | Language switcher pills are links — invalid hrefs would route users to 404 |
| app/[locale]/not-found.tsx → rendering | not-found must not call server-only APIs or it fails the static build |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01C-01 | Denial of Service | not-found.tsx using headers()/cookies() | mitigate | Acceptance criteria explicitly prohibit these APIs; they cause build-time errors in static export |
| T-01C-02 | Spoofing | Language switcher links pointing to wrong locales | mitigate | Acceptance criteria verify exact href values ("/en", "/id", "/zh") |
| T-01C-03 | Denial of Service | Missing locale in generateStaticParams causing 404 | mitigate | Plan B Task 3 sets generateStaticParams returning all three locales; this plan's build verification catches any mismatch |
| T-01C-SC | Tampering | npm/pip/cargo installs | accept | No new packages installed in this plan |
</threat_model>

<verification>
After all tasks complete:

1. `npm run build` exits 0
2. `grep 'redirect.*\/en' app/page.tsx` returns a match
3. `grep 'async function Home' app/[locale]/page.tsx` returns a match
4. `grep 'await params' app/[locale]/page.tsx` returns a match
5. `grep 'EN' components/Navbar.tsx` returns a match with the switcher div
6. `test -f app/[locale]/not-found.tsx && echo ok` outputs `ok`
7. `grep 'headers(' app/[locale]/not-found.tsx` returns empty (no server-only APIs)
8. Human checkpoint: all three locale routes resolve in browser, language switcher visible and functional
</verification>

<success_criteria>
- I18N-02 (routing, continued): `app/[locale]/page.tsx` exists as an async function accepting params; `app/page.tsx` redirects to `/en`; `app/[locale]/not-found.tsx` is a clean static server component
- I18N-03: Language switcher EN | ID | ZH pills visible in Navbar on desktop; clicking each navigates to the correct locale root URL; switcher uses `transition-colors duration-150 ease-out` per DESIGN.md
- Phase 1 overall: `npm run build` exits 0; browser verifies all three locales resolve; brand shows "SDT tech"; footer tagline is correct
</success_criteria>

<output>
Create `.planning/phases/01-foundation-i18n/01-C-SUMMARY.md` when done.
</output>
