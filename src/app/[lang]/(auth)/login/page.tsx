import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="text-center flex flex-col items-center">
          <div className="bg-blue-600 text-white p-2 rounded-xl mb-4">
            <Building2 className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {dict.auth?.login?.title || "Sign in"}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.auth?.login?.email || "Email address"}
              </label>
              <input 
                type="email" 
                required 
                className="mt-1 w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950" 
                placeholder="admin@company.com" 
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.auth?.login?.password || "Password"}
              </label>
              <input 
                type="password" 
                required 
                className="mt-1 w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <Link href={`/${lang}/dashboard`}>
            <Button type="button" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-semibold">
              {dict.auth?.login?.submit || "Sign in"}
            </Button>
          </Link>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">
            {dict.auth?.login?.noAccount || "Don't have an account?"}
          </span>{" "}
          <Link href={`/${lang}/register`} className="font-semibold text-blue-600 hover:text-blue-500">
            {dict.auth?.login?.register || "Register Company"}
          </Link>
        </div>
      </div>
    </div>
  );
}
