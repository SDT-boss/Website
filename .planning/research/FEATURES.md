# Feature Landscape: B2B Tech Company Marketing Site

**Domain:** B2B enterprise technology marketing site — intelligent operations software (fleet, IoT, logistics, AI)
**Company:** PT SDT Tech Indonesia
**Aesthetic reference:** Palantir + Coinbase (dark authority, clean confidence)
**Date:** 2026-06-10
**Confidence:** MEDIUM-HIGH — based on established patterns from Palantir, Coinbase, Anduril, Linear, Vercel, Datadog, Anthropic, and comparable dark-aesthetic enterprise sites

---

## Table Stakes

Features enterprise buyers expect on arrival. Missing any triggers an immediate trust failure.

| Feature | Why Expected | Complexity |
|---------|--------------|------------|
| Clear hero statement — what you build in one sentence | Enterprise buyers skim. First 5 words must orient them. | Low |
| Navigation with solutions link visible | Buyers need to self-route to their relevant solution. | Low |
| Solutions section or page — one entry per domain | Buyers evaluate fit by domain (fleet, IoT, logistics, AI). | Low-Med |
| Contact pathway — visible in nav and as page-level CTA | B2B conversion is not self-serve. Contact must be frictionless. | Low |
| Company identity signals — name, location, what you do | Enterprise buyers need to know they're dealing with a real entity. | Low |
| Mobile-responsive layout | Decision-makers check sites on phones during meetings, travel. | Low |
| Page load under 3 seconds | Slow = untrusted. Static export + Vercel CDN achieves this easily. | Low |
| Meta title + description per page | Buyers who Google you expect a coherent result. | Low |
| HTTPS | Table stakes for any site in 2024+. Cloudflare + Vercel handles automatically. | Low |
| 404 page that doesn't break | A broken 404 destroys the "serious tech company" signal. | Low |

---

## Differentiators

Features that separate credible companies from generic ones.

### Navigation and Information Architecture

| Feature | Value | Complexity |
|---------|-------|------------|
| Sticky navbar with active-state link | Shows users where they are; reinforces confidence. | Low |
| Solutions index page | Lets buyers navigate directly to their relevant domain. | Med |
| "Get in touch" visible in nav | Reduces path length to contact. | Low |
| Breadcrumb or back-link on detail pages | Enterprise buyers navigate deeply — getting lost causes abandonment. | Low |

### Hero and Homepage

| Feature | Value | Complexity |
|---------|-------|------------|
| One-sentence mission + 2–3 sentence elaboration | Forces editorial discipline; communicates clearly. | Low |
| Solution strip / capability grid | Lets buyers scan all four domains in 10 seconds. | Low-Med |
| One proof point on homepage | Even a single data point establishes the work is real. EV fleet project is the anchor. | Low |
| Approach/philosophy section | Differentiates character — Palantir-style "how we think" signals strategic partnership vs. vendor. | Low |

### Solutions Pages

| Feature | Value | Complexity |
|---------|-------|------------|
| Problem statement before solution description | Enterprise buyers respond to being understood. Lead with the pain. | Low |
| Specific capability list (outcomes, not features) | "Real-time vehicle health monitoring" > "REST API for telemetry ingestion." | Low |
| Who this is for — industry/role callout | Enterprise buyers self-identify when their role is named. | Low |
| Status badge ("Available" / "In development") | For solutions not in production, honesty is a trust signal. | Low |

### About Page

| Feature | Value | Complexity |
|---------|-------|------------|
| Mission or manifesto — why you exist | Generic about pages list headcount. A manifesto explains what you believe. | Low |
| Specific belief statements | 3–5 beliefs that are actually specific, not platitudes. | Low |
| Named founding context / Indonesia angle | Regional specificity (Southeast Asian logistics/fleet) is a legitimate differentiator. | Low |
| Contact CTA at bottom | Buyers who read the full About page are high-intent. | Low |

### SEO

| Feature | Value | Complexity |
|---------|-------|------------|
| Unique `<title>` per page (50–60 chars) | Organic search. Buyers Googling "fleet management Indonesia" need to find you. | Low |
| `<meta description>` per page (140–160 chars) | Appears in Google snippets; drives click-through. | Low |
| Open Graph tags | Buyers share links internally. OG preview determines first impression before the click. | Low |
| Semantic HTML — `<h1>` once per page | Search engines and screen readers rely on this. One H1 per page is non-negotiable. | Low |
| JSON-LD Organization schema | Enables rich results; signals legitimacy to Google. 20 lines in `layout.tsx`. | Low-Med |
| robots.txt + sitemap.xml | Without sitemap, new pages take weeks to index. | Low |

### Social Proof for Early-Stage Companies

