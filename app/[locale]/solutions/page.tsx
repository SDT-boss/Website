import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { SolutionsGrid } from "@/components/solutions/SolutionsGrid";
import { FooterCTA } from "@/components/home/FooterCTA";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "zh" }];
}

export const dynamicParams = false;

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const st = await getTranslations("solutions");

  return (
    <>
      <PageHero
        eyebrow={st("pageEyebrow")}
        heading={st("pageTitle")}
        sub={st("pageSub")}
      />
      <SolutionsGrid />
      <FooterCTA />
    </>
  );
}
