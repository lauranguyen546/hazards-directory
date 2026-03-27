import { Metadata } from 'next'
import Link from 'next/link'
import { TIERS } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'List Your Business | Hazards Directory',
  description: 'Get your mold remediation, water damage restoration, pest control, or radon testing business listed in the Hazards Directory.',
}

const features = [
  { icon: '📍', title: 'Local Visibility', desc: 'Show up when homeowners in your area search for your services.' },
  { icon: '⭐', title: 'Google Reviews', desc: 'Your ratings and reviews displayed alongside your listing.' },
  { icon: '📞', title: 'Direct Leads', desc: 'Homeowners contact you directly — no middleman.' },
]

export default function ListYourBusinessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="text-white py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #2146C7 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">List Your Business</h1>
          <p className="text-blue-100 text-lg mb-8">
            Reach homeowners actively searching for mold remediation, water damage restoration, pest control, and radon testing professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/list-your-business/claim"
              className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Claim Existing Listing
            </Link>
            <Link
              href="/list-your-business/new"
              className="bg-amber-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Add New Listing
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Tier Comparison */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-center mb-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Free</span>
                <div className="mt-3 text-3xl font-bold text-gray-900">$0<span className="text-base font-normal text-gray-500">/mo</span></div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Basic directory listing</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Phone &amp; website displayed</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Google reviews shown</li>
              </ul>
              <Link href="/list-your-business/claim" className="block text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:border-gray-400 transition-colors text-sm">
                Get Started Free
              </Link>
            </div>

            {/* Featured */}
            <div className="bg-white rounded-xl border-2 border-blue-600 p-6 shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
              </div>
              <div className="text-center mb-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Featured</span>
                <div className="mt-3 text-3xl font-bold text-gray-900">${TIERS.featured.price}<span className="text-base font-normal text-gray-500">/mo</span></div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                {TIERS.featured.features.map(f => (
                  <li key={f} className="flex items-center gap-2"><span className="text-green-500">✓</span> {f}</li>
                ))}
              </ul>
              <Link href="/list-your-business/claim?tier=featured" className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                Get Featured
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-center mb-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Premium</span>
                <div className="mt-3 text-3xl font-bold text-gray-900">${TIERS.premium.price}<span className="text-base font-normal text-gray-500">/mo</span></div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                {TIERS.premium.features.map(f => (
                  <li key={f} className="flex items-center gap-2"><span className="text-green-500">✓</span> {f}</li>
                ))}
              </ul>
              <Link href="/list-your-business/claim?tier=premium" className="block text-center bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm">
                Go Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Common Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Is my business already listed?</h3>
              <p className="text-sm text-gray-600">We may already have your business in our directory. Use &ldquo;Claim Existing Listing&rdquo; to search and take ownership.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">What does &ldquo;Featured&rdquo; mean?</h3>
              <p className="text-sm text-gray-600">Featured providers appear at the top of search results within their state and service category, above free listings.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Can I cancel my subscription?</h3>
              <p className="text-sm text-gray-600">Yes, cancel anytime. Your listing remains active through the end of your billing period, then reverts to the free tier.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to Directory</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
