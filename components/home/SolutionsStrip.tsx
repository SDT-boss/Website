import { getTranslations } from "next-intl/server";
import { SolutionCard } from "@/components/home/SolutionCard";

export async function SolutionsStrip() {
  const t = await getTranslations("home");
  const st = await getTranslations("solutions");

  const cards = [
    { icon: "⚡", titleKey: "card1Title", descKey: "card1Desc", tagKey: "card1Tag" },
    { icon: "◈",  titleKey: "card2Title", descKey: "card2Desc", tagKey: "card2Tag" },
    { icon: "⊞",  titleKey: "card3Title", descKey: "card3Desc", tagKey: "card3Tag" },
    { icon: "∿",  titleKey: "card4Title", descKey: "card4Desc", tagKey: "card4Tag" },
  ] as const;

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-content">
        {/* Eyebrow + heading */}
        <p className="text-xs font-medium tracking-widest text-text-secondary uppercase mb-4">
          {t("solutionsEyebrow")}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-12">
          {t("solutionsHeading")}
        </h2>
        {/* 4-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cards.map((card) => (
            <SolutionCard
              key={card.titleKey}
              icon={card.icon}
              title={st(card.titleKey)}
              desc={st(card.descKey)}
              tag={st(card.tagKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
