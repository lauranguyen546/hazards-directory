import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const required = ['state', 'county', 'provider_name', 'address']
    const missing = required.filter(field => !body[field])
    
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    const provider = {
      state: body.state,
      county: body.county,
      service_category: body.service_category || 'Mold',
      provider_name: body.provider_name,
      primary_category: body.primary_category || null,
      address: body.address,
      phone: body.phone || null,
      website: body.website || null,
      rating: body.rating ? parseFloat(body.rating) : null,
      review_count: body.review_count ? parseInt(body.review_count, 10) : null,
      place_id: body.place_id || null,
      description: body.description || null,
    }

    const { data, error } = await supabase
      .from('providers')
      .upsert([provider], { onConflict: 'place_id' })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to insert provider', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
