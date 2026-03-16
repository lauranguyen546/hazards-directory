import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'How to Tell If You Have Mold in Your Home | HazardPros',
  description: 'Learn the signs of mold growth, where to check, DIY test options, and when to call a professional mold remediation company.',
  openGraph: {
    title: 'How to Tell If You Have Mold in Your Home',
    description: 'Signs of mold, where to look, DIY tests, and when to hire a professional.',
    type: 'article',
  },
}

export default function HowToDetectMoldPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does mold smell like?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mold typically has a musty, earthy odor — similar to damp soil or rotting wood. If a room smells musty even after cleaning and airing out, it may indicate hidden mold.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can mold grow inside walls?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Mold commonly grows inside walls after water intrusion, plumbing leaks, or flooding. Signs include discolored walls, peeling paint, or a musty smell with no visible mold.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I test for mold myself?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DIY mold test kits (available for $15–$40) use swab or air samples sent to a lab. They can confirm mold presence and identify the type, but a professional inspection covers more area and hidden spots.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is black mold dangerous?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stachybotrys chartarum (black mold) can produce mycotoxins that affect respiratory health, especially for children, elderly, and immunocompromised individuals. All mold types should be removed promptly.',
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
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3 text-sm text-gray-500 flex gap-2">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>›</span>
            <Link href="/guides" className="hover:text-primary-600">Guides</Link>
            <span>›</span>
            <span className="text-gray-900">How to Detect Mold</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Article */}
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Mold · 5 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                How to Tell If You Have Mold in Your Home
              </h1>
              <p className="text-gray-500 text-sm mb-8">Updated March 2026</p>

              <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  Mold is one of the most common — and most overlooked — home hazards. It can grow silently inside walls, under floors, and in HVAC systems. Here's how to spot it before it becomes a major problem.
                </p>

                <h2 className="text-xl font-bold text-gray-900 mb-3">The 5 Warning Signs of Mold</h2>
                <ol className="space-y-3 text-gray-700 mb-6 list-decimal pl-5">
                  <li><strong>Musty odor</strong> — A persistent earthy, damp smell is the #1 indicator, even with no visible mold.</li>
                  <li><strong>Visible dark spots</strong> — Black, green, or white patches on walls, ceilings, grout, or around windows.</li>
                  <li><strong>Water damage history</strong> — Any past flooding, leaks, or condensation significantly increases mold risk.</li>
                  <li><strong>Allergy symptoms at home</strong> — Coughing, sneezing, or eye irritation that improves when you leave the house.</li>
                  <li><strong>Warped or discolored surfaces</strong> — Bubbling paint, soft drywall, or stained ceiling tiles suggest moisture behind the wall.</li>
                </ol>

                <h2 className="text-xl font-bold text-gray-900 mb-3">Where to Check First</h2>
                <p className="text-gray-700 mb-3">
                  Focus your inspection on areas with past moisture exposure:
                </p>
                <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                  <li>Under sinks and around plumbing</li>
                  <li>Bathroom caulk, grout, and behind toilets</li>
                  <li>Basement walls and floor joints</li>
                  <li>Attic near roof vents or HVAC equipment</li>
                  <li>Around windows (especially in humid climates)</li>
                  <li>Inside closets on exterior walls</li>
                </ul>

                {/* Affiliate insert */}
                <div className="my-8">
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Not sure if what you see is mold?</strong> A DIY test kit can confirm it and identify the type before you call a professional.
                  </p>
                  <AffiliateProductCard
                    program="amazon_mold_kit"
                    sourcePage="/guides/how-to-detect-mold"
                    sourceCategory="Mold"
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3">DIY Testing vs. Professional Inspection</h2>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2 border border-gray-200">Method</th>
                        <th className="text-left px-4 py-2 border border-gray-200">Cost</th>
                        <th className="text-left px-4 py-2 border border-gray-200">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border border-gray-200">DIY test kit</td>
                        <td className="px-4 py-2 border border-gray-200">$15–$40</td>
                        <td className="px-4 py-2 border border-gray-200">Confirming visible mold, small areas</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2 border border-gray-200">Professional inspection</td>
                        <td className="px-4 py-2 border border-gray-200">$200–$600</td>
                        <td className="px-4 py-2 border border-gray-200">Hidden mold, large areas, buying/selling a home</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-200">Air quality testing</td>
                        <td className="px-4 py-2 border border-gray-200">$300–$700</td>
                        <td className="px-4 py-2 border border-gray-200">Health concerns, post-remediation verification</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3">When to Call a Professional</h2>
                <p className="text-gray-700 mb-3">Call a mold remediation professional if:</p>
                <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                  <li>The affected area is larger than 10 square feet</li>
                  <li>Mold is in your HVAC system or ductwork</li>
                  <li>You or family members have health symptoms</li>
                  <li>Mold returns after DIY cleaning</li>
                  <li>You're buying or selling a home</li>
                </ul>

                {/* FAQ */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4 mb-8">
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">What does mold smell like?</summary>
                    <p className="px-4 pb-4 text-gray-600 text-sm">Mold has a musty, earthy odor — similar to damp soil or rotting wood. If a room smells musty even after cleaning and airing out, it may indicate hidden mold.</p>
                  </details>
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">Can mold grow inside walls?</summary>
                    <p className="px-4 pb-4 text-gray-600 text-sm">Yes. Mold commonly grows inside walls after water intrusion, plumbing leaks, or flooding. Signs include discolored walls, peeling paint, or a musty smell with no visible mold.</p>
                  </details>
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">Is black mold dangerous?</summary>
                    <p className="px-4 pb-4 text-gray-600 text-sm">Stachybotrys chartarum (black mold) can produce mycotoxins that affect respiratory health, especially for children, the elderly, and immunocompromised individuals. All mold should be removed promptly.</p>
                  </details>
                </div>

                {/* Related guides */}
                <div className="bg-blue-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Related Guides</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/guides/mold-remediation-cost" className="text-primary-600 hover:underline">Mold Removal Cost Guide 2026 →</Link></li>
                    <li><Link href="/providers?category=Mold" className="text-primary-600 hover:underline">Find Mold Remediation Pros Near You →</Link></li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm
                prefilledCategory="Mold"
                sourcePage="/guides/how-to-detect-mold"
                compact
              />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Find Mold Pros Near You</h4>
                <p className="text-sm text-gray-600 mb-3">Browse verified mold remediation professionals in your area.</p>
                <Link
                  href="/providers?category=Mold"
                  className="block text-center bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  Browse Mold Pros →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
