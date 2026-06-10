import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "zh" }];
}

export const dynamicParams = false;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="flex items-center justify-center min-h-[60vh]">
      <p className="text-text-muted text-sm font-mono tracking-widest">— scaffold ready —</p>
    </main>
  );
}
