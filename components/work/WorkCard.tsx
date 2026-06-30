import { getTranslations } from "next-intl/server";

export async function WorkCard() {
  const wt = await getTranslations("work");
  const ct = await getTranslations("common");

  return (
    <div className="bg-surface border border-border-subtle rounded-lg p-6 flex flex-col gap-4 hover:border-cyber-jade transition-colors duration-150 ease-out">
      <span className="self-start text-xs font-normal tracking-widest uppercase px-2 py-1 rounded bg-ev-teal/10 text-ev-teal">
        {ct("status.live")}
      </span>
      <h3 className="text-base font-bold">{wt("evFleetTitle")}</h3>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-normal bg-grid-violet/10 text-grid-violet px-2 py-1 rounded">
          {wt("evFleetTag1")}
        </span>
        <span className="text-xs font-normal bg-grid-violet/10 text-grid-violet px-2 py-1 rounded">
          {wt("evFleetTag2")}
        </span>
        <span className="text-xs font-normal bg-grid-violet/10 text-grid-violet px-2 py-1 rounded">
          {wt("evFleetTag3")}
        </span>
      </div>
      <p className="text-base font-normal leading-relaxed text-text-secondary">
        {wt("evFleetDesc")}
      </p>
      <p className="text-base font-normal leading-relaxed text-text-secondary">
        {wt("evFleetExpandedDesc")}
      </p>
    </div>
  );
}
