"use client";

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { UploadCloud, File, CheckCircle, TrendingUp, AlertCircle, CreditCard, ChevronRight } from "lucide-react"

type Step = 'UPLOAD' | 'ANALYZING' | 'SELECTING' | 'PAYMENT' | 'SUCCESS';

interface DisputableItem {
  id: string;
  title: string;
  reason: string;
}

export default function NewDisputePage() {
  useSession()
  const router = useRouter()
  
  const [file, setFile] = useState<File | null>(null)
  const [step, setStep] = useState<Step>('UPLOAD')
  const [items, setItems] = useState<DisputableItem[]>([])
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set())
  const [isFinishing, setIsFinishing] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!file) return
    setStep('ANALYZING')
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/analyze-report', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data = await response.json()
      console.log('AI Analysis Data received on client:', data)
      
      // Adapt AI response structure to the UI component's expected format
      const analysisItems = (data.items || []).map((entry: any, index: number) => ({
        id: `ai-item-${index}`,
        title: entry.title || entry.item || 'Unknown Disputable Item',
        reason: entry.reason
      }))

      setItems(analysisItems)
      setStep('SELECTING')

      // Track submission via webhook
      await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'APPLICATION_SUBMITTED',
          data: {
            fileName: file.name,
            itemCount: data.items?.length || 0
          }
        }),
      });

    } catch (error) {
      console.error(error)
      setStep('UPLOAD')
      alert("Something went wrong with the AI analysis. Please try again.")
    }
  }

  const toggleItem = (id: string) => {
    const newSelected = new Set(selectedItemIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedItemIds(newSelected)
  }

  const handleCheckout = () => {
    setStep('PAYMENT')
  }

  const submitPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsFinishing(true)
    
    try {
      // Map selected IDs back to item data
      const selectedItems = items.filter(it => selectedItemIds.has(it.id))

      // Actually create the disputes in the database
      const response = await fetch('/api/disputes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: selectedItems })
      })

      if (!response.ok) throw new Error('Failed to create disputes')

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Final webhook for payment received
      await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'PAYMENT_RECEIVED',
          data: {
            amount: selectedItemIds.size * 2.50,
            itemCount: selectedItemIds.size
          }
        }),
      });

      setStep('SUCCESS')

    } catch (error) {
      console.error(error)
      setIsFinishing(false)
      alert("There was an error processing your request. Please try again.")
    }
  }

  const totalCost = selectedItemIds.size * 2.50

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 py-4 sticky top-0 z-10 shadow-sm">
        <div className="container flex justify-between items-center">
          <Link href="/dashboard/client" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors">
            <span>← Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className={`h-2 w-10 rounded-full ${step === 'UPLOAD' ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className={`h-2 w-10 rounded-full ${step === 'ANALYZING' ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className={`h-2 w-10 rounded-full ${step === 'SELECTING' ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className={`h-2 w-10 rounded-full ${step === 'PAYMENT' ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className={`h-2 w-10 rounded-full ${step === 'SUCCESS' ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          </div>

        </div>
      </header>

      <main className="container py-12 max-w-4xl">
        {step === 'UPLOAD' && (
          <div className="animate-fade-in">
            <div className="mb-10 text-center">
              <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Step 1: Data Intake</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Upload Your Credit Report</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Upload your complete report as a PDF. Our advanced AI will identify errors in seconds.</p>
            </div>

            <div className="card-premium max-w-2xl mx-auto p-1 bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer
                  ${file ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'}`}
                onClick={() => document.getElementById('report-upload')?.click()}
              >
                <input 
                  id="report-upload" 
                  type="file" 
                  accept="application/pdf"
                  className="hidden" 
                  onChange={handleFileChange}
                />
                
                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                      <File size={40} />
                    </div>
                    <p className="font-bold text-xl text-slate-900">{file.name}</p>
                    <p className="text-sm text-slate-500 mt-2">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button className="text-indigo-600 font-semibold text-sm mt-6 hover:underline" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                      Change File
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-slate-400">
                      <UploadCloud size={40} />
                    </div>
                    <p className="font-bold text-xl text-slate-900 mb-2">Drop your PDF here</p>
                    <p className="text-slate-500">or click to browse your local storage</p>
                  </div>
                )}
              </div>

              <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                <button 
                  className={`btn-primary w-full py-5 text-lg font-bold flex items-center justify-center gap-3 ${!file ? 'opacity-50 cursor-not-allowed grayscale' : 'shadow-indigo-500/20 shadow-xl'}`}
                  disabled={!file}
                  onClick={handleSubmit}
                >
                  Analyze with AI <ChevronRight size={20} />
                </button>
                <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
                  <TrendingUp size={14} /> AI Processing power provided by GPT-4o
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'ANALYZING' && (
          <div className="text-center py-20 animate-pulse">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-200 animate-bounce">
              <TrendingUp className="text-white h-12 w-12" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Analyzing Discrepancies...</h3>
            <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">
              Our AI is scanning thousands of data points across your credit report to identify potential inaccuracies.
            </p>
            <div className="mt-12 max-w-xs mx-auto">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 animate-progress-fast" />
              </div>
            </div>
          </div>
        )}

        {step === 'SELECTING' && (
          <div className="animate-fade-in flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="mb-10">
                <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Analysis Complete</span>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">AI Found {items.length} Issues</h2>
                <p className="text-slate-500 text-lg">Select the items you would like us to dispute on your behalf.</p>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => toggleItem(item.id)}
                    className={`group p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex gap-5 items-start
                      ${selectedItemIds.has(item.id) 
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-100' 
                        : 'border-white bg-white hover:border-slate-200 shadow-sm'}`}
                  >
                    <div className={`mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                      ${selectedItemIds.has(item.id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'}`}>
                      {selectedItemIds.has(item.id) && <div className="h-2 w-2 rounded-full bg-white animate-scale-in" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                      <div className="flex items-start gap-2 bg-white/50 p-3 rounded-xl border border-slate-100 mt-2">
                        <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600 leading-relaxed italic">"{item.reason}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-80 shrink-0">
              <div className="sticky top-28 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-100/50">
                <h3 className="font-bold text-slate-900 text-xl mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Selected Items</span>
                    <span className="font-bold text-slate-900">{selectedItemIds.size}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Cost per dispute</span>
                    <span className="font-bold text-slate-900">$2.50</span>
                  </div>
                  <div className="h-px bg-slate-100 my-4" />
                  <div className="flex justify-between items-center bg-indigo-50 -mx-4 px-4 py-3 rounded-xl">
                    <span className="font-bold text-indigo-900">Total Calculation</span>
                    <span className="text-2xl font-black text-indigo-600">${totalCost.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    disabled={selectedItemIds.size === 0}
                    onClick={handleCheckout}
                    className={`btn-primary w-full py-4 font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-100
                      ${selectedItemIds.size === 0 ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                  >
                    <CreditCard size={18} /> Continue to Checkout
                  </button>
                  <p className="text-center text-[10px] text-slate-400 leading-tight">
                    By clicking, you authorize our AI to generate legal dispute letters for the selected items.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'PAYMENT' && (
          <div className="animate-fade-in max-w-xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Secure Checkout</h2>
              <p className="text-slate-500 text-lg">Enter your payment details to finalize {selectedItemIds.size} dispute packets.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-100/50">
              <form onSubmit={submitPayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Card Information</label>
                  <div className="relative">
                    <CreditCard size={20} className="absolute left-4 top-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="4242 4242 4242 4242" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Expiry Date</label>
                    <input 
                      type="text" 
                      required
                      placeholder="MM/YY" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">CVC</label>
                    <input 
                      type="text" 
                      required
                      placeholder="123" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-500 font-medium">Total Billed Today</span>
                    <span className="text-3xl font-black text-indigo-600">${totalCost.toFixed(2)}</span>
                  </div>
                  
                  <button 
                    disabled={isFinishing}
                    type="submit"
                    className={`btn-primary w-full py-4 font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-100
                      ${isFinishing ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                  >
                    {isFinishing ? 'Processing Payment...' : `Pay $${totalCost.toFixed(2)}`}
                  </button>
                </div>
              </form>
            </div>
            
            <button 
              onClick={() => setStep('SELECTING')}
              className="mt-6 text-slate-400 font-bold hover:text-slate-600 w-full text-center text-sm"
            >
              ← Back to item selection
            </button>
          </div>
        )}

        {step === 'SUCCESS' && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-200">
              <CheckCircle className="text-white h-12 w-12" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-4">Submission Successful!</h3>
            <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed mb-8">
              Your disputes have been generated and sent for electronic signing. We'll notify you as soon as they are mailed.
            </p>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-sm mx-auto shadow-sm mb-8">
              <div className="flex justify-between items-center mb-0">
                <span className="text-sm text-slate-500">Receipt Number</span>
                <span className="text-sm font-mono font-bold text-slate-900">RC-{Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
            </div>

            <Link 
              href="/dashboard/client/disputes"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
            >
              View My Disputes <ChevronRight size={18} />
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
