import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-03-25.dahlia',
})

export const TIERS = {
  featured: {
    label: 'Featured',
    price: 29,
    priceId: process.env.STRIPE_FEATURED_PRICE_ID || '',
    description: 'Appear first in search results within your state & category',
    features: [
      'Priority placement in search results',
      'Bold "Featured" badge on listing',
      'All free tier features',
    ],
  },
  premium: {
    label: 'Premium',
    price: 79,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || '',
    description: 'Featured placement + lead analytics dashboard',
    features: [
      'Everything in Featured',
      'Lead analytics dashboard',
      'Monthly lead reports',
      'Priority support',
    ],
  },
} as const

export type TierKey = keyof typeof TIERS
