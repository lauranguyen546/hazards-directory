import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProviders, getStates, getCountiesByState, getCategoryStateCountyParams } from '@/lib/supabase'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { CATEGORIES, isCategorySlug, toSlug } from '@/lib/slugs'
import { filterAndSortProviders } from '@/lib/filterProviders'
import ProviderCard from '@/components/ProviderCard'

interface Props {
  params: { categorySlug: string; stateSlug: string; countySlug: string }
}

async function resolveParams(params: Props['params']) {
  const { categorySlug, stateSlug, countySlug } = params
  if (!isCategorySlug(categorySlug)) return null

  const states = await getStates()
  const state = states.find((s) => toSlug(s) === stateSlug)
  if (!state) return null

  const counties = await getCountiesByState(state)
  const county = counties.find((c) => toSlug(c) === countySlug)
  if (!county) return null

  return { category: CATEGORIES[categorySlug], state, county }
}

export async function generateStaticParams() {
  const combos = await getCategoryStateCountyParams()
  const slugMap: Record<string, string> = {
    Mold: 'mold-remediation',
    Water: 'water-damage-restoration',
    Pest: 'pest-control',
    Radon: 'radon-testing',
  }
  return combos.map((row) => ({
    categorySlug: slugMap[row.service_category] ?? toSlug(row.service_category),
    stateSlug: toSlug(row.state),
    countySlug: toSlug(row.county),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await resolveParams(params)
  if (!resolved) return { title: 'Not Found' }

  const { category, state, county } = resolved
  const title = `${category.label} in ${county}, ${state} | HomeRepair.Expert`
  const description = `Find trusted ${category.metaDescription} professionals in ${county}, ${state}. Browse local providers, compare ratings, and get quotes.`

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    alternates: {
      canonical: `/${params.categorySlug}/${params.stateSlug}/${params.countySlug}`,
    },
  }
}

export default async function CountyCategoryPage({ params }: Props) {
  const resolved = await resolveParams(params)
  if (!resolved) notFound()

  const { category, state, county } = resolved
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homerepair.expert'

  const { data: rawProviders, count } = await getProviders({
    state,
    county,
    service_category: category.dbValue,
    limit: 1000,
  })

  const providers = filterAndSortProviders(rawProviders ?? [])
  const totalCount = count ?? providers.length

  const ratedProviders = providers.filter((p) => p.rating != null)
  const avgRating =
    ratedProviders.length > 0
      ? ratedProviders.reduce((sum, p) => sum + (p.rating ?? 0), 0) / ratedProviders.length
      : null

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: category.label, url: `${baseUrl}/${params.categorySlug}` },
    { name: state, url: `${baseUrl}/${params.categorySlug}/${params.stateSlug}` },
    { name: county, url: `${baseUrl}/${params.categorySlug}/${params.stateSlug}/${params.countySlug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span aria-hidden="true">›</span>
              <Link
                href={`/${params.categorySlug}/${params.stateSlug}`}
                className="hover:text-primary-600"
              >
                {category.label} in {state}
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-gray-900 font-medium">{county}</span>
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
              {category.label} in {county}, {state}
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              {totalCount > 0
                ? `${totalCount} verified ${category.metaDescription} professional${totalCount === 1 ? '' : 's'} serving ${county} County.`
                : `Find verified ${category.metaDescription} professionals serving ${county} County, ${state}.`}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-white/10 rounded-lg px-5 py-4 text-center">
                <div className="text-2xl font-bold">{totalCount}</div>
                <div className="text-sm text-blue-100">Providers</div>
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

        {/* Provider list */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {totalCount} {category.label} Providers in {county}
            </h2>
            <Link
              href={`/${params.categorySlug}/${params.stateSlug}`}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              ← All {state} providers
            </Link>
          </div>

          {providers.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg mb-4">No providers found in {county}, {state}.</p>
              <Link
                href={`/${params.categorySlug}/${params.stateSlug}`}
                className="btn-primary inline-block"
              >
                Browse all {state} providers
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
