"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton({ className }: { className?: string }) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <button 
      onClick={handleSignOut}
      className={className || "flex items-center gap-2 hover:underline text-rose-500 font-semibold transition-all"}
    >
      <LogOut size={16} />
      Sign Out
    </button>
  );
}
