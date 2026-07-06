import Link from 'next/link'
import { Home, Shield } from 'lucide-react'

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-theme-dark text-theme-light font-sans">
      <header className="bg-theme-dark/95 border-b border-white/10 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-theme-text-secondary hover:text-theme-light transition-colors" aria-label="Go to Home">
              <Home size={24} />
            </Link>
            <div className="flex items-center text-theme-light font-display text-2xl uppercase tracking-wide">
              <Shield className="text-theme-text-secondary mr-3" size={24} />
              Ops Command
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm px-3 py-1 bg-theme-alert-green/10 text-theme-alert-green border border-theme-alert-green/20 rounded-std flex items-center font-medium">
              <div className="w-2 h-2 rounded-full bg-theme-alert-green mr-2 animate-pulse-alert motion-reduce:animate-none"></div>
              System Secure
            </div>
          </div>
        </div>
      </header>
      <main id="main-content" className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  )
}
