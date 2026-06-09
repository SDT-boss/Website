# DESIGN.md

Design source of truth for **[Company Name] tech**. All visual and interaction decisions trace back here.

---

## How to use this

**The Volt Green rule** — `#96D02C` is a signal, not a style. One Volt Green CTA per screen, maximum. The moment you place a second one, both lose meaning. Every component decision should start with: *is there already a Volt Green CTA visible?*

**The design direction** — This sits between two reference points:

- **Palantir**: dark surfaces, data density, institutional authority. The feeling that serious infrastructure lives here.
- **Coinbase**: clean confidence, generous whitespace, modern restraint. Nothing try-hard.

The overlap between those two is the target. Not startup-playful. Not enterprise-bloated. An operator's tool that happens to have a website.

When a decision feels decorative, cut it. When a decision feels heavy-handed, lighten it. The brand personality is *calm precision* — the interface should feel like it was built by people who've run production systems at 3am.

---

## Brand

| Property   | Value                                                                 |
|------------|-----------------------------------------------------------------------|
| Name       | [Company Name] tech                                                   |
| Personality | Serious operator software. Calm, precise, infrastructure-grade.      |
| References | Palantir (dark authority, data density), Coinbase (clean confidence) |

### Logo

Two overlapping teardrop/leaf shapes:
- **Top shape**: Volt Green (`#96D02C`)
- **Bottom shape**: Cyber Jade (`#008684`)

Wordmark: `"tech"` set in Cyber Jade, rounded sans-serif. The wordmark sits beside or below the mark — never obscures the overlap.

---

## Color System

### Primary Palette

| Token         | Hex       | Usage                                              |
|---------------|-----------|----------------------------------------------------|
| Cyber Jade    | `#008684` | Structure, nav, links, focus rings                 |
| Jade Strong   | `#007069` | Hover states, active nav                           |
| Volt Green    | `#96D02C` | **ONE primary CTA per view only. Never decorative.**|
| Volt Strong   | `#557A12` | CTA hover state                                    |
| Grid Violet   | `#7C3AED` | Secondary interactive, data-viz, tags              |
| Violet Strong | `#5B21B6` | Violet hover                                       |

### App / Status Colors

Kept consistent with the live fleet system.

| Token      | Hex       | Usage                        |
|------------|-----------|------------------------------|
| ev-green   | `#7CC242` | Positive status              |
| green-dark | `#5A9E2F` | Positive hover               |
| ev-teal    | `#1A7080` | Info / in-progress           |
| teal-dark  | `#0D4E5A` | Info hover                   |
| topbar     | `#1A1A1A` | Topbar / dark surface        |

### Neutral Scale

| Token          | Hex       | Usage                   |
|----------------|-----------|-------------------------|
| Background     | `#0a0a0a` | Page background         |
| Surface        | `#111111` | Card background         |
| Surface-2      | `#1a1a1a` | Elevated card, topbar   |
| Border         | `#2a2a2a` | Subtle dividers         |
| Text primary   | `#ffffff` |                         |
| Text secondary | `#a1a1aa` |                         |
| Text muted     | `#52525b` |                         |

### Status Pills

Soft fill, dark text. Match the fleet app exactly — do not invent new pill styles.

| State       | Background  | Text      |
|-------------|-------------|-----------|
| Moving      | `#d1fae5`   | `#065f46` |
| Charging    | `#dbeafe`   | `#1e40af` |
| Parked      | `#fef9c3`   | `#713f12` |
| Maintenance | `#ffe4e6`   | `#9f1239` |

---

## Typography

| Property       | Value                                            |
|----------------|--------------------------------------------------|
| Heading font   | Inter or Geist; fallback: `ui-sans-serif`        |
| Monospace font | Geist Mono; fallback: `ui-monospace`             |
| Body size      | 16px base, 1.6 line-height                       |
| Hero size      | 56–72px, weight 700                              |
| Heading tracking | `-0.02em` to `-0.04em` (tighten as size grows) |

Monospace is for code blocks, IDs, and data strings — not for stylistic effect.

---

## Spacing & Layout

| Property           | Value                         |
|--------------------|-------------------------------|
| Max content width  | 1200px                        |
| Section padding    | 96px vertical (48px on mobile)|
| Grid               | 12-column, 24px gutter        |
| Border radius      | 8px cards, 6px buttons, 4px badges |

---

## Component Rules

### Navigation

- Background: `#1a1a1a`
- Logo: Cyber Jade wordmark
- Links: white, Jade Strong underline on hover
- Active state: Cyber Jade underline

### Cards

- Background: `#111111`
- Border: `1px solid #2a2a2a`
- Radius: `8px`
- Hover: border-color shifts to Cyber Jade (`#008684`)
- No box shadows — use border + background contrast only

### Buttons

| Variant   | Background  | Text      | Hover bg    | Notes                          |
|-----------|-------------|-----------|-------------|--------------------------------|
| Primary   | `#96D02C`   | `#0a0a0a` | `#557A12`   | One per screen. The Volt rule. |
| Secondary | `#008684`   | `#ffffff` | `#007069`   | Nav actions, non-focal CTAs    |
| Ghost     | transparent | `#a1a1aa` | `#ffffff`   | Low-priority actions           |

Radius: `6px` on all buttons.

### Badges / Tags

Use the status pill pattern — soft fill + dark text. No border-only or solid-fill variants. If a new category needs a pill, pick the closest semantic color from the status set or Grid Violet.

### Animations

- Library: Tailwind transition utilities only
- Duration: `150ms`–`200ms`
- Easing: `ease-out`
- No spring, bounce, or elastic effects

---

## Voice

- Short. Direct. No adjective bloat.
- We build things. We don't "leverage synergies."
- Headlines: noun-first, present tense.

**Examples**

| Avoid                                          | Use instead                             |
|------------------------------------------------|-----------------------------------------|
| "Empowering teams with next-gen solutions"     | "Infrastructure for intelligent ops"   |
| "Seamlessly integrate your existing workflows" | "Connects to what you already run"      |
| "Robust, scalable, enterprise-ready platform"  | "Built for production from day one"     |

---

## Decision Log

_Record significant design decisions here as the project evolves._

| Date | Decision | Rationale |
|------|----------|-----------|
| —    | —        | —         |
