import Link from 'next/link'
import { ArrowRight, Users, ShieldAlert } from 'lucide-react'

/**
 * Home
 */
export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-theme-light text-theme-text-primary p-4 md:p-12 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-4xl space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="font-display text-5xl md:text-6xl tracking-tight text-theme-text-primary">
            StadiumPulse AI
          </h1>
          <p className="text-theme-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Next-generation operations and fan experience platform for the Global Soccer Tournament 2026.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link 
            href="/fan"
            className="group bg-white rounded-std p-8 shadow-soft border border-black/5 hover:border-theme-accent transition-colors flex flex-col h-full"
          >
            <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-std bg-theme-light text-theme-text-primary border border-black/10 group-hover:text-theme-accent transition-colors">
              <Users size={24} />
            </div>
            <h2 className="font-sans font-semibold text-2xl text-theme-text-primary mb-2">Fan Portal</h2>
            <p className="text-theme-text-secondary mb-8 flex-1 leading-relaxed">
              Wayfinding • Transit ETA • Eco Tips • AI Concierge
            </p>
            <div className="flex items-center text-theme-accent font-medium mt-auto group-hover:translate-x-1 transition-transform">
              Enter Portal <ArrowRight size={16} className="ml-2" />
            </div>
          </Link>

          <Link 
            href="/ops"
            className="group bg-white rounded-std p-8 shadow-soft border border-black/5 hover:border-theme-accent transition-colors flex flex-col h-full"
          >
            <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-std bg-theme-light text-theme-text-primary border border-black/10 group-hover:text-theme-accent transition-colors">
              <ShieldAlert size={24} />
            </div>
            <h2 className="font-sans font-semibold text-2xl text-theme-text-primary mb-2">Ops Command</h2>
            <p className="text-theme-text-secondary mb-8 flex-1 leading-relaxed">
              Live Crowd Map • Incident Advisor • Shift Briefings
            </p>
            <div className="flex items-center text-theme-accent font-medium mt-auto group-hover:translate-x-1 transition-transform">
              Open Command Center <ArrowRight size={16} className="ml-2" />
            </div>
          </Link>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link href="/organizer" className="font-mono text-sm uppercase tracking-wide underline hover:text-theme-accent transition-colors">
            Organizer
          </Link>
        </div>
        
        <footer className="text-sm text-theme-text-secondary text-center pt-8 border-t border-black/10">
          * Non-affiliated concept demo. Not associated with FIFA.
        </footer>
      </div>
    </main>
  )
}
