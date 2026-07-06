"use client"

import { useState, useEffect } from 'react'
import { MapPin, Search, ArrowRight, Loader2 } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

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
    <div className="bg-chalk-white dark:bg-black rounded-sm border-2 border-concrete-gray/20 dark:border-concrete-gray/40 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6 border-b-2 border-concrete-gray/20 pb-4">
        <div className="h-12 w-12 bg-pitch-green dark:bg-floodlight-white text-floodlight-white dark:text-pitch-green rounded-sm flex items-center justify-center border-2 border-pitch-green dark:border-floodlight-white">
          <MapPin size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-display uppercase tracking-tight text-pitch-green dark:text-floodlight-white">Wayfinder</h2>
          <p className="font-mono text-xs uppercase text-concrete-gray">Query Nav System</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ENTER DESTINATION (e.g. HOW DO I GET TO GATE C?)"
          className="w-full pl-12 pr-12 py-4 bg-floodlight-white dark:bg-pitch-green border-2 border-concrete-gray/30 dark:border-concrete-gray/50 text-pitch-green dark:text-floodlight-white font-mono uppercase focus:border-signal-amber focus:ring-0 outline-none transition-colors placeholder:text-concrete-gray/60"
        />
        <Search className="absolute left-4 top-4 text-concrete-gray" size={24} />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-2 p-2 bg-pitch-green dark:bg-floodlight-white text-floodlight-white dark:text-pitch-green hover:bg-signal-amber hover:text-pitch-green disabled:opacity-50 transition-colors"
          aria-label="Get Directions"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
        </button>
      </form>

      {directions && (
        <div className="bg-signal-amber/10 dark:bg-signal-amber/20 border-l-4 border-signal-amber p-4 text-pitch-green dark:text-floodlight-white font-sans text-lg leading-relaxed" aria-live="polite">
          <p className="whitespace-pre-wrap font-bold">{directions}</p>
        </div>
      )}
    </div>
  )
}
