import { createClient } from '@supabase/supabase-js'
import { Provider } from '@/types/provider'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getProviders(filters?: {
  state?: string
  county?: string
  zip_code?: string
  service_category?: string
  search?: string
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('providers')
    .select('*', { count: 'exact' })
    .order('tier', { ascending: false })
    .order('provider_name', { ascending: true })

  if (filters?.state) {
    query = query.eq('state', filters.state)
  }
  if (filters?.county) {
    query = query.eq('county', filters.county)
  }
  if (filters?.zip_code) {
    query = query.eq('zip_code', filters.zip_code)
  }
  if (filters?.service_category) {
    query = query.eq('service_category', filters.service_category)
  }
  if (filters?.search) {
    query = query.or(`provider_name.ilike.%${filters.search}%,address.ilike.%${filters.search}%`)
  }

  const limit = filters?.limit || 50
  const offset = filters?.offset || 0
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) throw error
  return { data: data as Provider[], count }
}

export async function getProviderById(id: string) {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Provider
}

export async function getStates() {
  const { data, error } = await supabase
    .from('providers')
    .select('state')
    .order('state')

  if (error) throw error
  const states = new Set(data.map(d => d.state))
  return Array.from(states)
}

export async function getCountiesByState(state: string) {
  const { data, error } = await supabase
    .from('providers')
    .select('county')
    .eq('state', state)
    .order('county')

  if (error) throw error
  const counties = new Set(data.map(d => d.county))
  return Array.from(counties)
}

/** All distinct (state, service_category) pairs — used by generateStaticParams. */
export async function getCategoryStateParams() {
  const { data, error } = await supabase
    .from('providers')
    .select('state, service_category')
    .order('state')

  if (error) throw error

  const seen = new Set<string>()
  const result: Array<{ state: string; service_category: string }> = []
  for (const row of data) {
    const key = `${row.state}|${row.service_category}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push(row)
    }
  }
  return result
}

/** All distinct (state, county, service_category) triples — used by generateStaticParams. */
export async function getCategoryStateCountyParams() {
  const { data, error } = await supabase
    .from('providers')
    .select('state, county, service_category')
    .order('state')

  if (error) throw error

  const seen = new Set<string>()
  const result: Array<{ state: string; county: string; service_category: string }> = []
  for (const row of data) {
    const key = `${row.state}|${row.county}|${row.service_category}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push(row)
    }
  }
  return result
}
