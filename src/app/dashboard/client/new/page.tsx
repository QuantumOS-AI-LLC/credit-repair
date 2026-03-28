"use client";

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { UploadCloud, File, CheckCircle } from "lucide-react"

export default function NewDisputePage() {
  useSession()
  const router = useRouter()
  
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
    setIsUploading(true)
    
    try {
      // Simulate file upload and AI processing start
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/client")
      }, 2000)

    } catch (error) {
      console.error(error)
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border py-4">
        <div className="container flex justify-between items-center">
          <Link href="/dashboard/client">
            <h1 className="text-xl font-bold text-primary hover:underline">← Back to Dashboard</h1>
          </Link>
        </div>
      </header>

      <main className="container py-12 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">New Credit Dispute</h2>
          <p className="text-muted">Upload your complete credit report as a PDF. Our AI will analyze it to find discrepancies.</p>
        </div>

        {isSuccess ? (
          <div className="card text-center py-16 animate-fade-in border-green-500 bg-green-50">
            <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-main">Upload Successful!</h3>
            <p className="text-muted">Our AI is now evaluating your report. Redirecting you...</p>
          </div>
        ) : (
          <div className="card animate-fade-in">
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer
                ${file ? 'border-primary bg-blue-50/10' : 'border-border hover:border-secondary hover:bg-surface'}`}
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
                  <File className="h-12 w-12 text-primary mb-4" />
                  <p className="font-medium text-lg">{file.name}</p>
                  <p className="text-sm text-muted mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button className="text-secondary text-sm mt-4 hover:underline" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <UploadCloud className="h-12 w-12 text-muted mb-4" />
                  <p className="font-medium text-lg mb-1">Drag and drop your PDF here</p>
                  <p className="text-sm text-muted">or click to browse from your computer</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <button 
                className={`btn w-full py-4 text-lg ${file ? 'btn-primary' : 'bg-border text-muted cursor-not-allowed'}`}
                disabled={!file || isUploading}
                onClick={handleSubmit}
              >
                {isUploading ? "Uploading & Analyzing..." : "Submit Credit Report"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
