"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function AffiliateTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      // Store referral ID in cookie for 30 days
      // This allows the user to browse and then sign up later
      document.cookie = `director_ref=${ref}; path=/; max-age=${60 * 60 * 24 * 30}`;
      console.log("Affiliate reference captured:", ref);
    }
  }, [searchParams]);

  return null; // This component doesn't render anything
}
