import { RefreshCw } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function SettingsPage() {
  const user = await prisma.user.findFirst({ 
    where: { role: "CLIENT" },
    include: { profile: true }
  })
  
  const profile = user?.profile
  // const email = user?.email || "johndoe@gmail.com"

  return (
    <div className="max-w-4xl w-full mx-auto py-2">
      <h2 className="text-xl font-medium text-gray-800 mb-6">My Settings</h2>

      <div className="bg-white border border-gray-200 shadow-sm p-8 rounded-sm">
        
        <form className="space-y-6">
          {/* Address Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-semibold tracking-wide">Address</label>
              <input type="text" defaultValue={profile?.address || "1234 Washington St."} className="w-full border border-gray-300 bg-[#f0f9ff] rounded-sm px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-semibold tracking-wide">Address 2</label>
              <input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
            </div>
          </div>

          {/* City State Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-semibold tracking-wide">City</label>
              <input type="text" defaultValue="Hazelwood" className="w-full border border-gray-300 bg-[#f0f9ff] rounded-sm px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-semibold tracking-wide">State</label>
              <input type="text" defaultValue="Florida" className="w-full border border-gray-300 bg-[#f0f9ff] rounded-sm px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400" />
            </div>
          </div>

          {/* Zip/SSN Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-semibold tracking-wide">Zip Code</label>
              <input type="text" defaultValue="12345" className="w-full border border-gray-300 bg-[#f0f9ff] rounded-sm px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-xs text-gray-500 font-semibold tracking-wide">Social Security Number</label>
                <button type="button" className="text-xs text-[#0284c7] font-medium hover:underline">Change SSN</button>
              </div>
              <input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-bold text-gray-700 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-semibold tracking-wide">Phone</label>
                <input type="text" defaultValue="5555555555" className="w-full border border-gray-300 bg-[#f0f9ff] rounded-sm px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="block text-xs text-gray-500 font-semibold tracking-wide">Email Address</label>
                  <button type="button" className="text-xs text-[#0284c7] font-medium hover:underline">Change Email</button>
                </div>
                <input type="email" defaultValue="asdfasfadsf@gmail.com" className="w-full border border-gray-300 bg-gray-50 rounded-sm px-3 py-2 text-sm text-gray-500" disabled />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-bold text-gray-700 mb-4">Date of Birth</h3>
            <div className="flex gap-4 max-w-sm">
              <select className="flex-[2] border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none bg-white">
                <option>January</option>
              </select>
              <select className="flex-1 border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none bg-white">
                <option>01</option>
              </select>
              <select className="flex-[1.5] border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none bg-white">
                <option>1980</option>
              </select>
            </div>
          </div>

          {/* Credentials Box */}
          <div className="mt-8 border border-gray-200 bg-gray-50 p-6 rounded-md">
            <div className="flex items-center gap-4 mb-4">
               <h4 className="font-bold text-gray-700">Credit Monitor Credentials</h4>
               <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                 <input type="checkbox" className="rounded-sm border-gray-300" />
                 View password?
               </label>
            </div>

            <div className="flex gap-4 items-end mb-6">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1 font-semibold tracking-wide">Email</label>
                <input type="email" defaultValue="johndoe@gmail.com" className="w-full border border-gray-300 bg-[#f0f9ff] rounded-sm px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1 font-semibold tracking-wide">Password</label>
                <input type="password" defaultValue="............." className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div className="flex-1 relative">
                <label className="block text-xs text-gray-500 mb-1 font-semibold tracking-wide">Last four SSN</label>
                <div className="flex gap-2 items-center">
                  <input type="text" defaultValue="****" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                  <RefreshCw size={18} className="text-[#38bdf8] cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
               <div className="flex items-center gap-4 text-sm text-gray-600">
                 <span className="font-semibold text-gray-500">Source:</span>
                 <label className="flex items-center gap-1 cursor-pointer">
                   <input type="radio" name="source" defaultChecked className="text-blue-500" />
                   CreditBeeScore
                 </label>
                 <label className="flex items-center gap-1 cursor-pointer">
                   <input type="radio" name="source" className="text-blue-500" />
                   SmartCredit
                 </label>
                 <label className="flex items-center gap-1 cursor-pointer">
                   <input type="radio" name="source" className="text-blue-500" />
                   IdentityIQ
                 </label>
               </div>
               <a href="#" className="font-medium text-[#0284c7] text-sm hover:underline hover:text-blue-600">Click here to sign up for Monitor</a>
            </div>
          </div>

          <div className="pt-4">
            <button type="button" className="bg-[#3b82f6] text-white px-8 py-3 rounded-sm font-medium hover:bg-blue-600 shadow-sm transition-colors text-sm">
              Save Basic Info
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
