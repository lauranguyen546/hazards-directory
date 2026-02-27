import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'List Your Business | Hazards Directory',
  description: 'Get your mold remediation, water damage restoration, or pest control business listed in the Hazards Directory.',
}

export default function ListYourBusinessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section
        className="text-white py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #2146C7 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">List Your Business</h1>
          <p className="text-blue-100 text-lg">
            Reach homeowners actively searching for mold remediation, water damage restoration, and pest control professionals.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-5xl mb-6">🏗️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We&apos;re building a self-service listing portal for hazards service providers. In the meantime, reach out to us directly and we&apos;ll get you listed.
            </p>
            <a
              href="mailto:contact@hazardsdirectory.com"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact Us to Get Listed
            </a>
            <div className="mt-6">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to Directory
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-900 mb-1">Local Visibility</h3>
              <p className="text-sm text-gray-600">Show up when homeowners in your area search for your services.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold text-gray-900 mb-1">Google Reviews</h3>
              <p className="text-sm text-gray-600">Your real ratings and reviews displayed alongside your listing.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🆓</div>
              <h3 className="font-semibold text-gray-900 mb-1">Free Listing</h3>
              <p className="text-sm text-gray-600">Basic directory listings are free for verified providers.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
