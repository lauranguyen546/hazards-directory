import { getProviders } from '@/lib/supabase'

interface SitemapPage {
  url: string
  changefreq: string
  priority: number
  lastmod?: string
}

const SERVICE_SLUGS: Record<string, string> = {
  Mold: 'mold-remediation',
  Water: 'water-damage-restoration',
  Pest: 'pest-control',
  Radon: 'radon-testing',
}

const GUIDE_SLUGS = [
  'how-to-detect-mold',
  'mold-remediation-cost',
  'radon-testing-guide',
]

function toStateSlug(state: string) {
  return state.toLowerCase().replace(/\s+/g, '-')
}

function toCountySlug(county: string) {
  return county.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'

  const staticPages: SitemapPage[] = [
    { url: `${baseUrl}/`, changefreq: 'daily', priority: 1.0 },
    { url: `${baseUrl}/providers`, changefreq: 'daily', priority: 0.9 },
    { url: `${baseUrl}/get-quotes`, changefreq: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/guides`, changefreq: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/list-your-business`, changefreq: 'weekly', priority: 0.7 },
  ]

  const guidePages: SitemapPage[] = GUIDE_SLUGS.map(slug => ({
    url: `${baseUrl}/guides/${slug}`,
    changefreq: 'monthly',
    priority: 0.8,
  }))

  const { data: providers } = await getProviders({ limit: 10000 })
  const allProviders = providers || []

  const providerPages: SitemapPage[] = allProviders.map(provider => ({
    url: `${baseUrl}/providers/${provider.id}`,
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: provider.updated_at || undefined,
  }))

  // Build unique (service, state, county) combinations for location pages
  const locationSet = new Set<string>()
  const locationPages: SitemapPage[] = []

  for (const provider of allProviders) {
    const serviceSlug = SERVICE_SLUGS[provider.service_category]
    if (!serviceSlug) continue

    const stateSlug = toStateSlug(provider.state)
    const citySlug = toCountySlug(provider.county)

    const stateKey = `${serviceSlug}/${stateSlug}`
    if (!locationSet.has(stateKey)) {
      locationSet.add(stateKey)
      locationPages.push({
        url: `${baseUrl}/${stateKey}`,
        changefreq: 'weekly',
        priority: 0.9,
      })
    }

    const cityKey = `${serviceSlug}/${stateSlug}/${citySlug}`
    if (!locationSet.has(cityKey)) {
      locationSet.add(cityKey)
      locationPages.push({
        url: `${baseUrl}/${cityKey}`,
        changefreq: 'weekly',
        priority: 0.9,
      })
    }
  }

  const allPages = [...staticPages, ...guidePages, ...locationPages, ...providerPages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
