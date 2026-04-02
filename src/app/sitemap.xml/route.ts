export const dynamic = 'force-dynamic'

import { getProviders, getCategoryStateParams, getCategoryStateCountyParams } from '@/lib/supabase'
import { toSlug } from '@/lib/slugs'

interface SitemapPage {
  url: string
  changefreq: string
  priority: number
  lastmod?: string
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homerepair.expert'
  
  const staticPages: SitemapPage[] = [
    { url: `${baseUrl}/`, changefreq: 'daily', priority: 1.0 },
    { url: `${baseUrl}/providers`, changefreq: 'daily', priority: 0.9 },
  ]

  const categorySlugMap: Record<string, string> = {
    Mold: 'mold-remediation',
    Water: 'water-damage-restoration',
    Pest: 'pest-control',
    Radon: 'radon-testing',
  }

  const [{ data: providers }, stateCombos, countyCombos] = await Promise.all([
    getProviders({ limit: 10000 }),
    getCategoryStateParams(),
    getCategoryStateCountyParams(),
  ])

  const providerPages: SitemapPage[] = (providers || []).map((provider) => ({
    url: `${baseUrl}/providers/${provider.id}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: provider.updated_at || undefined,
  }))

  const statePages: SitemapPage[] = stateCombos.map((row) => ({
    url: `${baseUrl}/${categorySlugMap[row.service_category] ?? toSlug(row.service_category)}/${toSlug(row.state)}`,
    changefreq: 'weekly',
    priority: 0.85,
  }))

  const countyPages: SitemapPage[] = countyCombos.map((row) => ({
    url: `${baseUrl}/${categorySlugMap[row.service_category] ?? toSlug(row.service_category)}/${toSlug(row.state)}/${toSlug(row.county)}`,
    changefreq: 'weekly',
    priority: 0.75,
  }))

  const allPages = [...staticPages, ...statePages, ...countyPages, ...providerPages]

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
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
