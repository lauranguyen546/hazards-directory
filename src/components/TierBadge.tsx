import { ProviderTierLevel } from '@/types/billing'

interface TierBadgeProps {
  tier: ProviderTierLevel
  size?: 'sm' | 'md'
}

const BADGE_CONFIG: Record<ProviderTierLevel, { label: string; className: string } | null> = {
  free: null,
  basic: {
    label: 'Verified Provider',
    className: 'bg-blue-100 text-blue-700 border border-blue-200',
  },
  premium: {
    label: 'Top Rated Pro',
    className: 'bg-amber-100 text-amber-700 border border-amber-200',
  },
}

export default function TierBadge({ tier, size = 'sm' }: TierBadgeProps) {
  const config = BADGE_CONFIG[tier]
  if (!config) return null

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses} ${config.className}`}>
      {tier === 'premium' ? '★' : '✓'} {config.label}
    </span>
  )
}
