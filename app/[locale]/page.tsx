import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { SolutionsStrip } from "@/components/home/SolutionsStrip";
import { ApproachSection } from "@/components/home/ApproachSection";
import { WorkTeaser } from "@/components/home/WorkTeaser";
import { FooterCTA } from "@/components/home/FooterCTA";

export const metadata: Metadata = {
  title: { absolute: "SDT tech — Infrastructure for intelligent operations." },
  description:
    "SDT tech builds hardware-aware fleet mobility, IoT, logistics, and AI operations systems for enterprise operators.",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "zh" }];
}

export const dynamicParams = false;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <SolutionsStrip />
      <ApproachSection />
      <WorkTeaser locale={locale} />
      <FooterCTA />
    </>
  );
}
