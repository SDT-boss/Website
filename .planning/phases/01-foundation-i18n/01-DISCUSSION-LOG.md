# Phase 1: Foundation & i18n — Discussion Log

**Date:** 2026-06-10
**Areas discussed:** 4 (i18n routing shape, language switcher UX, translation file structure, config/token cleanup scope)

---

## Area 1: i18n Routing Shape

| Question | Options presented | Selected |
|----------|------------------|---------|
| Root route behavior | Redirect to /en/ (Recommended) / Serve English at root | Redirect to /en/ |
| Locale files location | messages/[lang].json (Recommended) / public/locales/ | messages/[lang].json |
| Locale layout structure | app/[locale]/layout.tsx with NextIntlClientProvider (Recommended) / Inline in root | app/[locale]/layout.tsx (Recommended) |

---

## Area 2: Language Switcher UX

| Question | Options presented | Selected |
|----------|------------------|---------|
| Switcher style | Inline text pills EN\|ID\|ZH (Recommended) / Dropdown / Flag icons | Inline text pills (Recommended) |
| Switcher position | Far right after "Get in touch" (Recommended) / Between nav links / Mobile only | Far right (Recommended) |

---

## Area 3: Translation File Structure

| Question | Options presented | Selected |
|----------|------------------|---------|
| Key organization | Flat namespaces per section (Recommended) / Separate file per page / Fully flat keys | Flat namespaces per section (Recommended) |
| Translation authorship | Owner fills in (placeholder OK) / Machine translation as starting point | Machine translation as starting point |

---

## Area 4: Config / Token Cleanup Scope

| Question | Options presented | Selected |
|----------|------------------|---------|
| Cleanup depth | Fix known issues only (Recommended) / Full token audit | Fix known issues only (Recommended) |
| Background token name | background: '#0a0a0a' → bg-background (Recommended) / base / Claude decides | background (Recommended) |

---

## Deferred Ideas

None.

---

## Claude's Discretion Items

- next-intl version: latest stable ^3.x
- Static routing pattern (no Middleware — not supported in static export): use `i18n/routing.ts` + `i18n/request.ts`
- Basic `app/[locale]/not-found.tsx` created in Phase 1 while structure is set up
