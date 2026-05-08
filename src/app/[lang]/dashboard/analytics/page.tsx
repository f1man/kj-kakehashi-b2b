import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { BarChart3, TrendingUp, Eye, FileText, MousePointerClick } from "lucide-react";

export default async function DashboardAnalyticsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const stats = [
    { label: "Company Profile Views", value: "1,248", change: "+12%", icon: Eye, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "Product Page Views", value: "8,432", change: "+24%", icon: MousePointerClick, color: "text-indigo-600", bg: "bg-indigo-100 dark:bg-indigo-900/30" },
    { label: "Total RFQs Received", value: "42", change: "+5%", icon: FileText, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
    { label: "Search Impressions", value: "24,500", change: "+18%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {dict.dashboard?.sidebar?.analytics || "Analytics Dashboard"}
        </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md">
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Mock Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Traffic Overview</h3>
            <select className="text-sm border-slate-200 rounded-md dark:bg-slate-900 dark:border-slate-700">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900/50">
            <div className="text-center text-slate-400">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Chart rendering placeholder (e.g., Recharts)</p>
            </div>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-bold text-lg text-blue-900 dark:text-blue-400 mb-2 flex items-center gap-2">
            💡 Actionable Insights
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <li>• <strong>Linear Guide Rail HSR25</strong> has high views but low RFQs. Consider uploading a 3D CAD file to increase conversion.</li>
            <li>• Your profile is missing a <strong>Company Catalog PDF</strong>. Companies with catalogs receive 40% more leads.</li>
          </ul>
        </div>

        {/* Top Products Performance Table */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Per-Product Performance</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300">Product Name</th>
                <th className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 text-right">Click/Views</th>
                <th className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 text-right">RFQs Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { name: "High-Precision Servo Motor", views: "3,240", rfqs: "28" },
                { name: "Proximity Sensor E2E", views: "2,100", rfqs: "12" },
                { name: "Linear Guide Rail HSR25", views: "1,845", rfqs: "2" },
                { name: "Industrial Switch XG-200", views: "940", rfqs: "0" },
              ].map((prod, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{prod.name}</td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400 font-semibold">{prod.views}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${Number(prod.rfqs) > 10 ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : Number(prod.rfqs) > 0 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                      {prod.rfqs}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
