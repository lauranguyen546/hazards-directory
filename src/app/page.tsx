import { Metadata } from 'next'
import Link from 'next/link'
import { getStates, getProviders } from '@/lib/supabase'
import { generateOrganizationSchema } from '@/lib/schema'
import ProviderCard from '@/components/ProviderCard'
import SearchFiltersWrapper from '@/components/SearchFiltersWrapper'
import TopRatedSection from '@/components/TopRatedSection'

export const metadata: Metadata = {
  title: 'Hazards Directory | Mold, Water Damage & Pest Control Pros',
  description: 'Find verified mold remediation, water damage restoration, and pest control providers across the United States.',
}

export default async function HomePage() {
  const [{ data: providers }, states] = await Promise.all([
    getProviders({ limit: 12 }),
    getStates(),
  ])

  const organizationSchema = generateOrganizationSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Trusted Hazards Professionals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Verified mold remediation, water damage restoration, and pest control providers across the United States.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#directory" className="btn-primary text-lg">
                Browse Directory
              </Link>
              <Link href="#about" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Regional Focus Section */}
        <section className="py-8 bg-primary-50 border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-primary-900">Southeast Focus</h2>
                <p className="text-primary-700">Deep coverage in FL, GA, NC, SC</p>
              </div>
              <Link 
                href="/se" 
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Explore Southeast Directory →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600">4,600+</div>
                <div className="text-gray-600">Verified Providers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">{states.length}</div>
                <div className="text-gray-600">States Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">4</div>
                <div className="text-gray-600">Service Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">Google</div>
                <div className="text-gray-600">Verified Ratings</div>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section id="directory" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Browse Providers</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Find mold remediation, water damage restoration, and pest control professionals in your area.
            </p>

            <SearchFiltersWrapper states={states} />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/providers" className="btn-primary inline-block">
                View All Providers
              </Link>
            </div>
          </div>
        </section>

        {/* Top Rated Section */}
        <TopRatedSection category="Mold" limit={6} />
        
        <div className="py-8">
          <TopRatedSection category="Water" limit={6} />
        </div>

        {/* Categories Section */}
        <section className="py-16 bg-gray-100 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Service Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <CategoryCard
                title="Mold Remediation"
                description="Professional mold inspection, testing, and removal services."
                icon="🦠"
                href="/providers?category=Mold"
              />
              <CategoryCard
                title="Water Damage Restoration"
                description="Emergency water extraction, drying, and restoration services."
                icon="💧"
                href="/providers?category=Water"
              />
              <CategoryCard
                title="Pest Control"
                description="Licensed professionals for termites, rodents, and household pests."
                icon="🐜"
                href="/providers?category=Pest"
              />
              <CategoryCard
                title="Radon Testing"
                description="Certified radon testing and mitigation services for home safety."
                icon="☢️"
                href="/providers?category=Radon"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Hazards Directory?</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Finding reliable contractors for critical home services shouldn&apos;t be a gamble. 
                We compile verified provider information from Google Business Profile data, 
                including real ratings and reviews from actual customers.
              </p>
              <p>
                Our directory focuses specifically on hazards-related services—mold remediation, 
                water damage restoration, and pest control—because these are the services that 
                protect your home&apos;s value and your family&apos;s health.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white text-lg font-bold mb-4">Hazards Directory</h3>
                <p className="text-sm">
                  Connecting homeowners with trusted mold, water damage, and pest control professionals.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/providers?category=Mold" className="hover:text-white">Mold Remediation</Link></li>
                  <li><Link href="/providers?category=Water" className="hover:text-white">Water Damage</Link></li>
                  <li><Link href="/providers?category=Pest" className="hover:text-white">Pest Control</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <p className="text-sm">For provider inquiries or corrections, please contact us.</p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              © {new Date().getFullYear()} Hazards Directory. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

function CategoryCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: string
  href: string
}) {
  return (
    <Link href={href} className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  )
}
