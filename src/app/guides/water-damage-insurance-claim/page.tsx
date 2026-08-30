import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'How to File a Water Damage Insurance Claim: Step-by-Step',
  description: 'Step-by-step guide to filing a water damage homeowners insurance claim — documentation checklist, adjuster tips, and how to avoid common denials.',
  openGraph: {
    title: 'How to File a Water Damage Insurance Claim',
    description: 'Documentation checklist, adjuster tips, and how to avoid the most common water damage claim denials.',
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'How long do I have to file a water damage insurance claim?',
    answer: 'Most policies require claims to be filed "promptly" or within a specific timeframe — typically 30 to 60 days. However, some policies allow up to a year. File as soon as possible: delays can result in claim denial if the insurer argues the damage worsened due to neglect.',
  },
  {
    question: 'Will filing a water damage claim raise my insurance rates?',
    answer: 'Possibly. One claim within a short period usually has minimal impact, but filing two or more claims within 3–5 years can significantly raise premiums or result in non-renewal. If the damage is small enough to pay out-of-pocket (under your deductible + $2,000), it\'s often worth not filing.',
  },
  {
    question: 'What does "actual cash value" vs. "replacement cost value" mean?',
    answer: 'Actual cash value (ACV) pays for damaged items minus depreciation — so a 10-year-old couch gets a reduced payout. Replacement cost value (RCV) pays what it costs to replace the item new. Most standard policies use ACV for contents but RCV for the dwelling structure. Check your declarations page.',
  },
  {
    question: 'What if my claim is denied?',
    answer: 'Request a written denial explaining the specific policy exclusion invoked. You can: (1) appeal internally through the insurer, (2) hire a public adjuster (they work on commission, typically 10–15% of the settlement), (3) file a complaint with your state insurance commissioner, or (4) consult a policyholder attorney.',
  },
]

export default function WaterDamageInsuranceClaimPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: 'Water Damage Insurance Claim' },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const articleSchema = generateArticleSchema({
    title: 'How to File a Water Damage Insurance Claim: Step-by-Step',
    description: 'Documentation checklist, adjuster tips, and how to avoid the most common water damage claim denials.',
    slug: 'water-damage-insurance-claim',
    datePublished: '2026-04-01',
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
            <span className="text-gray-900">Water Damage Insurance Claim</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Water Damage · 8 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">How to File a Water Damage Insurance Claim: Step-by-Step</h1>
              <p className="text-gray-500 text-sm mb-6">Updated August 2026</p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Key rule:</strong> Do not make permanent repairs before your insurer documents the damage. You can — and should — take emergency protective measures (tarps, water extraction), but major repairs before the adjuster visit may reduce your payout.
                </p>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                Water damage is the second most common homeowners insurance claim (after wind/hail). The difference between a full payout and a denied claim often comes down to documentation and process. This guide walks you through every step.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Step 1: Stop the Water Source</h2>
              <p className="text-gray-700 mb-6">
                Shut off the main water valve, call a plumber, or make any emergency repair to stop the leak. Your insurer expects you to mitigate ongoing damage — failing to do so can reduce your payout. Document what you did and when.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Step 2: Document Everything Before Cleanup</h2>
              <p className="text-gray-700 mb-3">Before moving anything:</p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>Photograph and video every affected room from multiple angles</li>
                <li>Document water levels, stain lines, and affected materials</li>
                <li>Photograph damaged belongings, furniture, appliances, and valuables</li>
                <li>Take time-stamped photos — most phones embed timestamps in metadata</li>
                <li>Note the date and approximate time of discovery</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Step 3: Call Your Insurance Company</h2>
              <p className="text-gray-700 mb-3">Contact your insurer as soon as possible — ideally within 24 hours. When you call:</p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>Get a claim number and the adjuster's name and direct contact</li>
                <li>Ask what your deductible is (confirm it's the same as on your declarations page)</li>
                <li>Ask what information they need from you upfront</li>
                <li>Confirm the timeline for an adjuster visit</li>
                <li>Ask if they have a preferred vendor list for restoration — you are not required to use it</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Step 4: Take Emergency Protective Measures</h2>
              <p className="text-gray-700 mb-4">
                You can — and should — take immediate action to prevent further damage. Keep receipts for all emergency expenses:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>Water extraction and emergency drying (covered by most policies)</li>
                <li>Tarps over roof damage</li>
                <li>Board-up of broken windows or doors</li>
                <li>Emergency plumber call to stop the source</li>
                <li>Moving salvageable belongings to a dry area</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Step 5: Get Independent Estimates</h2>
              <p className="text-gray-700 mb-4">
                Get at least 2–3 written estimates from licensed restoration contractors before accepting the insurer's settlement. Estimates should itemize:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>Water extraction and drying (days, equipment used)</li>
                <li>Structural drying and moisture readings</li>
                <li>Materials to be removed (drywall, flooring, insulation)</li>
                <li>Rebuild scope and materials</li>
                <li>Mold testing / post-remediation clearance if applicable</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Common Reasons Claims Are Denied</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Denial Reason</th>
                      <th className="text-left px-4 py-2 border border-gray-200">What It Means</th>
                      <th className="text-left px-4 py-2 border border-gray-200">How to Avoid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Gradual leak', 'Damage developed over weeks/months — not sudden', 'Report leaks as soon as discovered'],
                      ['Flood exclusion', 'Water entered from outside (storm surge, overland flooding)', 'Separate flood insurance required'],
                      ['Maintenance neglect', 'Worn-out pipes, roof, or appliances not maintained', 'Document regular maintenance records'],
                      ['Late filing', 'Claim filed too long after the event', 'File within 24–72 hours of discovery'],
                      ['Sewer backup', 'Sewage or drain backup excluded unless rider purchased', 'Add sewer backup endorsement to policy'],
                    ].map(([reason, meaning, avoid]) => (
                      <tr key={reason}>
                        <td className="px-4 py-2 border border-gray-200 font-medium text-red-700">{reason}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{meaning}</td>
                        <td className="px-4 py-2 border border-gray-200">{avoid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Working with the Adjuster</h2>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>Be present during the adjuster's inspection — point out all damage, including hidden moisture</li>
                <li>Ask the adjuster to explain every line item in their estimate</li>
                <li>Get the adjuster's estimate in writing before signing anything</li>
                <li>If you disagree with the settlement, invoke the "appraisal clause" in your policy — both sides select a neutral appraiser</li>
                <li>Do not sign a direction-to-pay or assignment of benefits to a contractor until you understand what you're signing</li>
              </ul>

              <div className="my-6">
                <AffiliateProductCard program="policygenius_insurance" sourcePage="/guides/water-damage-insurance-claim" sourceCategory="Water" />
              </div>

              <div className="my-4">
                <AffiliateProductCard program="choice_home_warranty" sourcePage="/guides/water-damage-insurance-claim" sourceCategory="Water" />
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
                  <li><Link href="/guides/what-to-do-after-water-damage" className="text-primary-600 hover:underline">What to Do After Water Damage: Step-by-Step Checklist →</Link></li>
                  <li><Link href="/guides/water-damage-restoration-cost" className="text-primary-600 hover:underline">Water Damage Restoration Cost Guide 2026 →</Link></li>
                  <li><Link href="/providers?category=Water" className="text-primary-600 hover:underline">Find Water Damage Restoration Pros Near You →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm prefilledCategory="Water" sourcePage="/guides/water-damage-insurance-claim" compact />
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
