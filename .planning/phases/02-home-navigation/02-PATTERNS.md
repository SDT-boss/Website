# Phase 2: Home & Navigation — Pattern Map

**Mapped:** 2026-06-10
**Files analyzed:** 13 (6 new, 6 modified, 1 CSS addition)
**Analogs found:** 10 / 13 (3 new files with no codebase analog)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `components/Navbar.tsx` | component (client) | request-response | `components/Navbar.tsx` (self) | exact — convert + extend |
| `app/globals.css` | config/style | n/a | `app/globals.css` (self) | exact — append rule |
| `app/[locale]/page.tsx` | page | request-response | `app/page.tsx` (current scaffold) | exact — replace body |
| `messages/en.json` | config | n/a | Phase 1 schema (01-PATTERNS.md) | exact — expand keys |
| `messages/id.json` | config | n/a | Phase 1 schema (01-PATTERNS.md) | exact — expand keys |
| `messages/zh.json` | config | n/a | Phase 1 schema (01-PATTERNS.md) | exact — expand keys |
| `i18n/navigation.ts` | config/utility | n/a | none in codebase | no analog |
| `components/home/HeroSection.tsx` | component (server) | request-response | `components/Footer.tsx` | role-match |
| `components/home/SolutionsStrip.tsx` | component (server) | request-response | `components/Footer.tsx` | role-match |
| `components/home/SolutionCard.tsx` | component (server) | request-response | `components/Footer.tsx` | role-match |
| `components/home/ApproachSection.tsx` | component (server) | request-response | `components/Footer.tsx` | role-match |
| `components/home/WorkTeaser.tsx` | component (server) | request-response | `components/Footer.tsx` | role-match |
| `components/home/FooterCTA.tsx` | component (server) | request-response | `components/Navbar.tsx` mailto pattern | role-match |

---

## Pattern Assignments

### `components/Navbar.tsx` (component, client, request-response)

**Analog:** `components/Navbar.tsx` (self — current full file, lines 1–49)

**Baseline — full current file** (lines 1–49):
```tsx
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/config/site";

const NAV_LINKS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Work",      href: "/work"      },
  { label: "About",     href: "/about"     },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-topbar border-b border-border-subtle">
      <div className="mx-auto max-w-content px-6 h-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <LogoMark size={32} />
          <span className="text-[15px] font-semibold tracking-tight leading-none">
            <span className="text-white">{siteConfig.name} </span>
            <span className="text-cyber-jade font-medium">tech</span>
          </span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white hover:text-cyber-jade transition-colors duration-150 ease-out"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Get in touch — outline button, Cyber Jade. NOT Volt Green (CTA rule). */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="hidden md:inline-flex items-center px-4 py-1.5 rounded-md text-sm font-medium text-cyber-jade border border-cyber-jade hover:bg-cyber-jade/10 transition-colors duration-150 ease-out shrink-0"
        >
          Get in touch
        </a>

      </div>
    </header>
  );
}
```

**Phase 2 changes — completely rewrite this file with the following additions:**

**New imports block** (replaces lines 1–3):
```tsx
"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/config/site";
```

Note: The `Link` import moves to come from `@/i18n/navigation` (locale-aware). Drop `import Link from "next/link"`.

**Active-state detection pattern** (add inside function body, before return):
```tsx
const pathname = usePathname();   // returns "/solutions" not "/en/solutions"
const locale = useLocale();
const router = useRouter();
const [isOpen, setIsOpen] = useState(false);
const hamburgerRef = useRef<HTMLButtonElement>(null);
const firstLinkRef = useRef<HTMLAnchorElement>(null);

const isActive = (href: string) =>
  pathname === href || pathname.startsWith(href + "/");
```

**Escape key + focus management pattern** (add after state declarations):
```tsx
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
      hamburgerRef.current?.focus();
    }
  };
  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}, [isOpen]);

useEffect(() => {
  if (isOpen) firstLinkRef.current?.focus();
}, [isOpen]);
```

**Nav link active-state classes** (replaces the plain `className` on the `<Link>` inside `NAV_LINKS.map`):
```tsx
className={`text-sm font-medium transition-colors duration-150 ease-out ${
  isActive(link.href)
    ? "text-cyber-jade border-b border-cyber-jade pb-1"
    : "text-white hover:text-cyber-jade"
}`}
aria-current={isActive(link.href) ? "page" : undefined}
```

