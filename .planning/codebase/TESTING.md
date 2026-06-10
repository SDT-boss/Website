# Testing

**Analysis Date:** 2026-06-10

## Current State

**No tests exist.** This is an early-stage scaffold. There are no test files, no test framework installed, and no CI pipeline configured.

## What's Missing

| Layer | Status |
|-------|--------|
| Unit tests (components) | None |
| Integration tests | None |
| E2E tests (browser) | None |
| Visual regression | None |
| CI pipeline | None |
| Coverage reporting | None |

## Framework (Not Yet Configured)

For a Next.js 14 static site, the standard testing stack would be:

- **Jest + React Testing Library** — component unit tests
- **Playwright** — E2E and visual regression (recommended for static sites)
- **GitHub Actions** — CI pipeline

## What to Test When Added

Given the static-site nature (no API routes, no dynamic data):

**High value:**
- Component rendering with different `siteConfig` values
- `LogoMark` renders at different sizes
- `Navbar` shows correct links and email href
- `Footer` shows correct year, email, tagline
- Static export generates expected HTML pages

**Low value / skip:**
- Tailwind class names (implementation detail)
- CSS visual output (use visual regression or manual review instead)

## Adding Tests

When tests are added, install and configure:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

Test files should live alongside components or in a `__tests__/` directory:
```
components/
  Navbar.tsx
  Navbar.test.tsx   ← colocated
```

Or:
```
__tests__/
  components/
    Navbar.test.tsx
```

---

*Testing analysis: 2026-06-10 — no tests exist at time of mapping*
