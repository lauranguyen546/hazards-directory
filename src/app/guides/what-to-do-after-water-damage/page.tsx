import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'What to Do After Water Damage: A Step-by-Step Checklist',
  description: 'Immediate steps to take after water damage to minimize costs, prevent mold, and protect your insurance claim. Checklist for the first 24–72 hours.',
  openGraph: {
    title: 'What to Do After Water Damage: A Step-by-Step Checklist',
    description: 'Step-by-step checklist for homeowners after water damage — what to do in the first 24 hours.',
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'How quickly does mold grow after water damage?',
    answer: 'Mold can begin growing within 24–48 hours of water exposure. This is why immediate drying and dehumidification is critical. If materials remain wet for more than 48 hours, mold remediation may be required in addition to restoration.',
  },
  {
    question: 'Should I use my homeowners insurance for water damage?',
    answer: 'It depends on the cause. Sudden events like burst pipes or appliance failures are typically covered. Flooding requires separate flood insurance. Gradual leaks from deferred maintenance are usually not covered. Document everything before cleanup and call your insurer before major repairs.',
  },
  {
    question: 'Can I do water damage restoration myself?',
    answer: 'Small, contained incidents (e.g., a minor appliance leak caught quickly) can sometimes be DIY-dried with fans and dehumidifiers. However, if water reached walls, subfloor, or insulation — or if the source was sewage — hire a certified restoration company. Improper drying leads to mold and structural damage.',
  },
  {
    question: 'How long does water damage restoration take?',
    answer: 'Drying typically takes 3–5 days with professional equipment. Full restoration (replacing drywall, flooring, etc.) can take 1–4 weeks depending on severity. Structural drying must be verified with a moisture meter before rebuilding.',
  },
]

