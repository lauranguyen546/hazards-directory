import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getStates } from '@/lib/supabase'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { CATEGORIES, isCategorySlug, toSlug } from '@/lib/slugs'
import { CATEGORY_CONTENT } from '@/lib/categoryContent'

interface Props {
  params: { categorySlug: string }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((categorySlug) => ({ categorySlug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isCategorySlug(params.categorySlug)) return { title: 'Not Found' }
  const category = CATEGORIES[params.categorySlug]
  const title = `${category.label} Services | Find Local Providers | HomeRepair.Expert`
  const description = `Find verified ${category.metaDescription} professionals near you. Compare local providers, read reviews, and get quotes. Browse by state.`
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    alternates: { canonical: `/${params.categorySlug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  if (!isCategorySlug(params.categorySlug)) notFound()

  const category = CATEGORIES[params.categorySlug]
  const content = CATEGORY_CONTENT[params.categorySlug]
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homerepair.expert'

  const states = await getStates()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: category.label, url: `${baseUrl}/${params.categorySlug}` },
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
              <span className="text-gray-900 font-medium">{category.label}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section
          className="text-white py-16 px-4"
          style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #2146C7 100%)' }}
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{category.label}</h1>
            <p className="text-lg text-blue-100 max-w-2xl mb-8">
              Find trusted, vetted {category.metaDescription} professionals in your area.
              Browse by state to compare local providers and get quotes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#browse-states"
                className="bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Browse by State
              </Link>
              <Link
                href="#what-is"
                className="border border-white/60 text-white px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Browse by State */}
        <section id="browse-states" className="bg-white border-b py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Find {category.label} Providers by State
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Select your state to browse local {category.metaDescription} professionals.
            </p>
            <div className="flex flex-wrap gap-2">
              {states.map((state) => (
                <Link
                  key={state}
                  href={`/${params.categorySlug}/${toSlug(state)}`}
                  className="bg-gray-100 hover:bg-primary-50 hover:text-primary-700 border border-transparent hover:border-primary-200 px-3 py-1.5 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {state}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
          {/* What Is */}
          <section id="what-is">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is {category.label}?
            </h2>
            <p className="text-gray-700 leading-relaxed text-base max-w-3xl">{content.whatIs}</p>
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
              How to Choose a {category.label} Provider
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
              Frequently Asked Questions
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

          {/* CTA */}
          <section className="bg-primary-700 rounded-2xl text-white px-8 py-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Find a Provider?</h2>
            <p className="text-primary-100 mb-6 max-w-xl mx-auto">
              Browse vetted {category.metaDescription} professionals by state and get quotes today.
            </p>
            <Link
              href="#browse-states"
              className="inline-block bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Browse by State
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
