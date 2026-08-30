import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Crawl Space Encapsulation Cost Guide 2026',
  description: 'Average crawl space encapsulation costs, what is included, vapor barrier types, and when you need it to prevent mold and moisture.',
  openGraph: {
    title: 'Crawl Space Encapsulation Cost Guide 2026',
    description: 'Average costs for crawl space encapsulation, vapor barriers, and moisture control.',
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'How much does crawl space encapsulation cost?',
    answer: 'Crawl space encapsulation typically costs $1,500–$15,000 depending on the size of the crawl space, moisture severity, and whether a dehumidifier is included. Most homeowners pay $5,000–$8,000 for a complete encapsulation with a 20-mil vapor barrier. DIY vapor barrier installation (without sealing walls) costs $500–$1,500.',
  },
  {
    question: 'Is crawl space encapsulation worth it?',
    answer: 'For homes with moisture problems, standing water, or mold in the crawl space — yes. Encapsulation prevents structural damage, reduces mold risk, improves indoor air quality (up to 50% of indoor air in a home comes from the crawl space), and can lower heating/cooling costs by 10–25%. The ROI is strong if moisture issues already exist.',
  },
  {
    question: 'Does homeowners insurance cover crawl space encapsulation?',
    answer: 'Rarely. Encapsulation is considered preventive maintenance and is almost never covered by standard homeowners insurance. However, if a covered event (burst pipe, flooding) caused the moisture damage that necessitates encapsulation, the related remediation work may be covered.',
  },
]

export default function CrawlSpaceEncapsulationCostPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: 'Crawl Space Encapsulation Cost' },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const articleSchema = generateArticleSchema({
    title: 'Crawl Space Encapsulation Cost Guide 2026',
    description: 'Average crawl space encapsulation costs, what is included, vapor barrier types, and when you need it.',
    slug: 'crawl-space-encapsulation-cost',
    datePublished: '2026-04-15',
    dateModified: '2026-08-01',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3 text-sm text-gray-500 flex gap-2">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>›</span>
            <Link href="/guides" className="hover:text-primary-600">Guides</Link>
            <span>›</span>
            <span className="text-gray-900">Crawl Space Encapsulation Cost</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Mold & Moisture · 6 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Crawl Space Encapsulation Cost Guide 2026</h1>
              <p className="text-gray-500 text-sm mb-8">Updated August 2026</p>

              <p className="text-lg text-gray-700 mb-6">
                Crawl space encapsulation costs <strong>$1,500–$15,000</strong> for most homes, with most projects landing at <strong>$5,000–$8,000</strong>. The process seals ground moisture, prevents mold, and significantly improves indoor air quality.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">What Is Crawl Space Encapsulation?</h2>
              <p className="text-gray-700 mb-4">
                Encapsulation is the process of sealing your crawl space from moisture. A professional-grade vapor barrier (typically 12–20 mil polyethylene) is installed across the ground and walls, all seams are sealed, vents are closed or sealed, and a crawl space dehumidifier is often installed to maintain low humidity year-round.
              </p>
              <p className="text-gray-700 mb-6">
                This differs from a basic "vapor barrier" installation — true encapsulation seals walls, columns, and all penetrations, creating a conditioned space rather than just covering the ground.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Cost Breakdown by Component</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Component</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Typical Cost</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Vapor barrier (ground + walls)', '$1,200–$4,000', '12–20 mil poly; thicker = more durable'],
                      ['Sealing vents and openings', '$200–$500', 'Required for true encapsulation'],
                      ['Crawl space dehumidifier', '$1,000–$2,000', 'Installed unit; ongoing electricity cost ~$100/yr'],
                      ['Drainage / sump pump', '$1,000–$3,000', 'Only needed if standing water present'],
                      ['Mold remediation (if existing)', '$500–$3,000', 'Must address before encapsulating'],
                      ['Insulation (walls or ceiling)', '$500–$2,500', 'Optional; improves efficiency'],
                      ['Full project (typical)', '$5,000–$8,000', 'Barrier + sealing + dehumidifier'],
                    ].map(([component, cost, notes]) => (
                      <tr key={component}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{component}</td>
                        <td className="px-4 py-2 border border-gray-200">{cost}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Signs You Need Encapsulation</h2>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>Musty odor in the home (especially on the first floor)</li>
                <li>Visible mold on joists, insulation, or the ground</li>
                <li>Moisture or condensation on crawl space surfaces</li>
                <li>Wood rot or soft spots in the subfloor</li>
                <li>High indoor humidity (above 60% RH in summer)</li>
                <li>Pest activity in the crawl space (insects thrive in moist environments)</li>
                <li>Standing water or muddy soil after rain</li>
              </ul>

              <div className="my-6">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Before calling for quotes:</strong> Check current moisture levels in the crawl space. This helps contractors scope the job accurately and prevents inflated estimates.
                </p>
                <AffiliateProductCard program="amazon_moisture_meter" sourcePage="/guides/crawl-space-encapsulation-cost" sourceCategory="Mold" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Vapor Barrier Thickness Guide</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Thickness</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Use Case</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Durability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['6 mil', 'Basic ground cover only (not encapsulation)', 'Low — tears easily, not suitable for walking'],
                      ['12 mil', 'Entry-level full encapsulation', 'Good — suitable for most homes'],
                      ['20 mil', 'Heavy-duty encapsulation', 'Excellent — 25-year life expectancy'],
                    ].map(([thickness, useCase, durability]) => (
                      <tr key={thickness}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{thickness}</td>
                        <td className="px-4 py-2 border border-gray-200">{useCase}</td>
                        <td className="px-4 py-2 border border-gray-200">{durability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">DIY vs. Professional Encapsulation</h2>
              <p className="text-gray-700 mb-4">
                DIY encapsulation (ground barrier only) can cost $500–$1,500 in materials. However, true encapsulation — sealing walls, vents, and penetrations — requires professional installation to be effective. Improper installation can trap moisture against joists, worsening the problem.
              </p>
              <p className="text-gray-700 mb-6">
                If you have existing mold, structural damage, or standing water, always hire a professional first.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4 mb-8">
                {FAQS.map((faq) => (
                  <details key={faq.question} className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">{faq.question}</summary>
                    <p className="px-4 pb-4 text-gray-600 text-sm">{faq.answer}</p>
                  </details>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-3">Related Guides</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/guides/mold-remediation-cost" className="text-primary-600 hover:underline">Mold Removal Cost Guide 2026 →</Link></li>
                  <li><Link href="/guides/how-to-detect-mold" className="text-primary-600 hover:underline">How to Tell If You Have Mold →</Link></li>
                  <li><Link href="/providers?category=Mold" className="text-primary-600 hover:underline">Find Mold Remediation Pros Near You →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm prefilledCategory="Mold" sourcePage="/guides/crawl-space-encapsulation-cost" compact />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Get a Free Quote</h4>
                <p className="text-sm text-gray-600 mb-3">Compare quotes from crawl space and mold remediation pros in your area.</p>
                <Link href="/get-quotes?category=Mold" className="block text-center bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
                  Get Free Quotes →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
