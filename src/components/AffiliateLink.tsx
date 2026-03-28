"use client";

import { useState, useEffect } from "react";
import { Link as LinkIcon, Copy, Check } from "lucide-react";

export function AffiliateLink({ directorId, baseUrl }: { directorId: string, baseUrl?: string }) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use baseUrl from prop (env-backed) or fallback to window.location.origin after mounting
  const base = baseUrl || (mounted && typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  const link = `${base}/?ref=${directorId}`;



  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <LinkIcon size={18} className="text-secondary" /> Your Affiliate Link
        </h3>
        <p className="text-sm text-muted mt-1">Share this link to refer clients and earn $0.50 per dispute action forever.</p>
      </div>
      <div className="flex gap-2">
        <input 
          type="text" 
          readOnly 
          className="input-field bg-background min-w-[300px] text-sm" 
          value={link} 
        />
        <button 
          onClick={handleCopy}
          className={`btn ${copied ? "btn-primary bg-emerald-500 hover:bg-emerald-600" : "btn-secondary"} flex items-center gap-2 min-w-[100px] justify-center transition-all`}
        >
          {copied ? (
            <>
              <Check size={16} /> Copied
            </>
          ) : (
            <>
              <Copy size={16} /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
