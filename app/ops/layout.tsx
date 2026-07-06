import Link from 'next/link'
import { Home, Shield } from 'lucide-react'

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-pitch-green text-floodlight-white font-sans">
      <header className="bg-black border-b-2 border-concrete-gray/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-concrete-gray hover:text-signal-amber transition-colors" aria-label="Go to Home">
              <Home size={24} />
            </Link>
            <div className="flex items-center text-floodlight-white font-display text-2xl uppercase tracking-wider">
              <Shield className="text-signal-amber mr-3" size={24} />
              Ops Command
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs px-3 py-1 bg-signal-red/10 text-signal-red font-mono border border-signal-red/30 flex items-center">
              <div className="w-2 h-2 rounded-full bg-signal-red mr-2 animate-pulse-alert motion-reduce:animate-none"></div>
              SECURE
            </div>
          </div>
        </div>
      </header>
      <main id="main-content" className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  )
}
