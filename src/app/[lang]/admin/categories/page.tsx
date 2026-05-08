import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { Tags, Plus, Trash2, Edit } from "lucide-react";

export default async function AdminCategoriesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const categories = [
    { id: 1, nameKo: "센서 / 스위치", nameJa: "センサー / スイッチ", slug: "sensors-switches", productCount: 1420 },
    { id: 2, nameKo: "모터 / 드라이브", nameJa: "モーター / ドライブ", slug: "motors-drives", productCount: 850 },
    { id: 3, nameKo: "공압 / 유압 기기", nameJa: "空圧 / 油圧機器", slug: "pneumatic-hydraulic", productCount: 630 },
    { id: 4, nameKo: "리니어 모션", nameJa: "リニアモーション", slug: "linear-motion", productCount: 410 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Tags className="h-6 w-6" /> Category Management
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Add New Category
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-950 border-b dark:border-slate-800">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-500">Korean Name</th>
              <th className="px-6 py-3 font-medium text-slate-500">Japanese Name</th>
              <th className="px-6 py-3 font-medium text-slate-500">URL Slug</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">Products Linked</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{cat.nameKo}</td>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{cat.nameJa}</td>
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{cat.slug}</td>
                <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400">{cat.productCount}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-red-600">
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
