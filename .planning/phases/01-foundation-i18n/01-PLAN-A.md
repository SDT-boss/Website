---
phase: 01-foundation-i18n
plan: A
type: execute
wave: 1
depends_on: []
files_modified:
  - .gitignore
  - config/site.ts
  - components/Footer.tsx
  - tailwind.config.ts
  - app/layout.tsx
autonomous: true
requirements:
  - FOUND-01
  - FOUND-02
  - FOUND-03
  - FOUND-04

must_haves:
  truths:
    - "git status shows .next/ and out/ as untracked (not committed)"
    - "Browser tab and navbar show 'SDT' not 'YourCo'"
    - "Footer tagline is pulled from siteConfig, not hardcoded"
    - "bg-background resolves to #0a0a0a via Tailwind token (no arbitrary values)"
    - "font-mono no longer references undefined --font-geist-mono variable"
  artifacts:
    - path: ".gitignore"
      provides: "Build artifact exclusion"
      contains: ".next"
    - path: "config/site.ts"
      provides: "Brand config source of truth"
      contains: "SDT"
    - path: "components/Footer.tsx"
      provides: "Footer with dynamic tagline"
      contains: "siteConfig.tagline"
    - path: "tailwind.config.ts"
      provides: "Design token system"
      contains: "background"
    - path: "app/layout.tsx"
      provides: "Root layout with semantic token"
      contains: "bg-background"
  key_links:
    - from: "components/Footer.tsx"
      to: "config/site.ts"
      via: "siteConfig.tagline import"
      pattern: "siteConfig\\.tagline"
    - from: "app/layout.tsx"
      to: "tailwind.config.ts"
      via: "bg-background token"
      pattern: "bg-background"
---

<objective>
Fix all known codebase defects in the foundation layer before any i18n or page work begins. This plan addresses four concrete issues that would cause production indexing failures or design system drift if left unfixed: build artifacts committed to git, placeholder brand config ("YourCo"), hardcoded Footer tagline, and a broken Tailwind token setup.

Purpose: A clean, correct codebase foundation. No placeholder content. No tracked build artifacts. No undefined CSS variables.
Output: Five modified files. Zero new files. Runnable codebase with real brand values.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/phases/01-foundation-i18n/01-CONTEXT.md
@.planning/phases/01-foundation-i18n/01-PATTERNS.md
@DESIGN.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Remove build artifacts from git tracking and update .gitignore</name>
  <files>.gitignore</files>

  <read_first>
    - `.gitignore` — current content is a single line: `node_modules`. Must see this before editing.
  </read_first>

  <action>
    Append two lines to `.gitignore` so the file ends with:
    ```
    node_modules
    .next
    out
    ```
    Then run the following shell commands in sequence (per D-10, FOUND-01):
    1. `git rm -r --cached .next out 2>/dev/null || true` — untrack the build dirs without error if they don't exist
    2. `git add .gitignore`
    3. `git commit -m "chore: remove build artifacts from git tracking"` — commit the .gitignore change plus the untracking in a single commit

    Do NOT delete the `.next/` or `out/` directories from disk — `git rm --cached` only removes them from the index, not the filesystem. The files stay locally but are no longer tracked.
  </action>

  <verify>
    <automated>grep -c '\.next' /Users/shannendorothee/Projects/Website/.gitignore</automated>
    The command must output `1` (one matching line). Also confirm: `git ls-files .next | wc -l` outputs `0` (no .next files tracked in git).
  </verify>

  <acceptance_criteria>
    - `.gitignore` contains the line `.next` (exact string, own line)
    - `.gitignore` contains the line `out` (exact string, own line)
    - `git ls-files .next` returns empty output (no .next files in git index)
    - `git ls-files out` returns empty output (no out files in git index)
    - The commit message contains "remove build artifacts"
  </acceptance_criteria>

  <done>Build artifact directories are no longer tracked by git. Running `npm run build` followed by `git status` will show `.next/` and `out/` as untracked, not modified.</done>
</task>

