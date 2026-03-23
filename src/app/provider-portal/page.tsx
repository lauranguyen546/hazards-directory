'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProviderPortalPage() {
  const [mode, setMode] = useState<'claim' | 'lookup'>('claim')
  const [email, setEmail] = useState('')
  const [providerId, setProviderId] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)
    setLoading(true)

    try {
      const res = await fetch('/api/providers/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, provider_id: providerId }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' })
      } else {
        setStatus({
          type: 'success',
          message: `Listing claimed for "${data.provider_name}". Check your email for a magic link to access your dashboard.`,
        })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Portal</h1>
          <p className="text-gray-600">
            Manage your listing, view leads, and upgrade your plan.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-6">
          <button
            onClick={() => setMode('claim')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mode === 'claim'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Claim Existing Listing
          </button>
          <button
            onClick={() => setMode('lookup')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mode === 'lookup'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Find My Listing
          </button>
        </div>

        {mode === 'claim' ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-1">Claim Your Listing</h2>
            <p className="text-sm text-gray-600 mb-5">
              Enter your email and the Provider ID from your listing URL (e.g.,{' '}
              <code className="bg-gray-100 px-1 rounded text-xs">hazardpros.com/providers/abc123</code>).
            </p>

            <form onSubmit={handleClaim} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="owner@yourbusiness.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provider ID</label>
                <input
                  type="text"
                  value={providerId}
                  onChange={e => setProviderId(e.target.value)}
                  required
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 font-mono"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Find this in your listing URL:{' '}
                  <span className="font-mono">hazardpros.com/providers/[YOUR-ID]</span>
                </p>
              </div>

              {status && (
                <div
                  className={`rounded-lg p-3 text-sm ${
                    status.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Claiming...' : 'Claim Listing'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-1">Find Your Listing</h2>
            <p className="text-sm text-gray-600 mb-5">
              Search the directory to find your business and get your Provider ID.
            </p>
            <Link
              href="/providers"
              className="block text-center bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Search the Directory →
            </Link>
            <p className="text-xs text-gray-400 text-center mt-3">
              Not listed yet?{' '}
              <Link href="/list-your-business" className="text-primary-600 hover:underline">
                See listing options →
              </Link>
            </p>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Questions?{' '}
          <a href="mailto:contact@hazardpros.com" className="text-primary-600 hover:underline">
            contact@hazardpros.com
          </a>
        </p>
      </div>
    </main>
  )
}
