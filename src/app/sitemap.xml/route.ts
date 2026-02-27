import { getProviders } from '@/lib/supabase'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazards.directory'
  
  const staticPages = [
    { url: `${baseUrl}/`, changefreq: 'daily', priority: 1.0 },
    { url: `${baseUrl}/providers`, changefreq: 'daily', priority: 0.9 },
  ]

  const { data: providers } = await getProviders({ limit: 10000 })
  
  const providerPages = (providers || []).map((provider) => ({
    url: `${baseUrl}/providers/${provider.id}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: provider.updated_at,
  }))

  const allPages = [...staticPages, ...providerPages]

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