**Hamburger button pattern** (add inside header, visible only below `md:`, alongside existing desktop nav):
```tsx
{/* Hamburger — mobile only */}
<button
  ref={hamburgerRef}
  type="button"
  className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-md text-white hover:bg-surface-2 transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade"
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label={isOpen ? "Close menu" : "Open menu"}
  onClick={() => setIsOpen((prev) => !prev)}
>
  {isOpen ? (
    /* X icon — 20×20 */
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ) : (
    /* Hamburger icon — 20×20 */
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )}
</button>
```

**Language switcher upgrade** (replaces the Phase 1 static `<Link href="/en">` pills; uses `router.replace` for path-preserving locale switch):
```tsx
<div className="hidden md:flex items-center gap-1 text-xs font-medium shrink-0">
  {(["en", "id", "zh"] as const).map((loc, i, arr) => (
    <Fragment key={loc}>
      <button
        onClick={() => router.replace(pathname, { locale: loc })}
        className={`transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade rounded-sm ${
          loc === locale ? "text-white" : "text-text-secondary hover:text-white"
        }`}
      >
        {loc.toUpperCase()}
      </button>
      {i < arr.length - 1 && <span className="text-text-muted">|</span>}
    </Fragment>
  ))}
</div>
```

**Mobile menu panel** (add below the `</div>` that closes the `max-w-content` container, still inside `<header>`):
```tsx
{isOpen && (
  <nav
    id="mobile-menu"
    role="navigation"
    aria-label="Mobile navigation"
    className="md:hidden bg-topbar border-t border-border-subtle"
  >
    <div className="px-6 py-4 flex flex-col gap-4">
      {NAV_LINKS.map((link, i) => (
        <Link
          key={link.href}
          href={link.href}
          ref={i === 0 ? firstLinkRef : undefined}
          onClick={() => { setIsOpen(false); hamburgerRef.current?.focus(); }}
          className={`text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade rounded-sm ${
            isActive(link.href)
              ? "text-cyber-jade"
              : "text-white hover:text-cyber-jade"
          }`}
          aria-current={isActive(link.href) ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
      {/* Language switcher inside mobile menu */}
      <div className="flex items-center gap-1 text-xs font-medium pt-2 border-t border-border-subtle">
        {(["en", "id", "zh"] as const).map((loc, i, arr) => (
          <Fragment key={loc}>
            <button
              onClick={() => { router.replace(pathname, { locale: loc }); setIsOpen(false); }}
              className={`transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade rounded-sm ${
                loc === locale ? "text-white" : "text-text-secondary hover:text-white"
              }`}
            >
              {loc.toUpperCase()}
            </button>
            {i < arr.length - 1 && <span className="text-text-muted">|</span>}
          </Fragment>
        ))}
      </div>
    </div>
  </nav>
)}
```

---

### `app/globals.css` (config/style)

**Analog:** `app/globals.css` (self — full current file, lines 1–14)

