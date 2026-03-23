// Monthly cron endpoint — reset lead counts for all subscribed providers.
// Secure with CRON_SECRET header. Schedule this on the 1st of each month.
// Example cron: 0 0 1 * * (vercel.json / external cron service)

import { NextRequest, NextResponse } from 'next/server'
import { resetMonthlyLeadCounts } from '@/lib/leadDistribution'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const expectedSecret = process.env.CRON_SECRET

  if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await resetMonthlyLeadCounts()

  return NextResponse.json({ success: true, reset_at: new Date().toISOString() })
}
