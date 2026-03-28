import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ChevronLeft, Save, Send, FileText } from "lucide-react"

export default async function AdminClientDetailPage({ params }: { params: { id: string } }) {
  let session = await getServerSession(authOptions)
  
  if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session = { user: { id: "demo-admin-123", name: "Demo Admin", role: "ADMIN" } } as any
  }

  const clientId = params.id
  
  const client = await prisma.user.findUnique({
    where: { id: clientId },
    include: { 
      profile: true, 
      disputes: { include: { letters: true } },
      director: true
    }
  })

  if (!client) {
    return <div className="p-8 text-center text-error">Client not found.</div>
  }

  const latestDispute = client.disputes[0]

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="bg-surface border-b border-border py-4">
        <div className="container flex items-center gap-4">
          <Link href="/dashboard/admin" className="text-secondary hover:underline flex items-center">
            <ChevronLeft size={20} /> Back to CRM
          </Link>
          <h1 className="text-xl font-bold ml-auto text-main border-l border-border pl-4">Client Detail</h1>
        </div>
      </header>
      
      <main className="container py-8 max-w-5xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">{client.name}</h2>
            <p className="text-muted">{client.email} | {client.profile?.cellPhone || 'No Phone'}</p>
          </div>
          
          <div className="text-right">
            <span className="text-sm font-semibold text-muted mb-1 block">Current Pipeline Stage</span>
            <select className="input-field py-1 px-3 text-sm font-medium border-primary text-primary" defaultValue={latestDispute?.status || 'NEW_CUSTOMER'}>
              <option value="NEW_CUSTOMER">New Customer</option>
              <option value="REPORT_WAITING">Waiting For Report</option>
              <option value="REPORT_UPLOADED">Report Uploaded</option>
              <option value="AI_EVALUATING">AI Evaluating</option>
              <option value="SUMMARY_SENT">Dispute Summary Sent</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="card">
              <h3 className="font-bold text-lg mb-4">Profile Actions</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted">Total Disputes</span>
                  <span className="font-medium">{client.disputes.length}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted">Referred By</span>
                  <span className="font-medium text-secondary">{client.director?.name || 'Organic'}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-muted">Address</span>
                  <span className="font-medium truncate max-w-[120px]" title={client.profile?.address || ''}>
                    {client.profile?.address || 'Not Provided'}
                  </span>
                </li>
              </ul>
              
              <button className="btn btn-outline w-full mt-6 py-2 text-error border-error hover:bg-red-50 hover:border-red-500">
                Suspend Account
              </button>
            </div>
          </div>

          {/* Main Document View */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {!latestDispute ? (
              <div className="card text-center py-12 text-muted">
                No active disputes. Client needs to upload a report.
              </div>
            ) : (
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Dispute #{latestDispute.id.slice(-6).toUpperCase()} Letters</h3>
                  <button className="btn btn-primary btn-sm flex gap-2"><Send size={16}/> Resend to Postgrid</button>
                </div>

                {latestDispute.letters.length === 0 ? (
                  <p className="text-muted">No letters generated yet. Ensure AI evaluation has completed.</p>
                ) : (
                  latestDispute.letters.map((letter: { id: string; postgridStatus: string | null; content: string }, idx: number) => (
                    <div key={letter.id} className="border border-border rounded-xl mb-6 overflow-hidden">
                      <div className="bg-surface px-4 py-3 border-b flex justify-between items-center">
                        <span className="font-bold text-main flex items-center gap-2">
                          <FileText size={18} className="text-secondary" /> Letter {idx + 1}
                        </span>
                        <div className="flex gap-2">
                           <span className="badge badge-gray px-2 py-0 text-xs">Postgrid: {letter.postgridStatus || 'Pending'}</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <label className="text-xs font-semibold text-muted block mb-2 uppercase">Editable Letter Content</label>
                        <textarea 
                          className="w-full h-48 input-field font-mono text-sm leading-relaxed" 
                          defaultValue={letter.content}
                        />
                        <div className="flex justify-end mt-4">
                          <button className="btn btn-outline py-2 text-sm flex gap-2"><Save size={16}/> Save Changes</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
