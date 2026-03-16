import { createClient } from '@supabase/supabase-js'

// Server-only client using service role key — bypasses RLS for trusted server operations
// Never expose this key to the browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})
