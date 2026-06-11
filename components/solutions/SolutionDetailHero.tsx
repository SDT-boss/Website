interface SolutionDetailHeroProps {
  status: "live" | "in-development";
  statusLabel: string;
  heading: string;
  problemStatement: string;
}

export function SolutionDetailHero({
  status,
  statusLabel,
  heading,
  problemStatement,
}: SolutionDetailHeroProps) {
  const badgeClass =
    status === "live"
      ? "self-start text-xs font-normal tracking-widest uppercase px-2 py-1 rounded bg-ev-teal/10 text-ev-teal"
      : "self-start text-xs font-normal tracking-widest uppercase px-2 py-1 rounded bg-amber-500/10 text-amber-400";

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-content flex flex-col gap-6">
        <span className={badgeClass}>{statusLabel}</span>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
          {heading}
        </h1>
        <p className="text-base font-normal leading-relaxed text-text-secondary max-w-2xl">
          {problemStatement}
        </p>
      </div>
    </section>
  );
}
