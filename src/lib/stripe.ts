import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
})

// Stripe Price IDs — create these in your Stripe dashboard and set as env vars
export const STRIPE_PRICES = {
  basic_monthly: process.env.STRIPE_PRICE_BASIC_MONTHLY!,    // $149/mo
  premium_monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY!, // $349/mo
} as const

export type StripePriceTier = keyof typeof STRIPE_PRICES
