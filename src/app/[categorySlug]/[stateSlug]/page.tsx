import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProviders, getStates, getCountiesByState, getCategoryStateParams } from '@/lib/supabase'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { CATEGORIES, isCategorySlug, toSlug } from '@/lib/slugs'
import { CATEGORY_CONTENT } from '@/lib/categoryContent'
import { filterAndSortProviders } from '@/lib/filterProviders'
import ProviderCard from '@/components/ProviderCard'

interface Props {
  params: { categorySlug: string; stateSlug: string }
}

async function resolveParams(params: Props['params']) {
  const { categorySlug, stateSlug } = params
  if (!isCategorySlug(categorySlug)) return null

  const states = await getStates()
  const state = states.find((s) => toSlug(s) === stateSlug)
  if (!state) return null

  return { category: CATEGORIES[categorySlug], state }
}

export async function generateStaticParams() {
  const combos = await getCategoryStateParams()
  const slugMap: Record<string, string> = {
    Mold: 'mold-remediation',
    Water: 'water-damage-restoration',
    Pest: 'pest-control',
    Radon: 'radon-testing',
  }
  return combos.map((row) => ({
    categorySlug: slugMap[row.service_category] ?? toSlug(row.service_category),
    stateSlug: toSlug(row.state),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await resolveParams(params)
  if (!resolved) return { title: 'Not Found' }

  const { category, state } = resolved
  const title = `${category.label} in ${state} | Hazards Directory`
  const description = `Find trusted ${category.metaDescription} professionals in ${state}. Browse local providers, compare ratings, and get quotes.`

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    alternates: {
      canonical: `/${params.categorySlug}/${params.stateSlug}`,
    },
  }
}

export default async function StateCategoryPage({ params }: Props) {
  const resolved = await resolveParams(params)
  if (!resolved) notFound()

  const { category, state } = resolved
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazards.directory'

  const [{ data: rawProviders, count }, counties] = await Promise.all([
    getProviders({ state, service_category: category.dbValue, limit: 1000 }),
    getCountiesByState(state),
  ])

  const providers = filterAndSortProviders(rawProviders ?? [])
  const totalCount = count ?? providers.length

  const ratedProviders = providers.filter((p) => p.rating != null)
  const avgRating =
    ratedProviders.length > 0
      ? ratedProviders.reduce((sum, p) => sum + (p.rating ?? 0), 0) / ratedProviders.length
      : null

  // Only show counties that have providers for this category
  const countiesWithProviders = counties.filter((county) =>
    providers.some((p) => p.county === county)
  )

  const content = CATEGORY_CONTENT[params.categorySlug as keyof typeof CATEGORY_CONTENT]

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: category.label, url: `${baseUrl}/${params.categorySlug}` },
    { name: state, url: `${baseUrl}/${params.categorySlug}/${params.stateSlug}` },
  ])
  const faqSchema = generateFAQSchema(content.faqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span aria-hidden="true">›</span>
              <span className="text-gray-900">{category.label}</span>
              <span aria-hidden="true">›</span>
              <span className="text-gray-900 font-medium">{state}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section
          className="text-white py-14 px-4"
          style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #2146C7 100%)' }}
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              {category.label} in {state}
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Browse {totalCount}+ verified {category.metaDescription} professionals serving {state}.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-white/10 rounded-lg px-5 py-4 text-center">
                <div className="text-2xl font-bold">{totalCount}</div>
                <div className="text-sm text-blue-100">Providers</div>
              </div>
              <div className="bg-white/10 rounded-lg px-5 py-4 text-center">
                <div className="text-2xl font-bold">{countiesWithProviders.length}</div>
                <div className="text-sm text-blue-100">Counties</div>
              </div>
              {avgRating != null && (
                <div className="bg-white/10 rounded-lg px-5 py-4 text-center">
                  <div className="text-2xl font-bold">{avgRating.toFixed(1)} ★</div>
                  <div className="text-sm text-blue-100">Avg. Rating</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Browse by county */}
        {countiesWithProviders.length > 0 && (
          <section className="bg-white border-b py-6 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Browse by County
              </h2>
              <div className="flex flex-wrap gap-2">
                {countiesWithProviders.map((county) => (
                  <Link
                    key={county}
                    href={`/${params.categorySlug}/${params.stateSlug}/${toSlug(county)}`}
                    className="bg-gray-100 hover:bg-primary-50 hover:text-primary-700 border border-transparent hover:border-primary-200 px-3 py-1.5 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {county}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Provider list */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {totalCount} {category.label} Providers in {state}
          </h2>

          {providers.length === 0 ? (
            <p className="text-gray-500">No providers found for this location.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </section>

        {/* Educational Content */}
        <div className="max-w-6xl mx-auto px-4 pb-16 space-y-12">
          {/* What Is */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About {category.label} in {state}
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl">{content.whatIs}</p>
          </section>

          {/* Warning Signs */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Warning Signs to Watch For</h2>
            <ul className="space-y-3 max-w-3xl">
              {content.warningSigns.map((sign, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    !
                  </span>
                  <span className="text-gray-700">{sign}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What to Expect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {content.whatToExpect.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="text-sm font-semibold text-primary-600 mb-2">{item.step}</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to Choose */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Choose a {category.label} Provider in {state}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 max-w-3xl">
              {content.howToChoose.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.factor}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {category.label} FAQs
            </h2>
            <div className="space-y-5 max-w-3xl">
              {content.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Guides */}
          {content.relatedGuides && content.relatedGuides.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides</h2>
              <div className="flex flex-wrap gap-3">
                {content.relatedGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="bg-white border border-gray-200 hover:border-primary-300 hover:bg-primary-50 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-700 transition-colors"
                  >
                    {guide.title} →
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
