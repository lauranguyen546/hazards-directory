import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Mold vs. Mildew: How to Tell the Difference',
  description: 'Learn how to distinguish mold from mildew by appearance, smell, and health risk — and know when each requires professional treatment.',
  openGraph: {
    title: 'Mold vs. Mildew: How to Tell the Difference',
    description: 'Visual guide to identifying mold vs. mildew — appearance, smell, health risks, and treatment options.',
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Is mildew dangerous to health?',
    answer: 'Mildew is generally less harmful than mold. It can cause respiratory irritation, coughing, and headaches in sensitive individuals. However, it rarely causes the serious health issues associated with black mold (Stachybotrys chartarum). Most healthy adults tolerate mildew without major effects.',
  },
  {
    question: 'Can I remove mildew myself?',
    answer: 'Yes, mildew is typically a DIY job. A solution of 1 cup bleach per gallon of water, applied with a scrub brush, removes most mildew from non-porous surfaces. Wear gloves and ensure ventilation. If it keeps returning, address the underlying moisture problem.',
  },
  {
    question: 'How do I know if I have mold or mildew?',
    answer: 'Mildew is flat, powdery, and white or gray. It grows on surfaces and wipes away easily. Mold is raised, fuzzy, and can be black, green, or blue. Mold penetrates surfaces and often has a stronger musty odor. When in doubt, use a DIY test kit.',
  },
  {
    question: 'Does mildew turn into mold?',
    answer: 'Mildew and mold are different fungi. Mildew does not "turn into" mold. However, the same moisture conditions that allow mildew to thrive also support mold growth. If you see mildew, check nearby areas carefully for mold — especially inside walls, under flooring, or in HVAC systems.',
  },
]

