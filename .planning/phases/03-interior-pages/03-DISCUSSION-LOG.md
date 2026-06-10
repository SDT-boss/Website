# Phase 3: Interior Pages — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-11
**Phase:** 3-interior-pages
**Areas discussed:** Solution detail content, About page copy, Solution data architecture, Work page EV Fleet detail

---

## Solution Detail Content

| Option | Description | Selected |
|--------|-------------|----------|
| Claude drafts from context | Claude writes problem statements, capabilities, audience from PROJECT.md + card descriptions. Owner reviews in translation files before launch. | ✓ |
| I'll provide the content now | Owner pastes specific wording for each solution now. | |
| Hybrid: I'll guide, Claude drafts | Owner gives 1–2 directional notes per solution; Claude drafts from there. | |

**User's choice:** Claude drafts from context (Recommended)
**Notes:** Status distribution confirmed — Fleet & EV Mobility = Live, other 3 = In Development. Capability tone: outcome-first, no jargon (per DESIGN.md + SOL-04).

---

## About Page Copy

| Option | Description | Selected |
|--------|-------------|----------|
| Claude drafts it | Claude writes belief H1 + 3 BeliefGrid items from company context. Owner edits in translation files. | ✓ |
| I have specific phrasing | Owner provides the actual belief statements now. | |

**User's choice:** Claude drafts it (Recommended)

Current focus paragraph:

| Option | Description | Selected |
|--------|-------------|----------|
| Active fleet/EV work + building out the platform | Honest, operator-credible. "We are deep in production work on EV fleet operations. Growing the platform carefully — one solved problem at a time." | ✓ |
| Broader company vision statement | Aspirational; where SDT tech is headed. | |
| Team + process focus | Describes how the team works, not what they're building. | |

**User's choice:** Active fleet/EV work + building out the platform (Recommended)

---

## Solution Data Architecture

| Option | Description | Selected |
|--------|-------------|----------|
| lib/solutions.ts TypeScript data file | Typed file: slug, status, icon, order. generateStaticParams reads it. Translations hold text. Follows NAV_LINKS const-array pattern. | ✓ |
| All in translation files only | Slugs hardcoded in page file; all content in en/id/zh.json. Simpler but mixes metadata with translatable text. | |
| Inline in page components | Data arrays directly in page.tsx. Quickest but least maintainable. | |

**User's choice:** lib/solutions.ts TypeScript data file (Recommended)

Component organization:

| Option | Description | Selected |
|--------|-------------|----------|
| Per-section subdirectories | components/solutions/, components/work/, components/about/. PageHero in components/ root. Follows Phase 2 pattern. | ✓ |
| One shared folder: components/interior/ | All Phase 3 components together. | |
| Flat in components/ | Alongside Navbar.tsx and Footer.tsx. | |

**User's choice:** Per-section subdirectories (Recommended)

---

## Work Page EV Fleet Detail

| Option | Description | Selected |
|--------|-------------|----------|
| ['Fleet', 'EV', 'Operations'] | Three concise tags matching card title and grid-violet badge pattern. | ✓ |
| ['Fleet Management', 'Electric Vehicles', 'Real-time Ops'] | More descriptive tags, longer. | |
| I'll specify the tags | Owner provides custom tags. | |

**User's choice:** ['Fleet', 'EV', 'Operations'] (Recommended)

WorkCard description length:

| Option | Description | Selected |
|--------|-------------|----------|
| 2–3 sentences expanded | Expand teaser copy with 1–2 more sentences about scope/outcome. | ✓ |
| Same as WorkTeaser | Re-use exact teaser copy as-is. | |
| Much longer / detailed case study | Full challenge + approach + outcome paragraph. | |

**User's choice:** 2–3 sentences expanded (Recommended)

---

## Claude's Discretion

- `generateStaticParams` export shape from `lib/solutions.ts`
- Exact copy for solution problem statements, capabilities, "who this is for" — drafted from context
- Exact About page belief H1 and BeliefGrid content — drafted from context
- Exact WorkCard expanded description sentences — drafted from context
- Whether to modify `SolutionCard` with optional `href` prop or always wrap externally with `<Link>`
- Machine-translated ID and ZH content (following Phase 1 D-09 pattern)

## Deferred Ideas

None — discussion stayed within Phase 3 scope.
