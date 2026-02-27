import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProviderById } from '@/lib/supabase'
import { generateLocalBusinessSchema } from '@/lib/schema'

interface ProviderPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProviderPageProps): Promise<Metadata> {
  try {
    const provider = await getProviderById(params.id)
    
    return {
      title: `${provider.provider_name} | ${provider.county}, ${provider.state}`,
      description: provider.description || `Find ${provider.provider_name} in ${provider.county}, ${provider.state}.`,
      openGraph: {
        title: provider.provider_name,
        description: provider.description || undefined,
        type: 'website',
      },
    }
  } catch {
    return {
      title: 'Provider Not Found',
    }
  }
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  let provider
  try {
    provider = await getProviderById(params.id)
  } catch {
    notFound()
  }

  const schema = generateLocalBusinessSchema(provider)

  // Map service categories to readable labels
  const serviceLabels: Record<string, string> = {
    'Mold': 'Mold Remediation',
    'Water': 'Water Damage Restoration',
    'Pest': 'Pest Control Services',
    'Radon': 'Radon Testing & Mitigation',
  }
  const serviceLabel = serviceLabels[provider.service_category] || provider.service_category

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span>→</span>
              <Link href="/providers" className="hover:text-primary-600">Providers</Link>
              <span>→</span>
              <span className="text-gray-900">{provider.provider_name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Provider Header */}
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {provider.provider_name}
                </h1>
                <p className="text-primary-600 font-medium text-lg">
                  {serviceLabel}
                </p>
              </div>
              {provider.rating && (
                <div className="text-center bg-green-50 px-4 py-3 rounded-lg">
                  <div className="text-3xl font-bold text-green-700">
                    {provider.rating.toFixed(1)}
                  </div>
                  <div className="text-green-600 text-sm">
                    ★ Google Rating
                  </div>
                  {provider.review_count && (
                    <div className="text-green-600 text-xs mt-1">
                      {provider.review_count} reviews
                    </div>
                  )}
                </div>
              )}
            </div>

            {provider.description && (
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {provider.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {provider.phone && (
                <a
                  href={`tel:${provider.phone}`}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  📞 Call {provider.phone}
                </a>
              )}
              {provider.website && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  🌐 Visit Website
                </a>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Address</label>
                  <p className="text-gray-900">{provider.address}</p>
                  <p className="text-gray-600">
                    {provider.county}, {provider.state}
                  </p>
                </div>
                {provider.phone && (
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p>
                      <a href={`tel:${provider.phone}`} className="text-primary-600 hover:underline">
                        {provider.phone}
                      </a>
                    </p>
                  </div>
                )}
                {provider.website && (
                  <div>
                    <label className="text-sm text-gray-500">Website</label>
                    <p>
                      <a 
                        href={provider.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline break-all"
                      >
                        {provider.website}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4">Service Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Service Type</label>
                  <p className="text-gray-900 font-medium">{serviceLabel}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Service Area</label>
                  <p className="text-gray-900">{provider.county}, {provider.state}</p>
                </div>
                {provider.place_id && (
                  <div>
                    <label className="text-sm text-gray-500">Source</label>
                    <p className="text-gray-600 text-sm">
                      Verified via Google Business Profile
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8">
            <Link href="/providers" className="text-primary-600 hover:underline">
              ← Back to all providers
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
