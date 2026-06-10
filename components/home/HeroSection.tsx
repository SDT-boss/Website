import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function HeroSection() {
  const t = await getTranslations("home");

  return (
    <section className="dot-grid bg-background min-h-screen flex flex-col items-center justify-center py-24 md:py-32 px-6">
      <div className="mx-auto max-w-content flex flex-col items-center text-center">
        {/* Eyebrow */}
        <p className="text-xs font-medium tracking-widest text-text-secondary uppercase mb-6">
          {t("eyebrow")}
        </p>

        {/* H1 — 2-line headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none text-center mb-6 max-w-content">
          <span className="block">{t("heroLine1")}</span>
          <span className="block">{t("heroLine2")}</span>
        </h1>

        {/* Sub-line */}
        <p className="text-base font-medium leading-relaxed text-text-secondary text-center max-w-2xl mb-10">
          {t("heroSub")}
        </p>

        {/* Primary CTA — Volt Green, ONE per page */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="bg-volt-green text-background font-medium px-6 py-3 rounded-md text-sm hover:bg-volt-strong transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt-green"
        >
          {t("ctaLabel")}
        </a>
      </div>
    </section>
  );
}
