import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Lead Paint Testing: What Homeowners Need to Know',
  description: 'Homes built before 1978 may contain lead paint. Learn how to test, what results mean, and your options for safe management or removal.',
  openGraph: {
    title: 'Lead Paint Testing: What Homeowners Need to Know',
    description: 'How to test for lead paint, interpret results, and choose between encapsulation and removal.',
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'What year did they stop using lead paint in homes?',
    answer: 'The U.S. Consumer Product Safety Commission banned lead-based paint for residential use in 1978. However, homes built before 1978 — and especially those built before 1940 — are likely to contain lead paint. The older the home, the higher the probability and concentration.',
  },
  {
    question: 'How much does lead paint testing cost?',
    answer: 'A certified lead inspector or risk assessor charges $300–$500 for a professional inspection. XRF (X-ray fluorescence) testing by a certified inspector is the gold standard — fast, non-destructive, and covers the whole home. DIY swab test kits cost $10–$30 but have higher rates of false negatives on painted-over lead.',
  },
  {
    question: 'Is lead paint dangerous if it is in good condition?',
    answer: 'Lead paint that is intact, well-adhered, and not in a chewable or friction surface (like windowsills) poses relatively low risk. The danger is from paint that chips, peels, or is disturbed by sanding/drilling. Children under 6 and pregnant women face the greatest health risk from lead exposure.',
  },
  {
    question: 'What do I have to disclose about lead paint when selling a home?',
    answer: 'Federal law (TSCA Section 1018) requires sellers of homes built before 1978 to disclose known lead paint hazards, provide available inspection reports, and give buyers a 10-day period to conduct their own inspection. Failure to disclose can result in fines of up to $18,000 per violation.',
  },
]

export default function LeadPaintTestingGuidePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: 'Lead Paint Testing Guide' },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const articleSchema = generateArticleSchema({
    title: 'Lead Paint Testing: What Homeowners Need to Know',
    description: 'How to test for lead paint, interpret results, and choose between encapsulation and removal.',
    slug: 'lead-paint-testing-guide',
    datePublished: '2026-03-10',
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
            <span className="text-gray-900">Lead Paint Testing Guide</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Home Hazards · 6 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Lead Paint Testing: What Homeowners Need to Know</h1>
              <p className="text-gray-500 text-sm mb-6">Updated August 2026</p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Who's at risk:</strong> Approximately 24 million U.S. homes still have lead paint in hazardous condition. Children under 6 and pregnant women are most vulnerable — lead exposure causes irreversible neurological damage in children.
                </p>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                If your home was built before 1978, it likely contains lead paint. The paint itself may not be dangerous — but renovation, deterioration, or friction surfaces (windows, doors) can create hazardous dust. Here's what to know.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">How Lead Paint Becomes a Hazard</h2>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li><strong>Paint that chips or peels</strong> — Deteriorating lead paint is an immediate hazard, especially on windowsills, door frames, and porches</li>
                <li><strong>Friction and impact surfaces</strong> — Windows and doors create lead dust each time they're opened or closed</li>
                <li><strong>Renovation disturbance</strong> — Sanding, cutting, or demolishing lead-painted surfaces releases high concentrations of airborne lead</li>
                <li><strong>Soil contamination</strong> — Old exterior lead paint that has flaked off contaminates yard soil near the home's foundation</li>
                <li><strong>Plumbing</strong> — Lead solder and pipes in older homes can contaminate drinking water (separate from paint)</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Testing Methods Compared</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Method</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Cost</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Accuracy</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['DIY swab kit', '$10–$30', 'Moderate (higher false negatives)', 'Quick spot-check only'],
                      ['Paint chip lab analysis', '$30–$75/sample', 'High', 'Specific material confirmation'],
                      ['XRF inspection (pro)', '$300–$500', 'Highest (reads through all layers)', 'Full home pre-renovation'],
                      ['Risk assessment (pro)', '$350–$600', 'Highest', 'Families with children, HUD housing'],
                    ].map(([method, cost, acc, best]) => (
                      <tr key={method}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{method}</td>
                        <td className="px-4 py-2 border border-gray-200">{cost}</td>
                        <td className="px-4 py-2 border border-gray-200">{acc}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">What Lead Levels Mean</h2>
              <p className="text-gray-700 mb-3">
                The EPA action level for lead paint hazards is <strong>0.5% lead by weight</strong> or <strong>1.0 mg/cm²</strong> (by XRF). The HUD standard for housing assistance is stricter. Key thresholds:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>Below threshold: Minimal risk — monitor, especially on deteriorating surfaces</li>
                <li>At or above threshold in intact surfaces: Manage in place, limit disturbance</li>
                <li>At or above threshold in friction/impact or deteriorated surfaces: Immediate abatement required</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Your Options: Encapsulation vs. Removal</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Approach</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Cost</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Pros</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Cons</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border border-gray-200 font-medium">Encapsulation</td>
                      <td className="px-4 py-2 border border-gray-200">$5–$15/sq ft</td>
                      <td className="px-4 py-2 border border-gray-200">Less disruptive, lower cost</td>
                      <td className="px-4 py-2 border border-gray-200 text-gray-600">Doesn't work on friction surfaces; must be re-inspected every 2 yrs</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 border border-gray-200 font-medium">Full removal (abatement)</td>
                      <td className="px-4 py-2 border border-gray-200">$8–$25/sq ft</td>
                      <td className="px-4 py-2 border border-gray-200">Permanent solution</td>
                      <td className="px-4 py-2 border border-gray-200 text-gray-600">More expensive; creates lead dust during removal</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">The EPA's RRP Rule (Renovation, Repair, Painting)</h2>
              <p className="text-gray-700 mb-4">
                If you hire contractors to work on a pre-1978 home with lead paint, they must be EPA-certified under the <strong>Lead Renovation, Repair, and Painting (RRP) Rule</strong>. This applies to any work disturbing more than 6 sq ft of interior painted surface or 20 sq ft of exterior. Ask for certification before hiring any contractor.
              </p>

              <div className="my-6">
                <AffiliateProductCard program="policygenius_insurance" sourcePage="/guides/lead-paint-testing-guide" sourceCategory="Mold" />
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
                  <li><Link href="/guides/asbestos-testing-guide" className="text-primary-600 hover:underline">How to Test for Asbestos in Your Home →</Link></li>
                  <li><Link href="/guides/how-to-detect-mold" className="text-primary-600 hover:underline">How to Tell If You Have Mold →</Link></li>
                  <li><Link href="/guides" className="text-primary-600 hover:underline">All Home Hazard Guides →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm prefilledCategory="Mold" sourcePage="/guides/lead-paint-testing-guide" compact />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Find Hazard Remediation Pros</h4>
                <p className="text-sm text-gray-600 mb-3">Get matched with certified lead abatement professionals in your area.</p>
                <Link href="/get-quotes" className="block text-center bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
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
