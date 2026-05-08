import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Building2, PackageSearch, FileText, CheckCircle } from "lucide-react";

export default async function AdminOverviewPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const stats = [
    { label: dict.admin?.stats?.totalUsers || "Total Registered Companies", value: "248", icon: Building2, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: dict.admin?.stats?.pendingApprovals || "Pending Approvals", value: "12", icon: CheckCircle, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
    { label: dict.admin?.stats?.totalProducts || "Total Products Indexed", value: "8,432", icon: PackageSearch, color: "text-indigo-600", bg: "bg-indigo-100 dark:bg-indigo-900/30" },
    { label: dict.admin?.stats?.totalRfqs || "Total RFQs Routed", value: "1,402", icon: FileText, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {dict.admin?.overview || "Platform Overview"}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Recent Platform Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border dark:border-slate-800">
            <span className="text-blue-600 font-semibold">New Registration</span>
            <span className="text-slate-700 dark:text-slate-300">Hyundai Robotics applied for partner account.</span>
            <span className="text-slate-400 ml-auto">10 mins ago</span>
          </div>
          <div className="flex items-center gap-4 text-sm p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border dark:border-slate-800">
            <span className="text-green-600 font-semibold">RFQ Routed</span>
            <span className="text-slate-700 dark:text-slate-300">RFQ-2026-005 sent to Omron Corporation.</span>
            <span className="text-slate-400 ml-auto">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
