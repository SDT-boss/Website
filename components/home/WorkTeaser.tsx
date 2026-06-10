import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface WorkTeaserProps {
  locale: string;
}

export async function WorkTeaser({ locale }: WorkTeaserProps) {
  const t = await getTranslations("home");
  const wt = await getTranslations("work");

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-content">
        <p className="text-xs font-medium tracking-widest text-text-secondary uppercase mb-4">
          {t("workEyebrow")}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-12">
          {t("workHeading")}
        </h2>

        {/* Single work card — max-w-2xl centered */}
        <div className="max-w-2xl mx-auto bg-surface border border-border-subtle rounded-lg p-6 flex flex-col gap-4 mb-8">
          {/* Status tag */}
          <span className="self-start text-xs font-medium bg-ev-teal/10 text-ev-teal px-2 py-1 rounded">
            Live
          </span>
          <h3 className="text-lg font-bold tracking-tight leading-snug">
            {wt("evFleetTitle")}
          </h3>
          <p className="text-base font-medium leading-relaxed text-text-secondary">
            {wt("evFleetDesc")}
          </p>
        </div>

        {/* "See our work →" link — cyber-jade, locale-prefixed via next-intl Link */}
        <div className="max-w-2xl mx-auto">
          <Link
            href="/work"
            className="text-cyber-jade text-sm font-medium hover:text-jade-strong transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-jade rounded-sm"
          >
            {t("seeOurWork")}
          </Link>
        </div>
      </div>
    </section>
  );
}
