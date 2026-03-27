import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Listing Activated | Hazards Directory',
}

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { tier?: string; new?: string }
}) {
  const tier = searchParams.tier || 'free'
  const isNew = searchParams.new === '1'

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {tier === 'free' ? 'Listing Activated!' : 'Subscription Activated!'}
        </h1>
        <p className="text-gray-600 mb-4">
          {isNew
            ? 'Your new listing has been submitted. It will appear in the directory after review (usually within 1 business day).'
            : tier === 'free'
              ? 'Your listing has been claimed. You can now manage it from your dashboard.'
              : `Your ${tier} plan is now active. Your listing will appear with priority placement in search results.`
          }
        </p>
        {tier === 'premium' && (
          <p className="text-sm text-gray-500 mb-4">
            Your lead analytics dashboard is now available.{' '}
            <Link href="/dashboard" className="text-blue-600 hover:underline">View Dashboard</Link>
          </p>
        )}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
          >
            Browse Directory
          </Link>
          <Link href="/list-your-business" className="text-sm text-gray-500 hover:text-gray-700">
            List another business
          </Link>
        </div>
      </div>
    </main>
  )
}
