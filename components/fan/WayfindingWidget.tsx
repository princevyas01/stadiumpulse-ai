"use client"

import { useState, useEffect } from 'react'
import { MapPin, Search, ArrowRight, Loader2 } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

/**
 * WayfindingWidget
 */
export function WayfindingWidget() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [directions, setDirections] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setDirections(null)
      return
    }

    const fetchDirections = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/wayfinding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: debouncedQuery })
        })
        if (!res.ok) throw new Error('Failed to fetch directions')
        const data = await res.json()
        setDirections(data.directions)
      } catch {
        setDirections("Sorry, we couldn't find directions for that at the moment.")
      } finally {
        setLoading(false)
      }
    }

    fetchDirections()
  }, [debouncedQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handled by debounced effect
  }

  return (
    <div className="bg-white dark:bg-theme-dark rounded-std border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-soft">
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-12 w-12 bg-theme-light dark:bg-white/5 text-theme-text-primary dark:text-theme-light rounded-std flex items-center justify-center border border-black/5 dark:border-white/5">
          <MapPin size={24} />
        </div>
        <div>
          <h2 className="text-xl font-sans font-semibold text-theme-text-primary dark:text-theme-light">Wayfinder</h2>
          <p className="font-sans text-sm text-theme-text-secondary">AI Navigation Assistant</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="How do I get to Gate C?"
          className="w-full pl-12 pr-12 py-3 bg-theme-light dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-std text-theme-text-primary dark:text-theme-light font-sans focus:border-theme-accent focus:ring-1 focus:ring-theme-accent outline-none transition-colors placeholder:text-theme-text-secondary"
        />
        <Search className="absolute left-4 top-3.5 text-theme-text-secondary" size={20} />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-1.5 top-1.5 p-2 bg-theme-text-primary dark:bg-theme-light text-theme-light dark:text-theme-dark rounded-[8px] hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent disabled:opacity-50 transition-colors"
          aria-label="Get Directions"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
        </button>
      </form>

      {directions && (
        <div className="bg-theme-light dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-std p-5 text-theme-text-primary dark:text-theme-light font-sans text-[15px] leading-relaxed" aria-live="polite">
          <p className="whitespace-pre-wrap">{directions}</p>
        </div>
      )}
    </div>
  )
}
