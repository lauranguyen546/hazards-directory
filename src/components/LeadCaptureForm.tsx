'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LeadCaptureFormProps {
  prefilledCategory?: 'Mold' | 'Water' | 'Pest' | 'Radon'
  prefilledState?: string
  sourceProviderName?: string
  sourceProviderId?: string
  sourcePage?: string
  compact?: boolean
}

const SERVICE_CATEGORIES = [
  { value: 'Mold', label: 'Mold Remediation' },
  { value: 'Water', label: 'Water Damage Restoration' },
  { value: 'Pest', label: 'Pest Control' },
  { value: 'Radon', label: 'Radon Testing & Mitigation' },
]

const URGENCY_OPTIONS = [
  { value: 'emergency', label: 'Emergency — need help now' },
  { value: 'within_week', label: 'Within the next week' },
  { value: 'standard', label: 'No rush, getting quotes' },
  { value: 'planning', label: 'Just planning ahead' },
]

export default function LeadCaptureForm({
  prefilledCategory,
  prefilledState,
  sourceProviderName,
  sourceProviderId,
  sourcePage,
  compact = false,
}: LeadCaptureFormProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    homeowner_name: '',
    homeowner_email: '',
    homeowner_phone: '',
    service_category: prefilledCategory || '',
    urgency: 'standard',
    description: '',
    zip_code: '',
    state: prefilledState || '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source_page: sourcePage || window.location.pathname,
          source_provider_id: sourceProviderId || null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      router.push(`/get-quotes/confirmation?category=${form.service_category}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        {sourceProviderName
          ? `Request a Quote from ${sourceProviderName}`
          : 'Get Free Quotes from Local Pros'}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Tell us what you need — we'll match you with up to 3 verified providers in your area.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-3'}>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Your Name *</label>
            <input
              name="homeowner_name"
              value={form.homeowner_name}
              onChange={handleChange}
              required
              placeholder="Jane Smith"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
            <input
              name="homeowner_email"
              type="email"
              value={form.homeowner_email}
              onChange={handleChange}
              required
              placeholder="jane@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
            <input
              name="homeowner_phone"
              type="tel"
              value={form.homeowner_phone}
              onChange={handleChange}
              placeholder="(555) 000-0000"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">ZIP Code *</label>
            <input
              name="zip_code"
              value={form.zip_code}
              onChange={handleChange}
              required
              placeholder="32801"
              maxLength={5}
              pattern="\d{5}"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Service Needed *</label>
            <select
              name="service_category"
              value={form.service_category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Select a service...</option>
              {SERVICE_CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">How soon do you need help?</label>
            <select
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {URGENCY_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Describe your issue (optional)</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. Found mold in basement after flooding last week..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Sending...' : 'Get Free Quotes'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          No spam. Your info is shared only with matched local providers.
        </p>
      </form>
    </div>
  )
}
