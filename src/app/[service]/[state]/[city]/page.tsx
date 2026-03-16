import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProviders } from '@/lib/supabase'
import { filterAndSortProviders } from '@/lib/filterProviders'
import ProviderCard from '@/components/ProviderCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'

// Map URL slugs to service categories and display names
const SERVICE_MAP: Record<string, { category: string; label: string; guideSlug?: string }> = {
  'mold-remediation': { category: 'Mold', label: 'Mold Remediation', guideSlug: 'how-to-detect-mold' },
  'water-damage-restoration': { category: 'Water', label: 'Water Damage Restoration' },
  'pest-control': { category: 'Pest', label: 'Pest Control' },
  'radon-testing': { category: 'Radon', label: 'Radon Testing & Mitigation', guideSlug: 'radon-testing-guide' },
}

function formatCityName(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function formatStateName(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

interface PageProps {
  params: { service: string; state: string; city: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = SERVICE_MAP[params.service]
  if (!service) return { title: 'Not Found' }

  const city = formatCityName(params.city)
  const state = formatStateName(params.state)

  return {
    title: `${service.label} in ${city}, ${state} | HazardPros`,
    description: `Find verified ${service.label.toLowerCase()} professionals in ${city}, ${state}. Compare ratings, get free quotes from local experts.`,
    openGraph: {
      title: `${service.label} in ${city}, ${state}`,
      description: `Top-rated ${service.label.toLowerCase()} companies near ${city}, ${state}.`,
      type: 'website',
    },
  }
}

export default async function ServiceCityPage({ params }: PageProps) {
  const service = SERVICE_MAP[params.service]
  if (!service) notFound()

  const city = formatCityName(params.city)
  const state = formatStateName(params.state)

  // Fetch providers for this state/category (county-level filter not always available for city)
  const { data: rawProviders } = await getProviders({
    state,
    service_category: service.category,
    limit: 12,
  })
  const providers = filterAndSortProviders(rawProviders || [])

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.label,
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'State', name: state },
    },
    provider: { '@type': 'Organization', name: 'HazardPros' },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: service.label, item: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.service}/${params.state}` },
      { '@type': 'ListItem', position: 3, name: `${city}, ${state}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-gray-500 flex gap-2 flex-wrap">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>›</span>
            <Link href={`/${params.service}/${params.state}`} className="hover:text-primary-600 capitalize">
              {service.label} in {state}
            </Link>
            <span>›</span>
            <span className="text-gray-900">{city}</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {service.label} in {city}, {state}
          </h1>
          <p className="text-gray-600 mb-8">
            {providers.length > 0
              ? `${providers.length} verified ${service.label.toLowerCase()} professionals serving ${city}, ${state}.`
              : `We're expanding coverage in ${city}. Submit your request and we'll match you with nearby providers.`}
          </p>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              {providers.length > 0 ? (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Top {service.label} Companies</h2>
                  <div className="grid sm:grid-cols-2 gap-5 mb-8">
                    {providers.map(provider => (
                      <ProviderCard key={provider.id} provider={provider} />
                    ))}
                  </div>
                  <Link
                    href={`/providers?state=${encodeURIComponent(state)}&category=${service.category}`}
                    className="text-primary-600 hover:underline text-sm"
                  >
                    View all {service.label.toLowerCase()} providers in {state} →
                  </Link>
                </>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center mb-8">
                  <p className="text-gray-500">No providers listed yet for this area.</p>
                  <Link href="/providers" className="text-primary-600 hover:underline text-sm mt-2 block">
                    Browse all providers →
                  </Link>
                </div>
              )}

              {/* Cost / context section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  How to Find a {service.label} Company in {city}
                </h2>
                <p className="text-gray-600 mb-3">
                  When choosing a {service.label.toLowerCase()} company in {city}, {state}, look for:
                </p>
                <ul className="space-y-2 text-gray-700 list-disc pl-5 text-sm">
                  <li>State licensing and certifications (e.g., IICRC for water/mold)</li>
                  <li>Google rating of 4.0+ stars with at least 10 reviews</li>
                  <li>Clear written estimates before work begins</li>
                  <li>Proof of liability insurance and workers' compensation</li>
                  <li>Post-project inspection or air quality test (for mold/radon)</li>
                </ul>
                {service.guideSlug && (
                  <Link
                    href={`/guides/${service.guideSlug}`}
                    className="text-primary-600 hover:underline text-sm mt-4 inline-block"
                  >
                    Read our full {service.label} guide →
                  </Link>
                )}
              </div>
            </div>

            <aside className="mt-8 lg:mt-0 space-y-6">
              <LeadCaptureForm
                prefilledCategory={service.category as 'Mold' | 'Water' | 'Pest' | 'Radon'}
                prefilledState={state}
                sourcePage={`/${params.service}/${params.state}/${params.city}`}
              />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
