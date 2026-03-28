"use client";

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { ShieldAlert } from "lucide-react"

function LoginContent() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "client"
  const error = searchParams.get("error")

  const roleLabels: Record<string, string> = {
    client: "Client",
    director: "Program Director",
    admin: "Admin",
  }

  const handleGoogleLogin = () => {
    // Capture referral ID and intended role in cookies for server-side event
    const ref = searchParams.get("ref")
    if (ref) {
      document.cookie = `director_ref=${ref}; path=/; max-age=${60 * 60 * 24 * 30}`
    }
    
    // Set intended role
    document.cookie = `intended_role=${role}; path=/; max-age=3600` // 1 hour
    
    signIn("google", { callbackUrl: `/dashboard/${role}` })
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="card max-w-md w-full animate-fade-in shadow-md">
        {error === "UnauthorizedRole" && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-4 animate-shake">
            <div className="bg-rose-100 p-2 rounded-xl text-rose-600 shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-900">Access Denied</h3>
              <p className="text-xs text-rose-600 mt-0.5 leading-relaxed">
                Your account does not have permission to access the <strong>{roleLabels[role] || role}</strong> portal. 
                Please sign in with an authorized account.
              </p>
            </div>
          </div>
        )}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <span className="font-extrabold text-white text-xl">C</span>
            </div>
            <h1 className="text-primary font-bold text-2xl tracking-tighter cursor-pointer group-hover:text-indigo-600 transition-colors">Credit Relief Today</h1>
          </Link>
          <h2 className="text-xl font-semibold mb-1">
            Sign In / Register
          </h2>
          <p className="text-muted text-sm">
            Access your {roleLabels[role]} account using your Google ID.
          </p>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2 py-3 border-border"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-xs text-muted text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy. Currently, we only support Google Authentication.
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
