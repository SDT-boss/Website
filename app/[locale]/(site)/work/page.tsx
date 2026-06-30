import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { WorkCard } from "@/components/work/WorkCard";
import { GhostCard } from "@/components/work/GhostCard";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects in development at SDT tech. Starting with EV Fleet Operations — an end-to-end system for managing electric vehicle fleets.",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "zh" }];
}

export const dynamicParams = false;

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const wt = await getTranslations("work");

  return (
    <>
      <PageHero
        eyebrow={wt("pageEyebrow")}
        heading={wt("pageTitle")}
        sub={wt("pageSub")}
      />
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WorkCard />
            <GhostCard />
            <GhostCard />
          </div>
        </div>
      </section>
    </>
  );
}
