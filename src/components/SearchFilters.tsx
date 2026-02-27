'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchFiltersProps {
  states: string[]
}

export default function SearchFilters({ states }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [state, setState] = useState(searchParams.get('state') || '')
  const [zipCode, setZipCode] = useState(searchParams.get('zip_code') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (state) params.set('state', state)
    if (zipCode) params.set('zip_code', zipCode)
    if (category) params.set('category', category)
    
    router.push(`/providers?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6">
      <div className="grid md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Company name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            placeholder="e.g. 33101"
            maxLength={5}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Categories</option>
            <option value="Mold">Mold Remediation</option>
            <option value="Water">Water Damage</option>
            <option value="Pest">Pest Control</option>
            <option value="Radon">Radon Testing</option>
          </select>
        </div>

        {/* Task 8: Search button uses amber accent */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  )
}
