import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'Mold Removal Cost Guide 2026 | HazardPros',
  description: 'Average cost of mold remediation by type, room, and severity. Learn what affects your quote and how to save money.',
  openGraph: {
    title: 'Mold Removal Cost Guide 2026',
    description: 'Average mold remediation costs by type, room, and severity.',
    type: 'article',
  },
}

export default function MoldRemediationCostPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does mold remediation cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Average mold remediation costs range from $500 to $6,000 depending on the affected area size and mold type. Small jobs (one room) typically cost $500–$1,500. Whole-home or HVAC remediation can reach $10,000+.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does homeowners insurance cover mold removal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on the cause. Insurance typically covers mold from a sudden covered peril (burst pipe, storm). It usually does not cover mold from neglect, gradual leaks, or flooding (which requires separate flood insurance).',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does mold remediation take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Small jobs take 1–3 days. Medium-sized projects (multiple rooms) take 3–7 days. Large-scale remediation including drywall replacement can take 1–2 weeks.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3 text-sm text-gray-500 flex gap-2">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>›</span>
            <Link href="/guides" className="hover:text-primary-600">Guides</Link>
            <span>›</span>
            <span className="text-gray-900">Mold Removal Cost</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Mold · 6 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                Mold Removal Cost Guide 2026
              </h1>
              <p className="text-gray-500 text-sm mb-8">Updated March 2026</p>

              <p className="text-lg text-gray-700 mb-6">
                The average mold remediation project costs <strong>$1,500–$3,500</strong>, but prices vary widely by mold type, affected area, and location. Here's what to expect.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Cost by Affected Area</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Area</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Average Cost</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Typical Scope</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Bathroom', '$500–$1,500', 'Grout, caulk, drywall behind tiles'],
                      ['Basement', '$500–$3,000', 'Concrete, framing, insulation'],
                      ['Crawl space', '$1,500–$5,000', 'Vapor barrier, joists, insulation'],
                      ['Attic', '$1,000–$4,000', 'Decking, rafters, insulation'],
                      ['HVAC / ducts', '$3,000–$10,000', 'Duct cleaning + coil treatment'],
                      ['Whole home', '$10,000–$30,000', 'Multiple areas, structural damage'],
                    ].map(([area, cost, scope]) => (
                      <tr key={area}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{area}</td>
                        <td className="px-4 py-2 border border-gray-200">{cost}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">What Affects the Price?</h2>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li><strong>Square footage affected</strong> — Most pros charge $10–$25 per sq ft of affected area</li>
                <li><strong>Mold type</strong> — Black mold (Stachybotrys) requires more extensive containment</li>
                <li><strong>Accessibility</strong> — Mold inside walls, crawl spaces, or attics costs more to reach</li>
                <li><strong>Structural damage</strong> — Replacing drywall, insulation, or subfloor adds $1,000–$5,000</li>
                <li><strong>Post-remediation testing</strong> — Add $200–$500 for air quality verification</li>
              </ul>

              <div className="my-8">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Before calling a pro:</strong> Get a rough sense of severity with a DIY test kit. This can help you compare quotes more accurately.
                </p>
                <AffiliateProductCard
                  program="amazon_mold_kit"
                  sourcePage="/guides/mold-remediation-cost"
                  sourceCategory="Mold"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Does Insurance Cover It?</h2>
              <p className="text-gray-700 mb-3">
                Coverage depends entirely on the <em>cause</em> of the mold:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li><strong>Usually covered:</strong> Mold from a burst pipe, appliance leak, or roof damage from a storm</li>
                <li><strong>Usually not covered:</strong> Mold from long-term neglect, humidity, or flooding (requires separate flood insurance)</li>
              </ul>

              <div className="my-6">
                <AffiliateProductCard
                  program="policygenius_insurance"
                  sourcePage="/guides/mold-remediation-cost"
                  sourceCategory="Mold"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4 mb-8">
                <details className="border border-gray-200 rounded-lg">
                  <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">How much does mold remediation cost?</summary>
                  <p className="px-4 pb-4 text-gray-600 text-sm">Average mold remediation costs range from $500 to $6,000. Small jobs (one room) typically cost $500–$1,500. Whole-home or HVAC remediation can reach $10,000+.</p>
                </details>
                <details className="border border-gray-200 rounded-lg">
                  <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">Does homeowners insurance cover mold removal?</summary>
                  <p className="px-4 pb-4 text-gray-600 text-sm">It depends on the cause. Insurance typically covers mold from a sudden covered peril (burst pipe, storm) but not from neglect or gradual leaks.</p>
                </details>
                <details className="border border-gray-200 rounded-lg">
                  <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">How long does mold remediation take?</summary>
                  <p className="px-4 pb-4 text-gray-600 text-sm">Small jobs take 1–3 days. Medium projects take 3–7 days. Large-scale remediation including drywall replacement can take 1–2 weeks.</p>
                </details>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-3">Related Guides</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/guides/how-to-detect-mold" className="text-primary-600 hover:underline">How to Tell If You Have Mold →</Link></li>
                  <li><Link href="/providers?category=Mold" className="text-primary-600 hover:underline">Find Mold Remediation Pros Near You →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm
                prefilledCategory="Mold"
                sourcePage="/guides/mold-remediation-cost"
                compact
              />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Get a Free Quote</h4>
                <p className="text-sm text-gray-600 mb-3">Compare quotes from mold remediation pros in your area.</p>
                <Link
                  href="/get-quotes?category=Mold"
                  className="block text-center bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors"
                >
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
