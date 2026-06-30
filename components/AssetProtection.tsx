"use client";

import { useEffect } from "react";

/**
 * Asset-protection deterrent layer.
 *
 * Blocks the casual ways a visitor saves or copies brand + visual assets:
 *  - right-click / long-press "Save image as…" on media and the marketing visuals
 *  - dragging images out to the desktop or another tab
 *
 * NOTE: this is a deterrent, not true protection. Anything the browser renders
 * can still be obtained via DevTools, view-source, a direct asset URL, or a
 * screenshot. Real protection requires server-side tokens / watermarking, which
 * a static site cannot provide. Paired with the CSS rules in globals.css.
 */
const MEDIA = "img, svg, canvas, picture, video";
const PROTECTED = `${MEDIA}, .sdt-landing, [data-protect]`;

export function AssetProtection() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(PROTECTED)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(MEDIA)) e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
