import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Provider Dashboard | HazardPros',
}

// NOTE: This page is a server-rendered shell.
// In production, add Supabase Auth session check here and pass provider_id to child components.
// For now it shows the dashboard layout with upgrade prompt for unverified providers.

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { provider_id?: string; upgraded?: string }
}) {
  const providerId = searchParams.provider_id || ''

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your listing, leads, and subscription</p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/provider-portal/upgrade${providerId ? `?provider_id=${providerId}` : ''}`}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>

        {/* Upgraded banner */}
        {searchParams.upgraded === '1' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-green-800 text-sm">
            Your subscription is now active. Lead distribution will begin with your next matched lead.
          </div>
        )}

        {/* Stats row */}
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Current Plan</p>
            <p className="text-2xl font-bold text-gray-900">Free</p>
            <Link
              href={`/provider-portal/upgrade${providerId ? `?provider_id=${providerId}` : ''}`}
              className="text-xs text-primary-600 hover:underline mt-1 block"
            >
              Upgrade to get leads →
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Leads This Month</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-400 mt-1">Requires Basic or Premium plan</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Monthly Lead Cap</p>
            <p className="text-2xl font-bold text-gray-900">—</p>
            <p className="text-xs text-gray-400 mt-1">Upgrade to unlock leads</p>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white mb-8">
          <h2 className="text-lg font-bold mb-1">Start Receiving Leads</h2>
          <p className="text-blue-100 text-sm mb-4">
            Upgrade to Basic ($149/mo) or Premium ($349/mo) to receive homeowner quote requests in your area.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/provider-portal/upgrade${providerId ? `?provider_id=${providerId}` : ''}`}
              className="bg-white text-primary-700 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              See Pricing
            </Link>
            <Link
              href="/list-your-business"
              className="border border-white/50 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Compare Plans
            </Link>
          </div>
        </div>

        {/* Lead history placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Leads</h2>
            <Link
              href={`/provider-portal/leads${providerId ? `?provider_id=${providerId}` : ''}`}
              className="text-sm text-primary-600 hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No leads yet.</p>
            <p className="text-xs mt-1">Upgrade your plan to start receiving homeowner inquiries.</p>
          </div>
        </div>

        {/* Nav links */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href={`/provider-portal/leads${providerId ? `?provider_id=${providerId}` : ''}`} className="text-gray-600 hover:text-primary-600">Lead History</Link>
          <Link href={`/provider-portal/billing${providerId ? `?provider_id=${providerId}` : ''}`} className="text-gray-600 hover:text-primary-600">Billing</Link>
          <Link href={`/provider-portal/profile${providerId ? `?provider_id=${providerId}` : ''}`} className="text-gray-600 hover:text-primary-600">Edit Profile</Link>
        </div>
      </div>
    </main>
  )
}
