import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { UserPlus, ShieldAlert, Key } from "lucide-react";

export default async function AdminAccountsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const admins = [
    { id: 1, name: "System Owner", email: "root@kjkakehashi.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "Sales Manager", email: "sales@kjkakehashi.com", role: "Sales Admin", status: "Active" },
    { id: 3, name: "Content Mod", email: "mod@kjkakehashi.com", role: "Moderator", status: "Inactive" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Key className="h-6 w-6" /> Admin Accounts
        </h1>
        <Button className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
          <UserPlus className="h-4 w-4 mr-2" /> Create Sub-Admin
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-950 border-b dark:border-slate-800">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-500">Name</th>
              <th className="px-6 py-3 font-medium text-slate-500">Email</th>
              <th className="px-6 py-3 font-medium text-slate-500">Role</th>
              <th className="px-6 py-3 font-medium text-slate-500">Status</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">Access Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {admins.map(admin => (
              <tr key={admin.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  {admin.role === "Super Admin" && <ShieldAlert className="h-4 w-4 text-red-500" />}
                  {admin.name}
                </td>
                <td className="px-6 py-4 text-slate-500">{admin.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${admin.role === 'Super Admin' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                    {admin.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1 text-xs font-medium ${admin.status === 'Active' ? 'text-green-600' : 'text-slate-400'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${admin.status === 'Active' ? 'bg-green-600' : 'bg-slate-400'}`}></span>
                    {admin.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button size="sm" variant="outline" className="text-xs h-8" disabled={admin.role === 'Super Admin'}>
                    Edit Permissions
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
