import Link from 'next/link'
import { Home, Shield } from 'lucide-react'

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-slate-500 hover:text-indigo-400" aria-label="Go to Home">
              <Home size={24} />
            </Link>
            <div className="flex items-center text-slate-100 font-bold text-xl">
              <Shield className="text-indigo-500 mr-2" size={24} />
              Ops Command
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 flex items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
              SYSTEM NOMINAL
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
