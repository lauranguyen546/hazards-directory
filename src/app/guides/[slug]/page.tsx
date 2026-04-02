import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GUIDES, getGuide } from '@/lib/guides'
import { generateBreadcrumbSchema, generateArticleSchema } from '@/lib/schema'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide(params.slug)
  if (!guide) return { title: 'Not Found' }
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homerepair.expert'
  return {
    title: `${guide.title} | HomeRepair.Expert`,
    description: guide.metaDescription,
    openGraph: { title: guide.title, description: guide.metaDescription, type: 'article' },
    alternates: { canonical: `${baseUrl}/guides/${guide.slug}` },
  }
}

export default function GuidePage({ params }: Props) {
  const guide = getGuide(params.slug)
  if (!guide) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homerepair.expert'

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: guide.title, url: `${baseUrl}/guides/${guide.slug}` },
  ])

  const articleSchema = generateArticleSchema({
    title: guide.title,
    description: guide.metaDescription,
    url: `${baseUrl}/guides/${guide.slug}`,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/guides" className="hover:text-primary-600">Guides</Link>
              <span aria-hidden="true">›</span>
              <span className="text-gray-900 font-medium truncate">{guide.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-10">
            <Link
              href={`/${guide.categorySlug}`}
              className="inline-block text-xs font-semibold text-primary-600 bg-primary-50 border border-primary-200 px-2.5 py-1 rounded-full mb-4 hover:bg-primary-100 transition-colors"
            >
              {guide.categoryLabel}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {guide.title}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl">{guide.metaDescription}</p>
          </div>
        </header>

        {/* Article Body */}
        <article className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
            {guide.sections.map((section, i) => (
              <section key={i} className="px-8 py-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {section.body.split('\n\n').map((paragraph, j) => {
                    // Render lines starting with ** as bold-label paragraphs
                    if (paragraph.startsWith('**') && paragraph.includes('**:')) {
                      const lines = paragraph.split('\n')
                      return (
                        <div key={j} className="space-y-3">
                          {lines.map((line, k) => {
                            const boldMatch = line.match(/^\*\*(.+?)\*\*:?\s*(.*)$/)
                            if (boldMatch) {
                              return (
                                <p key={k}>
                                  <strong className="text-gray-900">{boldMatch[1]}:</strong>{' '}
                                  {boldMatch[2]}
                                </p>
                              )
                            }
                            return line.trim() ? <p key={k}>{line}</p> : null
                          })}
                        </div>
                      )
                    }
                    return <p key={j}>{paragraph}</p>
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-10 rounded-2xl text-white px-8 py-10 text-center"
            style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #2146C7 100%)' }}
          >
            <h2 className="text-2xl font-bold mb-3">Ready to Find a Professional?</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Browse vetted local {guide.categoryLabel.toLowerCase()} professionals and get quotes today.
            </p>
            <Link
              href={guide.ctaHref}
              className="inline-block bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {guide.ctaText}
            </Link>
          </div>

          {/* Back to guides */}
          <div className="mt-8 text-center">
            <Link href="/guides" className="text-sm text-gray-500 hover:text-primary-600">
              ← Back to all guides
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}
