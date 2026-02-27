# Hazards Directory

A Next.js + Supabase directory application for mold remediation, water damage restoration, and pest control providers.

## Features

- **SEO-Optimized**: Dynamic JSON-LD schema markup, meta tags, sitemaps
- **Fast Performance**: Server-side rendering with Next.js App Router
- **Search & Filter**: Filter by state, county, service category
- **Agent Integration**: API endpoints for automated data ingestion
- **Mobile-First**: Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript

## Project Structure

```
~/dev/hazards-directory/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Homepage
│   │   ├── providers/        # Provider listing
│   │   │   └── [id]/         # Individual provider pages
│   ├── components/           # React components
│   ├── lib/                  # Utilities, Supabase client, schema
│   └── types/                # TypeScript types
├── supabase/
│   └── schema.sql            # Database schema
├── scripts/
│   └── import-csv.ts         # CSV import utility
└── .env.local                # Environment variables
```

## Quick Start

### 1. Set up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor → New Query
4. Copy and run the contents of `supabase/schema.sql`
5. Go to Project Settings → API → copy the URL and anon key

### 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 3. Install Dependencies

```bash
cd ~/dev/hazards-directory
npm install
```

### 4. Import Your Data

```bash
# Copy your CSV to the workspace, then:
export NEXT_PUBLIC_SUPABASE_URL="your-url"
export SUPABASE_SERVICE_ROLE_KEY="your-service-key"
npm run import-csv ../../data/hazards/hazards-mold-multi-state-directory-v1.csv
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Option 2: Self-Hosted

Build and start:
```bash
npm run build
npm start
```

## Adding New Data

### Via CSV Import

1. Run the import script with your new CSV:
```bash
npm run import-csv path/to/new-providers.csv
```

### Via Agent API (Coming Soon)

Agents can POST new providers directly:
```bash
POST /api/providers
{
  "state": "Florida",
  "county": "Miami-Dade County",
  "service_category": "Mold",
  "provider_name": "...",
  ...
}
```

## SEO Features

Each provider page includes:
- Dynamic `<title>` and `<meta description>`
- JSON-LD LocalBusiness schema
- Open Graph tags
- Canonical URLs
- Breadcrumb navigation

The homepage includes:
- Organization schema
- Sitemap generation (add `/sitemap.xml` route)

## Next Steps

1. [ ] Add `/sitemap.xml` and `/robots.txt` routes
2. [ ] Implement agent API endpoints for automated ingestion
3. [ ] Add image support for providers
4. [ ] Implement review aggregation
5. [ ] Add lead generation/contact forms
6. [ ] Analytics tracking

## License

Private - All rights reserved.
