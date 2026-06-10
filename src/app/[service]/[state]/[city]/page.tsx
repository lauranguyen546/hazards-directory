import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProviders } from '@/lib/supabase'
import { filterAndSortProviders } from '@/lib/filterProviders'
import ProviderCard from '@/components/ProviderCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateFAQSchema } from '@/lib/schema'

// Map URL slugs to service categories and display names
const SERVICE_MAP: Record<string, { category: string; label: string; guideSlug?: string }> = {
  'mold-remediation': { category: 'Mold', label: 'Mold Remediation', guideSlug: 'how-to-detect-mold' },
  'water-damage-restoration': { category: 'Water', label: 'Water Damage Restoration', guideSlug: 'what-to-do-after-water-damage' },
  'pest-control': { category: 'Pest', label: 'Pest Control', guideSlug: 'pest-control-cost' },
  'radon-testing': { category: 'Radon', label: 'Radon Testing & Mitigation', guideSlug: 'radon-testing-guide' },
}

const COST_RANGES: Record<string, { low: string; high: string; avg: string }> = {
  Mold: { low: '$500', high: '$6,000', avg: '$1,500–$3,500' },
  Water: { low: '$500', high: '$10,000', avg: '$1,500–$5,000' },
  Pest: { low: '$150', high: '$600', avg: '$150–$400' },
  Radon: { low: '$800', high: '$2,500', avg: '$800–$2,500' },
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
  const costs = COST_RANGES[service.category]

  // Fetch providers for this state/category (county-level filter not always available for city)
  const { data: rawProviders } = await getProviders({
    state,
    service_category: service.category,
    limit: 12,
  })
  const providers = filterAndSortProviders(rawProviders || [])

  const faqs = [
    {
      question: `How much does ${service.label.toLowerCase()} cost in ${city}?`,
      answer: `${service.label} in ${city}, ${state} typically costs ${costs.avg}. Prices range from ${costs.low} for minor issues to ${costs.high}+ for severe cases. Get at least 3 quotes and ask for a written scope of work before authorizing any work.`,
    },
    {
      question: `How do I find a licensed ${service.label.toLowerCase()} company in ${city}?`,
      answer: `Look for IICRC-certified technicians (for mold/water), state-licensed contractors, and companies with 4.0+ Google ratings and at least 10 reviews. Verify current liability insurance before any work begins. HazardPros lists verified providers serving ${city}, ${state}.`,
    },
    {
      question: `Does homeowners insurance cover ${service.label.toLowerCase()} in ${state}?`,
      answer: `Coverage depends on the cause. Sudden events (burst pipes, storm damage) are usually covered by standard homeowners policies. Gradual damage from deferred maintenance or flooding typically is not. Contact your insurer before beginning work to protect your claim.`,
    },
    {
      question: `How quickly can I get a ${service.label.toLowerCase()} company to my home in ${city}?`,
      answer: `Many providers offer same-day or next-day emergency service for urgent situations like water damage or severe infestations. For non-emergency work, expect 2–5 business days. Use the quote form above to get matched with available pros in ${city}.`,
    },
  ]

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

  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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

              {/* Cost section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {service.label} Cost in {city}
                </h2>
                <p className="text-gray-700 mb-3">
                  Average {service.label.toLowerCase()} cost in {city}, {state}: <strong>{costs.avg}</strong>.
                  Prices range from <strong>{costs.low}</strong> for minor issues to <strong>{costs.high}+</strong> for
                  severe cases. Final cost depends on the extent of damage, materials affected, and number of areas treated.
                </p>
                {service.guideSlug && (
                  <Link
                    href={`/guides/${service.guideSlug}`}
                    className="text-primary-600 hover:underline text-sm"
                  >
                    Read our full {service.label} guide →
                  </Link>
                )}
              </div>

              {/* How to find section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
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
              </div>

              {/* FAQ section */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {service.label} in {city} — FAQs
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="bg-white border border-gray-200 rounded-xl">
                      <summary className="px-5 py-4 font-medium text-gray-900 cursor-pointer">{faq.question}</summary>
                      <p className="px-5 pb-4 text-gray-600 text-sm">{faq.answer}</p>
                    </details>
                  ))}
                </div>
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
