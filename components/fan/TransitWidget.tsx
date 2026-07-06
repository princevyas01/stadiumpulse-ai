"use client"

import { useState } from 'react'
import { Train, Clock } from 'lucide-react'

/**
 * TransitWidget
 */
export function TransitWidget() {
  const [loading, setLoading] = useState(false)
  const [recommendation, setRecommendation] = useState<string | null>(null)

  const getRecommendation = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/transit', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setRecommendation(data.recommendation)
    } catch {
      setRecommendation("Data unavailable. Shuttles run every 15 mins.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-theme-dark rounded-std border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-soft">
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-12 w-12 bg-theme-light dark:bg-white/5 text-theme-text-primary dark:text-theme-light rounded-std flex items-center justify-center border border-black/5 dark:border-white/5">
          <Train size={24} />
        </div>
        <div>
          <h2 className="text-xl font-sans font-semibold text-theme-text-primary dark:text-theme-light">Transit ETA</h2>
          <p className="font-sans text-sm text-theme-text-secondary">Live Departure Board</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center p-4 bg-theme-light dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-std">
          <span className="font-sans font-medium text-theme-text-primary dark:text-theme-light">NJ Transit</span>
          <span className="font-sans text-theme-alert-amber font-semibold">14 min</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-theme-light dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-std">
          <span className="font-sans font-medium text-theme-text-primary dark:text-theme-light">Lot J Shuttle</span>
          <span className="font-sans text-theme-alert-red font-semibold animate-pulse-alert motion-reduce:animate-none">4 min</span>
        </div>

        <button
          onClick={getRecommendation}
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center space-x-2 py-3 bg-theme-text-primary dark:bg-theme-light text-theme-light dark:text-theme-dark rounded-std hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent transition-colors disabled:opacity-50 font-sans font-medium text-[15px]"
        >
          <Clock size={18} />
          <span>{loading ? 'Calculating...' : 'AI Advisor'}</span>
        </button>

        {recommendation && (
          <div className="mt-4 p-5 bg-theme-light dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-std text-theme-text-primary dark:text-theme-light text-[15px]" aria-live="polite">
            <p className="font-sans leading-relaxed whitespace-pre-wrap">{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  )
}
