import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import Link from "next/link";
import { Search, ArrowRight, ShieldCheck, Factory, Cpu, Zap, Box, TrendingUp } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const categories = [
    { icon: Factory, name: dict.home?.categories?.automation || "Factory Automation", count: "12,400+", bg: "bg-blue-100 dark:bg-blue-900/30", color: "text-blue-600 dark:text-blue-400" },
    { icon: Cpu, name: dict.home?.categories?.electronics || "Electronics", count: "8,200+", bg: "bg-emerald-100 dark:bg-emerald-900/30", color: "text-emerald-600 dark:text-emerald-400" },
    { icon: Zap, name: dict.home?.categories?.power || "Power & Transmission", count: "5,100+", bg: "bg-amber-100 dark:bg-amber-900/30", color: "text-amber-600 dark:text-amber-400" },
    { icon: Box, name: dict.home?.categories?.materials || "Materials & Metals", count: "15,800+", bg: "bg-purple-100 dark:bg-purple-900/30", color: "text-purple-600 dark:text-purple-400" }
  ];

  const featuredProducts = [
    { name: "High-Precision Linear Guide HSR25", company: "THK Co., Ltd.", specs: "Dynamic Load: 27.5kN", image: "linear" },
    { name: "AC Servo Motor Sigma-7", company: "Yaskawa Electric", specs: "Output: 400W, 200V", image: "servo" },
    { name: "Proximity Sensor E2E", company: "Omron Corporation", specs: "Sensing Distance: 2mm", image: "sensor" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                {dict.home?.hero?.title || "Discover Industrial Supply Chains"}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {dict.home?.hero?.subtitle || "Search and connect with premium suppliers across Korea and Japan."}
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-2xl flex items-center max-w-3xl mx-auto mt-10 border dark:border-slate-700">
                <Search className="h-6 w-6 text-slate-400 ml-4" />
                <input 
                  type="text" 
                  placeholder={dict.home?.searchPlaceholder || "Search..."} 
                  className="w-full px-4 py-3 text-slate-900 dark:text-white bg-transparent focus:outline-none text-lg"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap">
                  Search
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm font-medium text-slate-400">
                <span>Trending:</span>
                <span className="cursor-pointer hover:text-blue-400 transition-colors">Servo Motors</span>
                <span className="cursor-pointer hover:text-blue-400 transition-colors">PLCs</span>
                <span className="cursor-pointer hover:text-blue-400 transition-colors">Linear Guides</span>
                <span className="cursor-pointer hover:text-blue-400 transition-colors">JIS Standards</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex justify-between items-end mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Explore Categories</h2>
              <Link href={`/${lang}/products`} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 group">
                View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <FadeIn key={index} delay={0.1 * index}>
                <Link href={`/${lang}/products?category=${index}`} className="group block bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900">
                  <div className={`${cat.bg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <cat.icon className={`h-8 w-8 ${cat.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{cat.name}</h3>
                  <p className="text-slate-500 font-medium flex items-center gap-2">
                    {cat.count} products <TrendingUp className="h-4 w-4" />
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & VERIFICATION SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeIn>
              <ShieldCheck className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {dict.home?.trustedPartners?.title || "Trusted by Industry Leaders"}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {dict.home?.trustedPartners?.subtitle || "All suppliers are verified."}
              </p>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.2} direction="up">
            <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {['SAMSUNG', 'LG ENS', 'HYUNDAI', 'TOYOTA', 'KEYENCE', 'OMRON'].map((brand, i) => (
                <div key={i} className="text-2xl font-black text-slate-400 dark:text-slate-500">{brand}</div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-10 text-center">Featured Industrial Components</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((prod, i) => (
              <FadeIn key={i} delay={0.1 * i} direction="up">
                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                    <span className="text-slate-400 font-medium">Product Image Placeholder</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{prod.name}</h3>
                    <p className="text-blue-600 text-sm font-semibold mb-4">{prod.company}</p>
                    <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                      <span className="font-semibold block mb-1">Key Specification:</span>
                      {prod.specs}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
