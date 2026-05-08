import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { Check, X, Shield, Building2, CreditCard, UserCheck } from "lucide-react";

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const pendingUsers = [
    { id: 1, company: "Hyundai Robotics", email: "admin@hyundai-robotics.com", regNumber: "123-45-67890", date: "2026-05-08", workflow: "신청중 (Pending)" },
    { id: 2, company: "Tokyo Tech Components", email: "sales@tokyotech.jp", regNumber: "987-65-43210", date: "2026-05-07", workflow: "입금완료 (Payment Received)" },
  ];

  const approvedUsers = [
    { id: 3, company: "Samsung Techwin", email: "contact@samsung.com", tier: "Premium", workflow: "처리완료 (Completed)" },
    { id: 4, company: "Omron Corporation", email: "global@omron.com", tier: "Pro", workflow: "처리완료 (Completed)" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {dict.admin?.users || "Enterprise Customer Management"}
        </h1>
      </div>

      {/* Onboarding Workflow Pipeline */}
      <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-amber-50 dark:bg-amber-900/20 px-6 py-4 border-b border-amber-100 dark:border-amber-900/30">
          <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-500 flex items-center gap-2">
            <Shield className="h-5 w-5" /> Applications & Payments Processing
          </h2>
        </div>
        <div className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b dark:border-slate-800">
              <tr>
                <th className="px-6 py-3 font-medium text-slate-500">Company</th>
                <th className="px-6 py-3 font-medium text-slate-500">Registration No.</th>
                <th className="px-6 py-3 font-medium text-slate-500">Workflow Status</th>
                <th className="px-6 py-3 font-medium text-slate-500">Tier Assignment</th>
                <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {pendingUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white flex flex-col">
                    <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-slate-400" /> {user.company}</span>
                    <span className="text-xs text-slate-500 font-normal pl-6 mt-1">{user.email}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{user.regNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.workflow.includes('입금완료') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {user.workflow}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select className="text-sm border-slate-200 rounded-md dark:bg-slate-950 dark:border-slate-700 py-1">
                      <option>Select Tier...</option>
                      <option>Free</option>
                      <option>Basic</option>
                      <option>Pro</option>
                      <option>Premium</option>
                      <option>Enterprise</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {user.workflow.includes('신청중') && (
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">
                        <CreditCard className="h-4 w-4 mr-1" /> Mark Paid
                      </Button>
                    )}
                    {user.workflow.includes('입금완료') && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <UserCheck className="h-4 w-4 mr-1" /> Finalize & Approve
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approved Users */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Active Verified Companies (처리완료)</h2>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-950 border-b dark:border-slate-800">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-500">Company</th>
              <th className="px-6 py-3 font-medium text-slate-500">Email</th>
              <th className="px-6 py-3 font-medium text-slate-500">Active Tier</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {approvedUsers.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{user.company}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                    {user.tier}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button size="sm" variant="ghost" className="text-slate-500 hover:text-blue-600">
                    Manage
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
