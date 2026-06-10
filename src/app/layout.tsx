import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'),
  title: {
    default: 'HazardPros | Find Trusted Mold, Water & Pest Control Pros',
    template: '%s | HazardPros',
  },
  description: 'Find verified mold remediation, water damage restoration, and pest control providers across the United States. Compare ratings, reviews, and services.',
  openGraph: {
    siteName: 'HazardPros',
    title: 'HazardPros | Find Trusted Mold, Water & Pest Control Pros',
    description: 'Find trusted mold, water damage, and pest control professionals near you.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HazardPros',
    description: 'Find trusted mold, water damage, and pest control professionals near you.',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
