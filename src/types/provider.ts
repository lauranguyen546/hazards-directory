export interface Provider {
  id: string
  state: string
  county: string
  zip_code: string | null
  service_category: string
  provider_name: string
  primary_category: string
  address: string
  phone: string | null
  website: string | null
  rating: number | null
  review_count: number | null
  place_id: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export interface ProviderFilters {
  state?: string
  county?: string
  service_category?: string
  min_rating?: number
  search?: string
}
