import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'List Your Business | HazardPros',
  description: 'Get your mold remediation, water damage restoration, pest control, or radon business listed on HazardPros. Reach homeowners actively searching for your services.',
}

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get listed and found by homeowners at no cost.',
    cta: 'Claim Free Listing',
    ctaHref: 'mailto:contact@hazardpros.com?subject=Free Listing Request',
    highlight: false,
    features: [
      'Listed in directory',
      'Google-verified ratings displayed',
      'Phone & website links',
      'County & state coverage',
      'No leads distributed',
    ],
    missing: ['Lead notifications', 'Verified badge', 'Enhanced profile', 'Priority placement'],
  },
  {
    name: 'Basic',
    price: '$149',
    period: 'per month',
    description: 'Receive leads from homeowners in your county.',
    cta: 'Start Basic',
    ctaHref: 'mailto:contact@hazardpros.com?subject=Basic Plan Inquiry',
    highlight: false,
    features: [
      'Everything in Free',
      'Up to 10 leads/month (county)',
      '"Verified Provider" badge',
      'Enhanced profile — description, logo',
      'Monthly lead report email',
    ],
    missing: ['Priority placement', 'Photo gallery', 'State-wide leads'],
  },
  {
    name: 'Premium',
    price: '$349',
    period: 'per month',
    description: 'Maximum visibility and lead volume across your state.',
    cta: 'Start Premium',
    ctaHref: 'mailto:contact@hazardpros.com?subject=Premium Plan Inquiry',
    highlight: true,
    features: [
      'Everything in Basic',
      'Up to 30 leads/month (state-wide)',
      '"Top Rated Pro" badge',
      'Priority placement — shown first',
      'Photo gallery (up to 5 photos)',
      'Direct quote requests from homeowners',
    ],
    missing: [],
  },
]

export default function ListYourBusinessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section
        className="text-white py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #2146C7 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Grow Your Business with HazardPros</h1>
          <p className="text-blue-100 text-lg">
            Reach homeowners actively searching for mold remediation, water damage restoration, pest control, and radon professionals.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600">4,600+</div>
            <div className="text-gray-600 text-sm">Verified Providers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">4</div>
            <div className="text-gray-600 text-sm">Service Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">4.7★</div>
            <div className="text-gray-600 text-sm">Avg Google Rating</div>
          </div>
        </div>
      </section>

      {/* Pricing table */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            Start free and upgrade when you're ready for leads. No long-term contracts — cancel anytime.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-xl shadow-sm border p-6 flex flex-col ${
                  tier.highlight ? 'border-primary-500 ring-2 ring-primary-500 relative' : 'border-gray-200'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-500 text-sm pb-1">/{tier.period}</span>
                  </div>
                  <p className="text-sm text-gray-600">{tier.description}</p>
                </div>

                <ul className="space-y-2 mb-6 flex-grow text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-gray-700">
                      <span className="text-green-500 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                  {tier.missing.map((f) => (
                    <li key={f} className="flex gap-2 text-gray-400">
                      <span className="shrink-0">–</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.ctaHref}
                  className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                    tier.highlight
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Questions? Email us at{' '}
            <a href="mailto:contact@hazardpros.com" className="text-primary-600 hover:underline">
              contact@hazardpros.com
            </a>
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why List on HazardPros?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">High-Intent Traffic</h3>
              <p className="text-sm text-gray-600">Homeowners on HazardPros are actively searching for help — not just browsing.</p>
            </div>
            <div>
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Google Ratings Shown</h3>
              <p className="text-sm text-gray-600">Your real Google reviews are displayed alongside your listing — no fake ratings.</p>
            </div>
            <div>
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold text-gray-900 mb-2">Local SEO Boost</h3>
              <p className="text-sm text-gray-600">Your profile is indexed by Google and linked from SEO-optimized city landing pages.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center py-8 border-t">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Directory
        </Link>
      </div>
    </main>
  )
}
