import { getTranslations } from "next-intl/server";

export async function CurrentFocusParagraph() {
  const at = await getTranslations("about");

  return (
    <section className="py-24 md:py-32 px-6 bg-surface">
      <div className="mx-auto max-w-content">
        <p className="text-xs font-normal tracking-widest uppercase text-text-secondary mb-6">
          {at("currentFocusHeading")}
        </p>
        <p className="text-base font-normal leading-relaxed text-text-secondary max-w-2xl">
          {at("currentFocus")}
        </p>
      </div>
    </section>
  );
}
