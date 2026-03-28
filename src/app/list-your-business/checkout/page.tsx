'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { TIERS, TierKey } from '@/lib/stripe'

function CheckoutPageInner() {
  const searchParams = useSearchParams()
  const claimId = searchParams.get('claim_id')
  const tier = (searchParams.get('tier') || 'featured') as TierKey
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!claimId || !(tier in TIERS)) {
      setError('Invalid checkout link.')
      setStatus('error')
      return
    }

    async function createCheckout() {
      try {
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ claim_id: claimId, tier }),
        })
        const data = await res.json()
        if (!res.ok || !data.url) {
          setError(data.error || 'Could not start checkout. Please try again.')
          setStatus('error')
          return
        }
        setStatus('redirecting')
        window.location.href = data.url
      } catch {
        setError('Network error. Please try again.')
        setStatus('error')
      }
    }

    createCheckout()
  }, [claimId, tier])

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
        {status === 'loading' || status === 'redirecting' ? (
          <>
            <div className="text-4xl mb-4 animate-pulse">💳</div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {status === 'redirecting' ? 'Redirecting to Stripe…' : 'Preparing checkout…'}
            </h1>
            <p className="text-sm text-gray-500">
              Setting up your {TIERS[tier]?.label} plan at ${TIERS[tier]?.price}/mo
            </p>
          </>
        ) : (
          <>
            <div className="text-4xl mb-4">⚠️</div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Checkout Unavailable</h1>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <Link href="/list-your-business" className="text-sm text-blue-600 hover:underline">
              ← Back to listing portal
            </Link>
          </>
        )}
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return <Suspense><CheckoutPageInner /></Suspense>
}
