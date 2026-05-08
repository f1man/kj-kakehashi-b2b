import Link from "next/link";
import { Search, Menu, Building2, PackageSearch } from "lucide-react";
import LanguageToggle from "@/components/shared/LanguageToggle";
import { Button } from "@/components/ui/button";
import { type Locale } from "@/i18n-config";

export default function Header({ lang, dict }: { lang: Locale, dict: any }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm dark:bg-gray-950 dark:border-gray-800">
      {/* Top utility bar */}
      <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 h-10 flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-4">
            <Link href={`/${lang}/about`} className="hover:text-blue-600 transition-colors">Platform Info</Link>
            <Link href={`/${lang}/contact`} className="hover:text-blue-600 transition-colors">Inquiry</Link>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle currentLang={lang} />
            <div className="flex items-center gap-2 border-l pl-4 dark:border-gray-700">
              <Link href={`/${lang}/login`} className="hover:text-blue-600 transition-colors">Login</Link>
              <Link href={`/${lang}/register`} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">Register Company</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-md">
              <Building2 className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              KJ <span className="text-blue-600">Kakehashi</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href={`/${lang}/products`} className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              <PackageSearch className="h-4 w-4" />
              Products
            </Link>
            <Link href={`/${lang}/companies`} className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              <Building2 className="h-4 w-4" />
              Companies
            </Link>
            <Link href={`/${lang}/standards`} className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              JIS/KS Standards
            </Link>
            <Link href={`/${lang}/rfq`} className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              RFQ
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <input 
              type="text" 
              placeholder={dict?.home?.searchPlaceholder || "Search..."} 
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Button variant="outline" className="hidden md:flex">Post RFQ</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
