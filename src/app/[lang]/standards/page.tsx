import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Search, ArrowRightLeft } from "lucide-react";

export default async function StandardsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const mappings = [
    { type: "Steel", jis: "JIS G 3101 SS400", ks: "KS D 3503 SS275", desc: "Rolled steels for general structure" },
    { type: "Stainless", jis: "JIS G 4303 SUS304", ks: "KS D 3706 STS304", desc: "Stainless steel bars" },
    { type: "Aluminum", jis: "JIS H 4000 A5052P", ks: "KS D 6701 A5052P", desc: "Aluminum alloy sheets" },
    { type: "Plastics", jis: "JIS K 6911 POM", ks: "KS M 3006 POM", desc: "Polyacetal resin" },
    { type: "Fasteners", jis: "JIS B 1180", ks: "KS B 1002", desc: "Hexagon head bolts" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            JIS & KS Standard Comparison
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Easily map Japanese Industrial Standards (JIS) to Korean Industrial Standards (KS) to find the exact equivalent materials and components.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-12 shadow-sm">
          <input 
            type="text" 
            placeholder="Search by material code (e.g., SUS304, SS400)..." 
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-lg focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-4 top-4 h-6 w-6 text-slate-400" />
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
            <div className="p-4 md:col-span-2">Category</div>
            <div className="p-4 md:col-span-4 flex items-center gap-2">JIS <span className="text-xs font-normal text-slate-400">(Japan)</span></div>
            <div className="hidden md:flex p-4 md:col-span-1 items-center justify-center"></div>
            <div className="p-4 md:col-span-5 flex items-center gap-2">KS <span className="text-xs font-normal text-slate-400">(Korea)</span></div>
          </div>
          
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {mappings.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-0 hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors group">
                <div className="p-4 md:col-span-2 font-medium text-slate-500">{item.type}</div>
                <div className="p-4 md:col-span-4">
                  <div className="font-bold text-slate-900 dark:text-white text-lg">{item.jis}</div>
                  <div className="text-sm text-slate-500">{item.desc}</div>
                </div>
                <div className="hidden md:flex p-4 md:col-span-1 items-center justify-center text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors">
                  <ArrowRightLeft className="h-5 w-5" />
                </div>
                <div className="p-4 md:col-span-5">
                  <div className="font-bold text-slate-900 dark:text-white text-lg">{item.ks}</div>
                  <div className="text-sm text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900/50 text-center">
          <p className="text-blue-800 dark:text-blue-300">
            <strong>Note:</strong> While many JIS and KS standards are functionally equivalent, slight variations in chemical composition or testing methods may exist. Always verify specific tolerances with the manufacturer.
          </p>
        </div>
      </div>
    </div>
  );
}
