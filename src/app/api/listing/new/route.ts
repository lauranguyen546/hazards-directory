import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { notifyOwner } from '@/lib/email'
import crypto from 'crypto'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      contact_name,
      contact_email,
      contact_phone,
      tier_selected,
      business_name,
      address,
      city,
      state,
      zip,
      phone,
      website,
      service_category,
    } = body

    const required = ['contact_name', 'contact_email', 'business_name', 'address', 'city', 'state', 'service_category']
    const missing = required.filter(f => !body[f])
    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 })
    }
    if (!isValidEmail(contact_email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const validCategories = ['Mold', 'Water', 'Pest', 'Radon']
    if (!validCategories.includes(service_category)) {
      return NextResponse.json({ error: 'Invalid service category' }, { status: 400 })
    }

    const token = crypto.randomBytes(32).toString('hex')

    const { error: insertError } = await supabaseAdmin.from('listing_claims').insert([{
      provider_id: null, // new listing
      contact_name: String(contact_name).slice(0, 200),
      contact_email: String(contact_email).slice(0, 200).toLowerCase(),
      contact_phone: contact_phone ? String(contact_phone).slice(0, 50) : null,
      tier_selected: tier_selected || 'free',
      verification_token: token,
      new_business_name: String(business_name).slice(0, 255),
      new_address: String(address).slice(0, 500),
      new_city: String(city).slice(0, 100),
      new_state: String(state).slice(0, 2).toUpperCase(),
      new_zip: zip ? String(zip).slice(0, 20) : null,
      new_phone: phone ? String(phone).slice(0, 50) : null,
      new_website: website ? String(website).slice(0, 500) : null,
      new_service_category: service_category,
    }])

    if (insertError) {
      return NextResponse.json({ error: 'Failed to submit listing' }, { status: 500 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homerepair.expert'
    const verifyUrl = `${siteUrl}/api/listing/verify-new?token=${token}`
    const resendKey = process.env.RESEND_API_KEY

    if (resendKey) {
      await Promise.all([
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'HomeRepair.Expert <team@sollesolutions.com>',
            to: contact_email,
            subject: `Verify your new listing for ${business_name}`,
            html: `
              <p>Hi ${contact_name},</p>
              <p>Click below to verify your email and activate your listing for <strong>${business_name}</strong>:</p>
              <p><a href="${verifyUrl}" style="background:#3B5BDB;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block">Verify Email & Activate Listing</a></p>
              <p>This link expires in 24 hours. Once verified, your listing will be reviewed and published within 1 business day.</p>
            `,
          }),
        }),
        notifyOwner('New business listing submitted', {
          Business: business_name,
          Category: service_category,
          Contact: contact_name,
          Email: contact_email,
          Phone: contact_phone || null,
          Address: `${address}, ${city}, ${state}${zip ? ' ' + zip : ''}`,
          Website: website || null,
          Tier: tier_selected || 'free',
        }),
      ])
    }

    return NextResponse.json({
      success: true,
      message: resendKey ? 'Check your email to verify and activate your listing.' : 'Listing submitted.',
      ...(process.env.NODE_ENV !== 'production' && { debug_token: token, verify_url: verifyUrl }),
    })
  } catch (err) {
    console.error('New listing error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
