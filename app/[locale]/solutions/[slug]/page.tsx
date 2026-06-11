import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { solutions } from "@/lib/solutions";
import { routing } from "@/i18n/routing";
import { SolutionDetailHero } from "@/components/solutions/SolutionDetailHero";
import { WhoThisIsFor } from "@/components/solutions/WhoThisIsFor";
import { CapabilityList } from "@/components/solutions/CapabilityList";
import { FooterCTA } from "@/components/home/FooterCTA";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    solutions.map((s) => ({ locale, slug: s.slug }))
  );
}

export const dynamicParams = false;

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  const st = await getTranslations("solutions");
  const ct = await getTranslations("common");

  type SKey = Parameters<typeof st>[0];
  const t = (key: string) => st(`${slug}.${key}` as SKey);

  const statusLabel =
    solution.status === "live" ? ct("status.live") : ct("status.inDevelopment");

  const capabilities = [
    { num: "01", title: t("capability1Title"), body: t("capability1Body") },
    { num: "02", title: t("capability2Title"), body: t("capability2Body") },
    { num: "03", title: t("capability3Title"), body: t("capability3Body") },
  ];

  return (
    <>
      <SolutionDetailHero
        status={solution.status}
        statusLabel={statusLabel}
        heading={t("title")}
        problemStatement={t("problemStatement")}
      />
      <WhoThisIsFor text={t("whoThisIsFor")} label={st("whoThisIsForLabel")} />
      <CapabilityList capabilities={capabilities} />
      <FooterCTA />
    </>
  );
}
