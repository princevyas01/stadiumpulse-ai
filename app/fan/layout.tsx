import { AccessToggle } from '@/components/shared/AccessToggle'
import { Home } from 'lucide-react'

/**
 * FanLayout
 */
export default function FanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-theme-light dark:bg-theme-dark transition-colors">
      <header className="bg-white/80 dark:bg-theme-dark/80 border-b border-black/10 dark:border-white/10 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-theme-text-secondary hover:text-theme-accent dark:hover:text-theme-accent transition-colors" aria-label="Go to Home">
              <Home size={24} />
            </a>
            <h1 className="font-sans font-semibold text-xl text-theme-text-primary dark:text-theme-light">
              Guest Portal
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <select aria-label="Select Language" className="bg-transparent font-sans text-sm font-medium text-theme-text-secondary focus:outline-none cursor-pointer">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
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
