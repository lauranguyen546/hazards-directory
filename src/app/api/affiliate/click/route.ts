import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { AFFILIATE_PROGRAMS } from '@/lib/affiliates'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const program = searchParams.get('program')
  const sourcePage = searchParams.get('source') || null
  const sourceCategory = searchParams.get('category') || null
  const state = searchParams.get('state') || null
  const sessionId = searchParams.get('sid') || null

  if (!program || !AFFILIATE_PROGRAMS[program]) {
    return NextResponse.json({ error: 'Invalid program' }, { status: 400 })
  }

  // Track click (fire and forget — don't block the redirect)
  supabaseAdmin
    .from('affiliate_clicks')
    .insert({
      program,
      product_slug: program,
      source_page: sourcePage,
      source_category: sourceCategory,
      state,
      session_id: sessionId,
    })
    .then(() => {})
    .catch(() => {})

  const destination = AFFILIATE_PROGRAMS[program].url

  return NextResponse.redirect(destination, { status: 302 })
}
