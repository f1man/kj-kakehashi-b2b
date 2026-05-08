import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Globe2, ShieldCheck, Zap, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b dark:border-slate-800 py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Bridging the Gap in <span className="text-blue-600">Korea-Japan</span> Industrial Supply Chains
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            KJ Kakehashi B2B is an AI-search optimized, spec-driven database dedicated to connecting top-tier Korean and Japanese manufacturers, IT infrastructure companies, and component suppliers.
          </p>
          <div className="flex justify-center gap-4">
            <Link href={`/${lang}/register`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
                Join as a Supplier
              </Button>
            </Link>
            <Link href={`/${lang}/contact`}>
              <Button size="lg" variant="outline" className="h-12 px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              We aim to become the most trusted structured database and lead-generation platform for the B2B industrial sector between South Korea and Japan. 
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              By transforming fragmented product specifications into standardized, AI-readable data (EAV architecture), we ensure that buyers find exactly what they need, faster and more accurately than ever before.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl">
              <Zap className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">AI-Optimized Search</h3>
              <p className="text-sm text-slate-500">Structured technical specs ensure high visibility on Google and future AI search engines.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl">
              <ShieldCheck className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Verified Suppliers</h3>
              <p className="text-sm text-slate-500">Rigorous verification process ensures trust between cross-border business partners.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl">
              <Globe2 className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Bilingual Localization</h3>
              <p className="text-sm text-slate-500">Seamlessly translated interfaces and specifications bridging language barriers natively.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl">
              <Building2 className="h-10 w-10 text-indigo-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Direct Lead Gen</h3>
              <p className="text-sm text-slate-500">Direct RFQ routing and CAD/PDF download tracking to capture high-quality B2B leads.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
