import Link from 'next/link'
import { AFFILIATE_PROGRAMS } from '@/lib/affiliates'

interface AffiliateProductCardProps {
  program: string
  sourcePage?: string
  sourceCategory?: string
  state?: string
}

export default function AffiliateProductCard({
  program,
  sourcePage,
  sourceCategory,
  state,
}: AffiliateProductCardProps) {
  const product = AFFILIATE_PROGRAMS[program]
  if (!product) return null

  const params = new URLSearchParams({ program })
  if (sourcePage) params.set('source', sourcePage)
  if (sourceCategory) params.set('category', sourceCategory)
  if (state) params.set('state', state)

  const href = `/api/affiliate/click?${params.toString()}`

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-gray-100 rounded-lg w-14 h-14 flex items-center justify-center shrink-0 text-2xl">
        {product.category === 'Mold' ? '🧪' :
         product.category === 'Radon' ? '☢️' :
         product.category === 'Water' ? '💧' :
         product.category === 'Pest' ? '🐜' :
         product.category === 'Insurance' ? '🛡️' : '🏠'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Sponsored</p>
        <h4 className="font-semibold text-gray-900 text-sm mb-1">{product.label}</h4>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-900">{product.price}</span>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
          >
            Check Price →
          </Link>
        </div>
      </div>
    </div>
  )
}
