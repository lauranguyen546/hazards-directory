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
  }
  return categoryMap[category] || 'LocalBusiness'
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HazardPros',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com',
    description: 'Find trusted mold remediation, water damage restoration, and pest control providers across the United States.',
  }
}

export function generateBreadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

export function generateServiceSchema(category: string, city: string, state: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: category,
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'State', name: state },
    },
    provider: {
      '@type': 'Organization',
      name: 'HazardPros',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com',
    },
  }
}
