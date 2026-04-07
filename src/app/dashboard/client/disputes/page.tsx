
import { PlusSquare, Mail, FileText, Grid, Search, Printer, Trash2, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import DisputeTable from "@/components/DisputeTable"

export default async function DisputesPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string; status?: string }> 
}) {
  const session = await getServerSession(authOptions)
  const query = (await searchParams).q || ""
  const filterStatus = (await searchParams).status || "unsent"
  
  if (!session?.user) return null
  const userId = session.user.id

  // Fetch real letters from DB with filtering
  const dbLetters = await prisma.letter.findMany({
    where: { 
      dispute: { userId },
      OR: [
        { content: { contains: query, mode: 'insensitive' } },
        { postgridId: { contains: query, mode: 'insensitive' } }
      ]
    },
    include: { dispute: true },
    orderBy: { createdAt: "desc" }
  })
  
  // Logical filtering based on status
  const filteredLetters = dbLetters.filter(l => {
    if (filterStatus === 'sent') return !!l.postgridId || !!l.postgridStatus;
    if (filterStatus === 'received') return !!l.signedAt; // Simple logic: received = signed for now
    return !l.postgridId && !l.postgridStatus; // unsent
  })

  // Map DB letters to UI format
  const letters = filteredLetters.map((l) => ({
    id: l.id,
    date: l.createdAt.toLocaleDateString(),
    to: l.postgridId ? "Mailed via PostGrid" : "Bureau/Creditor",
    name: l.content.length > 30 ? l.content.substring(0, 30) + '...' : l.content,
    type: "AI Generated",
    active: false,
    status: l.postgridStatus ? (l.postgridStatus === 'SENT' ? 'Sent' : l.postgridStatus) : "Unsent"
  }))

  return (
    <div className="w-full relative animate-fade-in">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Dispute Center</h2>
          <div className="flex border border-slate-200 rounded-lg text-sm overflow-hidden bg-white shadow-sm">
            <button className="px-4 py-1.5 bg-indigo-50 text-indigo-700 font-bold border-r border-slate-200">Basic</button>
            <button className="px-4 py-1.5 text-slate-500 hover:bg-slate-50 font-medium">Advanced Control</button>
          </div>
        </div>

        {/* Success Overlay - Optional UI element */}
        {dbLetters.length > 0 && (
           <div className="bg-emerald-50 border border-emerald-100 shadow-sm rounded-full px-6 py-2 flex items-center gap-2 text-sm text-emerald-700 font-semibold animate-scale-in">
            <CheckCircle2 size={16} className="text-emerald-500" />
            {dbLetters.length} active letter{dbLetters.length === 1 ? '' : 's'} in progress
          </div>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-3 mb-8 w-full">
        <Link href="/dashboard/client/new" className="flex items-center gap-3 bg-white border border-slate-200 border-t-4 border-t-indigo-600 shadow-xl shadow-slate-100 px-6 py-4 rounded-xl text-indigo-600 hover:bg-slate-50 transition-all hover:-translate-y-1">
          <FileText size={24} />
          <span className="font-black text-xs leading-tight uppercase">Analyze &<br/>New Dispute</span>
        </Link>
        
        <Link href="/dashboard/client/disputes/log-reply" className="flex items-center gap-3 bg-white border border-slate-200 shadow-sm px-6 py-4 rounded-xl text-slate-400 group hover:border-indigo-200 transition-all decoration-none">
          <Mail size={24} className="group-hover:text-indigo-600 transition-colors" />
          <span className="font-bold text-xs uppercase leading-tight text-slate-500 group-hover:text-indigo-700">Log Bureau<br/>Reply</span>
        </Link>

        <Link href="/dashboard/client/disputes/followup" className="flex items-center gap-3 bg-white border border-slate-200 shadow-sm px-6 py-4 rounded-xl text-slate-400 group hover:border-indigo-200 transition-all decoration-none">
          <PlusSquare size={24} className="group-hover:text-indigo-600 transition-colors" />
          <span className="font-bold text-xs uppercase leading-tight text-slate-500 group-hover:text-indigo-700">Followup<br/>Letter</span>
        </Link>

        <Link href="/dashboard/client/disputes/custom" className="flex items-center gap-3 bg-white border border-slate-200 shadow-sm px-6 py-4 rounded-xl text-slate-400 group hover:border-indigo-200 transition-all decoration-none">
          <PlusSquare size={24} className="group-hover:text-indigo-600 transition-colors" />
          <span className="font-bold text-xs uppercase leading-tight text-slate-500 group-hover:text-indigo-700">Custom<br/>Request</span>
        </Link>

        <Link href="/dashboard/client" className="flex items-center gap-3 bg-white border border-slate-200 shadow-sm px-6 py-4 rounded-xl text-slate-400 group hover:border-sky-200 transition-all decoration-none">
          <Grid size={24} className="text-sky-500 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs uppercase leading-tight text-slate-500 group-hover:text-slate-700">Full<br/>Overview</span>
        </Link>

        <div className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-lg hover:rotate-12 transition-transform cursor-pointer ml-auto">
          <span className="text-2xl" title="AI Assistant Active">🤖</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 shadow-2xl shadow-slate-100 rounded-3xl overflow-hidden pb-4">
        
        {/* Table Content */}
        <div className="w-full">
          <DisputeTable initialLetters={letters} />
        </div>

        {/* Global Action Footer */}
        <div className="flex justify-between items-center px-8 py-6 border-t border-slate-50 bg-slate-50/20">
           <div className="text-xs text-slate-400 font-medium">Showing {letters.length} results in total</div>
           <div className="flex items-center gap-2">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed"><ChevronLeft size={16} /></button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-indigo-600 text-indigo-600 font-bold text-xs shadow-sm">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-slate-300 transition-all"><ChevronRight size={16} /></button>
           </div>
        </div>

      </div>
    </div>
  )
}