<task type="auto">
  <name>Task 2: Update brand config, fix Footer tagline, and repair Tailwind tokens</name>
  <files>config/site.ts, components/Footer.tsx, tailwind.config.ts, app/layout.tsx</files>

  <read_first>
    - `config/site.ts` — current content has `name: "YourCo"`, `email: "hello@yourco.com"`. Read before editing.
    - `components/Footer.tsx` — line 31 has hardcoded `"Built for intelligent operations."`. Read before editing.
    - `tailwind.config.ts` — colors block (lines 11–26) is missing `background` token; fontFamily block (lines 27–30) has `mono` referencing undefined `--font-geist-mono`. Read before editing.
    - `app/layout.tsx` — line 26 has `bg-[#0a0a0a]` arbitrary value. Read before editing.
  </read_first>

  <action>
    Apply exactly four targeted edits (per D-10, D-11, FOUND-02, FOUND-03, FOUND-04):

    **Edit 1 — `config/site.ts`:**
    Replace the entire file content with:
    - Comment changes from `// Replace "YourCo"...` to `// SDT tech — sdt.technology`
    - `name: "SDT"` (was `"YourCo"`)
    - `tagline: "Infrastructure for intelligent operations."` (UNCHANGED — already correct)
    - `email: "sdttech.co@gmail.com"` (was `"hello@yourco.com"`)
    - Keep `as const` — downstream components rely on literal-type inference
    - Domain is a code comment only, not a runtime field

    **Edit 2 — `components/Footer.tsx`:**
    Change line 31 only. Replace:
      `Built for intelligent operations.`
    with:
      `{siteConfig.tagline}`
    Everything else in the file stays identical. Do NOT add any new imports — `siteConfig` is already imported on line 2.

    **Edit 3 — `tailwind.config.ts`:**
    Two changes in one edit:
    a) In the `colors` object, add `background: "#0a0a0a"` as the last entry before the closing brace of `colors`. Preserve all existing tokens exactly.
    b) In `fontFamily`, remove the `mono` key entirely. The `fontFamily` block after the change contains only the `sans` key. Do not touch the `sans` value.

    **Edit 4 — `app/layout.tsx`:**
    Change line 26 only. Replace:
      `className="bg-[#0a0a0a] text-white antialiased min-h-screen flex flex-col"`
    with:
      `className="bg-background text-white antialiased min-h-screen flex flex-col"`
    Everything else in the file stays identical.

    After all four edits are applied, run `npm run lint` to confirm no ESLint errors were introduced.
  </action>

  <verify>
    <automated>
      grep -c '"SDT"' /Users/shannendorothee/Projects/Website/config/site.ts
      grep -c 'siteConfig\.tagline' /Users/shannendorothee/Projects/Website/components/Footer.tsx
      grep -c 'background.*0a0a0a' /Users/shannendorothee/Projects/Website/tailwind.config.ts
      grep -c 'bg-background' /Users/shannendorothee/Projects/Website/app/layout.tsx
    </automated>
    Each command must output `1`. Also run: `grep -c 'font-geist-mono' /Users/shannendorothee/Projects/Website/tailwind.config.ts` must output `0`.
  </verify>

  <acceptance_criteria>
    - `config/site.ts`: `name` field value is `"SDT"` (exact string literal)
    - `config/site.ts`: `email` field value is `"sdttech.co@gmail.com"` (exact string literal)
    - `config/site.ts`: `as const` assertion is present
    - `components/Footer.tsx`: the string `"Built for intelligent operations."` does NOT appear anywhere in the file
    - `components/Footer.tsx`: `{siteConfig.tagline}` appears in JSX (line ~31)
    - `tailwind.config.ts`: `background: "#0a0a0a"` appears in the `colors` object
    - `tailwind.config.ts`: `--font-geist-mono` does NOT appear anywhere in the file
    - `tailwind.config.ts`: `fontFamily.mono` key does NOT exist
    - `app/layout.tsx`: `bg-[#0a0a0a]` does NOT appear anywhere in the file
    - `app/layout.tsx`: `bg-background` appears in the body className
    - `npm run lint` exits with code 0 (no ESLint errors)
  </acceptance_criteria>

  <done>
    All four brand/token defects are corrected. The site can now be built or deployed without "YourCo" appearing in any output, the Footer tagline is driven by config, background uses a semantic token, and the undefined --font-geist-mono reference is eliminated.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| developer → git | Committed files become the deployed artifact; tracked build artifacts inflate repo and may expose intermediate build state |
| config/site.ts → rendered HTML | Brand values propagate to page title, OG tags, mailto links — incorrect values index in Google |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-01 | Information Disclosure | `.next/` in git | mitigate | `.gitignore` + `git rm --cached` per Task 1 |
| T-01-02 | Spoofing | `siteConfig.email` incorrect | mitigate | Update to real email per Task 2; wrong email sends buyers to unknown address |
| T-01-03 | Tampering | Arbitrary `bg-[#0a0a0a]` drifting from design token | mitigate | Replace with `bg-background` semantic token per Task 2 |
| T-01-SC | Tampering | npm/pip/cargo installs | accept | No new npm packages installed in this plan; no supply chain risk |
</threat_model>

<verification>
After both tasks complete:

1. `git ls-files .next` returns empty — build artifacts are untracked
2. `grep '"SDT"' config/site.ts` returns a match
3. `grep 'siteConfig.tagline' components/Footer.tsx` returns a match
4. `grep 'bg-background' app/layout.tsx` returns a match
5. `grep 'background.*0a0a0a' tailwind.config.ts` returns a match
6. `grep 'font-geist-mono' tailwind.config.ts` returns empty
7. `npm run lint` exits 0
8. `npm run build` exits 0 (all existing functionality still works)
</verification>

<success_criteria>
- FOUND-01: `.gitignore` excludes `.next` and `out`; neither directory appears in `git ls-files`
- FOUND-02: `config/site.ts` has `name: "SDT"` and `email: "sdttech.co@gmail.com"`
- FOUND-03: `components/Footer.tsx` uses `{siteConfig.tagline}` — no hardcoded tagline string
- FOUND-04: `tailwind.config.ts` has `background: "#0a0a0a"` token; `app/layout.tsx` uses `bg-background`; `--font-geist-mono` removed
</success_criteria>

<output>
Create `.planning/phases/01-foundation-i18n/01-A-SUMMARY.md` when done.
</output>
