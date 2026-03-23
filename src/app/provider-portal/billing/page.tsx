'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function BillingContent() {
  const searchParams = useSearchParams()
  const providerId = searchParams.get('provider_id') || ''
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function openPortal() {
    if (!providerId) {
      setError('Provider ID missing. Please go back to the portal.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/billing/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider_id: providerId }),
      })
      const data = await res.json()

      if (!res.ok || !data.url) {
        setError(data.error || 'Failed to open billing portal. Make sure you have an active subscription.')
        return
      }

      window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <Link
            href={`/provider-portal/dashboard${providerId ? `?provider_id=${providerId}` : ''}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-2">Manage Subscription</h2>
          <p className="text-sm text-gray-600 mb-6">
            View invoices, update your payment method, or cancel your subscription through the secure Stripe billing portal.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm mb-4">
              {error}
            </div>
          )}

          <button
            onClick={openPortal}
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Opening...' : 'Open Billing Portal →'}
          </button>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Powered by Stripe. Your payment info is never stored on our servers.
          </p>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Don't have a subscription yet?</h3>
          <p className="text-xs text-gray-600 mb-3">
            Upgrade to Basic ($149/mo) or Premium ($349/mo) to start receiving leads.
          </p>
          <Link
            href={`/provider-portal/upgrade${providerId ? `?provider_id=${providerId}` : ''}`}
            className="text-sm text-primary-600 font-semibold hover:underline"
          >
            View Pricing Plans →
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <BillingContent />
    </Suspense>
  )
}
