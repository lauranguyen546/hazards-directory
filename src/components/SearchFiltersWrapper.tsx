'use client'

import { Suspense } from 'react'
import SearchFilters from './SearchFilters'

interface SearchFiltersWrapperProps {
  states: string[]
}

function SearchFiltersFallback() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="grid md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function SearchFiltersWrapper({ states }: SearchFiltersWrapperProps) {
  return (
    <Suspense fallback={<SearchFiltersFallback />}>
      <SearchFilters states={states} />
    </Suspense>
  )
}
