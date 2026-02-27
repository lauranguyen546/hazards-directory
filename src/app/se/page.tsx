import { Metadata } from 'next'
import Link from 'next/link'
import { getProviders } from '@/lib/supabase'
import TopRatedSection from '@/components/TopRatedSection'

export const metadata: Metadata = {
  title: 'Southeast Hazards Directory | FL, GA, NC, SC',
  description: 'Find trusted mold remediation, water damage restoration, and pest control providers in Florida, Georgia, North Carolina, and South Carolina.',
}

const SE_STATES = ['Florida', 'Georgia', 'North Carolina', 'South Carolina']

export default async function SoutheastPage() {
  // Get all providers and filter for SE states
  const [{ data: allProviders }] = await Promise.all([
    getProviders({ limit: 3000 }),
  ])

  const seProviders = allProviders.filter(p => SE_STATES.includes(p.state))
  const moldCount = seProviders.filter(p => p.service_category === 'Mold').length
  const waterCount = seProviders.filter(p => p.service_category === 'Water').length
  const pestCount = seProviders.filter(p => p.service_category === 'Pest').length

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Southeast Hazards Directory
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Connecting homeowners with trusted mold, water damage, and pest control professionals across Florida, Georgia, North Carolina, and South Carolina.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{moldCount}+</div>
              <div className="text-sm text-primary-100">Mold Pros</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{waterCount}+</div>
              <div className="text-sm text-primary-100">Water Damage</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{pestCount}+</div>
              <div className="text-sm text-primary-100">Pest Control</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links by State */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-semibold mb-4">Browse by State</h2>
          <div className="flex flex-wrap gap-3">
            {SE_STATES.map(state => (
              <Link
                key={state}
                href={`/providers?state=${encodeURIComponent(state)}`}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-gray-700 transition-colors"
              >
                {state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated by Category */}
      <TopRatedSection category="Mold" limit={3} />
      
      <div className="py-8">
        <TopRatedSection category="Water" limit={3} />
      </div>
      
      <div className="py-8 bg-gradient-to-br from-primary-50 to-white">
        <TopRatedSection category="Pest" limit={3} />
      </div>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Emergency Service?
          </h2>
          <p className="text-gray-300 mb-8">
            Filter by your state and find verified professionals ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {SE_STATES.map(state => (
              <Link
                key={state}
                href={`/providers?state=${encodeURIComponent(state)}`}
                className="bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {state} Providers
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