**Current full file** (lines 1–14):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: #008684;
  color: #ffffff;
}
```

**What to append** (add after `::selection` block, at end of file):
```css
/* Hero section dot-grid background — static-export safe pure CSS */
/* Dot color #2a2a2a matches border-subtle token. Tailwind tokens unavailable in CSS files. */
.dot-grid {
  background-image: radial-gradient(circle, #2a2a2a 1px, transparent 1px);
  background-size: 24px 24px;
}
```

Usage in HeroSection: `className="dot-grid bg-background ..."` — the `bg-background` layer provides the base `#0a0a0a` color behind the dots.

---

### `app/[locale]/page.tsx` (page, request-response)

**Analog:** `app/page.tsx` (current scaffold — full file, lines 1–9)

**Current scaffold** (to be entirely replaced):
```tsx
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-text-muted text-sm font-mono tracking-widest">
        — scaffold ready —
      </p>
    </div>
  );
}
```

**Phase 2 replacement pattern** — async Server Component with `setRequestLocale` and composed sections:
```tsx
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { SolutionsStrip } from "@/components/home/SolutionsStrip";
import { ApproachSection } from "@/components/home/ApproachSection";
import { WorkTeaser } from "@/components/home/WorkTeaser";
import { FooterCTA } from "@/components/home/FooterCTA";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <SolutionsStrip />
      <ApproachSection />
      <WorkTeaser locale={locale} />
      <FooterCTA />
    </>
  );
}
```

Key rules:
- Must be `async` — `await params` is required (Next.js 14+ params-as-Promise)
- `setRequestLocale(locale)` must be called before any next-intl API (`getTranslations`)
- `WorkTeaser` receives `locale` prop for its `/work` href construction
- All other sections receive no props — they call `getTranslations` internally
- No `"use client"` directive on this file — it is a Server Component

---

### `messages/en.json` (config)

**Analog:** Phase 1 schema from 01-PATTERNS.md

**Current Phase 1 `home` namespace** (established by 01-PLAN-B, to be REPLACED):
```json
"home": {
  "heroTitle": "Infrastructure for intelligent operations.",
  "heroSub": "SDT builds software for fleet mobility, IoT hardware, logistics intelligence, and AI operations.",
  "ctaLabel": "See our solutions"
}
```

**Phase 2 expanded schema** — MERGE into existing file, replacing the `home` block and adding new top-level namespaces. Preserve existing `nav`, `solutions.pageTitle`, `work.pageTitle`, `about.pageTitle`, `footer`, `common` keys:
```json
{
  "nav": {
    "solutions": "Solutions",
    "work": "Work",
    "about": "About",
    "getInTouch": "Get in touch"
  },
  "home": {
    "eyebrow": "INTELLIGENT OPERATIONS",
    "heroLine1": "Infrastructure for",
    "heroLine2": "intelligent ops.",
    "heroSub": "We build the software that runs fleet, logistics, and industrial operations in the real world.",
    "ctaLabel": "Start a conversation",
    "solutionsEyebrow": "WHAT WE BUILD",
    "solutionsHeading": "Four capabilities. One platform.",
    "approachEyebrow": "HOW WE WORK",
    "approachHeading": "Built differently, on purpose.",
    "workEyebrow": "OUR WORK",
    "workHeading": "Shipped to production.",
    "seeOurWork": "See our work →",
    "footerCtaHeading": "Want to work with us?",
    "footerCtaSub": "We take a small number of clients. If your problem is hard and the stakes are real, let's talk.",
    "footerCtaButton": "Get in touch"
  },
  "solutions": {
    "pageTitle": "Solutions",
    "card1Title": "Fleet & EV Mobility",
    "card1Desc": "Real-time operations software for electric and mixed fleets",
    "card1Tag": "Fleet",
    "card2Title": "IoT & Hardware",
    "card2Desc": "Edge devices and sensor networks for industrial environments",
    "card2Tag": "IoT",
    "card3Title": "Logistics Intelligence",
    "card3Desc": "Route, schedule, and load optimization for ground operations",
    "card3Tag": "Logistics",
    "card4Title": "AI Operations",
    "card4Desc": "Anomaly detection, predictive models, and decision automation",
    "card4Tag": "AI"
  },
  "work": {
    "pageTitle": "Work",
    "evFleetTitle": "EV Fleet Operations",
    "evFleetDesc": "End-to-end operations platform for an electric vehicle fleet — real-time tracking, charging management, and dispatch."
  },
  "about": {
    "pageTitle": "About"
  },
  "approach": {
    "item1Title": "Hardware-aware",
    "item1Body": "We design software knowing it runs on real machines in real conditions — not cloud demos.",
    "item2Title": "Data-first",
    "item2Body": "Every feature starts with a data model. If we can't measure it, we won't build it.",
    "item3Title": "Built for scale",
    "item3Body": "Systems go from pilot to production without a rewrite. Architecture decisions are made early."
  },
  "footer": {
    "tagline": "Infrastructure for intelligent operations.",
    "allRightsReserved": "All rights reserved."
  },
  "common": {
    "status": {
      "live": "Live",
      "inDevelopment": "In development"
    }
  }
}
```

---

### `messages/id.json` and `messages/zh.json` (config)

**Analog:** `messages/en.json` — mirror structure exactly. Every key in `en.json` must exist.

The `_reviewNote` key from Phase 1 must be preserved as the first key in both id.json and zh.json.

**id.json additions** — new/changed keys to add alongside Phase 1 skeleton:
```json
{
  "_reviewNote": "Auto-translated scaffolding — owner review required before launch",
  "nav": {
    "solutions": "Solusi",
    "work": "Pekerjaan",
    "about": "Tentang",
    "getInTouch": "Hubungi kami"
  },
  "home": {
    "eyebrow": "OPERASI CERDAS",
    "heroLine1": "Infrastruktur untuk",
    "heroLine2": "operasi cerdas.",
    "heroSub": "Kami membangun perangkat lunak yang menjalankan operasi armada, logistik, dan industri di dunia nyata.",
    "ctaLabel": "Mulai percakapan",
    "solutionsEyebrow": "APA YANG KAMI BANGUN",
    "solutionsHeading": "Empat kemampuan. Satu platform.",
    "approachEyebrow": "CARA KAMI BEKERJA",
    "approachHeading": "Dibangun berbeda, dengan sengaja.",
    "workEyebrow": "PEKERJAAN KAMI",
    "workHeading": "Sudah diproduksi.",
    "seeOurWork": "Lihat pekerjaan kami →",
    "footerCtaHeading": "Ingin bekerja sama dengan kami?",
    "footerCtaSub": "Kami menerima sejumlah kecil klien. Jika masalah Anda sulit dan taruhannya nyata, mari bicara.",
    "footerCtaButton": "Hubungi kami"
  },
  "solutions": {
    "pageTitle": "Solusi",
    "card1Title": "Armada & Mobilitas EV",
    "card1Desc": "Perangkat lunak operasi real-time untuk armada listrik dan campuran",
    "card1Tag": "Armada",
    "card2Title": "IoT & Perangkat Keras",
    "card2Desc": "Perangkat tepi dan jaringan sensor untuk lingkungan industri",
    "card2Tag": "IoT",
    "card3Title": "Kecerdasan Logistik",
    "card3Desc": "Optimasi rute, jadwal, dan muatan untuk operasi darat",
    "card3Tag": "Logistik",
    "card4Title": "Operasi AI",
    "card4Desc": "Deteksi anomali, model prediktif, dan otomasi keputusan",
    "card4Tag": "AI"
  },
  "work": {
    "pageTitle": "Pekerjaan",
    "evFleetTitle": "Operasi Armada EV",
    "evFleetDesc": "Platform operasi end-to-end untuk armada kendaraan listrik — pelacakan real-time, manajemen pengisian daya, dan pengiriman."
  },
  "about": {
    "pageTitle": "Tentang"
  },
  "approach": {
    "item1Title": "Sadar perangkat keras",
    "item1Body": "Kami merancang perangkat lunak yang berjalan di mesin nyata dalam kondisi nyata — bukan demo cloud.",
    "item2Title": "Data adalah prioritas",
    "item2Body": "Setiap fitur dimulai dengan model data. Jika tidak dapat diukur, kami tidak akan membangunnya.",
    "item3Title": "Dibangun untuk skala",
    "item3Body": "Sistem berjalan dari pilot ke produksi tanpa penulisan ulang. Keputusan arsitektur dibuat lebih awal."
  },
  "footer": {
    "tagline": "Infrastruktur untuk operasi yang cerdas.",
    "allRightsReserved": "Hak cipta dilindungi undang-undang."
  },
  "common": {
    "status": {
      "live": "Aktif",
      "inDevelopment": "Dalam pengembangan"
    }
  }
}
```

**zh.json additions**:
```json
{
  "_reviewNote": "Auto-translated scaffolding — owner review required before launch",
  "nav": {
    "solutions": "解决方案",
    "work": "项目案例",
    "about": "关于我们",
    "getInTouch": "联系我们"
  },
  "home": {
    "eyebrow": "智能运营",
    "heroLine1": "面向智能运营的",
    "heroLine2": "基础设施。",
    "heroSub": "我们构建驱动现实世界中车队、物流和工业运营的软件。",
    "ctaLabel": "开始对话",
    "solutionsEyebrow": "我们构建什么",
    "solutionsHeading": "四项能力。一个平台。",
    "approachEyebrow": "我们如何工作",
    "approachHeading": "有意为之，与众不同。",
    "workEyebrow": "我们的项目",
    "workHeading": "已投入生产。",
    "seeOurWork": "查看我们的项目 →",
    "footerCtaHeading": "想与我们合作？",
    "footerCtaSub": "我们只接受少量客户。如果您的问题很难解决且风险很高，请与我们联系。",
    "footerCtaButton": "联系我们"
  },
  "solutions": {
    "pageTitle": "解决方案",
    "card1Title": "车队与电动出行",
    "card1Desc": "面向电动及混合车队的实时运营软件",
    "card1Tag": "车队",
    "card2Title": "物联网与硬件",
    "card2Desc": "面向工业环境的边缘设备与传感器网络",
    "card2Tag": "物联网",
    "card3Title": "物流智能",
    "card3Desc": "地面运营的路线、调度与装载优化",
    "card3Tag": "物流",
    "card4Title": "AI 运营",
    "card4Desc": "异常检测、预测模型与决策自动化",
    "card4Tag": "AI"
  },
  "work": {
    "pageTitle": "项目案例",
    "evFleetTitle": "电动车队运营",
    "evFleetDesc": "面向电动汽车车队的端到端运营平台——实时追踪、充电管理与调度。"
  },
  "about": {
    "pageTitle": "关于我们"
  },
  "approach": {
    "item1Title": "硬件感知",
    "item1Body": "我们在设计软件时，深知它运行在真实机器和真实条件下——而非云端演示。",
    "item2Title": "数据优先",
    "item2Body": "每个功能都从数据模型开始。如果无法衡量，我们就不会构建它。",
    "item3Title": "为规模而构建",
    "item3Body": "系统无需重写即可从试点扩展到生产。架构决策在早期就已做出。"
  },
  "footer": {
    "tagline": "智能运营基础设施。",
    "allRightsReserved": "版权所有。"
  },
  "common": {
    "status": {
      "live": "已上线",
      "inDevelopment": "开发中"
    }
  }
}
```

---

### `i18n/navigation.ts` (config/utility)

**Analog:** None in codebase. Pattern from next-intl v3 docs.

**Full file to create** (verbatim from RESEARCH.md Pattern section):
```typescript
// i18n/navigation.ts
// Exports locale-aware Link, useRouter, usePathname, redirect.
// ALWAYS import usePathname + useRouter from here (not from "next/navigation")
// — these versions strip the locale prefix, returning "/solutions" not "/en/solutions".
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

This file requires `i18n/routing.ts` to exist (Phase 1 deliverable). If Phase 1 is not complete, create `i18n/routing.ts` first:
```typescript
// i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id", "zh"],
  defaultLocale: "en",
});
```

---

### `components/home/HeroSection.tsx` (component, server, request-response)

**Analog:** `components/Footer.tsx` (role-match — named export, no "use client", siteConfig import)

**Import pattern** (from Footer.tsx lines 1–2, adapted for server component with translations):
```tsx
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
```

**Named export pattern** (from Footer.tsx line 4 — all components use named exports):
```tsx
export async function HeroSection() {
  const t = await getTranslations("home");
  // ...
}
```

**Tailwind token pattern for hero** (dot-grid class from globals.css + design tokens from tailwind.config.ts):
```tsx
<section className="dot-grid bg-background min-h-screen flex flex-col items-center justify-center py-24 md:py-32 px-6">
  {/* Eyebrow */}
  <p className="text-xs font-medium tracking-widest text-text-secondary uppercase mb-6">
    {t("eyebrow")}
  </p>

  {/* H1 — 2-line headline */}
  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none text-center mb-6 max-w-content">
    <span className="block">{t("heroLine1")}</span>
    <span className="block">{t("heroLine2")}</span>
  </h1>

  {/* Sub-line */}
  <p className="text-base font-medium leading-relaxed text-text-secondary text-center max-w-2xl mb-10">
    {t("heroSub")}
  </p>

  {/* Primary CTA — Volt Green, ONE per page */}
  <a
    href={`mailto:${siteConfig.email}`}
    className="bg-volt-green text-background font-medium px-6 py-3 rounded-md text-sm hover:bg-volt-strong transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt-green"
  >
    {t("ctaLabel")}
  </a>
