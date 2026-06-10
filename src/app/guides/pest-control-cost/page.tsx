import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Pest Control Cost Guide 2026',
  description: 'Average pest control costs by pest type, treatment method, and home size. One-time vs. contract pricing and when DIY makes sense.',
  openGraph: {
    title: 'Pest Control Cost Guide 2026',
    description: 'Average pest control costs by pest type and treatment method — one-time vs. subscription pricing.',
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'How much does pest control cost on average?',
    answer: 'A one-time pest control visit typically costs $150–$400. Annual service contracts run $300–$700/year ($25–$60/month). The price varies significantly by pest type — termite treatment, for example, can cost $500–$3,000 depending on the method.',
  },
  {
    question: 'Is pest control worth the cost?',
    answer: 'For persistent or damaging pests like termites, rodents, or bed bugs, professional treatment pays for itself quickly. DIY products handle surface-level infestations but rarely eliminate colonies. If you\'ve tried DIY twice without success, call a pro.',
  },
  {
    question: 'How often should you have pest control done?',
    answer: 'For preventive maintenance, quarterly treatments are the industry standard. Monthly treatments are recommended in high-pest climates (Southern states) or if you have had recent infestations. Annual termite inspections are recommended everywhere.',
  },
]

export default function PestControlCostPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: 'Pest Control Cost' },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const articleSchema = generateArticleSchema({
    title: 'Pest Control Cost Guide 2026',
    description: 'Average pest control costs by pest type, treatment method, and home size.',
    slug: 'pest-control-cost',
    datePublished: '2026-02-20',
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
            <span className="text-gray-900">Pest Control Cost</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Pest Control · 5 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Pest Control Cost Guide 2026</h1>
              <p className="text-gray-500 text-sm mb-8">Updated March 2026</p>

              <p className="text-lg text-gray-700 mb-6">
                A one-time pest control treatment costs <strong>$150–$400</strong> for most common pests. Ongoing service contracts run <strong>$300–$700/year</strong>. Specialty treatments for termites or bed bugs cost significantly more.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Cost by Pest Type</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Pest</th>
                      <th className="text-left px-4 py-2 border border-gray-200">One-Time Cost</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Ants', '$150–$300', '1–2 treatments usually sufficient'],
                      ['Cockroaches', '$100–$400', 'Severe infestations need 2–3 visits'],
                      ['Rodents (mice/rats)', '$200–$600', 'Includes trapping + exclusion'],
                      ['Bed bugs', '$500–$1,500', 'Heat treatment preferred; most costly'],
                      ['Termites (liquid)', '$500–$1,500', 'Soil treatment around foundation'],
                      ['Termites (bait system)', '$1,500–$3,000', 'Plus annual monitoring ($150–$300/yr)'],
                      ['Mosquitoes (seasonal)', '$350–$700/season', 'Monthly treatments May–Oct'],
                      ['Wasps / hornets', '$100–$300', 'Nest removal included'],
                      ['Wildlife (raccoons, etc.)', '$200–$600', 'Trapping + exclusion'],
                    ].map(([pest, cost, notes]) => (
                      <tr key={pest}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{pest}</td>
                        <td className="px-4 py-2 border border-gray-200">{cost}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">One-Time vs. Annual Service Contract</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Option</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Typical Cost</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border border-gray-200 font-medium">One-time treatment</td>
                      <td className="px-4 py-2 border border-gray-200">$150–$400</td>
                      <td className="px-4 py-2 border border-gray-200">Isolated problem, first-time homeowner</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 border border-gray-200 font-medium">Quarterly service</td>
                      <td className="px-4 py-2 border border-gray-200">$300–$500/yr</td>
                      <td className="px-4 py-2 border border-gray-200">Preventive maintenance, most homeowners</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-200 font-medium">Monthly service</td>
                      <td className="px-4 py-2 border border-gray-200">$400–$700/yr</td>
                      <td className="px-4 py-2 border border-gray-200">High-pest climates, history of infestations</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">DIY vs. Professional Pest Control</h2>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li><strong>DIY is effective for:</strong> Occasional ants, minor spider problems, pantry moths, fruit flies — surface-level pests with no colony structure</li>
                <li><strong>Hire a pro for:</strong> Termites (always), bed bugs, rodent exclusion, wood-boring beetles, recurring infestations</li>
                <li><strong>DIY pitfall:</strong> OTC sprays often kill visible insects but don't reach nests or colonies — the infestation returns within weeks</li>
              </ul>

              <div className="my-6">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>For minor pests or to supplement professional treatment:</strong> Quality traps and baits can help monitor and control between visits.
                </p>
                <AffiliateProductCard program="amazon_pest_trap" sourcePage="/guides/pest-control-cost" sourceCategory="Pest" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">What Affects the Price?</h2>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li><strong>Pest type</strong> — Termites and bed bugs are specialty treatments requiring different equipment and expertise</li>
                <li><strong>Infestation severity</strong> — Larger infestations need more product and more follow-up visits</li>
                <li><strong>Home size</strong> — Most companies quote per square foot for general pest control</li>
                <li><strong>Location</strong> — Southern states typically have lower per-visit pricing due to higher demand and competition</li>
                <li><strong>Contract vs. one-time</strong> — Contracts are cheaper per visit; one-time visits carry a premium</li>
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
                <h3 className="font-bold text-gray-900 mb-3">Related Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/providers?category=Pest" className="text-primary-600 hover:underline">Find Pest Control Pros Near You →</Link></li>
                  <li><Link href="/guides" className="text-primary-600 hover:underline">More Home Hazard Guides →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm prefilledCategory="Pest" sourcePage="/guides/pest-control-cost" compact />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Get a Free Quote</h4>
                <p className="text-sm text-gray-600 mb-3">Compare quotes from pest control pros in your area.</p>
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
