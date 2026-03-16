import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProviders } from '@/lib/supabase'
import { filterAndSortProviders } from '@/lib/filterProviders'
import ProviderCard from '@/components/ProviderCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'

const SERVICE_MAP: Record<string, { category: string; label: string }> = {
  'mold-remediation': { category: 'Mold', label: 'Mold Remediation' },
  'water-damage-restoration': { category: 'Water', label: 'Water Damage Restoration' },
  'pest-control': { category: 'Pest', label: 'Pest Control' },
  'radon-testing': { category: 'Radon', label: 'Radon Testing & Mitigation' },
}

function formatStateName(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

interface PageProps {
  params: { service: string; state: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = SERVICE_MAP[params.service]
  if (!service) return { title: 'Not Found' }
  const state = formatStateName(params.state)
  return {
    title: `${service.label} in ${state} | HazardPros`,
    description: `Find verified ${service.label.toLowerCase()} professionals across ${state}. Browse by city, compare ratings, and get free quotes.`,
  }
}

export default async function ServiceStatePage({ params }: PageProps) {
  const service = SERVICE_MAP[params.service]
  if (!service) notFound()

  const state = formatStateName(params.state)

  const { data: rawProviders, count } = await getProviders({
    state,
    service_category: service.category,
    limit: 12,
  })
  const providers = filterAndSortProviders(rawProviders || [])

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: `${service.label} in ${state}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-gray-500 flex gap-2">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>›</span>
            <span className="text-gray-900">{service.label} in {state}</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {service.label} in {state}
          </h1>
          <p className="text-gray-600 mb-8">
            {count ?? providers.length} verified {service.label.toLowerCase()} professionals in {state}.
            Browse by city or submit a quote request to get matched with local pros.
          </p>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
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
            </div>

            <aside className="mt-8 lg:mt-0">
              <LeadCaptureForm
                prefilledCategory={service.category as 'Mold' | 'Water' | 'Pest' | 'Radon'}
                prefilledState={state}
                sourcePage={`/${params.service}/${params.state}`}
              />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
