"use client";

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"
import Link from "next/link"


export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [address, setAddress] = useState("")
  const [cellPhone, setCellPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // In a real app we'd call an API route here: /api/profile
      // For now we simulate an update and redirect based on role
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const role = (session?.user as { role?: string })?.role?.toLowerCase() || 'client'
      router.push(`/dashboard/${role}`)
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="card max-w-lg w-full animate-fade-in shadow-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <span className="font-extrabold text-white text-xl">C</span>
            </div>
            <h1 className="text-slate-800 font-bold text-2xl tracking-tighter cursor-pointer group-hover:text-indigo-600 transition-colors">Credit Relief Today</h1>
          </Link>
          <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>

          <p className="text-muted">
            Hi {session?.user?.name || 'there'}! We just need a few more details to get your credit repair started.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="address">Mailing Address</label>
            <input 
              id="address"
              type="text" 
              className="input-field" 
              placeholder="123 Main St, Apt 4B, City, ST 12345"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <span className="text-xs text-muted">Where should we list your return address?</span>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="cellPhone">Cell Phone Number</label>
            <input 
              id="cellPhone"
              type="tel" 
              className="input-field" 
              placeholder="(555) 123-4567"
              value={cellPhone}
              onChange={(e) => setCellPhone(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn btn-primary w-full mt-6 py-4 text-lg"
          >
            {isSubmitting ? "Saving..." : "Save & Continue to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  )
}
