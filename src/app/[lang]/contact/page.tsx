import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          {dict.inquiry.title}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          {dict.inquiry.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8 md:col-span-1">
          <div className="bg-blue-50 dark:bg-slate-900 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full text-blue-600 dark:text-blue-400">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Email</h4>
                  <p className="text-slate-500">support@kjkakehashi.com</p>
                  <p className="text-slate-500">sales@kjkakehashi.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full text-blue-600 dark:text-blue-400">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Phone</h4>
                  <p className="text-slate-500">+82 (0)2-1234-5678 (KR)</p>
                  <p className="text-slate-500">+81 (0)3-1234-5678 (JP)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full text-blue-600 dark:text-blue-400">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Office</h4>
                  <p className="text-slate-500">Gangnam-gu, Seoul, South Korea</p>
                  <p className="text-slate-500">Minato-ku, Tokyo, Japan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {dict.inquiry.form.company}
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900" placeholder="Your Company Name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {dict.inquiry.form.name}
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {dict.inquiry.form.email}
                  </label>
                  <input type="email" className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {dict.inquiry.form.phone}
                  </label>
                  <input type="tel" className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900" placeholder="+82 10-1234-5678" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {dict.inquiry.form.type}
                </label>
                <select className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                  <option value="partnership">{dict.inquiry.form.typeOptions.partnership}</option>
                  <option value="support">{dict.inquiry.form.typeOptions.support}</option>
                  <option value="sales">{dict.inquiry.form.typeOptions.sales}</option>
                  <option value="other">{dict.inquiry.form.typeOptions.other}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {dict.inquiry.form.message}
                </label>
                <textarea 
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 min-h-[150px]" 
                  placeholder="How can we help you?" 
                  required
                ></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg flex items-center justify-center gap-2">
                <Send className="h-5 w-5" /> {dict.inquiry.form.submit}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
