
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import TabTitleHandler from "@/components/TabTitleHandler";
import { getPageContent } from "@/app/actions/content";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: 'swap',
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  let settings = null;

  if (prisma) {
    settings = await prisma.siteSettings.findFirst();
  }

  const faviconUrl = settings?.favicon || '/favicon.ico';

  return {
    title: settings?.seoTitle || "ARİS VİA MEDIA | Mükemmelliğin Ötesinde",
    description: settings?.seoDescription || "Aris Via Media, estetiği teknolojiyle, lüksü inovasyonla harmanlayarak dijital deneyimler tasarlar.",
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: faviconUrl,
      },
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch 'away message' for tab title
  const awayMessage = await getPageContent('global_tab_away_message');

  return (
    <html lang="tr" className={`${jakarta.variable} ${syne.variable}`}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        <TabTitleHandler awayMessage={awayMessage} />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
