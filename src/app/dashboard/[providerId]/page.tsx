import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface DashboardPageProps {
  params: { providerId: string }
}

export async function generateMetadata({ params }: DashboardPageProps): Promise<Metadata> {
  return { title: 'Provider Dashboard | Hazards Directory' }
}

async function getProviderWithLeads(id: string) {
  const [{ data: provider }, { data: leads }] = await Promise.all([
    supabase.from('providers').select('id, provider_name, state, county, service_category, tier, claimed_by_email').eq('id', id).single(),
    supabase.from('leads').select('id, name, service_needed, created_at').eq('provider_id', id).order('created_at', { ascending: false }).limit(50),
  ])
  return { provider, leads: leads || [] }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function ProviderDashboardPage({ params }: DashboardPageProps) {
  const { provider, leads } = await getProviderWithLeads(params.providerId)

  if (!provider) notFound()

  if (provider.tier !== 'premium') {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Premium Feature</h1>
          <p className="text-sm text-gray-600 mb-6">The lead analytics dashboard is available on the Premium plan.</p>
          <Link href="/list-your-business" className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm">
            Upgrade to Premium
          </Link>
        </div>
      </main>
    )
  }

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const leadsThisMonth = leads.filter(l => new Date(l.created_at) >= thirtyDaysAgo).length

  // Group leads by week for the last 8 weeks
  const weeklyData: Record<string, number> = {}
  for (let i = 7; i >= 0; i--) {
    const weekStart = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000)
    const label = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    weeklyData[label] = 0
  }
  for (const lead of leads) {
    const d = new Date(lead.created_at)
    const daysAgo = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
    if (daysAgo <= 56) {
      const weekIndex = Math.floor(daysAgo / 7)
      const weekStart = new Date(now.getTime() - weekIndex * 7 * 24 * 60 * 60 * 1000)
      const label = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      if (label in weeklyData) weeklyData[label]++
    }
  }

  const maxLeads = Math.max(...Object.values(weeklyData), 1)

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Directory</Link>
        </div>
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{provider.provider_name}</h1>
            <p className="text-sm text-gray-500 mt-1">{provider.county}, {provider.state} · {provider.service_category}</p>
          </div>
          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Premium</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Leads</div>
            <div className="text-3xl font-bold text-gray-900">{leads.length}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Last 30 Days</div>
            <div className="text-3xl font-bold text-blue-600">{leadsThisMonth}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Plan</div>
            <div className="text-lg font-bold text-purple-600">Premium</div>
            <div className="text-xs text-gray-400">$79/mo</div>
          </div>
        </div>

        {/* Weekly chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Leads — Last 8 Weeks</h2>
          <div className="flex items-end gap-2 h-24">
            {Object.entries(weeklyData).map(([label, count]) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-blue-500 rounded-t transition-all"
                  style={{ height: `${(count / maxLeads) * 80}px`, minHeight: count > 0 ? '4px' : '0' }}
                />
                <div className="text-xs text-gray-400 whitespace-nowrap" style={{ fontSize: '9px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Recent Leads</h2>
          </div>
          {leads.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-gray-500">
              No leads yet. They&apos;ll appear here when homeowners contact you through the directory.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wide bg-gray-50">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Service Needed</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">{lead.name}</td>
                    <td className="px-6 py-3 text-gray-600">{lead.service_needed}</td>
                    <td className="px-6 py-3 text-gray-500">{formatDate(lead.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  )
}
