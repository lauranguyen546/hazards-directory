export type ProviderTierLevel = 'free' | 'basic' | 'premium'

export interface ProviderTier {
  id: string
  provider_id: string
  tier: ProviderTierLevel
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: string
  monthly_lead_cap: number
  leads_received_this_month: number
  featured_badge: boolean
  priority_listing: boolean
  current_period_end: string | null
  created_at: string
  updated_at: string
}

export const TIER_PRICES: Record<ProviderTierLevel, { monthly: number; leads: number; label: string }> = {
  free: { monthly: 0, leads: 0, label: 'Free' },
  basic: { monthly: 149, leads: 10, label: 'Basic' },
  premium: { monthly: 349, leads: 30, label: 'Premium' },
}
