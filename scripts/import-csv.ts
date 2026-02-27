import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface CSVRow {
  State: string
  County: string
  'Service Category': string
  'Provider Name': string
  'Primary Category': string
  Address: string
  Phone: string
  Website: string
  Rating: string
  ReviewCount: string
  PlaceId: string
  Description: string
}

async function importCSV(filePath: string) {
  console.log(`Reading ${filePath}...`)
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as CSVRow[]

  console.log(`Found ${records.length} records`)

  const providers = records.map((row) => ({
    state: row.State?.trim() || '',
    county: row.County?.trim() || '',
    service_category: row['Service Category']?.trim() || 'Mold',
    provider_name: row['Provider Name']?.trim() || '',
    primary_category: row['Primary Category']?.trim() || null,
    address: row.Address?.trim() || '',
    phone: row.Phone?.trim() || null,
    website: row.Website?.trim() || null,
    rating: row.Rating ? parseFloat(row.Rating) : null,
    review_count: row.ReviewCount ? parseInt(row.ReviewCount, 10) : null,
    place_id: row.PlaceId?.trim() || null,
    description: row.Description?.trim() || null,
  }))

  // Filter out any empty rows
  const validProviders = providers.filter(p => p.provider_name && p.state)

  console.log(`Inserting ${validProviders.length} valid providers...`)

  // Batch insert in chunks of 100, deduped by place_id within each chunk
  const chunkSize = 100
  let totalInserted = 0
  
  for (let i = 0; i < validProviders.length; i += chunkSize) {
    const chunk = validProviders.slice(i, i + chunkSize)
    
    // Remove duplicates within this chunk based on place_id
    const seen = new Set<string>()
    const dedupedChunk = chunk.filter(p => {
      if (!p.place_id) return true // Keep rows without place_id
      if (seen.has(p.place_id)) return false
      seen.add(p.place_id)
      return true
    })
    
    const { data, error } = await supabase
      .from('providers')
      .upsert(dedupedChunk, { 
        onConflict: 'place_id',
        ignoreDuplicates: false 
      })

    if (error) {
      console.error(`Error inserting chunk ${i / chunkSize + 1}:`, error)
      continue
    }

    totalInserted += dedupedChunk.length
    console.log(`Inserted chunk ${i / chunkSize + 1} (${dedupedChunk.length} records)`)
  }

  console.log(`Import complete! Total inserted: ${totalInserted}`)
}

async function main() {
  const filePath = process.argv[2]
  
  if (!filePath) {
    console.error('Usage: npm run import-csv <path-to-csv>')
    console.error('Example: npm run import-csv ../../data/hazards/hazards-mold-multi-state-directory-v1.csv')
    process.exit(1)
  }

  const fullPath = path.resolve(filePath)
  
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`)
    process.exit(1)
  }

  await importCSV(fullPath)
}

main().catch(console.error)
