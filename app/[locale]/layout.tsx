import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "id" },
    { locale: "zh" },
  ];
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