| Feature | Value | Complexity |
|---------|-------|------------|
| Outcome-based proof (numbers without attribution) | "40 EVs monitored. 23% reduction in unplanned maintenance." Real numbers > invented ones. | Low |
| Technology logos as trust signals | AWS, MQTT, etc. communicate technical seriousness without a client list. | Low |
| "Currently in operation" language | Present-tense proof. Avoids implication that work has ended. | Low |

### Mobile

| Feature | Value | Complexity |
|---------|-------|------------|
| Hamburger menu | Standard. Enterprise decision-makers check sites on phones. | Low |
| Touch targets minimum 44×44px | Tailwind `h-11` + `px-4` passes the standard. | Low |
| 16px minimum body font | Text requiring pinch-zoom signals poor craft. | Low |
| Single-column stacking on mobile | `grid-cols-1 md:grid-cols-2` — standard Tailwind pattern. | Low |
| Hero CTA full-width on mobile | `w-full md:w-auto` — removes tap friction. | Low |

### Contact and Conversion

| Feature | Value | Complexity |
|---------|-------|------------|
| Mailto CTA | Simple, no backend, enterprise buyers comfortable with email initiation. | Low |
| Pre-filled subject: `?subject=Inquiry` | Improves click quality — tells you where they came from. | Low |
| Footer with email always visible | Buyers who scroll to the bottom are high-intent. | Low |
| One Volt Green CTA per page | Multiple CTAs = decision paralysis. Already a hard constraint. | Low |

---

## Anti-Features (Do NOT Build for v1)

| Anti-Feature | Why Avoid |
|--------------|-----------|
| Contact form with backend | Requires API route or third-party; breaks static export or adds dependency. Mailto is sufficient. |
| Blog / articles | Content marketing is high-effort. A sparse blog signals neglect. Defer to v2. |
| Live chat widget | Adds third-party JS, hurts CLS/INP, looks like consumer SaaS. Not appropriate for B2B procurement. |
| Cookie consent banner | Only needed for tracking cookies. Vercel Analytics is cookieless — no banner needed. |
| Hero video | High LCP cost. A well-written headline outperforms a corporate video for B2B credibility. |
| Pricing page | Bespoke B2B product. Public pricing anchors negotiations unfavorably. Route to contact instead. |
| Team headshots | Small team with few photos often looks less impressive than the product. Add in v2. |
| Press / media page | An empty press page signals low traction. Add when coverage exists. |
| Careers page | Empty or outdated careers page damages credibility. Add when real roles are open. |
| Social media links in header | Sends visitors away from your conversion path. Optional LinkedIn in footer only. |
| Newsletter signup | No email infrastructure, no content plan. Defer until content pipeline exists. |
| Animated counters / fake statistics | Enterprise buyers validate claims. Never animate fabricated metrics. |
| Dark-mode toggle | You are dark-only. A toggle implies a light mode that doesn't exist. |

---

## MVP Build Order

1. **Home page** — hero + solutions strip + approach + work teaser + footer CTA. Full trust funnel.
2. **Solutions index** — `/solutions` with 4 cards. Fast to build, high SEO value.
3. **Solution detail pages** — `/solutions/[slug]` ×4. Fleet page gets most copy effort (live product).
4. **Work page** — `/work` with EV fleet as the one real project + ghost cards.
5. **About page** — manifesto tone, belief statements, contact CTA.
6. **Launch prep** — favicon, OG, meta per page, JSON-LD, sitemap.xml, robots.txt, not-found.tsx, mobile nav.

**Defer to v2:** Blog, team page, calendar booking (Calendly), per-page OG images, press/media, careers.

---

## Solutions Page Content Structure

Order matters for enterprise buyers:

1. **Domain headline** — "Fleet Intelligence" not "Fleet Management Software." Name the discipline.
2. **Problem statement** — 1–2 sentences naming the specific operational pain. Written for the operator.
3. **What we build** — 1 paragraph at capability level. Not a feature list. Not a spec sheet.
4. **Key capabilities** — 4–6 bullets written as operator outcomes: "Know vehicle health before drivers do."
5. **Who this is for** — Role and context: "Built for fleet operations managers running mixed EV/ICE fleets."
6. **Status signal** — Honest: "Live and operating" or "In development — pilot partnerships open."
7. **CTA** — One button: "Get in touch." Mailto.

---

## About Page Credibility Signals

**Do:**
- Open with a belief or observation, not a founding story. "Fleet operators in Southeast Asia are running billion-dollar infrastructure on spreadsheets."
- Name the specific domain expertise.
- Acknowledge the stage honestly. "We're early. One fleet system in production, three in development."
- Close with a specific CTA.

**Do not:**
- "We're a passionate team of experts dedicated to innovation." (Meaningless.)
- "Founded in [year] with a mission to disrupt..." (Generic founding story.)
- Headcount, org chart, or team photos before the company has 10+ people.
- "Our values are integrity, innovation, and collaboration." (Every company says this.)

---
*Features research: 2026-06-10*
