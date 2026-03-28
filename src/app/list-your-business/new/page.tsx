'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { TIERS, TierKey } from '@/lib/stripe'

type Step = 'form' | 'submitted'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

function NewListingPageInner() {
  const searchParams = useSearchParams()
  const defaultTier = (searchParams.get('tier') || 'free') as TierKey | 'free'

  const [step, setStep] = useState<Step>('form')
  const [tier, setTier] = useState<TierKey | 'free'>(defaultTier)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [form, setForm] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    business_name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    website: '',
    service_category: '',
  })

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/listing/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tier_selected: tier }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Submission failed')
        return
      }
      setSubmitMessage(data.message)
      setStep('submitted')
    } catch {
      setError('Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 'submitted') {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h1>
          <p className="text-gray-600 mb-6">{submitMessage || 'We received your listing. Check your email to verify and activate it.'}</p>
          <p className="text-sm text-gray-500 mb-4">Once verified, your listing will be reviewed and published within 1 business day.</p>
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Directory</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/list-your-business" className="text-sm text-blue-600 hover:underline">← Back</Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Your Business</h1>
          <p className="text-gray-600 text-sm mb-6">Fill in your business details below. We&apos;ll send a verification email before publishing.</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact info */}
            <fieldset>
              <legend className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100 w-full">Your Contact Information</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input type="text" value={form.contact_name} onChange={e => update('contact_name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
                  <input type="email" value={form.contact_email} onChange={e => update('contact_email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone</label>
                  <input type="tel" value={form.contact_phone} onChange={e => update('contact_phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </fieldset>

            {/* Business info */}
            <fieldset>
              <legend className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100 w-full">Business Details</legend>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                  <input type="text" value={form.business_name} onChange={e => update('business_name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Category *</label>
                  <select value={form.service_category} onChange={e => update('service_category', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select a category</option>
                    <option value="Mold">Mold Remediation</option>
                    <option value="Water">Water Damage Restoration</option>
                    <option value="Pest">Pest Control</option>
                    <option value="Radon">Radon Testing &amp; Mitigation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                  <input type="text" value={form.address} onChange={e => update('address', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input type="text" value={form.city} onChange={e => update('city', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <select value={form.state} onChange={e => update('state', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">—</option>
                      {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                    <input type="text" value={form.zip} onChange={e => update('zip', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" maxLength={10} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Phone</label>
                    <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input type="url" value={form.website} onChange={e => update('website', e.target.value)}
                      placeholder="https://"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Tier selection */}
            <fieldset>
              <legend className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100 w-full">Choose Your Plan</legend>
              <div className="grid grid-cols-3 gap-3">
                {(['free', 'featured', 'premium'] as const).map(t => (
                  <button key={t} type="button" onClick={() => setTier(t)}
                    className={`border rounded-lg p-3 text-center transition-colors
                      ${tier === t ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    <div className="text-sm font-semibold capitalize">{t}</div>
                    <div className="text-xs text-gray-400 font-normal mt-0.5">
                      {t === 'free' ? '$0/mo' : `$${TIERS[t].price}/mo`}
                    </div>
                  </button>
                ))}
              </div>
              {tier !== 'free' && (
                <p className="text-xs text-gray-500 mt-2">
                  You&apos;ll be redirected to Stripe after email verification to complete payment.
                </p>
              )}
            </fieldset>

            <button type="submit" disabled={submitting}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
              {submitting ? 'Submitting…' : 'Submit Listing'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default function NewListingPage() {
  return <Suspense><NewListingPageInner /></Suspense>
}
