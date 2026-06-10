# Phase 3: Interior Pages — Context

**Gathered:** 2026-06-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Build every interior page — solutions index (`/[locale]/solutions`), 4 solution detail pages (`/[locale]/solutions/[slug]`), work page (`/[locale]/work`), and about page (`/[locale]/about`) — so a buyer can explore the full company narrative.

**This phase does NOT:** change the home page, navbar, footer, i18n routing infrastructure, or any Phase 4 launch-prep concerns (OG metadata, sitemap, robots.txt, Vercel deploy).

</domain>

<decisions>
## Implementation Decisions

### Solution Detail Content

- **D-01:** Claude drafts all solution detail page content (problem statements, capability bullets, "Who this is for" paragraphs) from company context — PROJECT.md, existing card descriptions in `messages/en.json`, and the B2B ops domain. Owner reviews and corrects in translation files before launch.
- **D-02:** Status badges: **Fleet & EV Mobility = "Live"** (ev-teal); **IoT & Hardware, Logistics Intelligence, AI Operations = "In Development"** (amber). Matches STATE.md and PROJECT.md which say fleet/EV is the live in-progress solution.
- **D-03:** Capability bullet tone: **outcome-first, no jargon** — per DESIGN.md voice rules and SOL-04. Example: "Reduces idle time by routing against live traffic" not "Advanced routing algorithm." Business operators, not engineers, are the audience.

### About Page Copy

- **D-04:** Claude drafts the About page belief H1 (observation-as-statement format per DESIGN.md), 3 BeliefGrid titles + body paragraphs, and current focus paragraph — all from company context. Owner reviews/edits in translation files. No specific phrasing provided; Claude has creative latitude.
- **D-05:** Current focus paragraph tone: **active fleet/EV production work + growing the platform carefully** — honest, operator-credible. Example: "We are deep in production work on EV fleet operations. We are growing the platform carefully — one solved problem at a time." Not aspirational vision-speak.

### Solution Data Architecture

- **D-06:** Solution metadata (slug, status, icon emoji, display order) lives in **`lib/solutions.ts`** — a typed TypeScript data file. `generateStaticParams` in the `[slug]` page reads from it. Translation files (`messages/*.json`) hold all text content (titles, problem statements, capabilities, "who this is for"). This is the cleanest separation: adding a new solution is one place to touch.
- **D-07:** Component organization follows Phase 2's `components/home/` pattern — **per-section subdirectories**: `components/solutions/`, `components/work/`, `components/about/`. `PageHero` is a shared component used by all 3 interior page types — it lives in `components/` root (not under a section subfolder).

### Work Page EV Fleet Detail

- **D-08:** WorkCard tags for EV Fleet Operations: `['Fleet', 'EV', 'Operations']` — matches the grid-violet badge pattern from SolutionCard.
- **D-09:** WorkCard expanded description: **2–3 sentences** — expand beyond the WorkTeaser copy with scope/outcome detail. The teaser copy (`evFleetDesc` in en.json) serves as the opening sentence; Claude adds 1–2 more sentences about scale or integration (e.g., GPS telemetry, charging APIs, depot count).

### UI Design Contract (locked via UI-SPEC)

The UI-SPEC (`03-UI-SPEC.md`) is **approved** and locks all visual decisions for this phase. Key rules downstream agents must not deviate from:
- Volt Green: one per page maximum. Solutions index only. Detail, Work, About pages use cyber-jade outline CTAs.
- Status badges: "Live" = `bg-ev-teal/10 text-ev-teal`; "In Development" = `bg-amber-500/10 text-amber-400`
- Ghost cards: `border-dashed border-border-subtle`, `text-text-muted`, `cursor-default`, no hover state
- Card hover: border transition `border-border-subtle → border-cyber-jade`, `duration-150 ease-out` only
- All section padding: `py-24 md:py-32`, max-w-content with `mx-auto px-6`
- H3-level elements use `text-base font-bold` (not a larger size — 4-row type scale is fixed)
- Solution detail content order: status badge → H1 → problem statement → WhoThisIsFor → CapabilityList (SOL-04)

### Claude's Discretion

- `generateStaticParams` implementation details (how to import from `lib/solutions.ts`, export shape)
- Exact copy for solution problem statements, capabilities, "who this is for" — drafted from context per D-01
- Exact About page belief H1 and BeliefGrid content — drafted from context per D-04
- Exact WorkCard expanded description sentences — drafted from context per D-09
- Whether to modify `SolutionCard` to accept an optional `href` prop or always wrap externally with `<Link>` from `@/i18n/navigation`
- Machine-translated ID and ZH content following Phase 1 pattern (D-09 from Phase 1 CONTEXT)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Requirements & Design Contract
- `.planning/ROADMAP.md` — Phase 3 success criteria (5 acceptance tests), solution slugs, UI hint
- `.planning/REQUIREMENTS.md` — SOL-01–04, WORK-01–02, ABOUT-01–02 with acceptance criteria
- `.planning/phases/03-interior-pages/03-UI-SPEC.md` — **APPROVED** UI design contract — all visual decisions locked here. Read before building any component.

