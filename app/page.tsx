import Link from 'next/link'
import { ArrowRight, Users, ShieldAlert } from 'lucide-react'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-200 p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900">
            StadiumPulse <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            The next-generation, AI-driven operations and fan experience platform for the FIFA World Cup 2026™*.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-8">
          <Link 
            href="/fan"
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 hover:border-blue-100"
          >
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users size={32} />
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Fan Portal</h2>
            <p className="text-neutral-500 mb-6 flex-1 text-sm">
              Features: AI Wayfinding, Crowd Density Map, Accessibility Mode, ETA Assistant, Eco Tips, & Multilingual Chatbot.
            </p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
              Enter Portal <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>

          <Link 
            href="/ops"
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 hover:border-indigo-100"
          >
            <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldAlert size={32} />
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Ops Command</h2>
            <p className="text-neutral-500 mb-6 flex-1 text-sm">
              Features: Live Crowd Map, Operational Intelligence Feed, Sustainability Dash, & AI Incident Advisor.
            </p>
            <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
              Open Command Center <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>
        </div>
        
        <footer className="pt-12 text-xs text-neutral-400">
          * This is a fictional concept project for a hackathon and is not affiliated with FIFA or the official World Cup 2026.
        </footer>
      </div>
    </main>
  )
}
