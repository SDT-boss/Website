"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "id", label: "ID" },
  { code: "zh", label: "中文" },
] as const;

export function LandingNav() {
  const t = useTranslations("landing.nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav>
      <div className="wrap nav-in">
        <a href="#platform" className="logo" aria-label="SDT tech — home">
          <Image
            src="/logo-light.png"
            alt="SDT tech"
            width={146}
            height={67}
            priority
            draggable={false}
            className="logo-img"
          />
        </a>
        <div className="nav-links">
          <a href="#platform">{t("platform")}</a>
          <a href="#services">{t("services")}</a>
          <a href="#evecosys">EVEcosys</a>
          <a href="#interfaces">{t("interfaces")}</a>
          <a href="#team">{t("team")}</a>
          <a href="#approach">{t("approach")}</a>
        </div>
        <div className="nav-cta">
          <div className="lang">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                className={l.code === locale ? "active" : undefined}
                onClick={() => router.replace(pathname, { locale: l.code })}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a href="#cta" className="signin">
            {t("signin")}
          </a>
          <a href="#cta" className="btn btn-primary">
            <span className="msym">calendar_month</span>
            {t("bookDemo")}
          </a>
        </div>
      </div>
    </nav>
  );
}
