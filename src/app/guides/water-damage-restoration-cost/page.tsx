import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Water Damage Restoration Cost Guide 2026',
  description: 'Average water damage restoration costs by damage class, room, and material. What affects your quote and what insurance covers.',
  openGraph: {
    title: 'Water Damage Restoration Cost Guide 2026',
    description: 'Average water damage restoration costs by class, room, and material type.',
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'How much does water damage restoration cost on average?',
    answer: 'The average water damage restoration job costs $1,500–$5,000. Minor incidents (small leaks, one room) run $500–$1,500. Severe flooding or multiple rooms can reach $10,000–$30,000 or more once structural repairs are included.',
  },
  {
    question: 'Does homeowners insurance cover water damage restoration?',
    answer: 'Standard homeowners insurance covers sudden and accidental water damage (burst pipes, appliance failures, storm-driven rain). It does not cover flooding from outside (requires flood insurance) or damage from gradual leaks or deferred maintenance.',
  },
  {
    question: 'How long does water damage restoration take?',
    answer: 'Professional drying takes 3–5 days. Full restoration including drywall replacement, flooring, and painting can take 1–4 weeks depending on damage extent. Restoration can\'t begin until moisture readings confirm the structure is fully dry.',
  },
]

export default function WaterDamageRestorationCostPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: 'Water Damage Restoration Cost' },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const articleSchema = generateArticleSchema({
    title: 'Water Damage Restoration Cost Guide 2026',
    description: 'Average water damage restoration costs by damage class, room, and material.',
    slug: 'water-damage-restoration-cost',
    datePublished: '2026-02-15',
    dateModified: '2026-03-15',
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
            <span className="text-gray-900">Water Damage Restoration Cost</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Water Damage · 6 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Water Damage Restoration Cost Guide 2026</h1>
              <p className="text-gray-500 text-sm mb-8">Updated March 2026</p>

              <p className="text-lg text-gray-700 mb-6">
                The average water damage restoration project costs <strong>$1,500–$5,000</strong>, but Class 3 or 4 damage (saturated walls, subfloor, or structural elements) can reach $30,000+. Here's what to expect.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Cost by Damage Class (IICRC Standard)</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Class</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Description</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Typical Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Class 1', 'Minimal absorption — hard floors, partial walls only', '$500–$1,500'],
                      ['Class 2', 'Significant absorption — full rooms, carpet, wall cavities', '$1,500–$4,000'],
                      ['Class 3', 'Greatest absorption — ceilings, walls, insulation soaked', '$4,000–$12,000'],
                      ['Class 4', 'Specialty drying needed — concrete, hardwood, plaster', '$8,000–$25,000+'],
                    ].map(([cls, desc, cost]) => (
                      <tr key={cls}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{cls}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{desc}</td>
                        <td className="px-4 py-2 border border-gray-200">{cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Cost by Room / Area</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Area</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Average Cost</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Single room (minor)', '$500–$1,500', 'Drying only, no structural damage'],
                      ['Bathroom', '$800–$3,000', 'Often includes subfloor and tile replacement'],
                      ['Kitchen', '$1,000–$4,000', 'Cabinets, flooring, drywall'],
                      ['Basement (flooding)', '$2,500–$10,000', 'Depends on depth and materials'],
                      ['Multiple rooms', '$5,000–$15,000', 'Includes HVAC inspection'],
                      ['Whole home', '$15,000–$50,000+', 'Structural, electrical, HVAC all affected'],
                    ].map(([area, cost, notes]) => (
                      <tr key={area}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{area}</td>
                        <td className="px-4 py-2 border border-gray-200">{cost}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">What Drives the Price Up?</h2>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li><strong>Water contamination category</strong> — Category 2 (gray water) or Category 3 (sewage/black water) requires hazmat-level containment and adds 30–50% to the job</li>
                <li><strong>How long water sat</strong> — Water present for 24+ hours significantly increases mold risk and remediation scope</li>
                <li><strong>Building materials affected</strong> — Hardwood floors, plaster walls, and structural beams cost more to dry or replace</li>
                <li><strong>HVAC involvement</strong> — Ductwork that got wet requires cleaning and inspection ($500–$2,000 additional)</li>
                <li><strong>Mold discovered during restoration</strong> — Can add $500–$6,000+ if remediation is required</li>
              </ul>

              <div className="my-6">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Before the restoration company arrives:</strong> Use a moisture meter to document moisture levels yourself. Helps you verify their drying progress and dispute any inflated claims.
                </p>
                <AffiliateProductCard program="amazon_moisture_meter" sourcePage="/guides/water-damage-restoration-cost" sourceCategory="Water" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Does Insurance Cover It?</h2>
              <p className="text-gray-700 mb-3">Coverage hinges on the <em>cause</em> of the water damage:</p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li><strong>Usually covered:</strong> Burst pipes, appliance failures (washing machine, dishwasher), roof damage from a storm</li>
                <li><strong>Usually not covered:</strong> External flooding (requires flood insurance), gradual leaks from deferred maintenance, sewer backup (requires rider)</li>
              </ul>

              <div className="my-6">
                <AffiliateProductCard program="policygenius_insurance" sourcePage="/guides/water-damage-restoration-cost" sourceCategory="Water" />
              </div>

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
                  <li><Link href="/guides/what-to-do-after-water-damage" className="text-primary-600 hover:underline">What to Do After Water Damage →</Link></li>
                  <li><Link href="/guides/mold-remediation-cost" className="text-primary-600 hover:underline">Mold Removal Cost Guide →</Link></li>
                  <li><Link href="/providers?category=Water" className="text-primary-600 hover:underline">Find Water Damage Restoration Pros Near You →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm prefilledCategory="Water" sourcePage="/guides/water-damage-restoration-cost" compact />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Get a Free Quote</h4>
                <p className="text-sm text-gray-600 mb-3">Compare quotes from water damage restoration pros in your area.</p>
                <Link href="/get-quotes?category=Water" className="block text-center bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
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
