import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: NextRequest) {
  let body: { provider_id: string; return_url?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { provider_id } = body

  if (!provider_id) {
    return NextResponse.json({ error: 'Missing provider_id' }, { status: 400 })
  }

  const { data: tierRow } = await supabaseAdmin
    .from('provider_tiers')
    .select('stripe_customer_id')
    .eq('provider_id', provider_id)
    .single()

  if (!tierRow?.stripe_customer_id) {
    return NextResponse.json({ error: 'No Stripe customer found for this provider' }, { status: 404 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const session = await stripe.billingPortal.sessions.create({
    customer: tierRow.stripe_customer_id,
    return_url: body.return_url || `${baseUrl}/provider-portal/billing`,
  })

  return NextResponse.json({ url: session.url })
}
