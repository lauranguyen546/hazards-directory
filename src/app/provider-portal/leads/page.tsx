import { Metadata } from 'next'
import Link from 'next/link'
import { getLeadsByProvider } from '@/lib/leadDistribution'

export const metadata: Metadata = {
  title: 'Lead History | Provider Portal | HazardPros',
}

interface LeadDistribution {
  id: string
  notified_at: string
  viewed_at: string | null
  claimed_at: string | null
  charged: boolean
  charge_cents: number
  leads: {
    id: string
    service_category: string
    urgency: string
    zip_code: string | null
    city: string | null
    state: string
    county: string | null
    description: string | null
    status: string
    created_at: string
  } | null
}

const URGENCY_LABELS: Record<string, string> = {
  emergency: 'Emergency',
  within_week: 'Within a week',
  standard: 'Getting quotes',
  planning: 'Planning ahead',
}

const URGENCY_COLORS: Record<string, string> = {
  emergency: 'bg-red-100 text-red-700',
  within_week: 'bg-amber-100 text-amber-700',
  standard: 'bg-blue-100 text-blue-700',
  planning: 'bg-gray-100 text-gray-600',
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { provider_id?: string }
}) {
  const providerId = searchParams.provider_id || ''

  let leads: LeadDistribution[] = []
  let fetchError = false

  if (providerId) {
    try {
      leads = (await getLeadsByProvider(providerId, 50)) as LeadDistribution[]
    } catch {
      fetchError = true
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead History</h1>
            <p className="text-sm text-gray-500">Homeowner inquiries sent to your business</p>
          </div>
          <Link
            href={`/provider-portal/dashboard${providerId ? `?provider_id=${providerId}` : ''}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Dashboard
          </Link>
        </div>

        {!providerId ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500">Please access your dashboard from the provider portal.</p>
            <Link href="/provider-portal" className="text-primary-600 hover:underline text-sm mt-2 block">
              Go to Portal →
            </Link>
          </div>
        ) : fetchError ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">
            Failed to load leads. Please try again.
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500 text-sm">No leads yet.</p>
            <p className="text-xs text-gray-400 mt-1">Leads will appear here once your subscription is active and homeowners submit requests in your area.</p>
            <Link
              href={`/provider-portal/upgrade?provider_id=${providerId}`}
              className="mt-4 inline-block bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              Upgrade to Get Leads →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map(dist => {
              const lead = dist.leads
              if (!lead) return null

              return (
                <div key={dist.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{lead.service_category} — {lead.city || lead.county || lead.state}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${URGENCY_COLORS[lead.urgency] || 'bg-gray-100 text-gray-600'}`}>
                          {URGENCY_LABELS[lead.urgency] || lead.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {lead.city && `${lead.city}, `}{lead.state}{lead.zip_code && ` ${lead.zip_code}`}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">
                        {new Date(dist.notified_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      {dist.claimed_at ? (
                        <span className="text-xs font-medium text-green-600">Claimed</span>
                      ) : (
                        <span className="text-xs text-gray-400">Unclaimed</span>
                      )}
                    </div>
                  </div>

                  {lead.description && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mb-3">
                      "{lead.description}"
                    </p>
                  )}

                  <div className="text-xs text-gray-400">
                    Lead received {new Date(dist.notified_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    {dist.viewed_at && ' · Viewed'}
                    {dist.charge_cents > 0 && ` · $${(dist.charge_cents / 100).toFixed(2)} charged`}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
