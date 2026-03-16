export type LeadUrgency = 'emergency' | 'within_week' | 'standard' | 'planning'
export type LeadStatus = 'new' | 'distributed' | 'contacted' | 'converted' | 'invalid' | 'expired'

export interface Lead {
  id: string
  homeowner_name: string
  homeowner_email: string
  homeowner_phone: string | null
  service_category: 'Mold' | 'Water' | 'Pest' | 'Radon'
  urgency: LeadUrgency
  description: string | null
  zip_code: string | null
  city: string | null
  state: string
  county: string | null
  source_page: string | null
  source_provider_id: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  status: LeadStatus
  distributed_at: string | null
  lead_price_cents: number
  created_at: string
  updated_at: string
}

export interface CreateLeadInput {
  homeowner_name: string
  homeowner_email: string
  homeowner_phone?: string
  service_category: 'Mold' | 'Water' | 'Pest' | 'Radon'
  urgency?: LeadUrgency
  description?: string
  zip_code?: string
  city?: string
  state: string
  county?: string
  source_page?: string
  source_provider_id?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}
