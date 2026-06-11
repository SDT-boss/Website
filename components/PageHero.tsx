interface PageHeroProps {
  eyebrow: string;
  heading: string;
  sub?: string;
}

export function PageHero({ eyebrow, heading, sub }: PageHeroProps) {
  return (
    <section className="bg-background py-24 md:py-32 px-6">
      <div className="mx-auto max-w-content flex flex-col items-center text-center gap-4">
        <p className="text-xs font-normal tracking-widest text-text-secondary uppercase">
          {eyebrow}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none max-w-3xl">
          {heading}
        </h1>
        {sub && (
          <p className="text-base font-normal leading-relaxed text-text-secondary max-w-xl">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
