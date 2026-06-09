import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-2 border-t border-border-subtle">

      {/* Main row */}
      <div className="mx-auto max-w-content px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* Left: logo mark + name */}
        <div className="flex items-center gap-2.5">
          <LogoMark size={24} />
          <span className="text-sm font-medium tracking-tight">
            <span className="text-white">{siteConfig.name} </span>
            <span className="text-cyber-jade">tech</span>
          </span>
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
            Built for intelligent operations.
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
