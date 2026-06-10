---
phase: 01-foundation-i18n
plan: B
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - next.config.mjs
  - i18n/routing.ts
  - i18n/request.ts
  - messages/en.json
  - messages/id.json
  - messages/zh.json
  - app/[locale]/layout.tsx
autonomous: true
requirements:
  - I18N-01
  - I18N-02
  - I18N-04

must_haves:
  truths:
    - "npm run build completes with next-intl plugin active and static export intact"
    - "i18n/routing.ts defines locales ['en', 'id', 'zh'] with 'en' as default"
    - "i18n/request.ts uses getRequestConfig (no middleware) for static export compatibility"
    - "Locale routes /en, /id, /zh each produce static HTML in the out/ directory after build"
    - "messages/id.json and messages/zh.json each contain a _reviewNote key as their first key"
    - "app/[locale]/layout.tsx wraps NextIntlClientProvider and exports generateStaticParams"
    - "I18N-04 is delivered at skeleton scope per CONTEXT.md D-09 — translation files contain nav, home, footer, and common keys; solutions/work/about section keys will be expanded in Phase 2-3 as pages are built"
  artifacts:
    - path: "i18n/routing.ts"
      provides: "Locale routing definition"
      contains: "defineRouting"
    - path: "i18n/request.ts"
      provides: "Static-export i18n request config"
      contains: "getRequestConfig"
    - path: "messages/en.json"
      provides: "English translations"
      contains: "nav"
    - path: "messages/id.json"
      provides: "Indonesian translations scaffold"
      contains: "nav"
    - path: "messages/zh.json"
      provides: "Chinese translations scaffold"
      contains: "nav"
    - path: "app/[locale]/layout.tsx"
      provides: "Locale segment layout with i18n provider"
      exports: ["generateStaticParams", "default (LocaleLayout)"]
    - path: "next.config.mjs"
      provides: "Next.js config with next-intl plugin"
      contains: "createNextIntlPlugin"
  key_links:
    - from: "i18n/request.ts"
      to: "messages/{locale}.json"
      via: "dynamic import"
      pattern: "import.*messages.*locale.*json"
    - from: "app/[locale]/layout.tsx"
      to: "next-intl"
      via: "NextIntlClientProvider + getMessages"
      pattern: "NextIntlClientProvider"
    - from: "next.config.mjs"
      to: "i18n/request.ts"
      via: "createNextIntlPlugin('./i18n/request.ts')"
      pattern: "createNextIntlPlugin"
---

<objective>
Install next-intl and scaffold the complete i18n infrastructure for a static-export Next.js site. This plan creates the routing config, request config, all three translation files, the locale layout, and updates next.config.mjs — everything needed to serve `/en`, `/id`, and `/zh` routes with translated content.

This plan runs in parallel with Plan A (zero file overlap). It has no dependency on Plan A's changes.

Purpose: Establish the i18n architecture that all pages in Phase 2+ will be built on. Get the routing shape right once so it never needs changing.
Output: 7 new/modified files establishing complete next-intl static routing infrastructure.
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
</context>

<interfaces>
Key patterns from PATTERNS.md that this executor uses:

next-intl v3 static routing config (no middleware — required for output: "export"):

i18n/routing.ts pattern:
  import { defineRouting } from "next-intl/routing";
  export const routing = defineRouting({
    locales: ["en", "id", "zh"],
    defaultLocale: "en",
  });

i18n/request.ts pattern:
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

app/[locale]/layout.tsx pattern:
  - generateStaticParams returns [{ locale: "en" }, { locale: "id" }, { locale: "zh" }]
  - params is a Promise<{ locale: string }> — must await params
  - Uses getMessages() from "next-intl/server"
  - Wraps children in NextIntlClientProvider with locale + messages

