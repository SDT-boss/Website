import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function FooterCTA() {
  const t = await getTranslations("home");

  return (
    <section className="py-24 md:py-32 px-6 bg-surface-2 border-t border-border-subtle">
      <div className="mx-auto max-w-content text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
          {t("footerCtaHeading")}
        </h2>
        <p className="text-base font-medium leading-relaxed text-text-secondary max-w-xl">
          {t("footerCtaSub")}
        </p>
        {/* Cyber-jade outline button — NOT Volt Green (Volt Green is consumed by HeroSection) */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="border border-cyber-jade text-cyber-jade rounded-md px-6 py-3 text-sm font-medium hover:bg-cyber-jade/10 transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade"
        >
          {t("footerCtaButton")}
        </a>
      </div>
    </section>
  );
}
