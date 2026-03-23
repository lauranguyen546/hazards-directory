import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Edit Profile | Provider Portal | HazardPros',
}

export default function ProfilePage({
  searchParams,
}: {
  searchParams: { provider_id?: string }
}) {
  const providerId = searchParams.provider_id || ''

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-sm text-gray-500">Enhance your listing to attract more homeowners</p>
          </div>
          <Link
            href={`/provider-portal/dashboard${providerId ? `?provider_id=${providerId}` : ''}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
          <strong>Basic or Premium plan required</strong> to publish enhanced profile content.
          Your changes will be visible once you upgrade.{' '}
          <Link
            href={`/provider-portal/upgrade${providerId ? `?provider_id=${providerId}` : ''}`}
            className="underline font-semibold"
          >
            Upgrade now →
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {/* Description */}
          <div className="p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-1">Business Description</label>
            <p className="text-xs text-gray-400 mb-2">Shown on your profile page. Up to 1,000 characters.</p>
            <textarea
              rows={4}
              placeholder="Tell homeowners about your experience, certifications, and what makes your business stand out..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
            />
          </div>

          {/* Service area */}
          <div className="p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-1">Additional Service Areas</label>
            <p className="text-xs text-gray-400 mb-2">List ZIP codes or counties you serve beyond your primary location.</p>
            <input
              type="text"
              placeholder="e.g. 32801, 32803, Orange County, Seminole County"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          {/* Logo URL */}
          <div className="p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-1">Business Logo URL</label>
            <p className="text-xs text-gray-400 mb-2">Paste a direct link to your logo image (PNG or JPG, 400×400px recommended).</p>
            <input
              type="url"
              placeholder="https://yourbusiness.com/logo.png"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          {/* Save */}
          <div className="p-6">
            <button
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-700 transition-colors"
            >
              Save Changes
            </button>
            <p className="text-xs text-gray-400 mt-2">Profile editing is coming soon. Contact us to update your info manually.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
