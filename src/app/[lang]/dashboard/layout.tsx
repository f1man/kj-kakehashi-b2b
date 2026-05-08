import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import Link from "next/link";
import { Building, Package, FileText, BarChart } from "lucide-react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const navItems = [
    { icon: Building, label: dict.dashboard.sidebar.profile, href: `/${lang}/dashboard` },
    { icon: Package, label: dict.dashboard.sidebar.products, href: `/${lang}/dashboard/products` },
    { icon: FileText, label: dict.dashboard.sidebar.rfqs, href: `/${lang}/dashboard/rfqs` },
    { icon: BarChart, label: dict.dashboard.sidebar.analytics, href: `/${lang}/dashboard/analytics` },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-950 border-r dark:border-slate-800 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {dict.dashboard.title}
          </h2>
        </div>
        <nav className="space-y-1 px-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
