"use client";

import { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import Image from "next/image";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { siteConfig } from "@/config/site";

const NAV_LINKS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Work",      href: "/work"      },
  { label: "About",     href: "/about"     },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

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

  return (
    <header className="sticky top-0 z-50 w-full bg-topbar border-b border-border-subtle">
      <div className="mx-auto max-w-content px-6 h-16 flex items-center justify-between gap-8">

        {/* Logo — using Link from @/i18n/navigation so it auto-prefixes locale */}
        <Link href="/" className="flex items-center shrink-0" aria-label={`${siteConfig.name} tech — home`}>
          <Image
            src="/logo-light.png"
            alt={`${siteConfig.name} tech`}
            width={146}
            height={67}
            priority
            draggable={false}
            className="h-8 w-auto select-none"
          />
        </Link>

        {/* Desktop nav links — hidden below md */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-150 ease-out ${
                isActive(link.href)
                  ? "text-cyber-jade border-b border-cyber-jade pb-1"
                  : "text-white hover:text-cyber-jade"
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right controls — hidden below md */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {/* Language switcher — router.replace for path-preserving locale switch */}
          <div className="flex items-center gap-1 text-xs font-medium shrink-0">
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

          {/* Get in touch — outline button, Cyber Jade. NOT Volt Green (CTA rule). */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center px-4 py-1.5 rounded-md text-sm font-medium text-cyber-jade border border-cyber-jade hover:bg-cyber-jade/10 transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade shrink-0"
          >
            Get in touch
          </a>
        </div>

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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>

      </div>

      {/* Mobile menu panel */}
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
    </header>
  );
}
