import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Clock, MessageSquare, Paperclip } from "lucide-react";

export default async function DashboardRFQsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const mockRfqs = [
    {
      id: "RFQ-2026-001",
      productName: "High-Precision Servo Motor KV-7000 Series",
      buyerCompany: "Toyota Manufacturing",
      buyerContact: "Kenji Sato (Procurement Lead)",
      quantity: 500,
      deadline: "2026-06-15",
      notes: "Need the servo motors with custom IP68 waterproofing modification for our new assembly line. Please include CAD drawings of the modified housing in your quote.",
      hasAttachment: true,
      status: "Pending",
      date: "2026-05-08"
    },
    {
      id: "RFQ-2026-002",
      productName: "Proximity Sensor E2E",
      buyerCompany: "Hyundai Robotics",
      buyerContact: "Ji-hoon Park",
      quantity: 2000,
      deadline: "2026-07-01",
      notes: "Standard specifications. Required for Q3 production run.",
      hasAttachment: false,
      status: "Responded",
      date: "2026-05-07"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {dict.dashboard?.sidebar?.rfqs || "RFQ Inbox & Lead Management"}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockRfqs.map((rfq) => (
          <div key={rfq.id} className="bg-white dark:bg-slate-950 border dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
            {/* Header */}
            <div className={`px-6 py-4 border-b flex items-start md:items-center justify-between gap-4 ${rfq.status === 'Pending' ? 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-slate-800' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800'}`}>
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full flex-shrink-0 ${rfq.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                  {rfq.status === 'Pending' ? <Clock className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{rfq.id}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${rfq.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-400' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'}`}>
                      {rfq.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400">{rfq.productName}</h3>
                </div>
              </div>
              <div className="text-right hidden md:block text-sm text-slate-500">
                Received: {rfq.date}
              </div>
            </div>
            
            {/* Body */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Col: Buyer Details */}
              <div className="lg:col-span-1 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Buyer Information</h4>
                  <p className="font-semibold text-slate-900 dark:text-white">{rfq.buyerCompany}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{rfq.buyerContact}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Order Details</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Quantity:</strong> {rfq.quantity} units</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Deadline:</strong> {rfq.deadline}</p>
                </div>
              </div>

              {/* Right Col: Notes & Attachments */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Specific Requirements / Notes
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg text-sm text-slate-700 dark:text-slate-300 border dark:border-slate-800">
                    {rfq.notes}
                  </div>
                </div>
                
                {rfq.hasAttachment && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                      <Paperclip className="h-4 w-4 mr-2" /> Download Attached Specs (ZIP)
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <input type="text" placeholder="Add internal memo (e.g. Needs engineering review)..." className="w-full sm:w-80 px-3 py-1.5 text-sm border rounded-md dark:bg-slate-950 dark:border-slate-700" />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none">
                  Archive
                </Button>
                {rfq.status === 'Pending' && (
                  <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700">
                    Send Official Quote
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
