import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import { AFFILIATE_PROGRAMS } from '@/lib/affiliates'

export const metadata: Metadata = {
  title: 'Quote Request Received | HazardPros',
  description: 'Your quote request has been received. Matched providers will contact you shortly.',
}

interface ConfirmationPageProps {
  searchParams: { category?: string }
}

const categoryAffiliate: Record<string, string> = {
  Mold: 'amazon_mold_kit',
  Radon: 'amazon_radon_kit',
  Water: 'amazon_moisture_meter',
  Pest: 'amazon_pest_trap',
}

export default function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const category = searchParams.category || 'Mold'
  const affiliateKey = categoryAffiliate[category] || 'amazon_mold_kit'
  const affiliateProduct = AFFILIATE_PROGRAMS[affiliateKey]

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-xl mx-auto">
        {/* Success message */}
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-8 text-center mb-8">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Received!</h1>
          <p className="text-gray-600">
            We've matched your request with local {category === 'Mold' ? 'mold remediation' : category === 'Water' ? 'water damage' : category === 'Pest' ? 'pest control' : 'radon'} professionals.
            Expect to hear back within <strong>24 hours</strong>.
          </p>
        </div>

        {/* Affiliate upsell */}
        {affiliateProduct && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              While you wait — understand the severity yourself:
            </h2>
            <AffiliateProductCard
              program={affiliateKey}
              sourcePage="/get-quotes/confirmation"
              sourceCategory={category}
            />
          </div>
        )}

        {/* Next steps */}
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2"><span className="text-blue-500">1.</span> We notify matched local providers about your request</li>
            <li className="flex gap-2"><span className="text-blue-500">2.</span> Providers review your details and reach out directly</li>
            <li className="flex gap-2"><span className="text-blue-500">3.</span> You compare quotes and choose the best fit</li>
          </ul>
        </div>

        <div className="text-center mt-8">
          <Link href="/providers" className="text-primary-600 hover:underline text-sm">
            ← Browse all providers
          </Link>
        </div>
      </div>
    </main>
  )
}
