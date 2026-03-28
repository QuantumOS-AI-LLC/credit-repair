import Link from "next/link"
import { Shield, Check, Phone, FileText, ArrowRight, BarChart3, Clock, Lock } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Utility Bar */}
      <div className="bg-slate-950 text-slate-300 py-2.5 text-xs font-medium border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-indigo-400 font-bold tracking-wide">Credit Relief Today</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span className="opacity-90 tracking-wide">America&apos;s Most Transparent Repair Service</span>
          </div>
          <div className="flex gap-8 items-center">
            <Link href="/login?role=director" className="hover:text-white transition-colors">Affiliate Portal</Link>
            <Link href="/login?role=client" className="hover:text-white transition-colors">Client Login</Link>
            <Link href="tel:18005550199" className="flex items-center gap-2 text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors">
              <Phone size={12} />
              <span className="font-semibold">1 (800) 555-0199</span>
            </Link>

          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 flex items-center">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Shield size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
               <span className="font-extrabold text-slate-800 text-xl leading-none tracking-tight">CREDIT RELIEF</span>
               <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mt-0.5">Today</span>
            </div>
          </Link>
          
          <div className="hidden md:flex flex-1 justify-center gap-10 items-center font-bold text-sm text-slate-600">
            <Link href="#how-it-works" className="hover:text-indigo-600 hover:scale-105 transition-all">How It Works</Link>
            <Link href="#pricing" className="hover:text-indigo-600 hover:scale-105 transition-all">Pricing</Link>
            <Link href="#results" className="hover:text-indigo-600 hover:scale-105 transition-all">Results</Link>
          </div>

          <div className="hidden md:block shrink-0">
            <Link href="/login?role=client" className="bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition-all duration-300 px-8 py-3 rounded-full relative overflow-hidden group inline-block font-bold text-sm">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative overflow-hidden bg-slate-50">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-indigo-100/50 via-violet-100/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-20 relative z-10">
          
          {/* Left Text */}
          <div className="w-full md:w-[55%]">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-200/50 shadow-sm mb-8 animate-fade-in-up">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               A+ BBB Accredited Business
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-8">
              Fix Your Credit Score. <br/>
              Pay Only <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">$2.50</span> Per Action.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-light">
              Escape expensive $100/month retainers. Our proprietary AI drafts legally sound, highly effective disputes. You only pay exact postage costs.
            </p>
            
            <ul className="space-y-4 mb-10 max-w-lg">
              <li className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-slate-200/50 shadow-sm backdrop-blur-sm">
                 <div className="bg-emerald-100/50 p-2.5 rounded-xl">
                   <Shield className="text-emerald-600" size={20} />
                 </div>
                 <span className="font-semibold text-slate-700">100% FCRA Compliant Disputes</span>
              </li>
              <li className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-slate-200/50 shadow-sm backdrop-blur-sm">
                 <div className="bg-blue-100/50 p-2.5 rounded-xl">
                   <BarChart3 className="text-blue-600" size={20} />
                 </div>
                 <span className="font-semibold text-slate-700">AI Analysis of Every Negative Item</span>
              </li>
              <li className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-slate-200/50 shadow-sm backdrop-blur-sm">
                 <div className="bg-rose-100/50 p-2.5 rounded-xl">
                   <Clock className="text-rose-600" size={20} />
                 </div>
                 <span className="font-semibold text-slate-700">Cancel Securely At Any Time</span>
              </li>
            </ul>
          </div>

          {/* Right Solid Form */}
          <div className="w-full md:w-[45%] max-w-md relative">
            {/* Form glowing background */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-3xl blur-2xl opacity-20 transform rotate-3 scale-105"></div>
            
            <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-3xl p-10 shadow-2xl relative z-10 transition-all hover:shadow-indigo-500/10">
               <div className="w-16 h-1 bg-indigo-500 rounded-full mb-8 relative overflow-hidden">
                 <div className="absolute inset-0 bg-white/50 w-full animate-[shimmer_2s_infinite]"></div>
               </div>
               
               <h3 className="text-2xl font-bold text-slate-800 mb-3">Check Eligibility</h3>
               <p className="text-sm text-slate-500 mb-8 leading-relaxed">Create your secure account instantly via Google to automatically analyze your credit report.</p>
               
               <div className="space-y-6 mb-10">
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Legal Name</label>
                   <div className="relative">
                     <input type="text" className="w-full bg-slate-50/50 border border-slate-200 text-slate-500 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium" placeholder="John Doe" disabled />
                     <Lock size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
                   </div>
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
                   <div className="relative">
                     <input type="email" className="w-full bg-slate-50/50 border border-slate-200 text-slate-500 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium" placeholder="johndoe@gmail.com" disabled />
                     <Lock size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
                   </div>
                 </div>
               </div>
               
               <Link href="/login?role=client" className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4.5 rounded-xl text-lg font-bold shadow-lg shadow-slate-900/20 hover:bg-indigo-600 hover:shadow-indigo-600/30 transition-all duration-300 group">
                 Continue with Google
                 <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
               </Link>

               <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                 <Shield size={16} className="text-emerald-500" />
                 <span>256-Bit SSL Secured</span>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* As Seen On / Trust Bar */}
      <section className="border-y border-slate-200/60 py-12 bg-slate-50/50">
        <div className="container mx-auto px-4 text-center">
           <p className="font-bold text-slate-400 text-xs mb-10 uppercase tracking-[0.25em]">Resolving negative items across all three major bureaus</p>
           <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-32 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
             <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">experian<span className="text-blue-600 text-4xl leading-none">.</span></span>
             </div>
             <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">EQUIFAX</span>
             </div>
             <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">TransUnion</span>
             </div>
           </div>
        </div>
      </section>

      {/* Educational Section - How it Works */}
      <section id="how-it-works" className="py-24 md:py-32 bg-slate-50 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Our Proven 3-Step Process</h2>
            <p className="text-slate-600 text-xl font-light leading-relaxed">
              We combined decades of credit repair knowledge with modern software to create the most transparent and effective dispute pipeline available to consumers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative items-stretch">
             {/* Desktop Connector Line - Adjusted to be more subtle and aligned */}
             <div className="hidden md:block absolute top-[15%] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0"></div>

             <div className="bg-white rounded-3xl p-10 border border-slate-200/50 shadow-xl shadow-slate-200/20 relative z-10 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
               <div className="w-20 h-20 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm text-blue-600 mx-auto md:mx-0">
                 <FileText size={36} />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center md:text-left">1. Evaluation</h3>
               <p className="text-slate-500 leading-relaxed text-center md:text-left flex-grow">Upload your credit report into your personal client dashboard. Our systems will run a comprehensive analysis <strong className="text-slate-700">free of charge</strong> to identify every derogatory mark suitable for dispute.</p>
             </div>

             <div className="bg-white rounded-3xl p-10 border border-slate-200/50 shadow-xl shadow-slate-200/20 relative z-10 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
               <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-violet-600/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm text-indigo-600 mx-auto md:mx-0">
                 <BarChart3 size={36} />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center md:text-left">2. AI Generation</h3>
               <p className="text-slate-500 leading-relaxed text-center md:text-left flex-grow">Our proprietary AI engine instantly crafts customized, FCRA-compliant dispute letters leveraging the strongest legal arguments for each specific negative item.</p>
             </div>

             <div className="bg-white rounded-3xl p-10 border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/5 relative z-10 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
               <div className="absolute -top-3 right-6 bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 uppercase tracking-widest z-20">Lowest Cost</div>
               <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm text-emerald-600 mx-auto md:mx-0">
                 <Check size={36} />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center md:text-left">3. Mailed Safely</h3>
               <p className="text-slate-500 leading-relaxed text-center md:text-left flex-grow">You pay just <strong className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md font-bold">$2.50</strong> per dispute action to cover physical printing and postage. We mail them directly to the bureaus and provide tracking.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Final Traditional CTA */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-slate-900 border-t border-slate-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600 rounded-full filter blur-[150px] opacity-25 pointer-events-none animate-pulse"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
           <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight leading-[1.05]">
            Stop Overpaying For <br className="hidden md:block" />
            <span className="text-indigo-400 underline decoration-indigo-400/30">Credit Repair</span>
           </h2>
           <p className="text-indigo-100/80 text-xl md:text-2xl mb-14 font-light leading-relaxed max-w-3xl mx-auto">
            Get a complete analysis of your credit report today. <strong className="font-bold text-white bg-indigo-500/30 px-2 py-0.5 rounded">Zero monthly memberships.</strong> Pay only a few dollars for the exact actions you authorize.
           </p>
           <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
             <Link href="/login?role=client" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-xl font-black px-12 py-5.5 rounded-2xl shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-1.5 active:scale-95">
               Sign Up Now
             </Link>
             <Link href="/login?role=director" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-md text-xl font-bold px-12 py-5.5 rounded-2xl transition-all duration-300 hover:border-white/40">
               Join Affiliate
             </Link>
           </div>
        </div>
      </section>

      {/* Standard Corporate Footer */}
      <footer className="bg-white py-16 md:py-20 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-slate-500 gap-10">
          <div className="flex flex-col">
             <div className="font-black text-slate-800 text-2xl mb-3 tracking-tighter">CREDIT RELIEF <span className="text-indigo-600">Today</span></div>
             <p className="text-slate-400 font-medium mb-4 max-w-xs">America&apos;s most transparent and affordable automated credit repair platform.</p>
             <div className="text-xs font-bold uppercase tracking-widest text-slate-400" suppressHydrationWarning>&copy; {new Date().getFullYear()} Credit Relief Today, LLC</div>

          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-6">
             <div className="flex flex-col gap-3">
               <span className="text-slate-900 font-bold uppercase tracking-wider text-xs mb-1">Product</span>
               <Link href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</Link>
               <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
               <Link href="#results" className="hover:text-indigo-600 transition-colors">Success Stories</Link>
             </div>
             <div className="flex flex-col gap-3">
               <span className="text-slate-900 font-bold uppercase tracking-wider text-xs mb-1">Company</span>
               <Link href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
               <Link href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
               <Link href="/login?role=admin" className="hover:text-indigo-600 transition-colors font-bold text-indigo-600">Admin Login</Link>
             </div>
             <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
               <span className="text-slate-900 font-bold uppercase tracking-wider text-xs mb-1">Support</span>
               <Link href="tel:18007354333" className="flex items-center gap-2 font-bold text-slate-700 hover:text-indigo-600 transition-colors group">
                 <Phone size={14} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                 <span>1-800-RELIEF</span>
               </Link>

               <p className="text-[11px] text-slate-400 mt-1">Available Mon-Fri 9am-6pm EST</p>
             </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

