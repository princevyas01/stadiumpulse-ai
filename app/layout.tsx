import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AccessibilityProvider } from '@/components/shared/AccessibilityContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StadiumPulse AI',
  description: 'GenAI Command Center for FIFA World Cup 2026',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-neutral-50 text-neutral-900 antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 z-50 rounded-md">
          Skip to main content
        </a>
        <AccessibilityProvider>
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  )
}
