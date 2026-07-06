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
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
          <MapPin size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-800">AI Wayfinding</h2>
          <p className="text-sm text-neutral-500">Ask for directions in plain English</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. How do I get to Gate C from Section 120?"
          className="w-full pl-10 pr-12 py-3 rounded-lg border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
        <Search className="absolute left-3 top-3.5 text-neutral-400" size={20} />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          aria-label="Get Directions"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
        </button>
      </form>

      {directions && (
        <div className="bg-neutral-50 rounded-lg p-4 text-neutral-700 text-sm leading-relaxed border border-neutral-100" aria-live="polite">
          <p className="whitespace-pre-wrap">{directions}</p>
        </div>
      )}
    </div>
  )
}
