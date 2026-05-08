"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DashboardProductCreatePage() {
  const params = useParams();
  const lang = params.lang as string;
  
  // Hardcoded dictionary fallback since we can't easily await async dictionaries in a purely client component
  // In a real app, you would pass the dictionary down from a server component wrapper
  const dict = lang === "ja" 
    ? {
        title: "製品登録",
        basicInfo: "基本情報",
        nameKo: "製品名 (韓国語)",
        nameJa: "製品名 (日本語)",
        category: "カテゴリー",
        specs: "技術仕様 (Specs)",
        addSpec: "仕様を追加",
        specName: "項目 (例: 電圧)",
        specValue: "値 (例: 24V DC)",
        submit: "製品を登録する"
      }
    : {
        title: "제품 등록",
        basicInfo: "기본 정보",
        nameKo: "제품명 (한국어)",
        nameJa: "제품명 (일본어)",
        category: "카테고리",
        specs: "기술 사양 (Specs)",
        addSpec: "사양 추가",
        specName: "사양 항목 (예: 전압)",
        specValue: "값 (예: 24V DC)",
        submit: "제품 등록하기"
      };

  const [specs, setSpecs] = useState([{ id: 1, name: "", value: "" }]);

  const addSpec = () => {
    setSpecs([...specs, { id: Date.now(), name: "", value: "" }]);
  };

  const removeSpec = (id: number) => {
    setSpecs(specs.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/${lang}/dashboard/products`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {dict.title}
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg font-semibold mb-6 border-b pb-2">
          {dict.basicInfo}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {dict.nameKo}
            </label>
            <input type="text" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {dict.nameJa}
            </label>
            <input type="text" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {dict.category}
            </label>
            <select className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900">
              <option>Factory Automation</option>
              <option>Industrial Sensors</option>
              <option>Network Equipment</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 border-b pb-2">
          <h2 className="text-lg font-semibold">
            {dict.specs}
          </h2>
          <Button type="button" variant="outline" size="sm" onClick={addSpec} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> {dict.addSpec}
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {specs.map((spec, index) => (
            <div key={spec.id} className="flex items-center gap-4">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder={dict.specName}
                  className="w-full px-3 py-2 border rounded-md bg-slate-50 dark:bg-slate-900" 
                />
              </div>
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder={dict.specValue}
                  className="w-full px-3 py-2 border rounded-md bg-slate-50 dark:bg-slate-900" 
                />
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => removeSpec(spec.id)}
                disabled={specs.length === 1}
                className="text-slate-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
            {dict.submit}
          </Button>
        </div>
      </div>
    </div>
  );
}
