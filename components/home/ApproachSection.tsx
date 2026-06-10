import { getTranslations } from "next-intl/server";

export async function ApproachSection() {
  const t = await getTranslations("home");
  const at = await getTranslations("approach");

  const items = [
    { num: "01", titleKey: "item1Title", bodyKey: "item1Body" },
    { num: "02", titleKey: "item2Title", bodyKey: "item2Body" },
    { num: "03", titleKey: "item3Title", bodyKey: "item3Body" },
  ] as const;

  return (
    <section className="py-24 md:py-32 px-6 bg-surface">
      <div className="mx-auto max-w-content">
        <p className="text-xs font-medium tracking-widest text-text-secondary uppercase mb-4">
          {t("approachEyebrow")}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-12">
          {t("approachHeading")}
        </h2>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <div key={item.num} className="flex flex-col gap-3">
              {/* Large number accent — cyber-jade/20 opacity */}
              <span className="text-4xl font-bold text-cyber-jade/20 leading-none">
                {item.num}
              </span>
              <h3 className="text-lg font-bold tracking-tight leading-snug">
                {at(item.titleKey)}
              </h3>
              <p className="text-base font-medium leading-relaxed text-text-secondary">
                {at(item.bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
