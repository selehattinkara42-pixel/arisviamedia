import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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

export const metadata: Metadata = {
  title: "ARİS VİA MEDIA | Mükemmelliğin Ötesinde",
  description: "Aris Via Media, estetiği teknolojiyle, lüksü inovasyonla harmanlayarak dijital deneyimler tasarlar.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${jakarta.variable} ${syne.variable}`}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
