import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Settings, Users, FileText, Banknote, ShieldAlert } from "lucide-react"
import { SignOutButton } from "@/components/SignOutButton"


import { redirect } from "next/navigation"

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect("/login?role=admin&error=UnauthorizedRole")
  }


  const adminName = session.user.name || "Admin"


  // Fetch all users
  const clients = await prisma.user.findMany({
    where: { role: 'CLIENT' },
    include: { disputes: { include: { letters: true } }, profile: true },
    orderBy: { createdAt: 'desc' }
  })

  // const directors = await prisma.user.count({ where: { role: 'DIRECTOR' } })
  const totalDisputes = clients.reduce((acc, curr) => acc + curr.disputes.length, 0)
  
  // Calculate company revenue roughly (Total letters * $2.50)
  const totalLetters = clients.reduce((acc, curr) => 
    acc + curr.disputes.reduce((dAcc, d) => dAcc + d.letters.length, 0)
  , 0)
  
  // Need to subtract affiliate earnings from total revenue for net
  const grossRevenue = totalLetters * 2.50
  const affiliatePayouts = totalLetters * 0.50
  const netRevenue = grossRevenue - affiliatePayouts

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border py-4">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-main flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">C</div>
            <h1 className="text-xl font-bold text-main">Credit Relief | Admin Portal</h1>
          </Link>
          <div className="flex gap-4 items-center text-sm font-medium">
            <span className="text-muted">Admin: {adminName}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      
      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Company Overview</h2>
          <p className="text-muted">Manage the pipeline, overview system health, and adjust AI settings.</p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card flex items-center gap-4 border-l-4 border-l-secondary">
            <div className="p-3 bg-blue-50 rounded-full text-secondary"><Users size={20} /></div>
            <div>
              <p className="text-sm text-muted">Total Clients</p>
              <p className="text-xl font-bold">{clients.length}</p>
            </div>
          </div>
          
          <div className="card flex items-center gap-4 border-l-4 border-l-primary">
            <div className="p-3 bg-green-50 rounded-full text-primary"><ShieldAlert size={20} /></div>
            <div>
              <p className="text-sm text-muted">Active Disputes</p>
              <p className="text-xl font-bold">{totalDisputes}</p>
            </div>
          </div>

          <div className="card flex items-center gap-4 border-l-4 border-l-purple-500">
            <div className="p-3 bg-purple-50 rounded-full text-purple-600"><FileText size={20} /></div>
            <div>
              <p className="text-sm text-muted">Letters Sent</p>
              <p className="text-xl font-bold">{totalLetters}</p>
            </div>
          </div>

          <div className="card flex items-center gap-4 border-l-4 border-l-main">
            <div className="p-3 bg-gray-100 rounded-full text-main"><Banknote size={20} /></div>
            <div>
              <p className="text-sm text-muted">Net Revenue</p>
              <p className="text-xl font-bold">${netRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* CRM Section */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Client Pipeline CRM</h3>
            <div className="flex gap-2">
               <input type="text" placeholder="Search clients..." className="input-field py-2 text-sm" />
               <button className="btn btn-outline py-2 text-sm"><Settings size={16} className="mr-2"/> View Flow</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-sm text-muted">
                  <th className="pb-3 font-semibold">Client</th>
                  <th className="pb-3 font-semibold">Contact Info</th>
                  <th className="pb-3 font-semibold">Active Pipeline Stage</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted">No clients in the system yet.</td>
                  </tr>
                ) : (
                  clients.map(client => {
                    const latestDispute = client.disputes[0]
                    return (
                      <tr key={client.id} className="border-b border-border last:border-0 hover:bg-background/50 transition-colors">
                        <td className="py-4">
                          <p className="font-medium text-main">{client.name}</p>
                          <p className="text-xs text-muted">ID: {client.id.slice(-6).toUpperCase()}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-sm">{client.email}</p>
                          <p className="text-xs text-muted">{client.profile?.cellPhone || 'No Phone'}</p>
                        </td>
                        <td className="py-4">
                          <span className="badge badge-gray px-3 py-1 text-xs">
                            {latestDispute ? latestDispute.status.replace(/_/g, ' ') : 'NO DISPUTES'}
                          </span>
                        </td>
                        <td className="py-4">
                          <Link href={`/dashboard/admin/client/${client.id}`} className="text-secondary hover:underline text-sm font-medium">
                            Manage & Edit Letters
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
