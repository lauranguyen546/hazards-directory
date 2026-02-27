import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hazards Directory | Find Trusted Mold, Water & Pest Control Pros',
  description: 'Find verified mold remediation, water damage restoration, and pest control providers across the United States. Compare ratings, reviews, and services.',
  openGraph: {
    title: 'Hazards Directory',
    description: 'Find trusted mold, water damage, and pest control professionals',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
