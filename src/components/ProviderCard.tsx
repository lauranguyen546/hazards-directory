import Link from 'next/link'
import { Provider } from '@/types/provider'

interface ProviderCardProps {
  provider: Provider
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const { 
    id, 
    provider_name, 
    service_category,
    primary_category, 
    address, 
    state,
    county,
    phone, 
    website, 
    rating, 
    review_count,
    description 
  } = provider

  // Map service categories to readable labels
  const serviceLabels: Record<string, string> = {
    'Mold': 'Mold Remediation',
    'Water': 'Water Damage Restoration',
    'Pest': 'Pest Control Services',
    'Radon': 'Radon Testing & Mitigation',
  }

  // Get a clean service description
  const serviceLabel = serviceLabels[service_category] || service_category

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
          {provider_name}
        </h3>
        {rating && (
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-sm font-medium">
            <span>★</span>
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* What they do - Service Category */}
      <p className="text-sm font-semibold text-primary-600 mb-2">
        {serviceLabel}
      </p>

      {/* Description of their service */}
      {description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
      )}

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-start gap-2">
          <span className="text-gray-400">📍</span>
          <span className="line-clamp-2">{address}</span>
        </div>
        {phone && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400">📞</span>
            <a href={`tel:${phone}`} className="text-primary-600 hover:underline">
              {phone}
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          {review_count ? (
            <span>{review_count} Google reviews</span>
          ) : (
            <span>No reviews yet</span>
          )}
        </div>
        <div className="flex gap-3">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Website →
            </a>
          )}
          <Link
            href={`/providers/${id}`}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  )
}
