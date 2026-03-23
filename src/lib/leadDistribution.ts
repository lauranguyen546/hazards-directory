// Lead distribution logic
// Matches an incoming lead to subscribed providers and notifies them.
// Called server-side only (uses supabaseAdmin).

import { supabaseAdmin } from '@/lib/supabaseAdmin'

const MAX_RECIPIENTS_PER_LEAD = 3
const LEAD_CAP_RESET_DAY = 1 // reset counts on the 1st of each month

/**
 * Find eligible providers for a lead and create lead_distributions rows.
 * Returns the number of providers notified.
 */
export async function distributeLead(leadId: string): Promise<number> {
  // 1. Fetch the lead
  const { data: lead, error: leadError } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single()

  if (leadError || !lead) {
    console.error('distributeLead: lead not found', leadId, leadError)
    return 0
  }

  // 2. Find providers in the same state + category who have an active subscription
  const { data: tiers, error: tiersError } = await supabaseAdmin
    .from('provider_tiers')
    .select(`
      provider_id,
      tier,
      monthly_lead_cap,
      leads_received_this_month,
      priority_listing,
      providers!inner (
        id,
        state,
        county,
        service_category,
        phone
      )
    `)
    .in('tier', ['basic', 'premium'])
    .eq('subscription_status', 'active')
    .eq('providers.state', lead.state)
    .eq('providers.service_category', lead.service_category)

  if (tiersError || !tiers || tiers.length === 0) {
    console.log('distributeLead: no eligible providers for lead', leadId)
    return 0
  }

  // 3. Sort: premium first, then basic; within tier sort by leads_received (fewest first)
  const sorted = [...tiers].sort((a, b) => {
    if (a.tier === 'premium' && b.tier !== 'premium') return -1
    if (b.tier === 'premium' && a.tier !== 'premium') return 1
    return a.leads_received_this_month - b.leads_received_this_month
  })

  // 4. Filter by monthly cap and pick up to MAX_RECIPIENTS
  const eligible = sorted.filter(t => t.leads_received_this_month < t.monthly_lead_cap)
  const recipients = eligible.slice(0, MAX_RECIPIENTS_PER_LEAD)

  if (recipients.length === 0) {
    console.log('distributeLead: all eligible providers are at monthly cap', leadId)
    return 0
  }

  // 5. Insert lead_distributions rows
  const distributions = recipients.map(r => ({
    lead_id: leadId,
    provider_id: r.provider_id,
    notification_method: 'email',
  }))

  const { error: distError } = await supabaseAdmin
    .from('lead_distributions')
    .insert(distributions)

  if (distError) {
    console.error('distributeLead: insert error', distError)
    return 0
  }

  // 6. Increment leads_received_this_month for each recipient
  for (const r of recipients) {
    await supabaseAdmin
      .from('provider_tiers')
      .update({ leads_received_this_month: r.leads_received_this_month + 1 })
      .eq('provider_id', r.provider_id)
  }

  // 7. Mark lead as distributed
  await supabaseAdmin
    .from('leads')
    .update({ status: 'distributed', distributed_at: new Date().toISOString() })
    .eq('id', leadId)

  console.log(`distributeLead: distributed lead ${leadId} to ${recipients.length} providers`)
  return recipients.length
}

/**
 * Reset monthly lead counts for all providers (call on the 1st of each month via cron).
 */
export async function resetMonthlyLeadCounts(): Promise<void> {
  const { error } = await supabaseAdmin
    .from('provider_tiers')
    .update({ leads_received_this_month: 0 })
    .neq('tier', 'free')

  if (error) {
    console.error('resetMonthlyLeadCounts error:', error)
  }
}

/**
 * Get lead history for a provider (for the provider portal dashboard).
 */
export async function getLeadsByProvider(providerId: string, limit = 20) {
  const { data, error } = await supabaseAdmin
    .from('lead_distributions')
    .select(`
      id,
      notified_at,
      viewed_at,
      claimed_at,
      charged,
      charge_cents,
      leads (
        id,
        service_category,
        urgency,
        zip_code,
        city,
        state,
        county,
        description,
        status,
        created_at
      )
    `)
    .eq('provider_id', providerId)
    .order('notified_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

/**
 * Get a provider's current tier info.
 */
export async function getProviderTier(providerId: string) {
  const { data, error } = await supabaseAdmin
    .from('provider_tiers')
    .select('*')
    .eq('provider_id', providerId)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = not found
  return data || null
}
