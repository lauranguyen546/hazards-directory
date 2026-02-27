import Link from 'next/link'
import { getProviders } from '@/lib/supabase'
import ProviderCard from './ProviderCard'

interface TopRatedSectionProps {
  state?: string
  category?: string
  limit?: number
}

export default async function TopRatedSection({ 
  state, 
  category = 'Mold',
  limit = 6 
}: TopRatedSectionProps) {
  const { data: providers } = await getProviders({
    state,
    service_category: category,
    limit: limit * 2, // Get more so we can filter for rated ones
  })

  // Filter to only providers with ratings, sort by rating desc, then review count
  const topRated = providers
    .filter(p => p.rating && p.rating >= 4.0)
    .sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0)
      if (ratingDiff !== 0) return ratingDiff
      return (b.review_count || 0) - (a.review_count || 0)
    })
    .slice(0, limit)

  if (topRated.length === 0) return null

  const locationText = state ? `in ${state}` : 'nationwide'
  const categoryLabel = category === 'Mold' ? 'Mold Remediation' : 
                        category === 'Water' ? 'Water Damage Restoration' : 
                        'Pest Control'

  return (
    <section className="py-12 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Top Rated {categoryLabel} Pros {locationText}
            </h2>
            <p className="text-gray-600 mt-1">
              Highest rated providers with 4+ stars and verified reviews
            </p>
          </div>
          <Link 
            href={`/providers?category=${category}${state ? `&state=${state}` : ''}`}
            className="btn-secondary hidden sm:inline-block"
          >
            View All
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRated.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link 
            href={`/providers?category=${category}${state ? `&state=${state}` : ''}`}
            className="btn-secondary"
          >
            View All {categoryLabel} Pros
          </Link>
        </div>
      </div>
    </section>
  )
}
