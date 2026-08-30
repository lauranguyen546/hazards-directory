import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'How to Test for Asbestos in Your Home',
  description: 'Asbestos is hidden in millions of homes built before 1980. Learn where it hides, how testing works, and what abatement costs.',
  openGraph: {
    title: 'How to Test for Asbestos in Your Home',
    description: 'Where asbestos hides in older homes, how testing works, abatement costs, and when to call a pro.',
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Should I test for asbestos before renovating an older home?',
    answer: 'Yes — absolutely. Any renovation that disturbs materials in a home built before 1980 should be preceded by asbestos testing. Cutting, sanding, or demolishing asbestos-containing materials releases fibers into the air. The EPA and OSHA both require professional handling of confirmed asbestos in renovation projects.',
  },
  {
    question: 'How much does asbestos testing cost?',
    answer: 'Professional asbestos bulk sample testing costs $25–$75 per sample (lab fee) plus $300–$600 for a certified inspector to collect samples. Air quality testing (clearance testing after abatement) costs $250–$500. DIY test kits with lab analysis are available for $30–$50 but do not cover all materials.',
  },
  {
    question: 'Is asbestos dangerous if it is not disturbed?',
    answer: 'Asbestos in good condition that is not damaged or disturbed (called "non-friable" asbestos) poses minimal risk. The danger arises when asbestos fibers become airborne — from deterioration, damage, or renovation. Intact floor tiles or roof shingles can be left in place if in good condition; damaged or friable asbestos must be addressed.',
  },
  {
    question: 'How much does asbestos abatement cost?',
    answer: 'Asbestos abatement typically costs $1,000–$3,000 for a small area and $15,000–$30,000 for a whole-home project. Costs depend heavily on the material type, square footage, and access. Encapsulation (sealing in place) is cheaper than removal ($5–$20/sq ft vs. $20–$65/sq ft for full removal).',
  },
]

export default function AsbestosTestingGuidePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: 'Asbestos Testing Guide' },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const articleSchema = generateArticleSchema({
    title: 'How to Test for Asbestos in Your Home',
    description: 'Where asbestos hides in older homes, how testing works, abatement costs, and when to call a pro.',
    slug: 'asbestos-testing-guide',
    datePublished: '2026-03-01',
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
            <span className="text-gray-900">Asbestos Testing Guide</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Home Hazards · 7 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">How to Test for Asbestos in Your Home</h1>
              <p className="text-gray-500 text-sm mb-6">Updated August 2026</p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-red-800">
                  <strong>Important:</strong> Do not disturb suspected asbestos-containing materials. If the material is intact and undamaged, it may be safer to leave it in place. Always have testing done before any renovation work in homes built before 1980.
                </p>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                Asbestos was used extensively in construction materials from the 1930s through the 1970s. Homes built before 1980 may contain asbestos in dozens of locations. When disturbed, asbestos fibers cause mesothelioma and lung cancer — often decades after exposure.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Where Asbestos Is Commonly Found</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Location</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Material</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Risk if Disturbed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Attic / walls', 'Vermiculite insulation, blown-in insulation', 'High'],
                      ['Floor tiles', '9"×9" or 12"×12" vinyl floor tiles + adhesive', 'Moderate'],
                      ['Ceiling tiles', 'Drop ceiling tiles (pre-1980)', 'Moderate–High'],
                      ['Pipe insulation', 'Wrap around heating pipes and boilers', 'High'],
                      ['Roof shingles', 'Flat or corrugated asbestos-cement roofing', 'Moderate'],
                      ['Siding', 'Asbestos-cement (Transite) board siding', 'Moderate'],
                      ['Drywall / joint compound', 'Especially pre-1977', 'High (sanding)'],
                      ['HVAC duct wrap', 'Duct insulation and tape', 'High'],
                    ].map(([loc, mat, risk]) => (
                      <tr key={loc}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{loc}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{mat}</td>
                        <td className="px-4 py-2 border border-gray-200">
                          <span className={`font-medium ${risk === 'High' ? 'text-red-600' : 'text-yellow-600'}`}>{risk}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Testing Methods</h2>

              <p className="text-gray-700 mb-3"><strong>Option 1: Professional Inspection + Lab Testing (Recommended)</strong></p>
              <ul className="space-y-2 text-gray-700 mb-4 list-disc pl-5">
                <li>A licensed asbestos inspector collects samples using proper personal protective equipment</li>
                <li>Samples are sent to an accredited NVLAP-certified laboratory</li>
                <li>Results typically in 3–5 business days (rush available in 24 hours)</li>
                <li>Inspector provides a written report identifying all ACMs (asbestos-containing materials)</li>
                <li>Cost: $300–$600 for inspection + $25–$75 per sample for lab analysis</li>
              </ul>

              <p className="text-gray-700 mb-3"><strong>Option 2: DIY Sample + Mail-In Lab</strong></p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>Collect a small sample wearing a respirator, disposable gloves, and wetting the material first</li>
                <li>Seal in a zip-lock bag, mail to an NVLAP lab</li>
                <li>Cost: $30–$50 kit + $25–$50 per sample lab fee</li>
                <li>Risk: DIY sampling can itself release fibers if done incorrectly — not recommended for friable or damaged materials</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Abatement Options and Costs</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Method</th>
                      <th className="text-left px-4 py-2 border border-gray-200">When Used</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Cost per Sq Ft</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Encapsulation', 'Material in good condition, not friable', '$5–$20'],
                      ['Enclosure', 'Covering with new material (e.g., capping floor tiles)', '$3–$15'],
                      ['Full removal', 'Damaged, friable, or renovation required', '$20–$65'],
                      ['Disposal only', 'Post-removal bagging and licensed disposal', '$50–$150/load'],
                    ].map(([method, when, cost]) => (
                      <tr key={method}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{method}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{when}</td>
                        <td className="px-4 py-2 border border-gray-200">{cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Your Rights During Renovation</h2>
              <p className="text-gray-700 mb-3">
                Federal law (EPA NESHAP regulation) requires property owners and contractors to follow specific asbestos rules before renovation or demolition of any structure. Key requirements:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>Survey for ACMs before any demolition or renovation affecting more than 160 sq ft or 260 linear ft of material</li>
                <li>Notify state or local environmental agency before large-scale disturbance</li>
                <li>Use licensed abatement contractors for removal</li>
                <li>Dispose of asbestos waste at licensed hazardous waste facilities</li>
              </ul>

              <div className="my-6">
                <AffiliateProductCard program="policygenius_insurance" sourcePage="/guides/asbestos-testing-guide" sourceCategory="Mold" />
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
                <h3 className="font-bold text-gray-900 mb-3">Related Guides & Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/guides/lead-paint-testing-guide" className="text-primary-600 hover:underline">Lead Paint Testing: What Homeowners Need to Know →</Link></li>
                  <li><Link href="/guides/how-to-detect-mold" className="text-primary-600 hover:underline">How to Tell If You Have Mold →</Link></li>
                  <li><Link href="/guides" className="text-primary-600 hover:underline">More Home Hazard Guides →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm prefilledCategory="Mold" sourcePage="/guides/asbestos-testing-guide" compact />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Find Hazard Remediation Pros</h4>
                <p className="text-sm text-gray-600 mb-3">Get matched with licensed remediation professionals in your area.</p>
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
