import { Metadata } from 'next'
import Link from 'next/link'
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Home Hazard Guides',
  description: 'Free guides on mold detection, water damage, radon testing, and pest control for homeowners.',
}

const guides = [
  {
    slug: 'what-to-do-after-water-damage',
    title: 'What to Do After Water Damage',
    description: 'Step-by-step checklist for the first 24–72 hours after water damage — minimize costs, prevent mold, and protect your insurance claim.',
    category: 'Water Damage',
    icon: '💧',
    readTime: '7 min read',
  },
  {
    slug: 'how-to-detect-mold',
    title: 'How to Tell If You Have Mold',
    description: 'Learn the signs of mold growth in your home, where to look, and whether you need a professional.',
    category: 'Mold',
    icon: '🦠',
    readTime: '5 min read',
  },
  {
    slug: 'mold-remediation-cost',
    title: 'Mold Removal Cost Guide 2026',
    description: 'Average costs for mold remediation by type, location, and severity — plus what affects your quote.',
    category: 'Mold',
    icon: '💰',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-choose-mold-remediation-company',
    title: 'How to Choose a Mold Remediation Company',
    description: '7 things to verify before hiring: certifications, insurance, containment protocol, and red flags to avoid.',
    category: 'Mold',
    icon: '✅',
    readTime: '6 min read',
  },
  {
    slug: 'mold-vs-mildew',
    title: 'Mold vs. Mildew: How to Tell the Difference',
    description: 'Visual guide to identifying mold vs. mildew — appearance, smell, health risks, and when each needs a pro.',
    category: 'Mold',
    icon: '🔍',
    readTime: '5 min read',
  },
  {
    slug: 'water-damage-restoration-cost',
    title: 'Water Damage Restoration Cost Guide 2026',
    description: 'Average restoration costs by damage class, room, and material — plus what insurance covers.',
    category: 'Water Damage',
    icon: '🏠',
    readTime: '6 min read',
  },
  {
    slug: 'pest-control-cost',
    title: 'Pest Control Cost Guide 2026',
    description: 'Cost by pest type, one-time vs. contract pricing, and when DIY makes sense.',
    category: 'Pest Control',
    icon: '🐜',
    readTime: '5 min read',
  },
  {
    slug: 'radon-testing-guide',
    title: 'How to Test Your Home for Radon',
    description: 'Radon is the #2 cause of lung cancer in the US. Learn how to test and when to call a mitigation pro.',
    category: 'Radon',
    icon: '☢️',
    readTime: '5 min read',
  },
]

export default function GuidesIndexPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides' },
  ])
  const itemList = generateItemListSchema(
    guides.map(g => ({ name: g.title, url: `${baseUrl}/guides/${g.slug}` }))
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <main className="min-h-screen bg-gray-50">
        <section
          className="text-white py-14 px-4"
          style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #2146C7 100%)' }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Home Hazard Guides</h1>
            <p className="text-blue-100 text-lg">
              Free guides to help you understand, detect, and address home hazards — and know when to call a pro.
            </p>
          </div>
        </section>

        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow flex gap-4 items-start"
                >
                  <span className="text-3xl shrink-0">{guide.icon}</span>
                  <div>
                    <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                      {guide.category} · {guide.readTime}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 mt-1 mb-2">{guide.title}</h2>
                    <p className="text-gray-600">{guide.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
