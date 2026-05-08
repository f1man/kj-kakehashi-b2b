import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function DashboardProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const mockProducts = [
    { id: 1, name: "High-Precision Servo Motor KV-7000 Series", category: "Factory Automation", status: "Active" },
    { id: 2, name: "Proximity Sensor E2E Next", category: "Industrial Sensors", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {dict.dashboard.products.list}
        </h1>
        <Link href={`/${lang}/dashboard/products/new`}>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" /> {dict.dashboard.products.addNew}
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{dict.dashboard.products.name}</th>
              <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{dict.dashboard.products.category}</th>
              <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{dict.dashboard.products.status}</th>
              <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-right">{dict.dashboard.products.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockProducts.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{product.name}</td>
                <td className="px-6 py-4 text-slate-500">{product.category}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
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
