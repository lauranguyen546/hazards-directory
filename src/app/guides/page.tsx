import { Metadata } from 'next'
import Link from 'next/link'
import { GUIDES } from '@/lib/guides'
import { CATEGORIES } from '@/lib/slugs'

export const metadata: Metadata = {
  title: 'Home Hazard Guides | Mold, Water Damage & More | HomeRepair.Expert',
  description:
    'Free guides for homeowners on mold remediation, water damage restoration, pest control, and radon testing — what to expect, costs, warning signs, and how to find pros.',
  alternates: { canonical: '/guides' },
}

const CATEGORY_COLORS: Record<string, string> = {
  'mold-remediation': 'bg-green-50 text-green-700 border-green-200',
  'water-damage-restoration': 'bg-blue-50 text-blue-700 border-blue-200',
  'pest-control': 'bg-orange-50 text-orange-700 border-orange-200',
  'radon-testing': 'bg-purple-50 text-purple-700 border-purple-200',
}

export default function GuidesIndexPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span aria-hidden="true">›</span>
            <span className="text-gray-900 font-medium">Guides</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section
        className="text-white py-14 px-4"
        style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #2146C7 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Home Hazard Guides</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Free guides to help homeowners understand mold, water damage, pest control, and radon
            — what to watch for, what to expect, and how to find the right professional.
          </p>
        </div>
      </section>

      {/* Guide Cards */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide) => {
            const colorClass =
              CATEGORY_COLORS[guide.categorySlug] ?? 'bg-gray-50 text-gray-700 border-gray-200'
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-md transition-all group flex flex-col"
              >
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 w-fit ${colorClass}`}
                >
                  {guide.categoryLabel}
                </span>
                <h2 className="text-base font-semibold text-gray-900 group-hover:text-primary-700 mb-2 leading-snug">
                  {guide.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {guide.metaDescription}
                </p>
                <span className="mt-4 text-sm font-medium text-primary-600 group-hover:text-primary-700">
                  Read guide →
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="bg-white border-t py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(CATEGORIES).map(([slug, cat]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 rounded-xl p-5 transition-colors group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                  {cat.label}
                </h3>
                <p className="text-xs text-gray-500">Find local {cat.metaDescription} pros →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
