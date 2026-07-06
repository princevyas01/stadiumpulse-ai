import { AccessToggle } from '@/components/shared/AccessToggle'
import { Home } from 'lucide-react'

export default function FanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-floodlight-white dark:bg-pitch-green transition-colors">
      <header className="bg-chalk-white dark:bg-black border-b-4 border-pitch-green dark:border-concrete-gray/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-concrete-gray hover:text-signal-amber dark:text-floodlight-white dark:hover:text-signal-amber transition-colors" aria-label="Go to Home">
              <Home size={28} />
            </a>
            <h1 className="font-display text-2xl uppercase tracking-widest text-pitch-green dark:text-floodlight-white">
              GUEST PORTAL
            </h1>
          </div>
          <div className="flex flex-1 justify-center px-4 max-w-xs invisible md:visible">
             <div className="w-full text-center text-sm font-mono font-bold tracking-widest text-pitch-green dark:text-signal-amber border-2 border-pitch-green dark:border-signal-amber px-4 py-1 uppercase">
                MetLife Stadium
             </div>
          </div>
          <div className="flex items-center space-x-4">
            <select aria-label="Select Language" className="bg-transparent font-mono text-sm uppercase text-concrete-gray dark:text-floodlight-white focus:outline-none border-b-2 border-concrete-gray cursor-pointer">
              <option value="en">ENG</option>
              <option value="es">ESP</option>
              <option value="fr">FRA</option>
            </select>
            <AccessToggle />
          </div>
        </div>
      </header>
      <main id="main-content" className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  )
}
