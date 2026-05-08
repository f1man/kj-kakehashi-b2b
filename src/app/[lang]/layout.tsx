import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "../../i18n-config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "KJ Kakehashi B2B - Industrial Supply Chain",
  description: "Bilingual Korean-Japanese industrial database and supply-chain discovery platform.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className={inter.className}>
      <body className="min-h-screen bg-slate-50 antialiased flex flex-col dark:bg-slate-950">
        <Header lang={lang as Locale} dict={dict} />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer lang={lang as Locale} />
      </body>
    </html>
  );
}
