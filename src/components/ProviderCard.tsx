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
    address,
    phone,
    website,
    rating,
    review_count,
    description,
  } = provider

  const serviceLabels: Record<string, string> = {
    Mold: 'Mold Remediation',
    Water: 'Water Damage Restoration',
    Pest: 'Pest Control Services',
    Radon: 'Radon Testing & Mitigation',
  }

  const serviceLabel = serviceLabels[service_category] || service_category

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col">
      {/* 1. Business name */}
      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
        {provider_name}
      </h3>

      {/* 2. Category badge */}
      <div className="mb-3">
        <span className="bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-1 font-medium">
          {serviceLabel}
        </span>
      </div>

      {/* 3. Description */}
      {description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
      )}

      {/* 4 & 5. Location + Phone */}
      <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
        <div className="flex items-start gap-2">
          <span className="text-red-500 mt-0.5 shrink-0">📍</span>
          <span className="line-clamp-2">
            {address || 'Location not available'}
          </span>
        </div>
        {phone && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 shrink-0">📞</span>
            <a href={`tel:${phone}`} className="text-primary-600 hover:underline">
              {phone}
            </a>
          </div>
        )}
      </div>

      {/* 6 & 7. Divider + Bottom row */}
      <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-2">
        {/* Rating */}
        <div className="text-sm text-gray-500">
          {rating ? (
            <span>★ {rating.toFixed(1)} · {review_count ?? 0} Google reviews</span>
          ) : (
            <span>No reviews yet</span>
          )}
        </div>
        {/* Links */}
        <div className="flex gap-3 shrink-0">
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
