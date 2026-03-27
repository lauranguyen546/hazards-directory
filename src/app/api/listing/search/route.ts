import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()
  const state = searchParams.get('state')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Query must be at least 2 characters' }, { status: 400 })
  }

  let query = supabase
    .from('providers')
    .select('id, provider_name, address, county, state, service_category, phone, tier, claimed_by_email')
    .or(`provider_name.ilike.%${q}%,phone.ilike.%${q}%`)
    .limit(10)

  if (state) {
    query = query.eq('state', state)
  }

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }

  // Mask claimed_by_email for privacy
  const results = (data || []).map(p => ({
    ...p,
    claimed: !!p.claimed_by_email,
    claimed_by_email: undefined,
  }))

  return NextResponse.json({ results })
}
