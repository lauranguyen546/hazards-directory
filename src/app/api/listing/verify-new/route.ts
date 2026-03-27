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
    .select('id, contact_email, tier_selected, verified, expires_at, new_business_name, new_address, new_city, new_state, new_zip, new_phone, new_website, new_service_category')
    .eq('verification_token', token)
    .is('provider_id', null)
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

  // Create the provider entry (pending review)
  if (claim.new_service_category) {
    await supabaseAdmin.from('providers').insert([{
      provider_name: claim.new_business_name,
      address: `${claim.new_address}, ${claim.new_city}, ${claim.new_state}`,
      county: claim.new_city, // best available until admin sets county
      state: claim.new_state,
      zip_code: claim.new_zip,
      phone: claim.new_phone,
      website: claim.new_website,
      service_category: claim.new_service_category,
      primary_category: claim.new_service_category,
      tier: 'free',
      claimed_by_email: claim.contact_email,
      claimed_at: new Date().toISOString(),
    }])
  }

  if (claim.tier_selected !== 'free') {
    const checkoutUrl = `${siteUrl}/list-your-business/checkout?claim_id=${claim.id}&tier=${claim.tier_selected}`
    return NextResponse.redirect(checkoutUrl)
  }

  return NextResponse.redirect(`${siteUrl}/list-your-business/success?tier=free&new=1`)
}
