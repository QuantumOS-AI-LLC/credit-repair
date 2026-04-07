
"use client";

import { useSearchParams } from 'next/navigation';
import { UploadCloud, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function GenericActionPage({ type }: { type: 'REPLY' | 'FOLLOWUP' | 'CUSTOM' }) {
  const titles = {
    REPLY: 'Log Bureau Reply',
    FOLLOWUP: 'Generate Follow-up Letter',
    CUSTOM: 'Create Custom Dispute Request'
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-fade-in">
      <Link href="/dashboard/client/disputes" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Disputes
      </Link>

      <div className="bg-white rounded-3xl p-10 shadow-2xl shadow-slate-100 border border-slate-100">
        <h1 className="text-3xl font-black text-slate-800 mb-2">{titles[type]}</h1>
        <p className="text-slate-500 mb-10 text-lg">Our AI will help you process this request in seconds.</p>

        <div className="space-y-8">
          <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 flex flex-col items-center justify-center text-center group hover:border-indigo-400 transition-all cursor-pointer">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200 mb-6 group-hover:scale-110 transition-transform">
              <UploadCloud size={40} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Upload the Bureau Letter</h3>
            <p className="text-slate-400 max-w-sm">Snap a photo or upload a PDF of the response you received to start the automated scan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-start gap-4">
               <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shrink-0">1</div>
               <div>
                  <h4 className="font-bold text-indigo-900">AI Scanning</h4>
                  <p className="text-sm text-indigo-700/70">We extract accounts, balances, and outcomes automatically.</p>
               </div>
             </div>
             <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start gap-4">
               <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0">2</div>
               <div>
                  <h4 className="font-bold text-emerald-900">Next Action</h4>
                  <p className="text-sm text-emerald-700/70">Our system identifies if a round 2 letter is needed.</p>
               </div>
             </div>
          </div>

          <button disabled className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg opacity-50 cursor-not-allowed">
             Analyze Bureau Response (Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
