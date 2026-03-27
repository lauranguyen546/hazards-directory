import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazards.directory'

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/list-your-business?error=missing_token`)
  }

  const { data: claim, error } = await supabaseAdmin
    .from('listing_claims')
    .select('id, provider_id, contact_email, tier_selected, verified, expires_at')
    .eq('verification_token', token)
    .single()

  if (error || !claim) {
    return NextResponse.redirect(`${siteUrl}/list-your-business?error=invalid_token`)
  }
  if (claim.verified) {
    return NextResponse.redirect(`${siteUrl}/list-your-business?error=already_verified`)
  }
  if (new Date(claim.expires_at) < new Date()) {
    return NextResponse.redirect(`${siteUrl}/list-your-business?error=token_expired`)
  }

  // Mark as verified
  await supabaseAdmin
    .from('listing_claims')
    .update({ verified: true, verified_at: new Date().toISOString() })
    .eq('id', claim.id)

  // Redirect to checkout if paid tier, otherwise mark provider as claimed
  if (claim.tier_selected === 'free' && claim.provider_id) {
    await supabaseAdmin
      .from('providers')
      .update({ claimed_by_email: claim.contact_email, claimed_at: new Date().toISOString() })
      .eq('id', claim.provider_id)
    return NextResponse.redirect(`${siteUrl}/list-your-business/success?tier=free`)
  }

  // Redirect to Stripe checkout
  const checkoutUrl = `${siteUrl}/list-your-business/checkout?claim_id=${claim.id}&tier=${claim.tier_selected}`
  return NextResponse.redirect(checkoutUrl)
}
