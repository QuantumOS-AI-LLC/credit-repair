import { PlusSquare, Mail, FileText, Grid, Search, Printer, Trash2, Pencil, Download, Send, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function DisputesPage() {
  const user = await prisma.user.findFirst({ where: { role: "CLIENT" } })
  const userId = user?.id || "no-user"

  const dbLetters = await prisma.letter.findMany({
    where: { dispute: { userId } },
    include: { dispute: true },
    orderBy: { createdAt: "desc" }
  })
  
  // Transform DB letters or fallback to mock if DB is completely empty (for UI review purposes)
  const letters = dbLetters.length > 0 ? dbLetters.map((l: { id: string; createdAt: Date }) => ({
    id: l.id,
    date: l.createdAt.toLocaleDateString(),
    to: "Bureau/Creditor", // In a full app this would be extracted from JSON content
    name: "Automated Dispute Letter",
    type: "AI Generated",
    active: false
  })) : [
    { id: 'mock1', date: "5/25/2023", to: "TransUnion", name: "Collection Round 1 (bureau)", type: "Account", active: false },
    { id: 'mock2', date: "5/25/2023", to: "Experian", name: "Collection Round 1 (bureau)", type: "Account", active: false },
    { id: 'mock3', date: "5/25/2023", to: "Equifax", name: "Collection Round 1 (bureau)", type: "Account", active: true },
  ]

  return (
    <div className="w-full relative">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-medium text-gray-800">Disputes</h2>
          <div className="flex border border-gray-300 rounded-sm text-sm overflow-hidden bg-white">
            <button className="px-3 py-1 bg-[#f0f9ff] text-[#0284c7] border-r border-gray-300">Basic</button>
            <button className="px-3 py-1 text-gray-500 hover:bg-gray-50">Advanced</button>
          </div>
        </div>

        {/* Global Success Notification Overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-sm rounded-full px-6 py-2 flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle2 size={16} className="text-[#22c55e]" />
          Disputes created successfully.
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-2 mb-6 w-full">
        <button className="flex items-center gap-2 bg-white border-2 border-transparent border-t-4 border-t-[#3b82f6] shadow-sm px-4 py-3 rounded-sm text-[#3b82f6] hover:bg-gray-50">
          <FileText size={20} />
          <span className="font-bold text-xs">NEW<br/>DISPUTE</span>
        </button>
        
        <button className="flex items-center gap-2 bg-white border border-gray-300 shadow-sm px-4 py-3 rounded-sm text-gray-500 hover:bg-gray-50">
          <Mail size={20} className="text-[#3b82f6]" />
          <span className="font-bold text-xs text-gray-600">RECEIVED<br/>REPLY</span>
        </button>

        <button className="flex items-center gap-2 bg-white border border-gray-300 shadow-sm px-4 py-3 rounded-sm text-gray-500 hover:bg-gray-50">
          <PlusSquare size={20} className="text-[#3b82f6]" />
          <span className="font-bold text-xs text-gray-600">FOLLOWUP<br/>LETTER</span>
        </button>

        <button className="flex items-center gap-2 bg-white border border-gray-300 shadow-sm px-4 py-3 rounded-sm text-gray-500 hover:bg-gray-50">
          <FileText size={20} className="text-[#3b82f6]" />
          <span className="font-bold text-xs text-gray-600">OTHER<br/>LETTER</span>
        </button>

        <button className="flex items-center gap-2 bg-white border border-gray-300 shadow-sm px-4 py-3 rounded-sm text-gray-500 hover:bg-gray-50">
          <Grid size={20} className="text-[#0ea5e9]" />
          <span className="font-bold text-xs text-gray-600">DISPUTES<br/>OVERVIEW</span>
        </button>

        <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm ml-2">
          {/* Mock Bee Icon */}
          <span className="text-xl">🐝</span>
        </div>

        <div className="ml-auto">
          <a href="#" className="text-[#3b82f6] text-sm hover:underline">Watch the tutorial video</a>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-300 shadow-sm rounded-sm">
        
        {/* Table Toolbar */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="font-bold text-gray-700">Letters</span>
            <div className="flex gap-4 text-sm font-medium">
              <button className="text-[#3b82f6] border-b-2 border-[#3b82f6] pb-1">Unsent</button>
              <button className="text-gray-500 hover:text-gray-700 pb-1">Sent</button>
              <button className="text-gray-500 hover:text-gray-700 pb-1">Received</button>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <div className="relative">
                <Search size={14} className="absolute left-2 top-1.5 text-gray-400" />
                <input type="text" placeholder="Search" className="border border-gray-300 rounded-sm pl-7 pr-3 py-1 text-sm w-48 focus:outline-none" />
              </div>
              <button className="text-gray-600 text-sm font-medium px-2 py-1 border border-transparent hover:border-gray-300 rounded-sm">Clear</button>
            </div>
          </div>
          
          <div className="flex gap-4 text-gray-400">
            <Printer size={18} className="hover:text-gray-600 cursor-pointer" />
            <Trash2 size={18} className="hover:text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#f8fafc] text-xs font-bold text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" className="rounded-sm border-gray-300" />
                </th>
                <th className="px-4 py-4 cursor-pointer hover:bg-gray-100">Date <span className="text-[#9ea3b0] ml-1">⇅</span></th>
                <th className="px-4 py-4 cursor-pointer hover:bg-gray-100">To <span className="text-[#9ea3b0] ml-1">⇅</span></th>
                <th className="px-4 py-4">Letter Name</th>
                <th className="px-4 py-4 cursor-pointer hover:bg-gray-100">Type <span className="text-[#9ea3b0] ml-1">⇅</span></th>
                <th className="px-4 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {letters.map((letter: { id: string; date: string; to: string; name: string; type: string; active: boolean }) => (
                <tr key={letter.id} className={`border-b border-gray-100 hover:bg-gray-50 ${letter.active ? 'bg-[#f0f9ff]' : ''}`}>
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded-sm border-gray-300" />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{letter.date}</td>
                  <td className="px-4 py-4">{letter.to}</td>
                  <td className="px-4 py-4 text-gray-500">{letter.name}</td>
                  <td className="px-4 py-4">{letter.type}</td>
                  <td className="px-4 py-4 text-right text-gray-400 font-light flex items-center justify-end gap-4">
                    <Pencil size={16} className="text-[#0ea5e9] cursor-pointer hover:text-blue-600" />
                    <Download size={16} className="text-[#0ea5e9] cursor-pointer hover:text-blue-600" />
                    <Send size={16} className="text-[#3b82f6] cursor-pointer hover:text-blue-700" />
                    <Trash2 size={16} className="text-red-400 cursor-pointer hover:text-red-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Box */}
        <div className="flex justify-end p-4 border-t border-gray-200">
           <div className="flex items-center gap-2 text-sm text-[#0ea5e9]">
             <ChevronLeft size={16} className="text-gray-400 cursor-not-allowed" />
             <button className="px-3 py-1 bg-white border border-[#0ea5e9] rounded-sm text-[#0ea5e9] font-medium">1</button>
             <ChevronRight size={16} className="cursor-pointer" />
           </div>
        </div>

      </div>
    </div>
  )
}
