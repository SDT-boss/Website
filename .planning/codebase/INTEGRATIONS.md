# External Integrations

**Analysis Date:** 2026-06-10

## APIs & External Services

**None detected.** This is a fully static marketing scaffold with no API calls, SDKs, or third-party service integrations at this time.

## Data Storage

**Databases:** None — no database client or ORM present.

**File Storage:** None — no file storage service integrated.

**Caching:** None — static site requires no runtime cache layer.

## Authentication & Identity

**Auth Provider:** None — no authentication system present. The site has no login, session, or identity layer.

## Monitoring & Observability

**Error Tracking:** None — no Sentry, Datadog, or equivalent SDK installed.

**Analytics:** None — no analytics scripts (Google Analytics, Plausible, Mixpanel, etc.) present.

**Logs:** None — no logging service configured; browser `console` only in development.

## Fonts

**Google Fonts (via Next.js font subsetting):**
- `Inter` loaded via `next/font/google` in `app/layout.tsx`
- Subset: `latin`; display: `swap`; exposed as CSS variable `--font-inter`
- Font files are downloaded at build time and self-hosted in the static export — no runtime request to `fonts.googleapis.com`
- `Geist Mono` referenced in `tailwind.config.ts` as `--font-geist-mono` but not yet installed; falls back to `ui-monospace`

## CI/CD & Deployment

**Hosting:** Not configured — no deployment config files (`vercel.json`, `netlify.toml`, `.github/workflows/`) detected.

**CI Pipeline:** None configured.

**Build output:** `/out` directory — deploy its contents to any static host.

## Webhooks & Callbacks

**Incoming:** None — no webhook endpoints (static export cannot receive webhooks).

**Outgoing:** None.

## Email

**Contact mechanism:** `mailto:` link only — rendered from `siteConfig.email` in `config/site.ts`. No email-sending SDK (SendGrid, Resend, Postmark, etc.) is installed. Clicking "Get in touch" in `components/Navbar.tsx` and `components/Footer.tsx` opens the user's local mail client.

## Environment Configuration

**Required env vars:** None — this project has no environment variables.

**Secrets:** None — no secrets required at build time or runtime.

**`.env` files:** Not present. `.gitignore` only excludes `node_modules`.

## Summary

This is a zero-integration static scaffold. All content is hardcoded or sourced from `config/site.ts`. Integrations will need to be added as the site grows (analytics, contact form backend, CMS, etc.).

---

*Integration audit: 2026-06-10*
