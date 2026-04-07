
"use client"

import { CheckCircle, ChevronLeft, Download, FileText, Printer, Share2 } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function LetterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const templates: Record<string, any> = {
    't1': { name: "Standard Debt Validation", content: "[Bureau Name]\n[Bureau Address]\n\nRE: Formal Dispute of Accuracy\n\nI am writing to formally dispute the following account information appearing on my credit report: [Account Name/Number]. Under the Fair Credit Reporting Act (FCRA), I have the right to request validation of any debt reported. Please provide proof of the original agreement..." },
    't2': { name: "Medical Debt Dispute", content: "[Bureau Name]\n[Bureau Address]\n\nRE: HIPAA Compliance & Billing Dispute\n\nI am disputing [Medical Account Name] on my credit report. This account appears to violate the Health Insurance Portability and Accountability Act (HIPAA) as it reveals private medical billing information without my consent. Furthermore, I have no record of this obligation..." },
    't3': { name: "Identity Theft Affidavit", content: "[Bureau Name]\n[Bureau Address]\n\nRE: Identity Theft Victim Statement\n\nThis is a formal notice that I am a victim of identity theft. The following accounts were NOT authorized by me: [Accounts]. I have filed a police report (Case #[Number]) and am requesting that these items be blocked from my credit report immediately under FCRA section 605B..." }
  };

  const template = templates[id] || templates['t1'];

  const handleDownload = () => {
    const content = `DISPUTE TEMPLATE: ${template.name}\n\n${template.content}\n\n[Your Signature Block Here]`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template_${id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-fade-in pb-32">
      <Link href="/dashboard/client/letters" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-10 transition-colors group">
         <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
         Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
         {/* Main Letter Content Area */}
         <div className="lg:col-span-2 bg-white rounded-3xl p-12 shadow-2xl shadow-slate-100 border border-slate-100 min-h-[600px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 opacity-10 pointer-events-none -z-0"></div>
            
            <div className="relative z-10 flex items-center gap-4 mb-12 border-b border-slate-50 pb-8">
               <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-indigo-500/20 shadow-xl border border-indigo-500">
                  <FileText size={32} />
               </div>
               <div>
                  <h1 className="text-3xl font-black text-slate-800 tracking-tight">{template.name}</h1>
                  <p className="text-slate-400 font-medium">Attorney-Reviewed Template • Last Update Oct 2023</p>
               </div>
            </div>

            <div className="relative z-10 font-serif text-slate-700 leading-loose text-lg bg-slate-50/50 p-10 rounded-2xl border border-slate-100 whitespace-pre-wrap select-none opacity-80 blur-[2px] hover:blur-none transition-all cursor-not-allowed">
               {template.content}
               <div className="absolute inset-x-0 bottom-0 py-20 bg-gradient-to-t from-white to-transparent flex items-end justify-center">
                  <span className="bg-slate-900 text-white px-6 py-2 rounded-full font-black text-sm uppercase shadow-2xl tracking-widest">Preview Mode Only</span>
               </div>
            </div>
         </div>

         {/* Action Sidebar */}
         <div className="space-y-6 lg:sticky lg:top-8">
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-slate-200 border border-slate-800">
               <h3 className="text-xl font-bold mb-6">Use This Template</h3>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-indigo-200/60">
                     <CheckCircle size={16} className="text-emerald-400" />
                     Includes AI Account Linking
                  </div>
                  <div className="flex items-center gap-3 text-sm text-indigo-200/60">
                     <CheckCircle size={16} className="text-emerald-400" />
                     Direct Bureau Transmission
                  </div>
                  <div className="flex items-center gap-3 text-sm text-indigo-200/60 mb-8">
                     <CheckCircle size={16} className="text-emerald-400" />
                     Certified Mail Tracking
                  </div>
               </div>

               <Link href="/dashboard/client/new" className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black text-sm uppercase rounded-2xl shadow-xl shadow-indigo-500/20 transition-all block text-center mt-8">
                  Create Dispute with AI
               </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-100 border border-slate-50 flex flex-col gap-4">
               <button 
                 onClick={handleDownload}
                 className="flex items-center gap-4 text-slate-600 font-bold hover:text-indigo-600 transition-colors py-2 group">
                  <Download size={20} className="text-slate-400 group-hover:text-indigo-600" />
                  Download PDF
               </button>
               <button 
                 onClick={() => window.print()}
                 className="flex items-center gap-4 text-slate-600 font-bold hover:text-indigo-600 transition-colors py-2 group border-t border-slate-50 pt-4">
                  <Printer size={20} className="text-slate-400 group-hover:text-indigo-600" />
                  Print for Manual Mailing
               </button>
               <button className="flex items-center gap-4 text-slate-600 font-bold hover:text-indigo-600 transition-colors py-2 group border-t border-slate-50 pt-4">
                  <Share2 size={20} className="text-slate-400 group-hover:text-indigo-600" />
                  Share with Affiliate
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