</section>
```

Key constraints from DESIGN.md and RESEARCH.md:
- `bg-volt-green text-background` — requires `background: "#0a0a0a"` token (Phase 1 Plan A)
- `text-background` is white text on Volt Green button — must NOT be hardcoded `text-white`
- No second `volt-green` element anywhere on the page

---

### `components/home/SolutionsStrip.tsx` (component, server, request-response)

**Analog:** `components/Footer.tsx` (role-match — named export, semantic tokens)

**Import pattern**:
```tsx
import { getTranslations } from "next-intl/server";
import { SolutionCard } from "@/components/home/SolutionCard";
```

**Core pattern** — section wrapper with eyebrow + heading + responsive 4-card grid:
```tsx
export async function SolutionsStrip() {
  const t = await getTranslations("home");
  const st = await getTranslations("solutions");

  const cards = [
    { icon: "⚡", titleKey: "card1Title", descKey: "card1Desc", tagKey: "card1Tag" },
    { icon: "◈",  titleKey: "card2Title", descKey: "card2Desc", tagKey: "card2Tag" },
    { icon: "⊞",  titleKey: "card3Title", descKey: "card3Desc", tagKey: "card3Tag" },
    { icon: "∿",  titleKey: "card4Title", descKey: "card4Desc", tagKey: "card4Tag" },
  ] as const;

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-content">
        {/* Eyebrow + heading */}
        <p className="text-xs font-medium tracking-widest text-text-secondary uppercase mb-4">
          {t("solutionsEyebrow")}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-12">
          {t("solutionsHeading")}
        </h2>
        {/* 4-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cards.map((card) => (
            <SolutionCard
              key={card.titleKey}
              icon={card.icon}
              title={st(card.titleKey)}
              desc={st(card.descKey)}
              tag={st(card.tagKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### `components/home/SolutionCard.tsx` (component, server, request-response)

**Analog:** `components/LogoMark.tsx` (role-match — typed props interface + named export pattern)

**Props interface pattern** (from LogoMark.tsx lines 1–3):
```tsx
interface SolutionCardProps {
  icon: string;
  title: string;
  desc: string;
  tag: string;
}
```

**Core card pattern** — `bg-surface border border-border-subtle` base, `hover:border-cyber-jade` shift, `bg-grid-violet/10 text-grid-violet` tag:
```tsx
export function SolutionCard({ icon, title, desc, tag }: SolutionCardProps) {
  return (
    <div className="bg-surface border border-border-subtle rounded-lg p-6 flex flex-col gap-4 hover:border-cyber-jade transition-colors duration-150 ease-out">
      {/* Icon */}
      <span className="text-2xl" aria-hidden="true">{icon}</span>

      {/* Title */}
      <h3 className="text-lg font-bold tracking-tight leading-snug">{title}</h3>

      {/* Description */}
      <p className="text-base font-medium leading-relaxed text-text-secondary flex-1">{desc}</p>

      {/* Tag — grid-violet soft pill */}
      <span className="self-start text-xs font-medium bg-grid-violet/10 text-grid-violet px-2 py-1 rounded">
        {tag}
      </span>
    </div>
  );
}
```

---

### `components/home/ApproachSection.tsx` (component, server, request-response)

**Analog:** `components/Footer.tsx` (role-match — named export, semantic tokens)

**Core pattern** — eyebrow + heading + 3-column grid with large numbered accents:
```tsx
import { getTranslations } from "next-intl/server";

