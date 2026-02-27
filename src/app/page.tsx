import { Metadata } from 'next'
import Link from 'next/link'
import { getStates, getProviders } from '@/lib/supabase'
import { generateOrganizationSchema } from '@/lib/schema'
import ProviderCard from '@/components/ProviderCard'
import SearchFiltersWrapper from '@/components/SearchFiltersWrapper'
import TopRatedSection from '@/components/TopRatedSection'
import { filterAndSortProviders } from '@/lib/filterProviders'

export const metadata: Metadata = {
  title: 'Hazards Directory | Mold, Water Damage & Pest Control Pros',
  description: 'Find verified mold remediation, water damage restoration, and pest control providers across the United States.',
}

export default async function HomePage() {
  const [{ data: rawProviders }, states] = await Promise.all([
    getProviders({ limit: 12 }),
    getStates(),
  ])

  const providers = filterAndSortProviders(rawProviders)
  const organizationSchema = generateOrganizationSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main className="min-h-screen">
        {/* ── Hero Section ── */}
        <section
          className="text-white py-20 px-4 min-h-[60vh] flex items-center"
          style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #2146C7 100%)' }}
        >
          <div className="max-w-6xl mx-auto text-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Trusted Hazards Professionals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Verified mold remediation, water damage restoration, and pest control providers across the United States.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* Task 2 + Task 8: primary CTA gets amber accent */}
              <Link
                href="#directory"
                className="bg-amber-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-amber-600 transition-colors"
              >
                Browse Directory
              </Link>
              {/* Task 2: secondary CTA becomes ghost/outlined */}
              <Link
                href="#about"
                className="border border-white text-white bg-transparent px-6 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* ── Task 4: Featured Region Banner ── */}
        <section className="py-8 border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Deep Coverage in the Southeast
              </h2>
              <p className="text-gray-600 mb-5">
                Extensive listings across FL, GA, NC &amp; SC — with nationwide expansion underway.
              </p>
              <Link
                href="/se"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-block"
              >
                Explore Southeast Directory →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Task 3: Stats Bar ── */}
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
              {/* Task 3: Replace "Google / Verified Ratings" with rating stat */}
              <div>
                <div className="text-3xl font-bold text-primary-600">4.7★</div>
                <div className="text-gray-600">Avg Google Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Directory Section ── */}
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

        {/* Top Rated Sections */}
        <TopRatedSection category="Mold" limit={6} />

        <div className="py-8">
          <TopRatedSection category="Water" limit={6} />
        </div>

        {/* ── Categories Section ── */}
        <section id="categories" className="py-16 bg-gray-100 px-4">
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

        {/* ── Task 7: Why Hazards Directory — 3-column trust pillars ── */}
        <section id="about" className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Why Hazards Directory?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-50 rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-bold mb-3">Google-Verified Data</h3>
                <p className="text-gray-600 text-sm">
                  Provider info pulled directly from Google Business Profiles, including real ratings and reviews from customers.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-lg font-bold mb-3">Hazard-Specific Focus</h3>
                <p className="text-gray-600 text-sm">
                  Unlike general directories, we specialize in the services that protect your home&apos;s value and your family&apos;s health.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-bold mb-3">4,600+ Verified Providers</h3>
                <p className="text-gray-600 text-sm">
                  Extensive coverage across the US, with deep listings across FL, GA, NC, and SC.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Task 9: Footer ── */}
        <footer id="contact" className="bg-gray-900 text-gray-300 py-12 px-4">
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
                  <li><Link href="/providers?category=Mold" className="hover:text-white transition-colors">Mold Remediation</Link></li>
                  <li><Link href="/providers?category=Water" className="hover:text-white transition-colors">Water Damage</Link></li>
                  <li><Link href="/providers?category=Pest" className="hover:text-white transition-colors">Pest Control</Link></li>
                </ul>
              </div>
              {/* Task 9: Real contact info */}
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="mailto:contact@hazardsdirectory.com"
                      className="hover:text-white transition-colors"
                    >
                      contact@hazardsdirectory.com
                    </a>
                  </li>
                  <li>
                    <Link href="/list-your-business" className="hover:text-white transition-colors">
                      List Your Business →
                    </Link>
                  </li>
                </ul>
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
