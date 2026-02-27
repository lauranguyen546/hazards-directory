import { Provider } from '@/types/provider'

/**
 * Returns true if a provider record looks like scraped/dirty data
 * and should be excluded from rendering.
 */
export function isDirtyProvider(provider: Provider): boolean {
  const name = provider.provider_name || ''
  // PDF marker
  if (name.startsWith('[PDF]')) return true
  // Contains ellipsis anywhere (truncated/scraped title)
  if (name.includes('...')) return true
  // Longer than 80 chars (scraped meta title)
  if (name.length > 80) return true
  // Contains platform source suffix (e.g. "- Facebook", "- Yelp")
  if (/- (Facebook|Yelp|Google|Instagram|Twitter|LinkedIn)$/i.test(name)) return true
  // Scraped ad/CTA format: starts with "( BusinessName ) Call/Get/Click..."
  if (name.startsWith('(') && /\) (Call|Get|Click|Visit|Contact|Find|Buy|Try)/i.test(name)) return true
  return false
}

/**
 * Removes dirty/scraped provider records from an array.
 */
export function filterProviders(providers: Provider[]): Provider[] {
  return providers.filter((p) => !isDirtyProvider(p))
}

/**
 * Deprioritizes providers that have no address, no phone, and no reviews —
 * moves them to the end of the list. All other providers retain their original order.
 */
export function sortProviders(providers: Provider[]): Provider[] {
  return [...providers].sort((a, b) => {
    const aHasData = !!(a.address || a.phone || a.rating)
    const bHasData = !!(b.address || b.phone || b.rating)
    if (aHasData && !bHasData) return -1
    if (!aHasData && bHasData) return 1
    return 0
  })
}

/**
 * Convenience: filter out dirty records, then sort.
 */
export function filterAndSortProviders(providers: Provider[]): Provider[] {
  return sortProviders(filterProviders(providers))
}
