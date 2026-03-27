'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { TIERS, TierKey } from '@/lib/stripe'

type Step = 'search' | 'pick' | 'contact' | 'submitted'

interface ProviderResult {
  id: string
  provider_name: string
  address: string
  county: string
  state: string
  service_category: string
  phone: string | null
  tier: string
  claimed: boolean
}

const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  Mold: 'Mold Remediation',
  Water: 'Water Damage Restoration',
  Pest: 'Pest Control',
  Radon: 'Radon Testing & Mitigation',
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

export default function ClaimPage() {
  const searchParams = useSearchParams()
  const defaultTier = (searchParams.get('tier') || 'free') as TierKey | 'free'

  const [step, setStep] = useState<Step>('search')
  const [query, setQuery] = useState('')
  const [state, setState] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<ProviderResult[]>([])
  const [selected, setSelected] = useState<ProviderResult | null>(null)
  const [tier, setTier] = useState<TierKey | 'free'>(defaultTier)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim().length < 2) return
    setSearching(true)
    setError('')
    try {
      const params = new URLSearchParams({ q: query })
      if (state) params.set('state', state)
      const res = await fetch(`/api/listing/search?${params}`)
      const data = await res.json()
      setResults(data.results || [])
      setStep('pick')
    } catch {
      setError('Search failed. Please try again.')
    } finally {
      setSearching(false)
    }
  }

  function handleSelect(provider: ProviderResult) {
    if (provider.claimed) {
      setError('This listing is already claimed by the business owner.')
      return
    }
    setSelected(provider)
    setStep('contact')
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/listing/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider_id: selected.id,
          contact_name: form.name,
          contact_email: form.email,
          contact_phone: form.phone,
          tier_selected: tier,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
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

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/list-your-business" className="text-sm text-blue-600 hover:underline">← Back</Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {(['search', 'pick', 'contact'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${step === s || (step === 'submitted' && s === 'contact')
                  ? 'bg-blue-600 text-white'
                  : ['pick', 'contact', 'submitted'].indexOf(step) > ['search', 'pick', 'contact'].indexOf(s)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                {i + 1}
              </div>
              <span className="text-xs text-gray-500 hidden sm:inline capitalize">{s === 'contact' ? 'Verify' : s}</span>
              {i < 2 && <div className="w-8 h-px bg-gray-300" />}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
        )}

        {/* Step 1: Search */}
        {step === 'search' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Business</h1>
            <p className="text-gray-600 mb-6 text-sm">Search by business name or phone number to find your existing listing.</p>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name or Phone</label>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="e.g. ABC Mold Removal or (555) 123-4567"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State (optional)</label>
                <select
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All States</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button
                type="submit"
                disabled={searching || query.trim().length < 2}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {searching ? 'Searching…' : 'Search'}
              </button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500">
              Not listed yet? <Link href="/list-your-business/new" className="text-blue-600 hover:underline">Add a new listing</Link>
            </div>
          </div>
        )}

        {/* Step 2: Pick provider */}
        {step === 'pick' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Your Business</h2>
            {results.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No results found for &ldquo;{query}&rdquo;.</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setStep('search')} className="text-sm text-blue-600 hover:underline">Try again</button>
                  <span className="text-gray-400">or</span>
                  <Link href="/list-your-business/new" className="text-sm text-blue-600 hover:underline">Add a new listing</Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    disabled={p.claimed}
                    className={`w-full text-left border rounded-lg p-4 transition-colors
                      ${p.claimed
                        ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                        : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{p.provider_name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{p.address}, {p.county}, {p.state}</div>
                        <div className="text-xs text-gray-500">{SERVICE_CATEGORY_LABELS[p.service_category] || p.service_category}</div>
                      </div>
                      <div>
                        {p.claimed
                          ? <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Claimed</span>
                          : <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Available</span>
                        }
                      </div>
                    </div>
                  </button>
                ))}
                <button onClick={() => { setStep('search'); setResults([]) }} className="text-sm text-blue-600 hover:underline mt-2">
                  ← Search again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Contact + tier */}
        {step === 'contact' && selected && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Claim Your Listing</h2>
            <p className="text-sm text-gray-500 mb-6">Claiming: <strong>{selected.provider_name}</strong> — {selected.county}, {selected.state}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tier selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['free', 'featured', 'premium'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTier(t)}
                      className={`border rounded-lg p-3 text-center text-xs font-semibold transition-colors
                        ${tier === t ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                    >
                      <div className="capitalize">{t}</div>
                      <div className="text-gray-400 font-normal mt-0.5">
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
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting…' : 'Verify & Claim'}
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Submitted */}
        {step === 'submitted' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h2>
            <p className="text-gray-600 mb-6">{submitMessage || 'A verification email has been sent. Click the link to activate your listing.'}</p>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to Directory</Link>
          </div>
        )}
      </div>
    </main>
  )
}
