import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { solutions } from "@/lib/solutions";
import { routing } from "@/i18n/routing";
import { SolutionDetailHero } from "@/components/solutions/SolutionDetailHero";
import { WhoThisIsFor } from "@/components/solutions/WhoThisIsFor";
import { CapabilityList } from "@/components/solutions/CapabilityList";
import { FooterCTA } from "@/components/home/FooterCTA";

const slugMeta: Record<string, { title: string; description: string }> = {
  "fleet-mobility": {
    title: "Fleet Mobility",
    description:
      "Real-time fleet tracking and dispatch for EV and mixed fleets. Built for operators managing high-utilisation vehicles at scale.",
  },
  "iot-hardware": {
    title: "IoT Hardware",
    description:
      "Industrial IoT devices and edge firmware for connected operations. Hardened for field deployment in transport and logistics.",
  },
  "logistics-intelligence": {
    title: "Logistics Intelligence",
    description:
      "Data pipelines and routing logic that turn raw fleet telemetry into operational decisions. Built for last-mile and mid-mile operations.",
  },
  "ai-operations": {
    title: "AI Operations",
    description:
      "Machine learning systems that surface anomalies, forecast demand, and automate triage for complex transport operations.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = slugMeta[slug];
  if (!meta) return {};
  return { title: meta.title, description: meta.description };
}

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
