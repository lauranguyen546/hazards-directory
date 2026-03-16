import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { CreateLeadInput } from '@/types/lead'

const REQUIRED_FIELDS = ['homeowner_name', 'homeowner_email', 'service_category', 'state'] as const
const VALID_CATEGORIES = ['Mold', 'Water', 'Pest', 'Radon']
const VALID_URGENCY = ['emergency', 'within_week', 'standard', 'planning']

export async function POST(req: NextRequest) {
  let body: CreateLeadInput

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Validate required fields
  for (const field of REQUIRED_FIELDS) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
    }
  }

  if (!VALID_CATEGORIES.includes(body.service_category)) {
    return NextResponse.json({ error: 'Invalid service_category' }, { status: 400 })
  }

  if (body.urgency && !VALID_URGENCY.includes(body.urgency)) {
    return NextResponse.json({ error: 'Invalid urgency value' }, { status: 400 })
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.homeowner_email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // ZIP code format check
  if (body.zip_code && !/^\d{5}$/.test(body.zip_code)) {
    return NextResponse.json({ error: 'ZIP code must be 5 digits' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert({
      homeowner_name: body.homeowner_name.trim(),
      homeowner_email: body.homeowner_email.trim().toLowerCase(),
      homeowner_phone: body.homeowner_phone?.trim() || null,
      service_category: body.service_category,
      urgency: body.urgency || 'standard',
      description: body.description?.trim() || null,
      zip_code: body.zip_code?.trim() || null,
      city: body.city?.trim() || null,
      state: body.state.trim(),
      county: body.county?.trim() || null,
      source_page: body.source_page || null,
      source_provider_id: body.source_provider_id || null,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Lead insert error:', error)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }

  return NextResponse.json({ success: true, lead_id: data.id }, { status: 201 })
}
