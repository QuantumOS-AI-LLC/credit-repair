// Imports
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Users, DollarSign, Activity } from "lucide-react"
import { AffiliateLink } from "@/components/AffiliateLink"
import { SignOutButton } from "@/components/SignOutButton"

import { redirect } from "next/navigation"

export default async function DirectorDashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user || session.user.role !== 'DIRECTOR') {
    redirect("/login?role=director&error=UnauthorizedRole")
  }


  // Safely extract directorId
  const directorId = session.user.id
  const directorName = session.user.name || "Director"

  
  const referredClients = await prisma.user.findMany({
    where: { directorId },
    include: { disputes: true }
  })

  const earnings = await prisma.earning.findMany({
    where: { directorId },
  })

  const totalEarnings = earnings.reduce((acc, curr) => acc + curr.amount, 0)
  const activeClients = referredClients.filter(c => c.disputes.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border py-4">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">C</div>
            <h1 className="text-xl font-bold text-secondary">Credit Relief | Program Director</h1>
          </Link>
          <div className="flex gap-4 items-center text-sm font-medium">
            <span className="text-muted">Welcome, {directorName}</span>
            <SignOutButton />
          </div>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Director Dashboard</h2>
          <p className="text-muted">Manage your referrals and view your earnings.</p>
        </div>

        {/* Affiliate Link Callout */}
        <div className="card mb-8 border-l-4 border-l-secondary">
          <AffiliateLink 
            directorId={directorId} 
            baseUrl={process.env.NEXTAUTH_URL || "http://localhost:3000"} 
          />
        </div>


        {/* Metro Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card flex items-center gap-4">
            <div className="p-4 bg-blue-50 rounded-full text-secondary">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-muted">Total Enrolled</p>
              <p className="text-2xl font-bold">{referredClients.length}</p>
            </div>
          </div>
          
          <div className="card flex items-center gap-4">
            <div className="p-4 bg-green-50 rounded-full text-primary">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-muted">Active Clients</p>
              <p className="text-2xl font-bold">{activeClients.length}</p>
            </div>
          </div>

          <div className="card flex items-center gap-4">
            <div className="p-4 bg-gray-100 rounded-full text-main">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-muted">Total Earnings</p>
              <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Referral List */}
        <div className="card">
          <h3 className="text-xl font-bold mb-6">Your Clients</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-sm text-muted">
                  <th className="pb-3 font-semibold">Client Name</th>
                  <th className="pb-3 font-semibold">Joined Date</th>
                  <th className="pb-3 font-semibold">Disputes</th>
                  <th className="pb-3 font-semibold text-right">Generated Earnings</th>
                </tr>
              </thead>
              <tbody>
                {referredClients.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted">
                      No clients referred yet. Share your affiliate link to get started!
                    </td>
                  </tr>
                ) : (
                  referredClients.map(client => (
                    <tr key={client.id} className="border-b border-border last:border-0 hover:bg-background/50 transition-colors">
                      <td className="py-4 font-medium">
                        {/* Only expose first name and last initial */}
                        {client.name ? `${client.name.split(' ')[0]} ${client.name.split(' ')[1]?.[0] || ''}.` : 'Unknown'}
                      </td>
                      <td className="py-4 text-sm text-muted">{new Date(client.createdAt).toLocaleDateString()}</td>
                      <td className="py-4">
                        <span className={`badge ${client.disputes.length > 0 ? 'badge-green' : 'badge-gray'}`}>
                          {client.disputes.length > 0 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 text-right font-medium text-main">
                        {/* Placeholder logic for individual client earnings tracking if needed */}
                        $0.00
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
