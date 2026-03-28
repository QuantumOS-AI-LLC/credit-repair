"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, List, BookOpen, PlayCircle, LogOut } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

const navItems = [
  { name: "Home", href: "/dashboard/client", icon: Home },
  { name: "Credit Report", href: "/dashboard/client/credit-report", icon: FileText },
  { name: "Disputes", href: "/dashboard/client/disputes", icon: List },
  { name: "Letter Library", href: "/dashboard/client/letters", icon: BookOpen }, // Assuming /letters
];

const resourceItems = [
  { name: "Video Tutorials", href: "/dashboard/client/tutorials", icon: PlayCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800 shrink-0 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none"></div>

      <div className="p-6 border-b border-white/5 relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <span className="font-extrabold text-white text-lg">C</span>
          </div>
          <div className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:from-white group-hover:to-indigo-300 transition-colors">
            CreditRelief
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 py-6 flex flex-col gap-2 w-full px-4 relative z-10 overflow-y-auto">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">Main Menu</div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 font-medium rounded-xl transition-colors group ${
                isActive 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon 
                size={18} 
                className={`transition-colors ${
                  isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                }`} 
              /> 
              {item.name}
            </Link>
          );
        })}
        
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-6 mb-2 px-3">Resources</div>
        {resourceItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 font-medium rounded-xl transition-colors group ${
                isActive 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon 
                size={18} 
                className={`transition-colors ${
                  isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                }`} 
              /> 
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 relative z-10">
        <div className="bg-gradient-to-br from-indigo-900/50 to-violet-900/50 rounded-2xl p-5 border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500 rounded-full filter blur-[40px] opacity-20"></div>
          <h4 className="text-white font-bold text-sm mb-1 relative z-10">Earn Rewards</h4>
          <p className="text-indigo-200/70 text-xs mb-4 relative z-10 leading-relaxed">Refer customers to us and earn a steady monthly income.</p>
          <Link href="/login?role=director" className="relative z-10 block w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs text-center rounded-xl transition-all shadow-md shadow-indigo-500/20">
            Become Affiliate
          </Link>
        </div>
      </div>
      <div className="px-6 pb-8 mt-auto relative z-10">
        <SignOutButton className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-400/5 transition-all rounded-xl font-medium group" />
      </div>
    </aside>
  );
}
