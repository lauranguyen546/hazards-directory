import { NextRequest, NextResponse } from 'next/server'
import { stripe, TIERS, TierKey } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { claim_id, tier } = body

    if (!claim_id || !tier) {
      return NextResponse.json({ error: 'Missing claim_id or tier' }, { status: 400 })
    }
    if (!(tier in TIERS)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      return NextResponse.json({ error: 'Stripe is not configured yet' }, { status: 503 })
    }

    const tierConfig = TIERS[tier as TierKey]
    if (!tierConfig.priceId) {
      return NextResponse.json({ error: `Stripe price ID for ${tier} tier is not configured` }, { status: 503 })
    }

    const { data: claim, error: claimError } = await supabaseAdmin
      .from('listing_claims')
      .select('id, contact_email, contact_name, provider_id, verified')
      .eq('id', claim_id)
      .single()

    if (claimError || !claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }
    if (!claim.verified) {
      return NextResponse.json({ error: 'Email not verified yet' }, { status: 403 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homerepair.expert'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: tierConfig.priceId, quantity: 1 }],
      customer_email: claim.contact_email,
      metadata: {
        claim_id,
        tier,
        provider_id: claim.provider_id || '',
      },
      success_url: `${siteUrl}/list-your-business/success?tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/list-your-business?cancelled=1`,
    })

    // Save session id on claim for reconciliation
    await supabaseAdmin
      .from('listing_claims')
      .update({ stripe_session_id: session.id })
      .eq('id', claim_id)

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
