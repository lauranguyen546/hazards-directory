import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://homerepair.expert'),
  title: {
    default: 'HomeRepair.Expert | Find Trusted Mold, Water & Pest Control Pros',
    template: '%s | HomeRepair.Expert',
  },
  description: 'Find verified mold remediation, water damage restoration, and pest control providers across the United States. Compare ratings, reviews, and services.',
  openGraph: {
    siteName: 'HomeRepair.Expert',
    title: 'HomeRepair.Expert | Find Trusted Mold, Water & Pest Control Pros',
    description: 'Find trusted mold, water damage, and pest control professionals',
    type: 'website',
    url: 'https://homerepair.expert',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HomeRepair.Expert | Find Trusted Mold, Water & Pest Control Pros',
    description: 'Find trusted mold, water damage, and pest control professionals',
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
