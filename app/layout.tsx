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
      <body className={`${sourceSans3.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-floodlight-white dark:bg-pitch-green text-concrete-gray dark:text-floodlight-white antialiased transition-colors`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-signal-amber text-pitch-green font-bold px-4 py-2 z-50 rounded-sm">
          Skip to main content
        </a>
        
        {/* Persistent LED Ticker */}
        <div className="bg-black text-signal-amber font-mono text-sm py-1.5 overflow-hidden whitespace-nowrap border-b-2 border-signal-red/20" aria-hidden="true">
          <div className="inline-block animate-ticker hover:animate-none motion-reduce:animate-none pl-[100%]">
            <span className="mx-8">LIVE: GATE C CONGESTION BUILDING</span>
            <span className="mx-8 text-signal-red animate-pulse-alert motion-reduce:animate-none">■ ALERT: ESCALATOR 4 MAINTENANCE</span>
            <span className="mx-8">NEXT SHUTTLE (LOT J): 4 MIN</span>
            <span className="mx-8 text-concrete-gray">SYSTEM: NOMINAL</span>
          </div>
        </div>

        <AccessibilityProvider>
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  )
}
