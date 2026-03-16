import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'How to Test Your Home for Radon | HazardPros',
  description: 'Radon is the second leading cause of lung cancer in the US. Learn how to test your home and when to hire a radon mitigation professional.',
  openGraph: {
    title: 'How to Test Your Home for Radon',
    description: 'DIY radon testing guide with mitigation cost estimates and when to call a pro.',
    type: 'article',
  },
}

export default function RadonTestingGuidePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a dangerous radon level?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The EPA recommends taking action if radon levels reach 4 pCi/L or higher. Levels between 2–4 pCi/L should be considered for mitigation. Average US indoor level is about 1.3 pCi/L.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does radon mitigation cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Radon mitigation (installing a sub-slab depressurization system) typically costs $800–$2,500 depending on home size and foundation type. Most systems last 10–15 years.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a radon test take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Short-term tests take 2–7 days. Long-term tests (more accurate) take 90 days to 1 year. Professional tests take 2–4 days and provide same-day results.',
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
            <span className="text-gray-900">Radon Testing Guide</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Radon · 5 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                How to Test Your Home for Radon
              </h1>
              <p className="text-gray-500 text-sm mb-6">Updated March 2026</p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Radon is colorless, odorless, and radioactive — you can't detect it without a test. It's the #2 cause of lung cancer in the US (after smoking), responsible for ~21,000 deaths per year.
                </p>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                The EPA recommends testing every home below the third floor. Testing is cheap and easy — but many homeowners skip it. Here's everything you need to know.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Radon Action Levels</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Level (pCi/L)</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Risk</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Recommended Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Below 2', 'Low', 'No action needed — retest in 2 years'],
                      ['2–4', 'Moderate', 'Consider mitigation'],
                      ['4–8', 'High', 'Mitigate within a few months'],
                      ['Above 8', 'Very High', 'Mitigate as soon as possible'],
                    ].map(([level, risk, action]) => (
                      <tr key={level}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{level}</td>
                        <td className="px-4 py-2 border border-gray-200">{risk}</td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-600">{action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">How to Test for Radon</h2>
              <p className="text-gray-700 mb-3"><strong>Option 1: DIY Test Kit</strong> — Available at hardware stores or online for $15–$40. You place a canister in the lowest livable area for 48–96 hours (short-term) or 3–12 months (long-term), then mail it to a lab.</p>

              <div className="my-6">
                <AffiliateProductCard
                  program="amazon_radon_kit"
                  sourcePage="/guides/radon-testing-guide"
                  sourceCategory="Radon"
                />
              </div>

              <p className="text-gray-700 mb-6"><strong>Option 2: Professional Testing</strong> — A certified radon professional places an electronic continuous monitor or charcoal canister. Costs $150–$300 but provides faster, more accurate results and a certified report for real estate transactions.</p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">What Happens If Levels Are High?</h2>
              <p className="text-gray-700 mb-3">If your test comes back at 4 pCi/L or higher, you'll need radon mitigation — typically a sub-slab depressurization (SSD) system:</p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>A contractor drills through the slab and installs a pipe + fan system</li>
                <li>The fan draws radon from beneath the foundation and vents it outside</li>
                <li>Typical cost: <strong>$800–$2,500</strong></li>
                <li>System lasts 10–15 years; fan replacement costs ~$200</li>
                <li>Post-installation test recommended to verify effectiveness</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4 mb-8">
                <details className="border border-gray-200 rounded-lg">
                  <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">What is a dangerous radon level?</summary>
                  <p className="px-4 pb-4 text-gray-600 text-sm">The EPA recommends action at 4 pCi/L or higher. Average US indoor level is about 1.3 pCi/L. Levels between 2–4 should be considered for mitigation.</p>
                </details>
                <details className="border border-gray-200 rounded-lg">
                  <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">How much does radon mitigation cost?</summary>
                  <p className="px-4 pb-4 text-gray-600 text-sm">Radon mitigation typically costs $800–$2,500 depending on home size and foundation type. Most systems last 10–15 years.</p>
                </details>
                <details className="border border-gray-200 rounded-lg">
                  <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">How long does a radon test take?</summary>
                  <p className="px-4 pb-4 text-gray-600 text-sm">Short-term tests take 2–7 days. Long-term tests (more accurate) take 90 days to 1 year. Professional tests take 2–4 days.</p>
                </details>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-3">Find a Radon Pro Near You</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/providers?category=Radon" className="text-primary-600 hover:underline">Browse Radon Testing & Mitigation Professionals →</Link></li>
                  <li><Link href="/guides" className="text-primary-600 hover:underline">More Home Hazard Guides →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm
                prefilledCategory="Radon"
                sourcePage="/guides/radon-testing-guide"
                compact
              />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Find Radon Pros</h4>
                <p className="text-sm text-gray-600 mb-3">Browse certified radon testing and mitigation professionals.</p>
                <Link
                  href="/providers?category=Radon"
                  className="block text-center bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  Browse Radon Pros →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
