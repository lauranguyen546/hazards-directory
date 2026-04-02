import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import crypto from 'crypto'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { provider_id, contact_name, contact_email, contact_phone, tier_selected } = body

    if (!provider_id || !contact_name || !contact_email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isValidEmail(contact_email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Check provider exists and isn't already claimed
    const { data: provider, error: providerError } = await supabaseAdmin
      .from('providers')
      .select('id, provider_name, claimed_by_email')
      .eq('id', provider_id)
      .single()

    if (providerError || !provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 })
    }
    if (provider.claimed_by_email) {
      return NextResponse.json({ error: 'This listing is already claimed' }, { status: 409 })
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString('hex')

    const { error: insertError } = await supabaseAdmin.from('listing_claims').insert([{
      provider_id,
      contact_name: String(contact_name).slice(0, 200),
      contact_email: String(contact_email).slice(0, 200).toLowerCase(),
      contact_phone: contact_phone ? String(contact_phone).slice(0, 50) : null,
      tier_selected: tier_selected || 'free',
      verification_token: token,
    }])

    if (insertError) {
      return NextResponse.json({ error: 'Failed to create claim' }, { status: 500 })
    }

    // Send verification email if Resend is configured
    const resendKey = process.env.RESEND_API_KEY
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homerepair.expert'
    const verifyUrl = `${siteUrl}/list-your-business/verify?token=${token}`

    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'HomeRepair.Expert <listings@homerepair.expert>',
          to: contact_email,
          subject: `Verify your claim for ${provider.provider_name}`,
          html: `
            <p>Hi ${contact_name},</p>
            <p>Click the link below to verify your email and continue setting up your listing for <strong>${provider.provider_name}</strong>:</p>
            <p><a href="${verifyUrl}" style="background:#3B5BDB;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block">Verify Email</a></p>
            <p>This link expires in 24 hours.</p>
            <p>If you did not request this, you can ignore this email.</p>
          `,
        }),
      })
    }

    return NextResponse.json({
      success: true,
      message: resendKey
        ? 'Verification email sent. Check your inbox.'
        : 'Claim recorded. Email delivery requires RESEND_API_KEY configuration.',
      // Return token in dev so you can test the verify flow
      ...(process.env.NODE_ENV !== 'production' && { debug_token: token, verify_url: verifyUrl }),
    })
  } catch (err) {
    console.error('Claim error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
