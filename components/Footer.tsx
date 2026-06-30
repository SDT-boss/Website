import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-2 border-t border-border-subtle">

      {/* Main row */}
      <div className="mx-auto max-w-content px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* Left: full logo lockup */}
        <div className="flex items-center">
          <Image
            src="/logo-light.png"
            alt={`${siteConfig.name} tech`}
            width={146}
            height={67}
            draggable={false}
            className="h-6 w-auto select-none"
          />
        </div>

        {/* Right: email + tagline */}
        <div className="flex flex-col md:items-end gap-1">
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-cyber-jade text-sm hover:text-jade-strong transition-colors duration-150 ease-out"
          >
            {siteConfig.email}
          </a>
          <p className="text-text-muted text-xs">
            {siteConfig.tagline}
          </p>
        </div>

      </div>

      {/* Bottom strip */}
      <div className="border-t border-border-subtle">
        <div className="mx-auto max-w-content px-6 py-4">
          <p className="text-text-muted text-xs">
            &copy; {year} {siteConfig.name} tech. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
