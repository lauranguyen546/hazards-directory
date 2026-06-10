import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProviders } from '@/lib/supabase'
import { filterAndSortProviders } from '@/lib/filterProviders'
import ProviderCard from '@/components/ProviderCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateFAQSchema } from '@/lib/schema'

const SERVICE_MAP: Record<string, { category: string; label: string; guideSlug?: string }> = {
  'mold-remediation': { category: 'Mold', label: 'Mold Remediation', guideSlug: 'how-to-detect-mold' },
  'water-damage-restoration': { category: 'Water', label: 'Water Damage Restoration', guideSlug: 'what-to-do-after-water-damage' },
  'pest-control': { category: 'Pest', label: 'Pest Control', guideSlug: 'pest-control-cost' },
  'radon-testing': { category: 'Radon', label: 'Radon Testing & Mitigation', guideSlug: 'radon-testing-guide' },
}

// Brief state-specific context for SE states and common search states
const STATE_CONTEXT: Record<string, Record<string, string>> = {
  Florida: {
    Mold: 'Florida\'s subtropical climate — high humidity, frequent rain, and hurricane season — makes it one of the highest-risk states for mold growth. Homes with poor ventilation, flood history, or aging A/C systems are especially vulnerable.',
    Water: 'Florida experiences frequent flooding from hurricanes, tropical storms, and heavy rainfall. Water damage restoration is a critical service for homeowners across the state, especially in coastal counties.',
    Pest: 'Florida\'s warm, humid climate supports year-round pest activity. Termites (including Formosan subterranean termites), cockroaches, and mosquitoes are persistent challenges for Florida homeowners.',
    Radon: 'Radon levels in Florida are generally lower than northern states due to geology, but the EPA recommends testing all homes regardless of region.',
  },
  Georgia: {
    Mold: 'Georgia\'s humid subtropical climate creates favorable conditions for mold, particularly in basements, crawl spaces, and after storm events. Atlanta and coastal areas report higher mold remediation demand.',
    Water: 'Seasonal storms and aging infrastructure make water damage restoration a frequent need across Georgia. Crawl space flooding and roof leaks are among the most common causes.',
    Pest: 'Georgia is home to significant termite activity, fire ants, and cockroaches year-round. Professional pest control contracts are common for homeowners in suburban and rural areas.',
    Radon: 'Parts of northern Georgia, particularly in the Blue Ridge Mountain region, have elevated radon levels. The EPA recommends testing all Georgia homes below the third floor.',
  },
  'North Carolina': {
    Mold: 'North Carolina\'s mix of humid coastal areas and cooler mountain regions creates different mold risk profiles across the state. Post-hurricane mold remediation demand spikes significantly in coastal counties.',
    Water: 'Hurricanes and tropical storms periodically cause major flood events in eastern North Carolina. Water damage restoration companies serve the entire state, with peak demand after major weather events.',
    Pest: 'Termites, bed bugs, and mosquitoes are common pest concerns across North Carolina. The state has active subterranean and Eastern Formosan termite populations.',
    Radon: 'Western North Carolina — particularly the Asheville and Murphy areas — has some of the highest radon levels in the Southeast. Radon testing is strongly recommended for all homes in the mountains.',
  },
  'South Carolina': {
    Mold: 'South Carolina\'s coastal humidity and hurricane exposure create significant mold risks, especially along the Grand Strand and Lowcountry regions.',
    Water: 'Coastal flooding, storm surge, and heavy rainfall cause recurring water damage issues in South Carolina. The Charleston and Myrtle Beach areas have particularly high demand for restoration services.',
    Pest: 'South Carolina\'s warm climate supports aggressive pest activity year-round. Termite activity is among the highest in the Southeast, with multiple species present.',
    Radon: 'Radon levels in South Carolina are generally low to moderate. Testing is still recommended, particularly for homes with basements or crawl spaces.',
  },
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

  const stateContext = STATE_CONTEXT[state]?.[service.category]

  const faqs = [
    {
      question: `How much does ${service.label.toLowerCase()} cost in ${state}?`,
      answer: `${service.label} costs in ${state} vary by city and severity of the problem. Most homeowners pay between the state and national average ranges. Get 3+ quotes from verified local providers to compare prices — all quotes from HazardPros providers are free.`,
    },
    {
      question: `How do I find a licensed ${service.label.toLowerCase()} company in ${state}?`,
      answer: `Look for IICRC-certified professionals (for mold and water damage), state contractor licenses, and companies with strong Google ratings. Verify liability insurance before any work begins. HazardPros lists verified providers across ${state}.`,
    },
    {
      question: `Is ${service.category === 'Mold' ? 'mold' : service.category === 'Radon' ? 'radon' : 'water damage'} common in ${state}?`,
      answer: stateContext || `${service.label} needs vary across ${state} by climate, geography, and building type. The EPA recommends all homeowners understand their local risk level and take preventive action.`,
    },
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
      { '@type': 'ListItem', position: 2, name: `${service.label} in ${state}` },
    ],
  }

  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
          <p className="text-gray-600 mb-4">
            {count ?? providers.length} verified {service.label.toLowerCase()} professionals in {state}.
            Browse by city or submit a quote request to get matched with local pros.
          </p>

          {stateContext && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-sm text-gray-700">
              <strong>Why {state} homeowners need {service.label.toLowerCase()}:</strong>{' '}
              {stateContext}
            </div>
          )}

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

              {service.guideSlug && (
                <p className="mt-3 text-sm">
                  <Link href={`/guides/${service.guideSlug}`} className="text-primary-600 hover:underline">
                    Read our {service.label} guide →
                  </Link>
                </p>
              )}

              {/* FAQ section */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {service.label} in {state} — Frequently Asked Questions
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
