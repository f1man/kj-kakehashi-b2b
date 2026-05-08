"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { i18n, type Locale } from "@/i18n-config";

export default function LanguageToggle({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLang = currentLang === "ko" ? "ja" : "ko";
    if (!pathname) return;
    
    // Replace the current locale in the pathname
    const segments = pathname.split("/");
    segments[1] = nextLang;
    const newPathname = segments.join("/");
    
    router.push(newPathname);
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <span className="font-medium text-sm">
        {currentLang === "ko" ? "日本語" : "한국어"}
      </span>
    </Button>
  );
}