export default function MoldVsMildewPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: 'Mold vs. Mildew' },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const articleSchema = generateArticleSchema({
    title: 'Mold vs. Mildew: How to Tell the Difference',
    description: 'Learn how to distinguish mold from mildew by appearance, smell, and health risk.',
    slug: 'mold-vs-mildew',
    datePublished: '2026-01-25',
    dateModified: '2026-03-10',
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
            <span className="text-gray-900">Mold vs. Mildew</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Mold · 5 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Mold vs. Mildew: How to Tell the Difference</h1>
              <p className="text-gray-500 text-sm mb-8">Updated March 2026</p>

              <p className="text-lg text-gray-700 mb-6">
                Both mold and mildew are fungi that thrive in damp conditions — but they look different, carry different health risks, and require different treatments. Here's how to tell them apart.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-3">At a Glance: Mold vs. Mildew</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Feature</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Mold</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Mildew</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Appearance', 'Fuzzy or slimy; raised', 'Flat, powdery; surface-level'],
                      ['Color', 'Black, green, blue, or white', 'White, gray, or light brown'],
                      ['Texture', 'Irregular, uneven surface', 'Smooth, powder-like'],
                      ['Odor', 'Strong musty/earthy smell', 'Mild musty smell'],
                      ['Growth pattern', 'Penetrates surfaces', 'Surface-only growth'],
                      ['Health risk', 'Moderate to high', 'Low to moderate'],
                      ['DIY removal?', 'Often not (>10 sq ft)', 'Usually yes'],
                      ['Common locations', 'Walls, ceilings, inside materials', 'Bathroom tile, window sills'],
                    ].map(([feature, mold, mildew]) => (
                      <tr key={feature}>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{feature}</td>
                        <td className="px-4 py-2 border border-gray-200">{mold}</td>
                        <td className="px-4 py-2 border border-gray-200">{mildew}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">How to Visually Identify Each</h2>
              <p className="text-gray-700 mb-3"><strong>Mildew</strong> looks like a flat dusting on a surface — think of the white powder on bathroom grout or window sills. It tends to be:</p>
              <ul className="space-y-2 text-gray-700 mb-4 list-disc pl-5">
                <li>Flat against the surface (not raised)</li>
                <li>White, light gray, or pale yellow</li>
                <li>Concentrated on surfaces exposed to moisture and poor air circulation</li>
                <li>Removable with a standard household cleaner and scrub brush</li>
              </ul>

              <p className="text-gray-700 mb-3"><strong>Mold</strong> often has a three-dimensional, fuzzy or slimy appearance. Key identifying features:</p>
              <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-5">
                <li>Raised off the surface, with visible texture or fuzz</li>
                <li>Black, dark green, blue-green, or sometimes white</li>
                <li>Often accompanied by a strong, persistent musty odor</li>
                <li>May return quickly after surface cleaning (grows beneath the surface)</li>
                <li>Common in areas with past water damage or chronic humidity</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">The Bleach Test</h2>
              <p className="text-gray-700 mb-6">
                Apply a few drops of household bleach to the dark spot. Wait 2 minutes. <strong>If it lightens, it's mildew or surface mold.</strong> If it stays dark, it's likely deeper mold that has penetrated the material. This test doesn't work on porous surfaces like wood or drywall — professional testing is better in those cases.
              </p>

              <div className="my-6">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Not sure which you have?</strong> A DIY test kit identifies the fungal type and concentration before you decide on treatment.
                </p>
                <AffiliateProductCard program="amazon_mold_kit" sourcePage="/guides/mold-vs-mildew" sourceCategory="Mold" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Health Risks</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Type</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Common Symptoms</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border border-gray-200 font-medium">Mildew</td>
                      <td className="px-4 py-2 border border-gray-200">Mild respiratory irritation, headache</td>
                      <td className="px-4 py-2 border border-gray-200 text-yellow-600">Low</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 border border-gray-200 font-medium">Common mold</td>
                      <td className="px-4 py-2 border border-gray-200">Allergies, coughing, eye/skin irritation</td>
                      <td className="px-4 py-2 border border-gray-200 text-orange-600">Moderate</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-200 font-medium">Black mold (Stachybotrys)</td>
                      <td className="px-4 py-2 border border-gray-200">Neurological symptoms, chronic fatigue, respiratory illness</td>
                      <td className="px-4 py-2 border border-gray-200 text-red-600">High</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Treatment Comparison</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 border border-gray-200">Situation</th>
                      <th className="text-left px-4 py-2 border border-gray-200">Treatment</th>
                      <th className="text-left px-4 py-2 border border-gray-200">DIY or Pro?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Mildew on bathroom tile', 'Bleach solution + scrub', 'DIY'],
                      ['Mildew on window sill', 'Bleach spray + wipe', 'DIY'],
                      ['Small mold patch (< 10 sq ft)', 'EPA-registered cleaner', 'DIY (with precautions)'],
                      ['Mold on drywall or wood', 'Material removal + encapsulation', 'Pro recommended'],
                      ['Mold inside walls', 'Containment + demolition + drying', 'Pro required'],
                      ['Black mold anywhere', 'Full remediation protocol', 'Pro required'],
                    ].map(([situation, treatment, who]) => (
                      <tr key={situation}>
                        <td className="px-4 py-2 border border-gray-200">{situation}</td>
                        <td className="px-4 py-2 border border-gray-200">{treatment}</td>
                        <td className="px-4 py-2 border border-gray-200 font-medium">{who}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  <li><Link href="/guides/how-to-detect-mold" className="text-primary-600 hover:underline">How to Tell If You Have Mold →</Link></li>
                  <li><Link href="/guides/mold-remediation-cost" className="text-primary-600 hover:underline">Mold Removal Cost Guide 2026 →</Link></li>
                  <li><Link href="/providers?category=Mold" className="text-primary-600 hover:underline">Find Mold Remediation Pros Near You →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm prefilledCategory="Mold" sourcePage="/guides/mold-vs-mildew" compact />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Find Mold Pros Near You</h4>
                <p className="text-sm text-gray-600 mb-3">Browse verified mold remediation professionals in your area.</p>
                <Link href="/providers?category=Mold" className="block text-center bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
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
