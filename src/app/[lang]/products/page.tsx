import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { Search, Filter, Box, Settings, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import Link from "next/link";
import ProductList from "./ProductList";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  // Mock data for Facets and Products
  const categories = ["Factory Automation", "Industrial Sensors", "Network Equipment", "MRO Parts"];
  const brands = ["Samsung Techwin", "Omron", "Keyence", "Misumi", "Mitsubishi Electric"];
  
  const mockProducts = [
    {
      id: 1,
      name: "High-Precision Servo Motor KV-7000 Series",
      brand: "Keyence",
      category: "Factory Automation",
      specs: { "Voltage": "24V DC", "Torque": "1.2 Nm", "Speed": "3000 RPM" },
      compatible: "JIS B 1180"
    },
    {
      id: 2,
      name: "Proximity Sensor E2E Next",
      brand: "Omron",
      category: "Industrial Sensors",
      specs: { "Sensing Distance": "10mm", "Output": "NPN", "Protection": "IP67" },
      compatible: "ISO 9001"
    },
    {
      id: 3,
      name: "Industrial Gigabit Switch XG-200",
      brand: "Samsung Techwin",
      category: "Network Equipment",
      specs: { "Ports": "8x 1GbE", "PoE": "Yes (60W)", "Temp Range": "-40~85°C" },
      compatible: "IEEE 802.3af"
    },
    {
      id: 4,
      name: "Linear Guide Rail HSR25",
      brand: "Misumi",
      category: "MRO Parts",
      specs: { "Material": "Carbon Steel", "Length": "1000mm", "Accuracy": "High" },
      compatible: "KS B 1436"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* LEFT SIDEBAR: FACETED SEARCH */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            {dict.products.filters}
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

        {/* Category Facet */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">{dict.products.category}</h3>
          <div className="space-y-2">
            {categories.map((cat, i) => (
              <label key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Brand Facet */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">{dict.products.brand}</h3>
          <div className="space-y-2">
            {brands.map((brand, i) => (
              <label key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                {brand}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT: PRODUCT LISTING */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{dict.products.title}</h1>
          <span className="text-sm text-slate-500">{mockProducts.length} {dict.products.results}</span>
        </div>

        <ProductList products={mockProducts} lang={lang} dict={dict} />
      </main>
    </div>
  );
}
