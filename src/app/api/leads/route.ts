import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { notifyOwner } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const required = ['name', 'email', 'service_needed']
    const missing = required.filter(field => !body[field])

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const lead = {
      provider_id: body.provider_id || null,
      name: String(body.name).slice(0, 200),
      email: String(body.email).slice(0, 200),
      phone: body.phone ? String(body.phone).slice(0, 50) : null,
      service_needed: String(body.service_needed).slice(0, 200),
      message: body.message ? String(body.message).slice(0, 2000) : null,
      source_type: body.source_type || 'provider_page',
      source_state: body.source_state || null,
      source_category: body.source_category || null,
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit lead', details: error.message },
        { status: 500 }
      )
    }

    await notifyOwner('New quote request', {
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Service: lead.service_needed,
      Message: lead.message,
      Source: lead.source_type,
      State: lead.source_state,
      Category: lead.source_category,
    })

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
