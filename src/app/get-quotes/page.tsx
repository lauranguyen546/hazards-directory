import { Metadata } from 'next'
import LeadCaptureForm from '@/components/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'Get Free Quotes | HazardPros',
  description: 'Tell us about your home hazard issue and get matched with up to 3 verified local professionals for free.',
}

export default function GetQuotesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section
        className="text-white py-14 px-4"
        style={{ background: 'linear-gradient(135deg, #3B5BDB 0%, #2146C7 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Get Free Quotes from Local Pros</h1>
          <p className="text-blue-100 text-lg">
            We'll match you with up to 3 verified mold, water damage, pest control, or radon professionals near you — for free.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <LeadCaptureForm sourcePage="/get-quotes" />

          {/* Trust signals */}
          <div className="mt-10 grid grid-cols-3 gap-6 text-center text-sm text-gray-600">
            <div>
              <div className="text-2xl mb-2">🔒</div>
              <p className="font-medium text-gray-800">Private</p>
              <p>Shared only with matched pros</p>
            </div>
            <div>
              <div className="text-2xl mb-2">⚡</div>
              <p className="font-medium text-gray-800">Fast</p>
              <p>Typically contacted within 24 hrs</p>
            </div>
            <div>
              <div className="text-2xl mb-2">✅</div>
              <p className="font-medium text-gray-800">Verified</p>
              <p>Google-verified providers only</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
