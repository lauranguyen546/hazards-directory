import { Metadata } from 'next'
import Link from 'next/link'
import { getProviders, getStates } from '@/lib/supabase'
import ProviderCard from '@/components/ProviderCard'
import SearchFilters from '@/components/SearchFilters'

interface ProvidersPageProps {
  searchParams: {
    state?: string
    county?: string
    zip_code?: string
    category?: string
    search?: string
    page?: string
  }
}

export async function generateMetadata({ searchParams }: ProvidersPageProps): Promise<Metadata> {
  const { state, category } = searchParams
  
  let title = 'All Providers'
  let description = 'Browse verified mold remediation, water damage, and pest control providers.'
  
  if (state && category) {
    title = `${category} Providers in ${state}`
    description = `Find ${category.toLowerCase()} professionals in ${state}. Compare ratings, reviews, and services.`
  } else if (state) {
    title = `Providers in ${state}`
    description = `Find mold, water damage, and pest control professionals in ${state}.`
  } else if (category) {
    title = `${category} Providers`
    description = `Find ${category.toLowerCase()} professionals across the United States.`
  }
  
  return {
    title: `${title} | Hazards Directory`,
    description,
  }
}

export default async function ProvidersPage({ searchParams }: ProvidersPageProps) {
  const page = parseInt(searchParams.page || '1', 10)
  const limit = 24
  const offset = (page - 1) * limit

  const [{ data: providers, count }, states] = await Promise.all([
    getProviders({
      state: searchParams.state,
      county: searchParams.county,
      zip_code: searchParams.zip_code,
      service_category: searchParams.category,
      search: searchParams.search,
      limit,
      offset,
    }),
    getStates(),
  ])

  const totalPages = count ? Math.ceil(count / limit) : 1

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">
            {searchParams.category || 'All'} Providers
            {searchParams.state && ` in ${searchParams.state}`}
            {searchParams.zip_code && ` near ${searchParams.zip_code}`}
          </h1>
          <p className="text-gray-600">
            {count} verified professionals found
            {searchParams.state && ` in ${searchParams.state}`}
            {searchParams.zip_code && ` near ZIP ${searchParams.zip_code}`}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <SearchFilters states={states} />

        {/* Results */}
        <div className="mt-8">
          {providers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No providers found matching your criteria.</p>
              <Link href="/providers" className="btn-primary inline-block mt-4">
                Clear Filters
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  {page > 1 && (
                    <Link
                      href={`/providers?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}
                      className="btn-secondary"
                    >
                      ← Previous
                    </Link>
                  )}
                  <span className="text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages && (
                    <Link
                      href={`/providers?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}
                      className="btn-secondary"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
