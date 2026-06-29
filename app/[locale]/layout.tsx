import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "id" },
    { locale: "zh" },
  ];
}

export const dynamicParams = false;

// Provider-only shell. Page chrome (Navbar/Footer) lives in the (site) route
// group so the marketing landing page at "/" can render its own self-contained
// navigation and footer.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
