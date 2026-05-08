import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2 } from "lucide-react";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-2xl w-full space-y-8 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            {dict.auth?.register?.title || "Register as a Partner"}
          </h2>
          <p className="text-slate-500">
            {dict.auth?.register?.description || "Join the platform and reach global buyers."}
          </p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.auth?.register?.companyName || "Company Name"}
              </label>
              <input type="text" required className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.auth?.register?.businessNumber || "Business Registration Number"}
              </label>
              <input type="text" required className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.auth?.register?.contactName || "Contact Person Name"}
              </label>
              <input type="text" required className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950" />
            </div>

            <div className="space-y-2 md:col-span-2 border-t pt-6 mt-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.auth?.register?.email || "Business Email (Login ID)"}
              </label>
              <input type="email" required className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.auth?.register?.password || "Password"}
              </label>
              <input type="password" required className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.auth?.register?.passwordConfirm || "Confirm Password"}
              </label>
              <input type="password" required className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950" />
            </div>
          </div>

          <Link href={`/${lang}/login`}>
            <Button type="button" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-semibold mt-8">
              {dict.auth?.register?.submit || "Submit Application"}
            </Button>
          </Link>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">
            {dict.auth?.register?.hasAccount || "Already have an account?"}
          </span>{" "}
          <Link href={`/${lang}/login`} className="font-semibold text-blue-600 hover:text-blue-500">
            {dict.auth?.register?.login || "Login here"}
          </Link>
        </div>
      </div>
    </div>
  );
}
