# Phase 1: Foundation & i18n — Context

**Gathered:** 2026-06-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Fix all known codebase defects (git artifacts, placeholder brand config, Footer tagline, Tailwind token issues), then establish the `app/[locale]/` routing structure with next-intl so every subsequent page is built in the correct i18n-ready structure from the start.

**This phase does NOT build any page content.** It only cleans the foundation and scaffolds i18n routing. Home page, solutions, work, and about are Phase 2+.

</domain>

<decisions>
## Implementation Decisions

### i18n Routing Shape

- **D-01:** Root `/` redirects to `/en/` — all URLs have an explicit locale segment. Not asymmetric.
- **D-02:** Locale message files live at `messages/en.json`, `messages/id.json`, `messages/zh.json` — top-level `messages/` folder, standard next-intl convention.
- **D-03:** `app/[locale]/layout.tsx` wraps `NextIntlClientProvider` — correct next-intl static export pattern. Root `app/layout.tsx` handles fonts and `<html>`; locale layout handles the provider.
- **D-04:** `generateStaticParams` in locale layout exports `['en', 'id', 'zh']`.

### Language Switcher UX

- **D-05:** Inline text pills in the Navbar — `EN | ID | ZH` — no dropdown. Fits the minimal Palantir aesthetic.
- **D-06:** Switcher sits far-right in the Navbar, after the "Get in touch" button — rightmost utility control.
- **D-07:** Switcher is also present in the mobile hamburger menu (Phase 2 builds the hamburger — the switcher must integrate there too).

### Translation File Structure

- **D-08:** Flat namespaces per section within a single file per locale. Structure:
  ```json
  {
    "nav": { "solutions": "...", "work": "...", "about": "...", "getInTouch": "..." },
    "home": { "heroTitle": "...", "heroSub": "...", "ctaLabel": "..." },
    "solutions": { "pageTitle": "...", "cards": { ... } },
    "work": { ... },
    "about": { ... },
    "footer": { ... },
    "common": { "status": { "live": "...", "inDevelopment": "..." } }
  }
  ```
- **D-09:** Phase 1 ships skeleton translation files. English content is real. Indonesian (`id`) and Chinese (`zh`) are auto-translated from English as scaffolding — owner reviews and corrects before launch.

### Config & Token Cleanup Scope

- **D-10:** Fix known issues only — no full audit. Scope is exactly:
  1. Add `.next` and `out` to `.gitignore`; run `git rm -r --cached .next out` to untrack
  2. Update `config/site.ts`: `name: "SDT"`, `email: "sdttech.co@gmail.com"`, add `domain: "sdt.technology"` (or keep domain in a comment — no runtime env needed)
  3. Replace hardcoded `"Built for intelligent operations."` in `Footer.tsx` with `{siteConfig.tagline}`
  4. Add `background: "#0a0a0a"` token to `tailwind.config.ts`; replace `bg-[#0a0a0a]` in `app/layout.tsx` with `bg-background`
  5. Remove `fontFamily.mono: ["var(--font-geist-mono)", ...]` from `tailwind.config.ts` (no pages use `font-mono`); replace with system mono fallback if needed later

- **D-11:** Background token name is `background` → class is `bg-background`. Semantic, matches CSS convention.

### Claude's Discretion

- next-intl version: Use latest stable (`^3.x`). Check npm for current version at install time.
- Middleware vs static routing: With `output: "export"`, Next.js Middleware is not supported. Use the `i18n/routing.ts` + `i18n/request.ts` pattern for static routing (no middleware file).
- `not-found.tsx` for locale segment: Create a basic branded `app/[locale]/not-found.tsx` in this phase while the structure is being set up. Detailed styling is launch prep (Phase 4).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — project goals, constraints, brand identity (SDT, sdttech.co@gmail.com, sdt.technology)
- `.planning/REQUIREMENTS.md` — FOUND-01–04, I18N-01–04 requirements with acceptance criteria
- `.planning/ROADMAP.md` — Phase 1 success criteria (especially: build completes, `/en`/`/id`/`/zh` resolve, language switcher works)

### Research
- `.planning/research/SUMMARY.md` — key findings summary including pitfall #3 (generateStaticParams) and pitfall #5 (Cloudflare DNS)
- `.planning/research/PITFALLS.md` — full pitfall list; pitfall #1 (build artifacts), #2 (placeholder brand), #11 (Geist Mono), #12 (arbitrary values) are Phase 1 targets

### Existing Codebase
- `config/site.ts` — update this first; all components import from here
- `tailwind.config.ts` — token additions go here
- `components/Navbar.tsx` — language switcher integrates here (add pill links)
- `components/Footer.tsx` — tagline fix goes here
- `app/layout.tsx` — root layout; `bg-background` token fix goes here; `NextIntlClientProvider` goes in locale layout NOT here
- `DESIGN.md` — design system spec; token naming must be consistent

### No external specs — requirements fully captured in decisions above

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/Navbar.tsx` — existing sticky navbar with logo, links, CTA; language switcher appended after the mailto button
- `components/Footer.tsx` — one-line fix: replace hardcoded string with `siteConfig.tagline`
- `config/site.ts` — single source of truth for brand values; update name + email here and all components pick it up automatically
- `components/LogoMark.tsx` — no changes needed in Phase 1

### Established Patterns
- Named exports for components (not default) — `export function Navbar()` pattern
- `@/` path alias for all internal imports — use consistently in new `app/[locale]/` files
- `siteConfig` imported from `@/config/site` — any new locale-aware components should also reference this, not hardcode brand strings
- Tailwind utility classes only — no CSS modules, no inline styles

### Integration Points
- All existing pages in `app/` become `app/[locale]/` after migration. The root `app/layout.tsx` stays; a new `app/[locale]/layout.tsx` is created below it.
- `app/page.tsx` (current placeholder) moves to `app/[locale]/page.tsx`
- Root `app/page.tsx` becomes a redirect to `/en`

</code_context>

<specifics>
## Specific Ideas

- Machine-translated ID and ZH content as scaffolding: use the English translation file as the source and auto-translate to Indonesian and Chinese. Owner reviews before launch.
- The `siteConfig` in `config/site.ts` does not need a `domain` field as a runtime value — it's already encoded in `metadataBase` (Phase 4). A code comment noting the domain is sufficient.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 1 scope.

</deferred>

---

*Phase: 1-Foundation & i18n*
*Context gathered: 2026-06-10*
