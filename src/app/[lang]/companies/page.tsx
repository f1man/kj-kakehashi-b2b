import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { Search, Filter, Building2, CheckCircle2, MapPin, Globe2, Mail } from "lucide-react";
import Link from "next/link";

export default async function CompaniesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  // Mock data for Facets and Companies
  const industries = ["Factory Automation", "Industrial Sensors", "Network Equipment", "MRO Parts", "IT Infrastructure"];
  const countries = ["Japan", "South Korea"];
  
  const mockCompanies = [
    {
      id: 1,
      name: "Samsung Techwin",
      industry: "Network Equipment",
      country: "South Korea",
      verified: true,
      tier: "premium",
      description: "Leading manufacturer of industrial network switches, VPN routers, and security infrastructure for manufacturing facilities.",
      productsCount: 145
    },
    {
      id: 2,
      name: "Omron Corporation",
      industry: "Factory Automation",
      country: "Japan",
      verified: true,
      tier: "premium",
      description: "Global leader in automation components, equipment, and systems with advanced sensing and control technologies.",
      productsCount: 3200
    },
    {
      id: 3,
      name: "Keyence",
      industry: "Industrial Sensors",
      country: "Japan",
      verified: true,
      tier: "verified",
      description: "Supplier of sensors, measuring systems, laser markers, microscopes, and machine vision systems worldwide.",
      productsCount: 840
    },
    {
      id: 4,
      name: "Misumi Group",
      industry: "MRO Parts",
      country: "Japan",
      verified: false,
      tier: "free",
      description: "Manufacturer and distributor of mechanical components for factory automation, press die and plastic mold.",
      productsCount: 15000
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* LEFT SIDEBAR: FACETED SEARCH */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            {dict.companies.filters}
          </h2>
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder={dict.home.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-md"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Industry Facet */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">{dict.companies.industry}</h3>
          <div className="space-y-2">
            {industries.map((ind, i) => (
              <label key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                {ind}
              </label>
            ))}
          </div>
        </div>

        {/* Verification Facet */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">{dict.companies.verification}</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              Verified Only
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              Premium Partners
            </label>
          </div>
        </div>
        
        {/* Country Facet */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">{dict.companies.country}</h3>
          <div className="space-y-2">
            {countries.map((country, i) => (
              <label key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                {country}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT: COMPANY LISTING */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{dict.companies.title}</h1>
          <span className="text-sm text-slate-500">{mockCompanies.length} {dict.companies.results}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCompanies.map((company) => (
            <div key={company.id} className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Link href={`/${lang}/companies/${company.id}`} className="hover:text-blue-600">
                        {company.name}
                      </Link>
                      {company.verified && (
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      )}
                    </h3>
                    <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <Globe2 className="h-3 w-3" /> {company.industry}
                    </div>
                  </div>
                </div>
                {company.tier === "premium" && (
                  <span className="bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                    PREMIUM
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 flex-1">
                {company.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t dark:border-slate-800">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                    <MapPin className="h-3 w-3" /> {company.country}
                  </div>
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-400">
                    {company.productsCount} Products
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    {dict.companies.viewProfile}
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Mail className="h-4 w-4 mr-2" /> {dict.companies.contactSales}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
