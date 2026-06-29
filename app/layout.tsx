import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sdt.technology"),
  title: {
    template: "%s — SDT tech",
    default: "SDT tech — Infrastructure for intelligent operations.",
  },
  description:
    "SDT tech builds hardware-aware fleet mobility, IoT, logistics, and AI operations systems for enterprise operators.",
  openGraph: {
    siteName: "SDT tech",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SDT tech — Infrastructure for intelligent operations.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-white antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
