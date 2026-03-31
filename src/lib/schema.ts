// JSON-LD schema generation for SEO

import { Provider } from '@/types/provider'

export function generateLocalBusinessSchema(provider: Provider) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: provider.provider_name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: provider.address,
      addressLocality: provider.county,
      addressRegion: provider.state,
      addressCountry: 'US',
    },
  }

  if (provider.phone) {
    schema.telephone = provider.phone
  }

  if (provider.website) {
    schema.url = provider.website
  }

  if (provider.rating && provider.review_count) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: provider.rating,
      reviewCount: provider.review_count,
    }
  }

  if (provider.primary_category) {
    schema['@type'] = mapCategoryToSchemaType(provider.primary_category)
  }

  return schema
}

function mapCategoryToSchemaType(category: string): string {
  const categoryMap: Record<string, string> = {
    'mold_removal': 'HomeAndConstructionBusiness',
    'mold_remediation': 'HomeAndConstructionBusiness',
    'water_damage_restoration_service': 'HomeAndConstructionBusiness',
    'fire_damage_restoration_service': 'HomeAndConstructionBusiness',
    'plumber': 'Plumber',
    'electrician': 'Electrician',
    'hvac': 'HVACBusiness',
    'septic_system_service': 'HomeAndConstructionBusiness',
  }
  return categoryMap[category] || 'LocalBusiness'
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hazards Directory',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hazards.directory',
    description: 'Find trusted mold remediation, water damage restoration, and pest control providers across the United States.',
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'Hazards Directory',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hazards.directory',
    },
  }
}
