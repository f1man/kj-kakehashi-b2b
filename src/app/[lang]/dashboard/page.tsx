import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

import FileUpload from "@/components/shared/FileUpload";

export default async function DashboardProfilePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {dict.dashboard.profile.title}
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          {dict.dashboard.profile.save}
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg font-semibold mb-6 border-b pb-2">
          {dict.dashboard.profile.basicInfo}
        </h2>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.dashboard.profile.companyName} (Korean)
              </label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" defaultValue="테스트 기업" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.dashboard.profile.companyName} (Japanese)
              </label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" defaultValue="テスト企業" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {dict.dashboard.profile.description}
            </label>
            <textarea className="w-full px-3 py-2 border rounded-md min-h-[100px]" defaultValue="We are a leading provider of automation solutions..."></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {dict.dashboard.profile.aiSummary}
            </label>
            <textarea className="w-full px-3 py-2 border rounded-md bg-slate-50 dark:bg-slate-900 text-slate-500" readOnly defaultValue="Auto-generated summary from description..."></textarea>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg font-semibold mb-6 border-b pb-2">
          {dict.dashboard.profile.media}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload 
            label={dict.dashboard.profile.uploadLogo}
            subLabel="PNG, JPG up to 2MB"
            accept="image/png, image/jpeg"
            folder="companies/logos"
            iconType="image"
          />

          <FileUpload 
            label={dict.dashboard.profile.uploadCatalog}
            subLabel="PDF up to 10MB"
            accept="application/pdf"
            folder="companies/catalogs"
            iconType="document"
          />
        </div>
      </div>
    </div>
  );
}

// Ensure FileText icon is imported
import { FileText } from "lucide-react";
