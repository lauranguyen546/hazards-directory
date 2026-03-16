// Affiliate program configuration
// Replace placeholder URLs with your actual affiliate links

export interface AffiliateProgram {
  url: string
  label: string
  description: string
  price: string
  category: string
  imageAlt: string
}

export const AFFILIATE_PROGRAMS: Record<string, AffiliateProgram> = {
  amazon_mold_kit: {
    url: 'https://www.amazon.com/dp/B001BSYZ7K?tag=YOUR_AMAZON_TAG',
    label: 'Pro-Lab DIY Mold Test Kit',
    description: 'Professional-grade mold test kit. Identifies 32+ mold types. Includes lab analysis.',
    price: '$34.99',
    category: 'Mold',
    imageAlt: 'Pro-Lab Mold Test Kit',
  },
  amazon_radon_kit: {
    url: 'https://www.amazon.com/dp/B000AGHBSY?tag=YOUR_AMAZON_TAG',
    label: 'Accustar Alpha Track Radon Test Kit',
    description: 'Long-term radon test kit — the most accurate method for home testing.',
    price: '$14.99',
    category: 'Radon',
    imageAlt: 'Accustar Radon Test Kit',
  },
  amazon_moisture_meter: {
    url: 'https://www.amazon.com/dp/B07HHK5GPP?tag=YOUR_AMAZON_TAG',
    label: 'General Tools Digital Moisture Meter',
    description: 'Detect hidden moisture before it becomes water damage. Easy pin-type reader.',
    price: '$19.99',
    category: 'Water',
    imageAlt: 'Digital Moisture Meter',
  },
  amazon_pest_trap: {
    url: 'https://www.amazon.com/dp/B000HCLWLC?tag=YOUR_AMAZON_TAG',
    label: 'Catchmaster Pest Monitoring Glue Traps',
    description: 'Non-toxic pest monitoring traps — identify what pests you have before calling a pro.',
    price: '$12.99',
    category: 'Pest',
    imageAlt: 'Pest Monitoring Glue Traps',
  },
  policygenius_insurance: {
    url: 'https://www.policygenius.com/?utm_source=hazardspros&utm_medium=affiliate',
    label: 'Compare Home Insurance Quotes',
    description: 'See if your homeowners insurance covers mold or water damage. Compare quotes in minutes.',
    price: 'Free comparison',
    category: 'Insurance',
    imageAlt: 'Home Insurance Comparison',
  },
  choice_home_warranty: {
    url: 'https://www.choicehomewarranty.com/?utm_source=hazardspros&utm_medium=affiliate',
    label: 'Choice Home Warranty',
    description: 'Protect against unexpected home repair costs — covers systems and appliances.',
    price: 'From $36/mo',
    category: 'Warranty',
    imageAlt: 'Choice Home Warranty',
  },
}
