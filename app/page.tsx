import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-floodlight-white text-pitch-green p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl border-4 border-pitch-green p-1 md:p-2 bg-pitch-green shadow-2xl">
        <div className="bg-floodlight-white border-4 border-pitch-green p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative pitch line markings */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b-4 border-l-4 border-pitch-green/10 rounded-bl-full" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-full h-4 border-t-4 border-pitch-green/10" aria-hidden="true" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-8 border-pitch-green pb-8">
            <div>
              <div className="bg-signal-red text-chalk-white font-display text-xl px-4 py-1 inline-block rounded-full mb-4 uppercase tracking-wider">
                System Active
              </div>
              <h1 className="font-display text-7xl md:text-8xl leading-none uppercase tracking-tighter text-pitch-green">
                Command <br />
                <span className="text-concrete-gray">Center</span>
              </h1>
            </div>
            <div className="mt-8 md:mt-0 text-right">
              <p className="font-mono text-concrete-gray text-lg font-bold">2026 WORLD CUP</p>
              <p className="font-mono text-signal-amber text-xl font-bold bg-pitch-green px-2 py-1 mt-2 inline-block">LIVE METRICS ENABLED</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link 
              href="/fan"
              className="group border-2 border-pitch-green bg-floodlight-white p-6 hover:bg-signal-amber transition-colors flex flex-col justify-between min-h-[200px]"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="bg-pitch-green text-floodlight-white font-display text-4xl px-4 py-2 rounded-full">
                  F1
                </div>
                <ArrowRight size={32} className="text-pitch-green transform group-hover:translate-x-2 transition-transform" />
              </div>
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-pitch-green mb-1">Fan Portal</h2>
                <p className="font-sans text-concrete-gray font-medium group-hover:text-pitch-green">Wayfinding • Shuttles • Eco Tips</p>
              </div>
            </Link>

            <Link 
              href="/ops"
              className="group border-2 border-pitch-green bg-pitch-green text-floodlight-white p-6 hover:bg-signal-red transition-colors flex flex-col justify-between min-h-[200px]"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="bg-floodlight-white text-pitch-green font-display text-4xl px-4 py-2 rounded-full">
                  O1
                </div>
                <ArrowRight size={32} className="text-floodlight-white transform group-hover:translate-x-2 transition-transform" />
              </div>
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-floodlight-white mb-1">Ops Command</h2>
                <p className="font-mono text-concrete-gray group-hover:text-floodlight-white">RESTRICTED ACCESS • STAFF ONLY</p>
              </div>
            </Link>
          </div>
          
        </div>
      </div>
      
      <footer className="mt-12 text-sm font-mono text-concrete-gray text-center max-w-2xl">
        * NON-AFFILIATED CONCEPT DEMO. NOT ASSOCIATED WITH FIFA.
      </footer>
    </main>
  )
}