export default function WaterDamageChecklistPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: 'What to Do After Water Damage' },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const articleSchema = generateArticleSchema({
    title: 'What to Do After Water Damage: A Step-by-Step Checklist',
    description: 'Immediate steps to take after water damage to minimize costs, prevent mold, and protect your insurance claim.',
    slug: 'what-to-do-after-water-damage',
    datePublished: '2026-02-10',
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
            <span className="text-gray-900">What to Do After Water Damage</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Water Damage · 7 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">What to Do After Water Damage: A Step-by-Step Checklist</h1>
              <p className="text-gray-500 text-sm mb-6">Updated March 2026</p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Act fast:</strong> Mold can start growing within 24–48 hours of water exposure. The steps you take in the first few hours dramatically affect final restoration costs.
                </p>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                Water damage is one of the most common — and costly — home insurance claims. Whether it's a burst pipe, appliance failure, or roof leak, knowing exactly what to do first can save you thousands and prevent a secondary mold problem.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Immediate Steps (First 1–2 Hours)</h2>
              <ol className="space-y-3 text-gray-700 mb-6 list-decimal pl-5">
                <li><strong>Stop the water source</strong> — Shut off the main water valve or call a plumber. If the source is a roof or structural issue, place tarps over affected areas.</li>
                <li><strong>Turn off electricity to affected areas</strong> — Water and live circuits are deadly. If you're unsure, cut power at the breaker panel.</li>
                <li><strong>Document everything</strong> — Photograph and video the damage before moving anything. This is critical for insurance claims.</li>
                <li><strong>Call your insurance company</strong> — Report the claim immediately. Do not make permanent repairs until your adjuster documents the damage (temporary protective measures are fine).</li>
                <li><strong>Move valuables to dry areas</strong> — Remove electronics, furniture, documents, and irreplaceable items from the wet zone.</li>
              </ol>

              <h2 className="text-xl font-bold text-gray-900 mb-3">First 24 Hours: Start Drying</h2>
              <ol className="space-y-3 text-gray-700 mb-6 list-decimal pl-5" start={6}>
                <li><strong>Remove standing water</strong> — Use a wet/dry vacuum for small amounts. Call a restoration company for significant flooding.</li>
                <li><strong>Pull up wet rugs and padding</strong> — Carpet padding rarely dries effectively and should be removed immediately.</li>
                <li><strong>Open windows and run fans</strong> — Increase air circulation. Aim fans at wet walls and floors.</li>
                <li><strong>Run a dehumidifier</strong> — Industrial dehumidifiers (available for rental) are significantly more effective than household units.</li>
                <li><strong>Check for hidden moisture</strong> — Use a moisture meter to check inside walls, under floors, and behind cabinets.</li>
              </ol>

              <div className="my-6">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Check moisture levels yourself:</strong> A moisture meter tells you whether walls and floors are truly dry before calling restoration complete.
                </p>
                <AffiliateProductCard program="amazon_moisture_meter" sourcePage="/guides/what-to-do-after-water-damage" sourceCategory="Water" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">When to Call a Water Damage Restoration Pro</h2>
              <p className="text-gray-700 mb-3">Don't attempt DIY restoration if any of these apply:</p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>More than 2–3 inches of standing water in any room</li>
                <li>Water has been present for more than 24 hours</li>
                <li>Sewage or contaminated water is involved (Category 2 or 3)</li>
                <li>Water has reached wall cavities, insulation, or subfloor</li>
                <li>HVAC system has been affected</li>
                <li>You notice musty odors (potential mold already starting)</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">DIY vs. Professional Restoration</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Situation</th>
                      <th className="text-left px-4 py-2 border border-gray-200">DIY</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Call a Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Minor appliance leak, caught within hours', '✓', ''],
                      ['Wet carpet only, no wall contact', '✓', ''],
                      ['Burst pipe, water in walls', '', '✓'],
                      ['Flooding from outside/storm', '', '✓'],
                      ['Sewage backup', '', '✓'],
                      ['Water damage discovered days later', '', '✓'],
                    ].map(([situation, diy, pro]) => (
                      <tr key={situation}>
                        <td className="px-4 py-2 border border-gray-200">{situation}</td>
                        <td className="px-4 py-2 border border-gray-200 text-center text-green-600 font-bold">{diy}</td>
                        <td className="px-4 py-2 border border-gray-200 text-center text-primary-600 font-bold">{pro}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Typical Cost Estimates</h2>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li><strong>Water extraction + emergency drying:</strong> $500–$2,000</li>
                <li><strong>Drywall replacement:</strong> $1,000–$3,000 per room</li>
                <li><strong>Flooring replacement:</strong> $500–$5,000 depending on material</li>
                <li><strong>Full restoration (moderate damage):</strong> $3,000–$10,000</li>
              </ul>
              <p className="text-sm text-gray-600 mb-6">
                See our full <Link href="/guides/water-damage-restoration-cost" className="text-primary-600 hover:underline">Water Damage Restoration Cost Guide</Link> for a detailed breakdown.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Insurance Claim Tips</h2>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>File the claim before making permanent repairs — insurers want to document the damage</li>
                <li>Keep all receipts for emergency materials (tarps, fans, dehumidifier rentals)</li>
                <li>Get a written estimate from a restoration company to submit alongside the claim</li>
                <li>Ask your adjuster about "additional living expenses" coverage if the home is uninhabitable</li>
                <li>Never sign a "direction to pay" or contractor assignment-of-benefits form until you understand what you're signing</li>
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
                <h3 className="font-bold text-gray-900 mb-3">Related Guides & Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/guides/water-damage-restoration-cost" className="text-primary-600 hover:underline">Water Damage Restoration Cost Guide 2026 →</Link></li>
                  <li><Link href="/guides/mold-remediation-cost" className="text-primary-600 hover:underline">Mold Removal Cost Guide →</Link></li>
                  <li><Link href="/providers?category=Water" className="text-primary-600 hover:underline">Find Water Damage Restoration Pros Near You →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm prefilledCategory="Water" sourcePage="/guides/what-to-do-after-water-damage" compact />
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
