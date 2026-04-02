'use client'

import { useState } from 'react'

interface QuoteRequestFormProps {
  providerId?: string
  providerName?: string
  defaultService?: string
  sourceType?: 'provider_page' | 'state_page' | 'category_page'
  sourceState?: string
  sourceCategory?: string
  compact?: boolean
}

const SERVICE_OPTIONS = [
  'Mold Remediation',
  'Water Damage Restoration',
  'Pest Control',
  'Radon Testing & Mitigation',
  'Not sure / Other',
]

export default function QuoteRequestForm({
  providerId,
  providerName,
  defaultService,
  sourceType = 'provider_page',
  sourceState,
  sourceCategory,
  compact = false,
}: QuoteRequestFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service_needed: defaultService || '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          provider_id: providerId || null,
          source_type: sourceType,
          source_state: sourceState || null,
          source_category: sourceCategory || null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }

      setStatus('success')
      setForm({ name: '', email: '', phone: '', service_needed: defaultService || '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">✓</div>
        <h3 className="text-lg font-bold text-green-800 mb-1">Request Sent!</h3>
        <p className="text-green-700 text-sm">
          {providerName
            ? `Your quote request has been submitted. ${providerName} will be in touch shortly.`
            : 'Your request has been submitted. A provider will be in touch shortly.'}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-700 underline hover:text-green-900"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!compact && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="qrf-name">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="qrf-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="qrf-phone">
              Phone Number
            </label>
            <input
              id="qrf-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="(555) 555-5555"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      )}

      {compact && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="qrf-name-c">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="qrf-name-c"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="qrf-email">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="qrf-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {compact && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="qrf-phone-c">
            Phone Number
          </label>
          <input
            id="qrf-phone-c"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 555-5555"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="qrf-service">
          Service Needed <span className="text-red-500">*</span>
        </label>
        <select
          id="qrf-service"
          name="service_needed"
          required
          value={form.service_needed}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">Select a service...</option>
          {SERVICE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="qrf-message">
          Describe Your Situation
        </label>
        <textarea
          id="qrf-message"
          name="message"
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about the issue — size of affected area, urgency, any other details..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full btn-primary py-3 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending Request...' : 'Request a Free Quote'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Free, no-obligation quote. We respect your privacy.
      </p>
    </form>
  )
}
