// Provider claims their existing listing by email or phone.
// On success, creates a provider_portal_users row and returns the provider_id.

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: NextRequest) {
  let body: { email?: string; phone?: string; provider_id: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email, provider_id } = body

  if (!email || !provider_id) {
    return NextResponse.json({ error: 'email and provider_id are required' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // Verify provider exists
  const { data: provider, error: providerError } = await supabaseAdmin
    .from('providers')
    .select('id, provider_name')
    .eq('id', provider_id)
    .single()

  if (providerError || !provider) {
    return NextResponse.json({ error: 'Provider not found' }, { status: 404 })
  }

  // Upsert portal user row (idempotent — safe to call multiple times)
  const { error: upsertError } = await supabaseAdmin
    .from('provider_portal_users')
    .upsert(
      { provider_id, email: email.toLowerCase().trim() },
      { onConflict: 'email' }
    )

  if (upsertError) {
    console.error('Claim upsert error:', upsertError)
    return NextResponse.json({ error: 'Failed to claim listing' }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    provider_id,
    provider_name: provider.provider_name,
    message: 'Listing claimed. Check your email for a magic link to access your dashboard.',
  })
}
