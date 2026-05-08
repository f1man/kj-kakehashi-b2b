import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import Link from "next/link";
import { ShieldAlert, Users, Box, BarChart2, Tags, Key } from "lucide-react";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const navItems = [
    { icon: BarChart2, label: dict.admin?.overview || "Overview", href: `/${lang}/admin` },
    { icon: Users, label: dict.admin?.users || "User Management", href: `/${lang}/admin/users` },
    { icon: Box, label: dict.admin?.products || "Product Moderation", href: `/${lang}/admin/products` },
    { icon: Tags, label: "Category Management", href: `/${lang}/admin/categories` },
    { icon: Key, label: "Admin Accounts", href: `/${lang}/admin/accounts` },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* ADMIN SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:block">
        <div className="p-6 flex items-center gap-2 border-b border-slate-800">
          <ShieldAlert className="h-6 w-6 text-red-500" />
          <h2 className="text-xl font-bold text-white">
            {dict.admin?.title || "Super Admin"}
          </h2>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ADMIN MAIN CONTENT */}
      <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
