import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

function extractZipCode(address: string): string | null {
  const match = address.match(/\b(\d{5})(?:-\d{4})?\s*$/)
  return match ? match[1] : null
}

async function extractZipCodes() {
  console.log('Fetching providers without zip codes...')
  
  const { data: providers, error } = await supabase
    .from('providers')
    .select('id, address')
    .is('zip_code', null)
  
  if (error) {
    console.error('Error:', error)
    return
  }
  
  console.log(`Found ${providers?.length || 0} providers to update`)
  
  let updated = 0
  for (const provider of providers || []) {
    const zipCode = extractZipCode(provider.address)
    
    if (zipCode) {
      const { error: updateError } = await supabase
        .from('providers')
        .update({ zip_code: zipCode })
        .eq('id', provider.id)
      
      if (!updateError) updated++
    }
  }
  
  console.log(`Updated ${updated} providers with zip codes`)
}

extractZipCodes().catch(console.error)