next.config.mjs update:
  import createNextIntlPlugin from "next-intl/plugin";
  const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
  export default withNextIntl({ /* existing config */ });
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Install next-intl and update next.config.mjs</name>
  <files>package.json, next.config.mjs</files>

  <read_first>
    - `next.config.mjs` — read the entire file before editing to see current config shape
    - `package.json` — confirm current dependencies before install
  </read_first>

  <action>
    Step 1 — Install next-intl (per I18N-01, Claude's Discretion for version):
    Run `npm install next-intl` in the project root (`/Users/shannendorothee/Projects/Website`). This installs the latest stable v3.x. Do NOT pin to a specific version — let npm resolve the latest stable.

    Step 2 — Update `next.config.mjs`:
    Read the current file first, then rewrite it to wrap the existing config object with the next-intl plugin.

    Current `next.config.mjs` shape (verify by reading first):
      /** @type {import('next').NextConfig} */
      const nextConfig = {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      };
      export default nextConfig;

    Target `next.config.mjs` after edit:
    - Add `import createNextIntlPlugin from "next-intl/plugin";` at the top
    - Add `const withNextIntl = createNextIntlPlugin("./i18n/request.ts");` before the config object
    - Keep the existing `nextConfig` object UNCHANGED (output: "export", trailingSlash, images must all remain)
    - Change the final export from `export default nextConfig` to `export default withNextIntl(nextConfig)`

    Do NOT change `output: "export"`, `trailingSlash: true`, or `images: { unoptimized: true }` — these are required for the static export to function.
  </action>

  <verify>
    <automated>grep -c 'createNextIntlPlugin' /Users/shannendorothee/Projects/Website/next.config.mjs && grep -c 'output.*export' /Users/shannendorothee/Projects/Website/next.config.mjs</automated>
    Both commands must output `1`. Also confirm: `node -e "require('./node_modules/next-intl/package.json')" 2>/dev/null && echo "installed"` outputs `installed`.
  </verify>

  <acceptance_criteria>
    - `node_modules/next-intl` directory exists
    - `package.json` `dependencies` object contains a `next-intl` entry (version starting with `^3.` or `3.`)
    - `next.config.mjs` imports `createNextIntlPlugin` from `"next-intl/plugin"`
    - `next.config.mjs` calls `createNextIntlPlugin("./i18n/request.ts")`
    - `next.config.mjs` still contains `output: "export"`
    - `next.config.mjs` still contains `trailingSlash: true`
    - `next.config.mjs` still contains `images: { unoptimized: true }`
  </acceptance_criteria>

  <done>next-intl is installed. next.config.mjs wraps the existing static-export config with the next-intl plugin pointing at the request config file.</done>
</task>

<task type="auto">
  <name>Task 2: Create i18n config files and translation messages</name>
  <files>i18n/routing.ts, i18n/request.ts, messages/en.json, messages/id.json, messages/zh.json</files>

  <read_first>
    - `.planning/phases/01-foundation-i18n/01-PATTERNS.md` — contains the exact patterns for routing.ts, request.ts, and all three message files. Read sections "i18n/routing.ts", "i18n/request.ts", "messages/en.json", "messages/id.json", "messages/zh.json".
  </read_first>

  <action>
    Create five new files. The `i18n/` directory and `messages/` directory do not exist yet — the file creation will establish them.

    **File 1 — `i18n/routing.ts`:**
    Content: import `defineRouting` from `"next-intl/routing"`. Export `routing` as a named const using `defineRouting` with `locales: ["en", "id", "zh"]` and `defaultLocale: "en"`.

    **File 2 — `i18n/request.ts`:**
    Content: import `getRequestConfig` from `"next-intl/server"`. Import `routing` from `"./routing"`. Export default using `getRequestConfig(async ({ requestLocale }) => {...})`.
    Inside the callback:
    - `let locale = await requestLocale`
    - Guard: if locale is missing or not in `routing.locales`, fall back to `routing.defaultLocale`
    - Return `{ locale, messages: (await import(`../messages/${locale}.json`)).default }`
    The type cast for the guard must be `as "en" | "id" | "zh"` — match routing.locales exactly.

    **File 3 — `messages/en.json`:**
    Flat namespace structure per D-08. English content is real per D-09. Exact schema:
    - `"nav"`: keys `solutions`, `work`, `about`, `getInTouch` with English values
    - `"home"`: keys `heroTitle`, `heroSub`, `ctaLabel` with English values
    - `"solutions"`: key `pageTitle` = `"Solutions"`
    - `"work"`: key `pageTitle` = `"Work"`
    - `"about"`: key `pageTitle` = `"About"`
    - `"footer"`: keys `tagline` = `"Infrastructure for intelligent operations."` and `allRightsReserved` = `"All rights reserved."`
    - `"common"`: nested `"status"` object with keys `live` = `"Live"` and `inDevelopment` = `"In development"`

    Full English values from PATTERNS.md:
    - nav.solutions = "Solutions"
    - nav.work = "Work"
    - nav.about = "About"
    - nav.getInTouch = "Get in touch"
    - home.heroTitle = "Infrastructure for intelligent operations."
    - home.heroSub = "SDT builds software for fleet mobility, IoT hardware, logistics intelligence, and AI operations."
    - home.ctaLabel = "See our solutions"

    **File 4 — `messages/id.json`:**
    MUST mirror the EXACT same schema as en.json (all keys identical, values in Indonesian). Per D-09: machine-translated scaffold — owner reviews before launch.

    The FIRST key in the file MUST be `"_reviewNote"` with value `"AUTO-TRANSLATED SCAFFOLD — owner must review before launch"`. This is the mechanism to signal to any future translator or content owner that the file has not been human-reviewed. Place it before all namespace keys.

    Use the exact Indonesian values from PATTERNS.md (id.json section) for all remaining keys.

    **File 5 — `messages/zh.json`:**
    MUST mirror the EXACT same schema as en.json (all keys identical, values in Chinese Simplified).

    The FIRST key in the file MUST be `"_reviewNote"` with value `"AUTO-TRANSLATED SCAFFOLD — owner must review before launch"`. Place it before all namespace keys.

    Use the exact Chinese values from PATTERNS.md (zh.json section) for all remaining keys.

    Critical constraint: Every key that exists in en.json MUST also exist in id.json and zh.json. Missing keys cause next-intl to throw at runtime in the locale layout.
  </action>

  <verify>
    <automated>
      node -e "const en = require('./messages/en.json'); const id = require('./messages/id.json'); const zh = require('./messages/zh.json'); const enKeys = JSON.stringify(Object.keys(en).sort()); const idKeys = JSON.stringify(Object.keys(id).sort()); const zhKeys = JSON.stringify(Object.keys(zh).sort()); if (enKeys !== idKeys || enKeys !== zhKeys) { console.error('KEY MISMATCH'); process.exit(1); } console.log('Keys match:', enKeys);" 2>&1
    </automated>
    Command must output `Keys match: [...]` (order may vary) without `KEY MISMATCH`.
    Also verify: `grep -c '"solutions"' /Users/shannendorothee/Projects/Website/i18n/routing.ts` outputs `1`.
    Also verify: `node -e "const id = require('./messages/id.json'); const zh = require('./messages/zh.json'); if (Object.keys(id)[0] !== '_reviewNote') { console.error('id.json: _reviewNote is not the first key'); process.exit(1); } if (Object.keys(zh)[0] !== '_reviewNote') { console.error('zh.json: _reviewNote is not the first key'); process.exit(1); } console.log('reviewNote first key confirmed');"` outputs `reviewNote first key confirmed`.
  </verify>

  <acceptance_criteria>
    - `i18n/routing.ts` exists and exports `routing` (named export)
    - `i18n/routing.ts` contains `defineRouting` call with locales array `["en", "id", "zh"]`
    - `i18n/request.ts` exists and uses `export default getRequestConfig(...)`
    - `i18n/request.ts` imports `routing` from `"./routing"`
    - `messages/en.json` exists and is valid JSON with top-level keys: `nav`, `home`, `solutions`, `work`, `about`, `footer`, `common`
    - `messages/id.json` exists with identical top-level key set as `en.json` (excluding `_reviewNote`)
    - `messages/zh.json` exists with identical top-level key set as `en.json` (excluding `_reviewNote`)
    - `messages/id.json` and `messages/zh.json` each contain a `_reviewNote` key as their first key with value starting `"AUTO-TRANSLATED SCAFFOLD"`
    - `messages/id.json` and `messages/zh.json` contain the same nested keys as `messages/en.json` under `nav`, `home`, `footer`, and `common` (verify with Object.keys comparison)
    - `messages/en.json` nav.getInTouch value is `"Get in touch"` (exact string)
    - `messages/id.json` nav.solutions value is `"Solusi"` (exact Indonesian value from PATTERNS.md)
    - `messages/zh.json` nav.solutions value is `"解决方案"` (exact Chinese value from PATTERNS.md)
    - Node require/parse of all three JSON files succeeds without syntax errors
  </acceptance_criteria>

  <done>i18n infrastructure config files exist. Translation messages cover all three locales with matching schemas. The request config uses the static export-compatible pattern (no middleware). id.json and zh.json are marked with _reviewNote as their first key to signal they require human review before launch.</done>
</task>

<task type="auto">
  <name>Task 3: Create app/[locale]/layout.tsx with NextIntlClientProvider</name>
  <files>app/[locale]/layout.tsx</files>

  <read_first>
    - `app/layout.tsx` — the root layout's structure (how imports, exports, and JSX are organized). The locale layout mirrors the structural conventions but does NOT repeat html/body/Navbar/Footer.
    - `.planning/phases/01-foundation-i18n/01-PATTERNS.md` — section "app/[locale]/layout.tsx" for the exact implementation pattern.
  </read_first>

  <action>
    Create the directory `app/[locale]/` and the file `app/[locale]/layout.tsx`.

    The file must (per D-03, D-04, PATTERNS.md):
    1. Import `NextIntlClientProvider` from `"next-intl"`
    2. Import `getMessages` from `"next-intl/server"`
    3. Export `generateStaticParams` as a named function returning `[{ locale: "en" }, { locale: "id" }, { locale: "zh" }]`
    4. Export `const dynamicParams = false` — static export must not serve unlisted locales
    5. Export default `async function LocaleLayout({ children, params })` where `params` is typed as `Promise<{ locale: string }>`
    6. Inside the function body:
       - `const { locale } = await params` — MUST await params (Next.js 14+ requirement)
       - `const messages = await getMessages()` — use getMessages(), not a direct JSON import
    7. Return JSX: `<NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>`

    The locale layout does NOT render `<html>`, `<body>`, `<Navbar>`, or `<Footer>` — those stay in the root `app/layout.tsx`. The locale layout is purely a provider wrapper.

    Use `@/` path alias for any imports that cross directories. Use `"next-intl"` and `"next-intl/server"` as the import specifiers (not relative paths into node_modules).
  </action>

  <verify>
    <automated>grep -c 'NextIntlClientProvider' /Users/shannendorothee/Projects/Website/app/\[locale\]/layout.tsx && grep -c 'generateStaticParams' /Users/shannendorothee/Projects/Website/app/\[locale\]/layout.tsx && grep -c 'await params' /Users/shannendorothee/Projects/Website/app/\[locale\]/layout.tsx</automated>
    All three commands must output `1`.
  </verify>

  <acceptance_criteria>
    - File `app/[locale]/layout.tsx` exists
    - File imports `NextIntlClientProvider` from `"next-intl"`
    - File imports `getMessages` from `"next-intl/server"`
    - `generateStaticParams` is exported as a named function (not default)
    - `generateStaticParams` return value contains objects for `"en"`, `"id"`, and `"zh"`
    - `export const dynamicParams = false` is present
    - Default export is an async function
    - The function signature destructures `params` typed as `Promise<{ locale: string }>`
    - `const { locale } = await params` appears in the function body (awaits params)
    - `getMessages()` is called with `await`
    - The JSX return wraps children in `<NextIntlClientProvider locale={locale} messages={messages}>`
    - The file does NOT contain `<html>`, `<body>`, `<Navbar>`, `<Footer>`, or any layout chrome
    - TypeScript strict mode: no `any` types used
  </acceptance_criteria>

  <done>The locale layout exists and correctly wraps NextIntlClientProvider for all three locales. generateStaticParams satisfies the static export requirement. params is awaited per Next.js 14+ contract.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| npm install → node_modules | New dependency (next-intl) enters the codebase |
| messages/{locale}.json → rendered text | Translation values become visible page text — XSS vector if values contain HTML |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01B-01 | Tampering | npm install next-intl | mitigate | next-intl is a well-known package (npmjs.com/package/next-intl, 2M+ weekly downloads); verify install does not add unexpected transitive deps |
| T-01B-02 | Injection | messages/{locale}.json translation values | accept | Values are developer-authored JSON at build time; no user-supplied content in static export; React renders as text nodes (not innerHTML) by default |
| T-01B-03 | Denial of Service | Missing translation key at runtime | mitigate | All three locale files must have identical key schemas (enforced by acceptance criteria verify command); missing key causes next-intl to throw |
| T-01B-SC | Tampering | npm/pip/cargo installs | mitigate | next-intl is a known-good package; no [ASSUMED] or [SUS] packages; no blocking checkpoint required |
</threat_model>

<verification>
After all three tasks complete:

1. `node_modules/next-intl/` exists
2. `next.config.mjs` contains `createNextIntlPlugin`
3. `i18n/routing.ts` exports `routing` with `locales: ["en", "id", "zh"]`
4. `i18n/request.ts` exports default `getRequestConfig` config
5. `messages/en.json`, `messages/id.json`, `messages/zh.json` all parse as valid JSON with matching top-level keys
6. `messages/id.json` and `messages/zh.json` have `_reviewNote` as their first key with value starting "AUTO-TRANSLATED SCAFFOLD"
7. `app/[locale]/layout.tsx` exists with `NextIntlClientProvider`, `generateStaticParams`, and `await params`
8. TypeScript compiles without errors: `npx tsc --noEmit` exits 0
</verification>

<success_criteria>
- I18N-01: next-intl installed; `next.config.mjs` updated with plugin; static export config preserved
- I18N-02: `app/[locale]/layout.tsx` exists with `generateStaticParams` covering en/id/zh; `dynamicParams = false`
- I18N-04: `messages/en.json` contains real English content; `messages/id.json` and `messages/zh.json` are machine-translated scaffolds with matching schema covering nav, home, solutions, work, about, footer, common namespaces; skeleton scope per D-09 — solutions/work/about section keys expand in Phase 2-3 as pages are built
</success_criteria>

<output>
Create `.planning/phases/01-foundation-i18n/01-B-SUMMARY.md` when done.
</output>
