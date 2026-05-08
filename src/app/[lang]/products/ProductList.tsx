"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Box, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import Link from "next/link";
import RFQModal from "@/components/shared/RFQModal";

interface ProductListProps {
  products: any[];
  lang: string;
  dict: any;
}

export default function ProductList({ products, lang, dict }: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  return (
    <>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg p-5 flex flex-col md:flex-row gap-6 hover:border-blue-300 transition-colors">
            <div className="w-full md:w-48 h-48 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0">
              <Box className="h-16 w-16 text-slate-300" />
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-semibold text-blue-600 mb-1 flex items-center gap-1">
                    <Tag className="h-3 w-3" /> {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    <Link href={`/${lang}/products/${product.id}`} className="hover:text-blue-600">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="text-sm text-slate-500 mb-4">{product.brand}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mb-4 text-sm bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <span className="text-slate-400 text-xs">{k}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{v as React.ReactNode}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-4">
                <div className="flex items-center text-xs text-green-600 font-medium">
                  <ShieldCheck className="h-4 w-4 mr-1" />
                  {dict.products.compatible}: {product.compatible}
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button variant="outline" className="flex-1 md:flex-none">
                    {dict.products.viewDetails}
                  </Button>
                  <Button 
                    className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {dict.products.requestQuote} <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <RFQModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        productName={selectedProduct?.name || ""}
        lang={lang}
        dict={dict}
      />
    </>
  );
}
