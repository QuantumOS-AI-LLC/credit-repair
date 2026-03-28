import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AffiliateTracker } from "@/components/AffiliateTracker";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Credit Relief Today",
  description: "AI-powered credit repair. No upfront fees.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={null}>
            <AffiliateTracker />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}

