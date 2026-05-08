import Link from "next/link";
import { type Locale } from "@/i18n-config";

export default function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            KJ <span className="text-blue-400">Kakehashi B2B</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {lang === "ko" 
              ? "한일 산업용 데이터베이스 및 AI 검색 최적화 공급망 검색 플랫폼" 
              : "韓日産業用データベースおよびAI検索最適化サプライチェーン検索プラットフォーム"}
          </p>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${lang}/products`} className="hover:text-blue-400 transition-colors">Products Search</Link></li>
            <li><Link href={`/${lang}/companies`} className="hover:text-blue-400 transition-colors">Company Directory</Link></li>
            <li><Link href={`/${lang}/rfq`} className="hover:text-blue-400 transition-colors">Request for Quotation</Link></li>
            <li><Link href={`/${lang}/standards`} className="hover:text-blue-400 transition-colors">JIS/KS Comparison</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">For Business</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${lang}/register`} className="hover:text-blue-400 transition-colors">Register Company</Link></li>
            <li><Link href={`/${lang}/claim`} className="hover:text-blue-400 transition-colors">Claim your Business</Link></li>
            <li><Link href={`/${lang}/pricing`} className="hover:text-blue-400 transition-colors">Membership Tiers</Link></li>
            <li><Link href={`/${lang}/leads`} className="hover:text-blue-400 transition-colors">Lead Generation</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${lang}/terms`} className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            <li><Link href={`/${lang}/privacy`} className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href={`/${lang}/contact`} className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
        &copy; {new Date().getFullYear()} KJ Kakehashi B2B. All rights reserved.
      </div>
    </footer>
  );
}
