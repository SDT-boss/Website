import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { BeliefGrid } from "@/components/about/BeliefGrid";
import { CurrentFocusParagraph } from "@/components/about/CurrentFocusParagraph";
import { FooterCTA } from "@/components/home/FooterCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "SDT tech builds infrastructure-grade software for operators who run complex systems at scale. Jakarta-based. Operator-focused.",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "zh" }];
}

export const dynamicParams = false;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const at = await getTranslations("about");

  return (
    <>
      <PageHero
        eyebrow={at("pageEyebrow")}
        heading={at("beliefH1")}
        sub={at("beliefSub")}
      />
      <BeliefGrid />
      <CurrentFocusParagraph />
      <FooterCTA />
    </>
  );
}
