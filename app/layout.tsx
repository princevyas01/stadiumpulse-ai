import type { Metadata } from 'next'
import { Barlow_Condensed, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AccessibilityProvider } from '@/components/shared/AccessibilityContext'

const barlowCondensed = Barlow_Condensed({ 
  subsets: ['latin'], 
  weight: ['400', '700', '900'],
  variable: '--font-barlow-condensed'
})

const sourceSans3 = Source_Sans_3({ 
  subsets: ['latin'],
  variable: '--font-source-sans-3'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})

/**
 * metadata
 */
export const metadata: Metadata = {
  title: 'StadiumPulse AI',
  description: 'GenAI Command Center for Global Soccer Tournament 2026',
}

/**
 * RootLayout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans3.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-theme-light dark:bg-theme-dark text-theme-text-primary dark:text-theme-light antialiased transition-colors`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-theme-accent text-white font-bold px-4 py-2 z-50 rounded-std">
          Skip to main content
        </a>
        
        {/* Persistent LED Ticker - The ONE place with strict signage styling */}
        <div className="bg-black text-theme-alert-amber font-mono text-sm py-2 overflow-hidden whitespace-nowrap border-b border-theme-text-secondary/30" aria-hidden="true">
          <div className="inline-block animate-ticker hover:animate-none motion-reduce:animate-none pl-[100%]">
            <span className="mx-8 font-bold tracking-widest uppercase">LIVE: GATE C CONGESTION BUILDING</span>
            <span className="mx-8 font-bold tracking-widest text-theme-alert-red animate-pulse-alert motion-reduce:animate-none uppercase">■ ALERT: ESCALATOR 4 MAINTENANCE</span>
            <span className="mx-8 font-bold tracking-widest uppercase">NEXT SHUTTLE (LOT J): 4 MIN</span>
            <span className="mx-8 font-bold tracking-widest text-theme-alert-green uppercase">SYSTEM: NOMINAL</span>
          </div>
        </div>

        <AccessibilityProvider>
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  )
}
