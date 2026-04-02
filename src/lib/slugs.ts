export const CATEGORIES = {
  'mold-remediation': {
    dbValue: 'Mold',
    label: 'Mold Remediation',
    metaDescription: 'mold removal and remediation',
  },
  'water-damage-restoration': {
    dbValue: 'Water',
    label: 'Water Damage Restoration',
    metaDescription: 'water damage restoration',
  },
  'pest-control': {
    dbValue: 'Pest',
    label: 'Pest Control',
    metaDescription: 'pest control and extermination',
  },
  'radon-testing': {
    dbValue: 'Radon',
    label: 'Radon Testing & Mitigation',
    metaDescription: 'radon testing and mitigation',
  },
} as const

export type CategorySlug = keyof typeof CATEGORIES

export function isCategorySlug(slug: string): slug is CategorySlug {
  return slug in CATEGORIES
}

/** Convert a display name to a URL slug: spaces → hyphens, lowercase. */
export function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}
