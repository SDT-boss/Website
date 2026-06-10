# Code Conventions

**Analysis Date:** 2026-06-10

## Language & Typing

- **TypeScript strict mode** — `tsconfig.json` has `"strict": true`; all files are `.tsx` or `.ts`
- No `any` types observed; interfaces used for component props
- Props interfaces declared inline above the component they describe

## Component Style

**Named exports for components** (not default):
```tsx
// ✓ Correct
export function Navbar() { ... }
export function LogoMark({ size = 32, className }: LogoMarkProps) { ... }

// ✗ Not used
export default function Navbar() { ... }
```

**Default exports for Next.js pages** (required by framework):
```tsx
// app/page.tsx
export default function Home() { ... }
```

**Prop interfaces above component:**
```tsx
interface LogoMarkProps {
  size?: number;
  className?: string;
}
export function LogoMark({ size = 32, className }: LogoMarkProps) { ... }
```

## Imports

- Path alias `@/` for all internal imports (never relative `../../`)
- Next.js primitives (`Link`, `Image`, `Metadata`) imported from `"next/*"`
- Google fonts via `next/font/google`, exposed as CSS variable

```tsx
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/config/site";
```

## Styling

**Tailwind utility classes only** — no CSS modules, no inline `style` props, no Styled Components.

**Design token usage:**
```tsx
// ✓ Use semantic tokens
className="bg-topbar border-b border-border-subtle text-cyber-jade"

// ✗ Avoid hardcoded hex in className (existing exception in layout.tsx)
className="bg-[#0a0a0a]"  // body background — should move to a token
```

**Transition convention:** `duration-150 ease-out` — no bounce, no spring, no long durations.

**No box shadows** — use `border` + background contrast instead.

**Responsive breakpoint:** `md:` prefix for desktop-only content (mobile-first).

**Interactive states:** Hover colors use `/10` opacity modifier or semantic token swap:
```tsx
"hover:bg-cyber-jade/10"
"hover:text-cyber-jade"
"hover:text-jade-strong"
```

## Naming

| Element | Convention | Example |
|---------|-----------|---------|
| Component files | PascalCase | `LogoMark.tsx` |
| Component functions | PascalCase | `function Navbar()` |
| Config files | camelCase | `site.ts` |
| Next.js pages | lowercase | `page.tsx`, `layout.tsx` |
| CSS variables | `--kebab-case` | `--font-inter` |
| Tailwind tokens | `kebab-case` | `cyber-jade`, `border-subtle` |
| Constants | SCREAMING_SNAKE or const array | `NAV_LINKS` |

## Constants Pattern

Static data is lifted to typed const arrays above the component:
```tsx
const NAV_LINKS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Work",      href: "/work"      },
  { label: "About",     href: "/about"     },
] as const;
```

## Config Centralization

All brand data comes from `config/site.ts` — never hardcode company name, email, or tagline directly in component JSX:
```tsx
import { siteConfig } from "@/config/site";
// Then use: siteConfig.name, siteConfig.email, siteConfig.tagline
```

## Linting

- ESLint via `next lint`, config in `.eslintrc.json`
- Extends `next/core-web-vitals` only — no additional rules added yet
- No Prettier config — code formatting is manual or editor-default

---

*Conventions analysis: 2026-06-10*
