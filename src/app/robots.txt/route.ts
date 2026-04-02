export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homerepair.expert'
  
  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