export async function ApproachSection() {
  const t = await getTranslations("home");
  const at = await getTranslations("approach");

  const items = [
    { num: "01", titleKey: "item1Title", bodyKey: "item1Body" },
    { num: "02", titleKey: "item2Title", bodyKey: "item2Body" },
    { num: "03", titleKey: "item3Title", bodyKey: "item3Body" },
  ] as const;

  return (
    <section className="py-24 md:py-32 px-6 bg-surface">
      <div className="mx-auto max-w-content">
        <p className="text-xs font-medium tracking-widest text-text-secondary uppercase mb-4">
          {t("approachEyebrow")}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-12">
          {t("approachHeading")}
        </h2>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <div key={item.num} className="flex flex-col gap-3">
              {/* Large number accent — cyber-jade/20 opacity */}
              <span className="text-4xl font-bold text-cyber-jade/20 leading-none">
                {item.num}
              </span>
              <h3 className="text-lg font-bold tracking-tight leading-snug">
                {at(item.titleKey)}
              </h3>
              <p className="text-base font-medium leading-relaxed text-text-secondary">
                {at(item.bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### `components/home/WorkTeaser.tsx` (component, server, request-response)

**Analog:** `components/Footer.tsx` (role-match); `components/Navbar.tsx` for Link usage pattern

**Import pattern** — receives `locale` prop from page for locale-aware href:
```tsx
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
```

**Core pattern** — section with single card + "See our work" link. Link uses next-intl's `Link` (auto-prefixes locale):
```tsx
interface WorkTeaserProps {
  locale: string;
}

export async function WorkTeaser({ locale }: WorkTeaserProps) {
  const t = await getTranslations("home");
  const wt = await getTranslations("work");

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-content">
        <p className="text-xs font-medium tracking-widest text-text-secondary uppercase mb-4">
          {t("workEyebrow")}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-12">
          {t("workHeading")}
        </h2>

        {/* Single work card — max-w-2xl centered */}
        <div className="max-w-2xl mx-auto bg-surface border border-border-subtle rounded-lg p-6 flex flex-col gap-4 mb-8">
          {/* Status tag */}
          <span className="self-start text-xs font-medium bg-ev-teal/10 text-ev-teal px-2 py-1 rounded">
            Live
          </span>
          <h3 className="text-lg font-bold tracking-tight leading-snug">
            {wt("evFleetTitle")}
          </h3>
          <p className="text-base font-medium leading-relaxed text-text-secondary">
            {wt("evFleetDesc")}
          </p>
        </div>

        {/* "See our work →" link — cyber-jade, locale-prefixed via next-intl Link */}
        <div className="max-w-2xl mx-auto">
          <Link
            href="/work"
            className="text-cyber-jade text-sm font-medium hover:text-jade-strong transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade rounded-sm"
          >
            {t("seeOurWork")}
          </Link>
        </div>
      </div>
    </section>
  );
}
```

Note: `Link` from `@/i18n/navigation` auto-adds the locale prefix — `href="/work"` renders as `/en/work`, `/id/work`, etc. The `locale` prop is passed in but used only if manual href construction is needed as a fallback.

---

### `components/home/FooterCTA.tsx` (component, server, request-response)

**Analog:** `components/Navbar.tsx` (for mailto `<a>` + cyber-jade button pattern, lines 39–44)

**mailto pattern from Navbar.tsx** (lines 39–44 — exact source to copy button style from):
```tsx
<a
  href={`mailto:${siteConfig.email}`}
  className="hidden md:inline-flex items-center px-4 py-1.5 rounded-md text-sm font-medium text-cyber-jade border border-cyber-jade hover:bg-cyber-jade/10 transition-colors duration-150 ease-out shrink-0"
>
  Get in touch
</a>
```

**Full component pattern** — centered CTA block, cyber-jade outline button (NOT Volt Green):
```tsx
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function FooterCTA() {
  const t = await getTranslations("home");

  return (
    <section className="py-24 md:py-32 px-6 bg-surface-2 border-t border-border-subtle">
      <div className="mx-auto max-w-content text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
          {t("footerCtaHeading")}
        </h2>
        <p className="text-base font-medium leading-relaxed text-text-secondary max-w-xl">
          {t("footerCtaSub")}
        </p>
        {/* Cyber-jade outline button — NOT Volt Green (Volt Green is consumed by HeroSection) */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="border border-cyber-jade text-cyber-jade rounded-md px-6 py-3 text-sm font-medium hover:bg-cyber-jade/10 transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade"
        >
          {t("footerCtaButton")}
        </a>
      </div>
    </section>
  );
}
```

---

## Shared Patterns

### Named Export Convention
**Source:** `components/LogoMark.tsx` line 6, `components/Navbar.tsx` line 11, `components/Footer.tsx` line 4
**Apply to:** ALL new `components/home/*.tsx` files — named exports, never default exports for components
```typescript
export function ComponentName() {     // sync Server Component
export async function ComponentName() // async Server Component (uses getTranslations)
```
Exception: `app/*/page.tsx` and `app/*/layout.tsx` use `export default function`.

### `@/` Path Alias
**Source:** `components/Navbar.tsx` lines 2–3, `components/Footer.tsx` lines 1–2, `app/layout.tsx` lines 4–6
**Apply to:** All new files — never relative `../` paths for cross-directory imports
```typescript
import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/config/site";
import { HeroSection } from "@/components/home/HeroSection";
import { Link } from "@/i18n/navigation";
```

### siteConfig Import
**Source:** `config/site.ts` lines 1–6, consumed by `components/Navbar.tsx` line 3, `components/Footer.tsx` line 2
**Apply to:** `HeroSection.tsx`, `FooterCTA.tsx` — any file rendering `mailto:` or brand name
```typescript
import { siteConfig } from "@/config/site";
// siteConfig.email → used in href={`mailto:${siteConfig.email}`}
// siteConfig.name  → used in brand wordmark
```

### Tailwind Semantic Token Convention
**Source:** `tailwind.config.ts` lines 11–26; `components/Footer.tsx` lines 8–46; `components/Navbar.tsx` lines 13–48
**Apply to:** All new files — never `bg-[#hex]` arbitrary values; use registered tokens
```
bg-background        → #0a0a0a  (Phase 1 Plan A adds this token)
bg-topbar            → #1A1A1A
bg-surface           → #111111
bg-surface-2         → #1A1A1A
bg-volt-green        → #96D02C  (hero CTA ONLY — one per page)
bg-grid-violet/10    → grid-violet at 10% opacity (card tags)
border-border-subtle → #2a2a2a
text-cyber-jade      → #008684
text-text-secondary  → #a1a1aa
text-text-muted      → #52525b
text-background      → #0a0a0a (hero CTA text — requires background token)
```

### Transition Convention
**Source:** `components/Navbar.tsx` lines 31, 41; `components/Footer.tsx` line 26
**Apply to:** ALL interactive elements in all new files
```tsx
className="... transition-colors duration-150 ease-out"
```
No other transition duration or easing is permitted.

### Focus Ring Convention
**Source:** UI-SPEC.md Interactive States section
**Apply to:** All interactive elements (links, buttons, mailto anchors)
```tsx
className="... focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade"
```
Always `focus-visible:` not `focus:` — avoids showing ring on mouse click.

### Container Width Convention
**Source:** `components/Navbar.tsx` line 14, `components/Footer.tsx` line 11
**Apply to:** All page section components
```tsx
<div className="mx-auto max-w-content px-6">
  {/* content */}
</div>
```
`max-w-content` is registered in `tailwind.config.ts` line 36 as `1200px`.

### `getTranslations` Server Component Pattern
**Source:** RESEARCH.md Pattern 4 (no codebase analog yet — first phase to use next-intl)
**Apply to:** All `components/home/*.tsx` files (Server Components that need translations)
```tsx
import { getTranslations } from "next-intl/server";

export async function SectionName() {
  const t = await getTranslations("namespaceName");
  return <div>{t("keyName")}</div>;
}
```
Note: `getTranslations` is for Server Components. Never use `useTranslations` (Client hook) in a file without `"use client"`.

### Section Vertical Padding Convention
**Source:** UI-SPEC.md Spacing Scale section
**Apply to:** All `components/home/*.tsx` section wrappers
```tsx
className="py-24 md:py-32 px-6"
// py-24 = 96px mobile, md:py-32 = 128px desktop
// px-6  = 24px horizontal padding at all breakpoints
```

### Eyebrow Label Pattern
**Source:** UI-SPEC.md Typography table (eyebrow/label role); RESEARCH.md translation key expansion
**Apply to:** All sections with an eyebrow label (HeroSection, SolutionsStrip, ApproachSection, WorkTeaser)
```tsx
<p className="text-xs font-medium tracking-widest text-text-secondary uppercase mb-4">
  {t("sectionEyebrow")}
</p>
```

---

## No Analog Found

Files with no close match in the codebase (patterns come from RESEARCH.md / next-intl docs):

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `i18n/navigation.ts` | config/utility | n/a | No next-intl navigation module exists yet; first use of `createNavigation` |

---

## Phase 1 Prerequisite Checklist

Before any Phase 2 file is written, verify these Phase 1 outputs exist and are correct:

| Prerequisite | File | Verify with |
|---|---|---|
| next-intl installed | `package.json` | `grep "next-intl" package.json` |
| background token | `tailwind.config.ts` | `grep 'background.*0a0a0a' tailwind.config.ts` |
| Locale routing | `i18n/routing.ts` | file exists |
| Request config | `i18n/request.ts` | file exists |
| Locale layout | `app/[locale]/layout.tsx` | file exists |
| Locale page | `app/[locale]/page.tsx` | file exists (scaffold) |
| English messages | `messages/en.json` | file exists |
| Indonesian messages | `messages/id.json` | file exists |
| Chinese messages | `messages/zh.json` | file exists |
| Build passes | all of above | `npm run build` exits 0 |

If any prerequisite is missing, execute Phase 1 Plans A+B+C first.

---

## Metadata

**Analog search scope:** `components/`, `app/`, `config/`, `tailwind.config.ts`, `.planning/phases/01-foundation-i18n/`
**Files scanned:** 8 TypeScript/TSX source files + 1 CSS file + 1 tailwind config + Phase 1 PATTERNS.md
**Pattern extraction date:** 2026-06-10
