import { AccessToggle } from '@/components/shared/AccessToggle'
import Link from 'next/link'
import { Home } from 'lucide-react'

export default function FanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-neutral-500 hover:text-blue-600" aria-label="Go to Home">
              <Home size={24} />
            </Link>
            <h1 className="font-bold text-xl text-neutral-800">MetLife Fan Portal</h1>
          </div>
          <div className="flex flex-1 justify-center px-4 max-w-xs invisible sm:visible">
             <div className="w-full text-center text-sm font-medium text-blue-800 bg-blue-100 rounded-full py-1">
                World Cup 2026 Fan Experience
             </div>
          </div>
          <div className="flex items-center space-x-4">
            <select aria-label="Select Language" className="bg-transparent text-sm text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
            <AccessToggle />
          </div>
        </div>
      </header>
      <main id="main-content" className="flex-1 bg-neutral-50">
        {children}
      </main>
    </div>
  )
}
