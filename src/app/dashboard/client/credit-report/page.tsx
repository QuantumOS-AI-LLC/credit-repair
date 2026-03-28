import { ChevronRight, FileText, HelpCircle, Play } from "lucide-react"

export default function ImportCreditReportPage() {
  return (
    <div className="max-w-4xl mx-auto w-full py-8">
      <h2 className="text-2xl font-medium text-gray-700 mb-10 text-center">How to Import Your Credit Report</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        
        {/* Left Step */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-md p-8 w-full md:w-[400px] h-[360px] flex flex-col relative">
          <h3 className="font-semibold text-gray-800 text-center mb-8">Step 1. Create a Monitor Account</h3>
          
          <div className="mx-auto mb-6">
            {/* Mock Shield Design */}
            <div className="w-16 h-20 border-[3px] border-gray-300 rounded-b-full flex flex-col overflow-hidden relative">
              <div className="flex h-1/2 w-full border-b-[3px] border-gray-300">
                <div className="w-1/2 h-full bg-[#fde047]/20 border-r-[3px] border-gray-300"></div>
                <div className="w-1/2 h-full bg-[#38bdf8]/10"></div>
              </div>
              <div className="flex h-1/2 w-full">
                <div className="w-1/2 h-full bg-white border-r-[3px] border-gray-300"></div>
                <div className="w-1/2 h-full bg-[#fcd34d]/20"></div>
              </div>
            </div>
          </div>

          <div className="bg-[#f0f9ff] border border-[#bae6fd] p-4 text-center text-sm text-gray-600 rounded-sm mb-auto">
            You can access your credit report directly from the monitor. <br/>
            <span className="text-[#0284c7] font-bold">USE THIS LINK</span> to create an account and access your 3-bureau credit report instantly.
          </div>

          <div className="flex gap-2 w-full mt-4">
            <button className="flex-1 bg-[#2563eb] text-white text-xs py-2 px-2 flex items-center justify-center gap-1 rounded-sm font-medium hover:bg-blue-700">
              <HelpCircle size={14} /> What is it?
            </button>
            <button className="flex-[0.8] bg-[#2563eb] text-white text-xs py-2 px-2 flex items-center justify-center gap-1 rounded-sm font-medium hover:bg-blue-700">
              <Play size={14} fill="currentColor" /> Instructions
            </button>
          </div>
        </div>

        {/* Middle Arrow */}
        <div className="w-10 h-10 shrink-0 border-2 border-[#38bdf8] rounded-full flex items-center justify-center text-[#38bdf8] bg-white z-10 hidden md:flex">
          <ChevronRight size={24} />
        </div>
        <div className="md:hidden text-[#38bdf8]"><ChevronRight size={32} className="rotate-90" /></div>

        {/* Right Step */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-md p-8 w-full md:w-[400px] h-[360px] flex flex-col relative">
          <h3 className="font-semibold text-gray-800 text-center mb-8">Step 2. Import from Monitor</h3>
          
          <div className="mx-auto mb-6 mt-2 relative">
             <FileText size={48} className="text-gray-300" strokeWidth={1} />
             <div className="absolute top-4 left-3 w-6 h-0.5 bg-[#fcd34d]"></div>
             <div className="absolute top-6 left-3 w-6 h-0.5 bg-[#38bdf8]"></div>
             <div className="absolute top-8 left-3 w-4 h-0.5 bg-[#f87171]"></div>
          </div>

          <form className="mt-auto space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-500 mb-1">Email</label>
              <input type="email" defaultValue="lee@disput" className="w-full border border-[#cbd5e1] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
            </div>
            
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-xs font-semibold tracking-wide text-gray-500 mb-1">Password</label>
                <input type="password" placeholder="Password" className="w-full border border-[#cbd5e1] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div className="w-24">
                <label className="block text-xs font-semibold tracking-wide text-gray-500 mb-1">Last Four SSN</label>
                <input type="text" placeholder="Last 4 SSN" className="w-full border border-[#cbd5e1] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <button type="button" className="bg-[#22c55e] text-white font-medium px-4 py-2 rounded-sm text-sm hover:bg-green-600 transition-colors h-[38px]">
                Import
              </button>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="view-pass" className="rounded-sm border-gray-300" />
              <label htmlFor="view-pass" className="text-xs text-gray-500">View password?</label>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
