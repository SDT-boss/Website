import { getTranslations } from "next-intl/server";

const beliefs = [
  { num: "01", titleKey: "belief1Title", bodyKey: "belief1Body" },
  { num: "02", titleKey: "belief2Title", bodyKey: "belief2Body" },
  { num: "03", titleKey: "belief3Title", bodyKey: "belief3Body" },
] as const;

export async function BeliefGrid() {
  const at = await getTranslations("about");

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-8">
          {beliefs.map((belief) => (
            <div key={belief.num} className="flex flex-col gap-3">
              <span className="text-4xl font-bold text-cyber-jade/20 leading-none">
                {belief.num}
              </span>
              <h3 className="text-base font-bold">{at(belief.titleKey)}</h3>
              <p className="text-base font-normal leading-relaxed text-text-secondary">
                {at(belief.bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
