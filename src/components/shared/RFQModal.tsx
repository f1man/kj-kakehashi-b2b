"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, Send } from "lucide-react";

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  lang: string;
  dict: any; // Passed from parent server component
}

export default function RFQModal({ isOpen, onClose, productName, lang, dict }: RFQModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white dark:bg-slate-950 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {dict.rfq.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {dict.rfq.description}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white p-2 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="mb-6 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border dark:border-slate-800">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Target Product</span>
            <div className="font-semibold text-slate-900 dark:text-white mt-1">{productName}</div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {dict.rfq.form.quantity} *
                </label>
                <input type="number" min="1" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900" placeholder="100" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {dict.rfq.form.deadline}
                </label>
                <input type="date" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.rfq.form.notes}
              </label>
              <textarea 
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 min-h-[100px]" 
                placeholder="Specific material requirements, tolerances, or custom modifications needed..." 
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {dict.rfq.form.attachFiles}
              </label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <Upload className="h-6 w-6 text-slate-400 mb-2" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Drag and drop or click to upload CAD (.step, .dxf) or PDF files
                </span>
              </div>
            </div>
          </form>
        </div>
        
        <div className="p-6 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            {dict.rfq.form.cancel}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Send className="h-4 w-4" /> {dict.rfq.form.submit}
          </Button>
        </div>
      </div>
    </div>
  );
}
