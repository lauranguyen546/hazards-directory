import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PRICES } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: NextRequest) {
  let body: { provider_id: string; tier: 'basic' | 'premium'; success_url?: string; cancel_url?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { provider_id, tier } = body

  if (!provider_id || !tier || !['basic', 'premium'].includes(tier)) {
    return NextResponse.json({ error: 'Missing provider_id or invalid tier' }, { status: 400 })
  }

  // Look up existing Stripe customer for this provider (if they've subscribed before)
  const { data: tierRow } = await supabaseAdmin
    .from('provider_tiers')
    .select('stripe_customer_id')
    .eq('provider_id', provider_id)
    .single()

  const { data: provider } = await supabaseAdmin
    .from('providers')
    .select('provider_name, phone')
    .eq('id', provider_id)
    .single()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: STRIPE_PRICES[`${tier}_monthly`],
        quantity: 1,
      },
    ],
    ...(tierRow?.stripe_customer_id
      ? { customer: tierRow.stripe_customer_id }
      : {}),
    customer_creation: tierRow?.stripe_customer_id ? undefined : 'always',
    subscription_data: {
      metadata: { provider_id, tier },
    },
    metadata: { provider_id, tier },
    success_url: body.success_url || `${baseUrl}/provider-portal/dashboard?upgraded=1`,
    cancel_url: body.cancel_url || `${baseUrl}/provider-portal/upgrade`,
  })

  return NextResponse.json({ url: session.url })
}