### Project Context
- `.planning/PROJECT.md` — company identity (PT SDT Tech Indonesia, B2B ops, fleet/logistics domain), brand voice, design direction, constraints
- `DESIGN.md` — design system spec: color tokens, typography rules, component rules, voice guidelines

### Existing Code to Reuse
- `components/home/SolutionCard.tsx` — reused on solutions index; wraps in `<Link>` from `@/i18n/navigation`
- `components/home/FooterCTA.tsx` — reused on solutions index and about page bottom
- `components/home/WorkTeaser.tsx` — WorkCard pattern reference (status badge, description structure)
- `components/home/HeroSection.tsx` — PageHero pattern reference (eyebrow + H1 + sub structure)
- `messages/en.json` — existing translation keys; Phase 3 adds keys under `solutions.{slug}`, `work`, `about` namespaces
- `app/[locale]/page.tsx` — pattern for locale page with `getTranslations` and async server component

### Phase 1 Context (prior decisions)
- `.planning/phases/01-foundation-i18n/01-CONTEXT.md` — i18n architecture (D-01–09), translation file structure (flat namespaces per section), `@/i18n/navigation` Link usage

### Infrastructure
- `tailwind.config.ts` — all custom design tokens (`cyber-jade`, `volt-green`, `ev-teal`, `grid-violet`, `border-subtle`, `surface`, `surface-2`, `text-secondary`, `text-muted`, `jade-strong`)
- `i18n/navigation.ts` — locale-aware `<Link>` component; use this for all internal links (not `next/link`)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `components/home/SolutionCard.tsx` — props: `{ icon, title, desc, tag }`. Used on solutions index wrapped in `<Link href="/solutions/{slug}">` from `@/i18n/navigation`. No changes to the component needed — wrap externally.
- `components/home/FooterCTA.tsx` — drop-in section for solutions index bottom and about page bottom. Cyber-jade outline button already implemented.
- `components/home/WorkTeaser.tsx` — async server component pattern with `getTranslations`. WorkCard on the work page follows the same structure (status tag + title + description) but with a tags array added.
- `components/home/ApproachSection.tsx` — numbered-items pattern (01/02/03 accent in cyber-jade/20) — reference for `CapabilityList` implementation.

### Established Patterns

- **Async server components with translations:** `const t = await getTranslations("namespace")` — all Phase 3 page components are async server components. See `WorkTeaser.tsx` and `SolutionsStrip.tsx` for reference.
- **Locale-aware links:** Always use `import { Link } from "@/i18n/navigation"` — not `import Link from "next/link"`.
- **Named exports for components, default exports for pages** — `export function PageHero()` in components; `export default function SolutionsPage()` in `page.tsx`.
- **Static params:** `generateStaticParams` returns `{ locale, slug }` pairs from `lib/solutions.ts`; `dynamicParams = false` on the `[slug]` page (SOL-02).
- **const data arrays above component:** Static content lifted to typed const arrays following the `NAV_LINKS` pattern — `lib/solutions.ts` follows this convention.
- **`@/` path alias** for all imports, never relative paths.
- **Tailwind utility classes only** — no CSS modules, no inline styles.

### Integration Points

- `messages/en.json`, `messages/id.json`, `messages/zh.json` — new namespaces to add: `solutions` (index + per-slug sub-keys), `work` (expand existing), `about` (expand existing).
- `app/[locale]/` — new page files at: `solutions/page.tsx`, `solutions/[slug]/page.tsx`, `work/page.tsx`, `about/page.tsx`.
- `lib/solutions.ts` — new file; imported by `solutions/page.tsx`, `solutions/[slug]/page.tsx`, and `app/[locale]/page.tsx` (home solutions strip also uses slugs for navigation links). The slug values must match: `fleet-mobility`, `iot-hardware`, `logistics-intelligence`, `ai-operations`.

</code_context>

<specifics>
## Specific Ideas

- Solution slugs are already defined in the UI-SPEC and must match exactly: `fleet-mobility`, `iot-hardware`, `logistics-intelligence`, `ai-operations` — these become URL segments and translation key suffixes.
- The existing `SolutionsStrip` on the home page (`components/home/SolutionsStrip.tsx`) hardcodes card data. Phase 3 should ensure the solutions index page links to the correct slugs — but does NOT need to refactor `SolutionsStrip` (out of scope; home page is Phase 2 territory).
- WorkTeaser on the home page already has the EV Fleet teaser copy in `messages/en.json` under `work.evFleetTitle` and `work.evFleetDesc`. The work page expands this; the original teaser copy stays intact as the opener.
- Ghost cards on the work page are static (no translations needed) — `cursor-default`, centered "Coming soon" in `text-text-muted`, same dimensions as WorkCard.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 3 scope.

</deferred>

---

*Phase: 3-Interior Pages*
*Context gathered: 2026-06-11*
