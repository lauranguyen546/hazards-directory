'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const tiers = [
  {
    name: 'Basic',
    tier: 'basic' as const,
    price: '$149',
    period: 'per month',
    description: 'Receive leads from homeowners in your county.',
    highlight: false,
    features: [
      'Up to 10 leads/month (county)',
      '"Verified Provider" badge',
      'Enhanced profile — description & logo',
      'Monthly lead report email',
    ],
  },
  {
    name: 'Premium',
    tier: 'premium' as const,
    price: '$349',
    period: 'per month',
    description: 'Maximum leads and visibility across your state.',
    highlight: true,
    features: [
      'Up to 30 leads/month (state-wide)',
      '"Top Rated Pro" badge',
      'Priority placement in listings',
      'Photo gallery (up to 5 images)',
      'Everything in Basic',
    ],
  },
]

function UpgradeContent() {
  const searchParams = useSearchParams()
  const providerId = searchParams.get('provider_id') || ''
  const router = useRouter()
  const [loading, setLoading] = useState<'basic' | 'premium' | null>(null)
  const [error, setError] = useState('')

  async function handleUpgrade(tier: 'basic' | 'premium') {
    if (!providerId) {
      setError('Provider ID missing. Please go back and claim your listing first.')
      return
    }
    setLoading(tier)
    setError('')

    try {
      const res = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider_id: providerId, tier }),
      })
      const data = await res.json()

      if (!res.ok || !data.url) {
        setError(data.error || 'Failed to create checkout session.')
        return
      }

      window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upgrade Your Plan</h1>
          <p className="text-gray-600">
            Start receiving leads from homeowners looking for your services.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {tiers.map(tier => (
            <div
              key={tier.tier}
              className={`bg-white rounded-xl border p-6 flex flex-col ${
                tier.highlight ? 'border-primary-500 ring-2 ring-primary-500 relative' : 'border-gray-200'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h2>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-500 text-sm pb-1">/{tier.period}</span>
                </div>
                <p className="text-sm text-gray-600">{tier.description}</p>
              </div>

              <ul className="space-y-2 mb-6 flex-grow text-sm">
                {tier.features.map(f => (
                  <li key={f} className="flex gap-2 text-gray-700">
                    <span className="text-green-500 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(tier.tier)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  tier.highlight
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'border border-primary-600 text-primary-600 hover:bg-primary-50'
                }`}
              >
                {loading === tier.tier ? 'Redirecting...' : `Start ${tier.name}`}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure checkout powered by Stripe. Cancel anytime.
        </p>

        <div className="text-center mt-4">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  )
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <UpgradeContent />
    </Suspense>
  )
}
