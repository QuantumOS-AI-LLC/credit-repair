
import { Search, BookOpen, Clock, Tag, ChevronRight, FileText, LucideIcon } from "lucide-react";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  readTime: string;
}

const templates: Template[] = [
  { id: 't1', name: "Standard Debt Validation", description: "General letter requesting proof of debt for any account appearing on your report.", category: "Bureaus", readTime: "2 min" },
  { id: 't2', name: "Medical Debt Dispute", description: "Specifically targets HIPAA-protected medical records and billing inaccuracies.", category: "Specialty", readTime: "3 min" },
  { id: 't3', name: "Identity Theft Affidavit", description: "Formal statement for accounts opened fraudulently in your name.", category: "Legal", readTime: "5 min" },
  { id: 't4', name: "Inquiry Removal Request", description: "Used to dispute hard inquiries that were not authorized by you.", category: "Bureaus", readTime: "1 min" },
  { id: 't5', name: "ChexSystems Cleanout", description: "For disputes specifically targeting banking and checking account reporting.", category: "Banking", readTime: "4 min" }
];

export default function LetterLibraryPage() {
  return (
    <div className="max-w-7xl mx-auto w-full space-y-10 pb-20 animate-fade-in">
      
      {/* Search & Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-600 mb-4 tracking-widest uppercase">
             Expert Resources
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Letter Library</h1>
           <p className="text-slate-500 text-lg leading-relaxed">
             Access our proprietary collection of attorney-reviewed dispute templates. Every letter is optimized for AI-driven customization.
           </p>
        </div>
        
        <div className="relative group w-full md:w-96">
          <Search size={20} className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search templates (e.g., 'medical')..." 
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 shadow-xl shadow-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
          />
        </div>
      </div>

      {/* Featured Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div key={template.id} className="group flex flex-col bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-110 opacity-40"></div>
            
            <div className="relative z-10 flex items-center justify-between mb-8">
               <div className="w-14 h-14 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center justify-center text-indigo-600">
                  <FileText size={28} />
               </div>
               <span className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100">
                  {template.category}
               </span>
            </div>

            <div className="relative z-10 flex-1 mb-8">
               <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors tracking-tight">
                 {template.name}
               </h3>
               <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                 {template.description}
               </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-slate-50 flex items-center justify-between">
               <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                 <Clock size={14} />
                 {template.readTime} reading
               </div>
               <Link href={`/dashboard/client/letters/${template.id}`} className="inline-flex items-center gap-1.5 text-indigo-600 font-black text-xs uppercase group-hover:translate-x-1 transition-transform">
                 Preview <ChevronRight size={14} />
               </Link>
            </div>
          </div>
        ))}

        {/* Custom Upload Card */}
        <div className="flex flex-col bg-slate-900 rounded-3xl p-8 relative overflow-hidden group border border-slate-800">
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10 mb-8">
             <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-white/5 shadow-xl shadow-black/20">
                <BookOpen size={28} />
             </div>
          </div>

          <div className="relative z-10 flex-1 mb-8">
             <h3 className="text-2xl font-bold text-white mb-3">Custom Library</h3>
             <p className="text-indigo-200/50 text-sm leading-relaxed">
               Need something built specifically for your situation? Connect with our attorney network.
             </p>
          </div>

          <div className="relative z-10">
             <button className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black text-sm uppercase rounded-2xl shadow-xl shadow-indigo-500/20 transition-all">
                Request Custom Template
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
