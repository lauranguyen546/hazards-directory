import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Termite Inspection & Treatment Cost Guide 2026',
  description: 'Average termite inspection costs, treatment prices by method, warning signs, and how to compare pest control quotes.',
  openGraph: {
    title: 'Termite Inspection & Treatment Cost Guide 2026',
    description: 'Termite inspection costs, treatment prices by method, and signs of infestation.',
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'How much does a termite inspection cost?',
    answer: 'A professional termite inspection typically costs $75–$150 for a standard inspection. Many pest control companies offer free inspections as part of a treatment quote. Real estate termite inspections (required for some mortgage types) are usually $75–$125 and come with a written WDO (Wood Destroying Organism) report.',
  },
  {
    question: 'How do I know if I have termites?',
    answer: 'Key signs include: mud tubes on foundation walls (subterranean termites), hollow-sounding wood when tapped, discarded wings near windows and doors (swarmer season), frass (termite droppings) resembling fine sawdust, and soft or buckling wood floors. Termite damage often goes undetected for years — annual professional inspections are recommended.',
  },
  {
    question: 'What is the most effective termite treatment?',
    answer: 'For subterranean termites (the most common species), soil liquid treatment (Termidor) is the gold standard — eliminates the colony within 90 days and provides 10+ years of protection. Bait systems (Sentricon) are effective and environmentally friendly but require ongoing annual monitoring. Drywood termite infestations often require fumigation (tenting).',
  },
]

export default function TermiteInspectionCostPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: 'Termite Inspection Cost' },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const articleSchema = generateArticleSchema({
    title: 'Termite Inspection & Treatment Cost Guide 2026',
    description: 'Average termite inspection costs, treatment prices by method, warning signs, and how to compare quotes.',
    slug: 'termite-inspection-cost',
    datePublished: '2026-05-01',
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
            <span className="text-gray-900">Termite Inspection Cost</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Pest Control · 6 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Termite Inspection &amp; Treatment Cost Guide 2026</h1>
              <p className="text-gray-500 text-sm mb-8">Updated August 2026</p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Scale of the problem:</strong> Termites cause an estimated $5 billion in property damage in the U.S. each year — damage that is almost never covered by homeowners insurance. Annual inspections are the single most cost-effective prevention measure.
                </p>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                Termite treatment typically costs <strong>$500–$3,000</strong> for standard soil or bait treatment. Whole-home fumigation (for drywood termites) costs <strong>$1,500–$4,000</strong>. The key is catching an infestation early — damage repair can add tens of thousands in structural costs.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Termite Treatment Cost by Method</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Treatment Method</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Cost</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Best For</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Protection Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Soil liquid treatment (Termidor)', '$500–$1,500', 'Subterranean termites — most common', '10+ years'],
                      ['Bait system (Sentricon)', '$1,500–$3,000', 'Subterranean, eco-friendly alternative', 'Ongoing (annual monitoring)'],
                      ['Spot wood treatment', '$200–$500', 'Small, localized drywood infestations', '2–5 years'],
                      ['Whole-home fumigation (tenting)', '$1,500–$4,000', 'Drywood termites, whole-structure', '5–10 years'],
                      ['Heat treatment', '$1,000–$2,500', 'Drywood termites (no chemicals)', '5+ years'],
                    ].map(([method, cost, best, duration]) => (
                      <tr key={method}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{method}</td>
                        <td className="px-4 py-2 border border-gray-200">{cost}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{best}</td>
                        <td className="px-4 py-2 border border-gray-200">{duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">7 Warning Signs of Termites</h2>
              <ol className="space-y-3 text-gray-700 mb-6 list-decimal pl-5">
                <li><strong>Mud tubes</strong> — Pencil-width tunnels running along your foundation, walls, or plumbing. Subterranean termites use these to travel from the soil to wood.</li>
                <li><strong>Discarded wings</strong> — Piles of wings near windows, doors, or light sources indicate termite swarmers (reproductive termites) — a major infestation sign.</li>
                <li><strong>Hollow wood</strong> — Tap wood surfaces; a hollow or papery sound indicates termites have eaten the interior.</li>
                <li><strong>Frass</strong> — Drywood termites leave behind pellet-like droppings that look like coffee grounds or sawdust near wood.</li>
                <li><strong>Bubbling or peeling paint</strong> — Moisture from termite activity beneath painted surfaces mimics water damage.</li>
                <li><strong>Tight-fitting doors/windows</strong> — Termite damage and moisture warps wood frames, causing doors and windows to stick.</li>
                <li><strong>Visible damage</strong> — Wood with honeycomb patterns or channels following the grain indicates active or past infestation.</li>
              </ol>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Termite Risk by Region</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Region</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Risk Level</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Primary Species</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Deep South (FL, MS, LA, AL)', 'Extreme', 'Formosan subterranean, drywood, dampwood'],
                      ['Southeast (GA, SC, NC, TX)', 'Very High', 'Eastern subterranean, Formosan'],
                      ['West Coast (CA, AZ, NV)', 'High', 'Western drywood, subterranean'],
                      ['Midwest (OH, IL, IN, MO)', 'Moderate', 'Eastern subterranean'],
                      ['Northeast (NY, PA, MA)', 'Low–Moderate', 'Eastern subterranean'],
                      ['Mountain West (CO, UT)', 'Low', 'Subterranean (limited range)'],
                    ].map(([region, risk, species]) => (
                      <tr key={region}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{region}</td>
                        <td className="px-4 py-2 border border-gray-200">
                          <span className={`font-medium ${risk.includes('Extreme') || risk.includes('Very') ? 'text-red-600' : risk === 'High' ? 'text-orange-600' : 'text-yellow-600'}`}>{risk}</span>
                        </td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{species}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="my-6">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Monitor between treatments:</strong> Termite monitoring traps placed around your foundation can detect activity early — before a full infestation develops.
                </p>
                <AffiliateProductCard program="amazon_pest_trap" sourcePage="/guides/termite-inspection-cost" sourceCategory="Pest" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Annual Service Contracts</h2>
              <p className="text-gray-700 mb-4">
                Most pest control companies offer termite warranties and annual renewal contracts after treatment:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li><strong>Liquid treatment renewal:</strong> $100–$300/year for annual inspection and warranty</li>
                <li><strong>Bait system monitoring:</strong> $150–$350/year for station inspection and bait replenishment</li>
                <li>Renewals typically include re-treatment at no extra charge if termites return</li>
                <li>General pest control contracts often include termite monitoring at no additional cost</li>
              </ul>

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
                  <li><Link href="/guides/pest-control-cost" className="text-primary-600 hover:underline">Pest Control Cost Guide 2026 →</Link></li>
                  <li><Link href="/guides/mold-remediation-cost" className="text-primary-600 hover:underline">Mold Removal Cost Guide (termite damage often causes moisture) →</Link></li>
                  <li><Link href="/providers?category=Pest" className="text-primary-600 hover:underline">Find Pest Control Pros Near You →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm prefilledCategory="Pest" sourcePage="/guides/termite-inspection-cost" compact />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Get a Free Termite Quote</h4>
                <p className="text-sm text-gray-600 mb-3">Compare quotes from licensed pest control pros in your area.</p>
                <Link href="/get-quotes?category=Pest" className="block text-center bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
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
