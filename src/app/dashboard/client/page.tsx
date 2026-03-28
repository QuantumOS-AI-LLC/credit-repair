import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Play, Activity, CheckCircle2, Trash2, FileText, ArrowRight } from "lucide-react"
import { prisma } from "@/lib/prisma"

import { redirect } from "next/navigation"

export default async function ClientHomeDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect("/login?role=client&error=UnauthorizedRole")
  }


  const userId = session.user.id
  const userName = session.user.name?.split(' ')[0] || "Client"


  const activeDisputes = await prisma.dispute.count({
    where: { userId, status: { not: "COMPLETED" } }
  })

  const closedDisputes = await prisma.dispute.count({
    where: { userId, status: "COMPLETED" }
  })

  const itemsRemoved = await prisma.letter.count({
    where: { dispute: { userId } } // Mocking items removed as total letters sent
  })

  return (
    <div className="max-w-7xl mx-auto w-full space-y-8 pb-12">
      {/* Hero Welcome Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-[#1e1b4b] to-indigo-950 shadow-2xl border border-indigo-800/50">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-violet-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
        
        <div className="relative p-8 md:p-12 z-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All systems operational
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
              Welcome back, {userName}
            </h1>

            <p className="text-indigo-200/80 text-lg font-light leading-relaxed">
              Here&apos;s your personal credit repair command center. Let&apos;s take action today to build a stronger financial foundation for your future.
            </p>
          </div>
          <Link href="/dashboard/client/disputes" className="shrink-0 group relative inline-flex items-center justify-center gap-2 bg-white text-indigo-950 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:-translate-y-1 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Start New Dispute
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:border-blue-100 group relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
          <div className="relative z-10 flex justify-between items-start mb-2">
            <div className="p-3.5 bg-blue-50/80 backdrop-blur-sm rounded-2xl text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Activity size={24} strokeWidth={2.5} />
            </div>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100/50">Active</span>
          </div>
          <div className="relative z-10 mt-auto">
            <h3 className="text-gray-500 text-sm font-semibold mb-1 tracking-wide uppercase">Active Disputes</h3>
            <div className="text-4xl font-extrabold text-slate-800 tracking-tight">{activeDisputes}</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:border-emerald-100 group relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
          <div className="relative z-10 flex justify-between items-start mb-2">
            <div className="p-3.5 bg-emerald-50/80 backdrop-blur-sm rounded-2xl text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <CheckCircle2 size={24} strokeWidth={2.5} />
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-100/50">Resolved</span>
          </div>
          <div className="relative z-10 mt-auto">
            <h3 className="text-gray-500 text-sm font-semibold mb-1 tracking-wide uppercase">Closed Disputes</h3>
            <div className="text-4xl font-extrabold text-slate-800 tracking-tight">{closedDisputes}</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:border-rose-100 group relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-50 to-transparent rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
          <div className="relative z-10 flex justify-between items-start mb-2">
            <div className="p-3.5 bg-rose-50/80 backdrop-blur-sm rounded-2xl text-rose-600 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Trash2 size={24} strokeWidth={2.5} />
            </div>
            <span className="bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-full border border-rose-100/50">Lifetime</span>
          </div>
          <div className="relative z-10 mt-auto">
            <h3 className="text-gray-500 text-sm font-semibold mb-1 tracking-wide uppercase">Items Removed</h3>
            <div className="text-4xl font-extrabold text-slate-800 tracking-tight">{itemsRemoved}</div>
          </div>
        </div>

        {/* Card 4 - Status */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 shadow-lg text-white group relative overflow-hidden flex flex-col justify-between min-h-[160px] border border-slate-700">
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white opacity-[0.03] rounded-full transition-transform duration-700 group-hover:scale-150"></div>
          <div className="relative z-10 flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/5">
              <FileText size={18} className="text-gray-300" />
            </div>
            <h3 className="text-gray-200 text-sm font-bold tracking-wide">Report Status</h3>
          </div>
          <div className="relative z-10 space-y-3 mt-auto">
            <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
              <span className="text-gray-400 font-medium">Auto-Pull</span>
              <span className="font-semibold text-white bg-white/10 px-2 py-0.5 rounded text-xs">N/A</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-medium">Status</span>
              <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                Needs Action
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Getting Started Section */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent -z-10 opacity-60"></div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-gray-100 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-widest uppercase mb-2">
              <span className="w-8 h-0.5 bg-indigo-600 rounded-full"></span>
              Onboarding
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Your Action Plan</h2>
            <p className="text-gray-500 mt-2 text-lg">Complete these simple steps to put your credit repair on autopilot.</p>
          </div>
          <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-5 py-3 rounded-2xl flex items-center gap-2 font-bold transition-all duration-300 shadow-sm border border-indigo-100 hover:shadow group">
            <Play size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" /> 
            Watch Setup Guide
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connector Line (visible on large screens) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-100 via-indigo-100 to-emerald-100 -z-0"></div>

          {/* Step 1 */}
          <div className="relative group flex flex-col h-full bg-white rounded-2xl p-6 border-2 border-transparent hover:border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              1
            </div>
            <h4 className="font-bold text-slate-800 text-xl mb-3">Import Report</h4>
            <p className="text-gray-500 mb-8 leading-relaxed flex-grow">
              Securely link your credit report so our AI engine can instantly scan for inaccuracies and negative items.
            </p>
            <Link href="/dashboard/client/credit-report" className="mt-auto block text-center bg-blue-50 text-blue-700 px-5 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300 text-sm tracking-wide">
              Connect Report
            </Link>
          </div>

          {/* Step 2 */}
          <div className="relative group flex flex-col h-full bg-white rounded-2xl p-6 border-2 border-transparent hover:border-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
              2
            </div>
            <h4 className="font-bold text-slate-800 text-xl mb-3">Profile Setup</h4>
            <p className="text-gray-500 mb-8 leading-relaxed flex-grow">
              Complete your basic details to automatically populate personalized, mail-ready dispute letter templates.
            </p>
            <Link href="/dashboard/client/settings" className="mt-auto block text-center bg-indigo-50 text-indigo-700 px-5 py-3 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-colors duration-300 text-sm tracking-wide">
              Update Details
            </Link>
          </div>

          {/* Step 3 */}
          <div className="relative group flex flex-col h-full bg-white rounded-2xl p-6 border-2 border-transparent hover:border-violet-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-300">
              3
            </div>
            <h4 className="font-bold text-slate-800 text-xl mb-3">Launch Dispute</h4>
            <p className="text-gray-500 mb-8 leading-relaxed flex-grow">
              Use our guided wizard to instantly generate and send your first round of tailored dispute letters.
            </p>
            <Link href="/dashboard/client/disputes" className="mt-auto block text-center bg-violet-50 text-violet-700 px-5 py-3 rounded-xl font-bold hover:bg-violet-600 hover:text-white transition-colors duration-300 text-sm tracking-wide">
              Start Wizard
            </Link>
          </div>

          {/* Step 4 */}
          <div className="relative group flex flex-col h-full bg-emerald-50/50 rounded-2xl p-6 border-2 border-emerald-100 transition-all duration-300 z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-2xl flex items-center justify-center font-black mb-6 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="font-bold text-emerald-950 text-xl mb-3">You&apos;re All Set</h4>
            <p className="text-emerald-700/80 mb-8 leading-relaxed flex-grow">
              Your subscription is active. Follow the steps above to kickstart your journey. We&apos;re here if you need help!
            </p>
            <div className="mt-auto flex justify-center items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-emerald-500/20">
              Active Member
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
