import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { solutions } from "@/lib/solutions";
import { SolutionCard } from "@/components/home/SolutionCard";

export async function SolutionsGrid() {
  const st = await getTranslations("solutions");

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="block"
              aria-label={st(`${solution.slug}.title` as Parameters<typeof st>[0])}
            >
              <SolutionCard
                icon={solution.icon}
                title={st(`${solution.slug}.title` as Parameters<typeof st>[0])}
                desc={st(`${solution.slug}.desc` as Parameters<typeof st>[0])}
                tag={st(`${solution.slug}.tag` as Parameters<typeof st>[0])}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
