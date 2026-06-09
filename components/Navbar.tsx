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
