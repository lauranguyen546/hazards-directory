import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import Stripe from 'stripe'

// Required: raw body for Stripe signature verification
export const dynamic = 'force-dynamic'

const TIER_LEAD_CAPS: Record<string, { cap: number; badge: boolean; priority: boolean }> = {
  basic: { cap: 10, badge: true, priority: false },
  premium: { cap: 30, badge: true, priority: true },
}

async function upsertProviderTier(
  providerId: string,
  tier: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  status: string,
  periodEnd: number | null
) {
  const config = TIER_LEAD_CAPS[tier] || { cap: 0, badge: false, priority: false }

  await supabaseAdmin
    .from('provider_tiers')
    .upsert(
      {
        provider_id: providerId,
        tier,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        subscription_status: status,
        monthly_lead_cap: config.cap,
        featured_badge: config.badge,
        priority_listing: config.priority,
        current_period_end: periodEnd
          ? new Date(periodEnd * 1000).toISOString()
          : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'provider_id' }
    )
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const providerId = session.metadata?.provider_id
        const tier = session.metadata?.tier

        if (!providerId || !tier) break

        // Fetch the subscription to get period end
        let periodEnd: number | null = null
        if (session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string)
          periodEnd = sub.current_period_end
        }

        await upsertProviderTier(
          providerId,
          tier,
          session.customer as string,
          session.subscription as string,
          'active',
          periodEnd
        )
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const providerId = sub.metadata?.provider_id
        const tier = sub.metadata?.tier

        if (!providerId || !tier) break

        await upsertProviderTier(
          providerId,
          tier,
          sub.customer as string,
          sub.id,
          sub.status,
          sub.current_period_end
        )
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const providerId = sub.metadata?.provider_id

        if (!providerId) break

        await supabaseAdmin
          .from('provider_tiers')
          .update({
            tier: 'free',
            subscription_status: 'canceled',
            monthly_lead_cap: 0,
            featured_badge: false,
            priority_listing: false,
            stripe_subscription_id: null,
            current_period_end: null,
            updated_at: new Date().toISOString(),
          })
          .eq('provider_id', providerId)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        // Find provider by Stripe customer ID
        const { data: tierRow } = await supabaseAdmin
          .from('provider_tiers')
          .select('provider_id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (tierRow) {
          await supabaseAdmin
            .from('provider_tiers')
            .update({ subscription_status: 'past_due', updated_at: new Date().toISOString() })
            .eq('provider_id', tierRow.provider_id)
        }
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
