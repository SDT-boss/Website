---
phase: 04-launch-prep
plan: "01"
subsystem: static-assets
tags: [favicon, og-image, imagemagick, static-export]
dependency_graph:
  requires: []
  provides: [favicon-set, og-image]
  affects: [app/favicon.ico, app/icon.png, app/apple-icon.png, public/og.png]
tech_stack:
  added: []
  patterns: [imagemagick-svg-to-png, multi-size-ico]
key_files:
  created:
    - app/icon.png
    - app/apple-icon.png
    - public/og.png
    - public/ (directory)
  modified:
    - app/favicon.ico
decisions:
  - "Pre-rasterize SVG to PNG before compositing for og.png to prevent canvas dimension override by ImageMagick SVG reader"
  - "Use density 300 with SVG source to get crisp vector rendering at 512x512"
  - "Use Helvetica as Inter substitute in og.png (static image; social platforms compress heavily)"
metrics:
  duration: "~10 minutes"
  completed: "2026-06-12T05:17:53Z"
  tasks_completed: 2
  files_created: 4
---

# Phase 4 Plan 01: Static Image Assets (Favicon Set + OG Image) Summary

Multi-size favicon ICO (32px+16px), 512x512 icon.png, 180x180 apple-icon.png, and 1200x630 og.png generated from LogoMark.tsx SVG geometry using ImageMagick.

## What Was Built

All four static image assets required for browser favicons and social link previews:

| Asset | Path | Dimensions | Format |
|-------|------|-----------|--------|
| High-DPI favicon | `app/icon.png` | 512x512 | PNG 16-bit sRGB |
| Apple touch icon | `app/apple-icon.png` | 180x180 | PNG 16-bit sRGB |
| Multi-size favicon | `app/favicon.ico` | 32x32 + 16x16 | MS Windows ICO |
| OG preview image | `public/og.png` | 1200x630 | PNG 16-bit sRGB |

The LogoMark SVG geometry from `components/LogoMark.tsx` was replicated exactly: viewBox 0 0 36 36, Cyber Jade ellipse (cx=24, cy=24, rx=6, ry=10, fill=#008684, rotate 35deg) behind Volt Green ellipse (cx=12, cy=12, rx=6, ry=10, fill=#96D02C, rotate 35deg), on #0a0a0a background.

Next.js App Router auto-emits the correct `<link rel="icon">`, `<link rel="icon" sizes="512x512">`, and `<link rel="apple-touch-icon">` tags from the `app/` directory placements at build time.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create logo mark SVG source file and generate icon.png (512x512) | 466afa1 | app/icon.png, public/ |
| 2 | Derive apple-icon.png, favicon.ico, and og.png from icon.png | 0ee6874 | app/apple-icon.png, app/favicon.ico, public/og.png |

## Verification

All success criteria met:

- `file app/favicon.ico` reports "MS Windows icon resource - 2 icons, 32x32, 32 bits/pixel, 16x16, 32 bits/pixel"
- `identify app/favicon.ico` lists 32x32 frame
- `identify app/icon.png` reports 512x512
- `identify app/apple-icon.png` reports 180x180
- `identify public/og.png` reports 1200x630
- `npm run build` exits 0 (no TypeScript errors; build output shows /apple-icon.png and /icon.png routes emitted)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed og.png canvas dimension override by SVG reader**
- **Found during:** Task 2
- **Issue:** The plan's primary og.png command composited the SVG directly: `/tmp/logomark.svg -resize x80 -gravity Center`. ImageMagick's SVG reader overrides the output canvas dimensions with the SVG's intrinsic size (36x36 scaled to 152x80), producing a 152x80 PNG instead of 1200x630.
- **Fix:** Pre-rasterized the SVG to a PNG at 80px height first (`convert -background "#0a0a0a" -density 300 /tmp/logomark.svg -resize x80 /tmp/logomark80.png`), then composited the PNG onto the 1200x630 canvas. This is the correct approach when mixing SVG with canvas-sized operations in ImageMagick.
- **Files modified:** public/og.png (output only — no tracked files changed)
- **Commit:** 0ee6874

## Known Stubs

None. All assets are fully generated binary files with correct dimensions. No placeholder content.

## Threat Flags

None. These are static binary image assets with no executable surface. No new network endpoints, auth paths, or trust boundaries introduced.

## Self-Check: PASSED

- [x] app/icon.png exists: FOUND
- [x] app/apple-icon.png exists: FOUND
- [x] app/favicon.ico exists (multi-size): FOUND
- [x] public/og.png exists: FOUND
- [x] Commit 466afa1 exists: FOUND
- [x] Commit 0ee6874 exists: FOUND
- [x] npm run build exits 0: CONFIRMED
