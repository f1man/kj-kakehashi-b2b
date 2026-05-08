import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { Send, Upload, FileText } from "lucide-react";
import Link from "next/link";

export default async function GeneralRFQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {dict.rfq?.title || "Request for Quotation (RFQ)"}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          {dict.rfq?.description || "Submit a general RFQ to multiple verified suppliers at once. Our AI matching system will route your request to the best manufacturers."}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-950 border dark:border-slate-800 rounded-2xl shadow-sm p-8">
        <form className="space-y-8">
          {/* Product Needs */}
          <div>
            <h2 className="text-lg font-semibold border-b pb-2 mb-6">1. Target Product / Component</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Product Name or Category</label>
                <input type="text" className="w-full px-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-900" placeholder="e.g. Linear Guide Rail, 24V Servo Motor..." />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Target Quantity</label>
                  <input type="number" className="w-full px-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-900" placeholder="e.g. 100" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Delivery Deadline</label>
                  <input type="date" className="w-full px-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-900" />
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-lg font-semibold border-b pb-2 mb-6">2. Technical Specifications</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Detailed Requirements (Tolerances, Material, Standard)</label>
                <textarea className="w-full px-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-900 min-h-[120px]" placeholder="Specific material requirements, tolerances (e.g. ±0.01mm), or compatibility needs..."></textarea>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Attachments (Drawings, CAD, Specs)</label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <Upload className="h-8 w-8 text-slate-400 mb-3" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Drag and drop or click to upload</span>
                  <span className="text-xs text-slate-500 mt-1">Supports PDF, STEP, DXF, IGES up to 50MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Info */}
          <div>
            <h2 className="text-lg font-semibold border-b pb-2 mb-6">3. Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company Name</label>
                <input type="text" className="w-full px-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-900" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Business Email</label>
                <input type="email" className="w-full px-4 py-3 border rounded-lg bg-slate-50 dark:bg-slate-900" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end gap-4">
            <Link href={`/${lang}`}>
              <Button variant="outline" className="h-12 px-6">Cancel</Button>
            </Link>
            <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-lg flex items-center gap-2">
              <Send className="h-5 w-5" /> Submit General RFQ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
