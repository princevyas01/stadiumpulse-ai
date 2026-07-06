"use client"

import { useState } from 'react'
import { Train, Clock } from 'lucide-react'

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
    <div className="bg-chalk-white dark:bg-black rounded-sm border-2 border-concrete-gray/20 dark:border-concrete-gray/40 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-4 border-b-2 border-concrete-gray/20 pb-4">
        <div className="h-12 w-12 bg-pitch-green dark:bg-floodlight-white text-floodlight-white dark:text-pitch-green rounded-sm flex items-center justify-center border-2 border-pitch-green dark:border-floodlight-white">
          <Train size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-display uppercase tracking-tight text-pitch-green dark:text-floodlight-white">Transit ETA</h2>
          <p className="font-mono text-xs uppercase text-concrete-gray">Live Departure Board</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-floodlight-white dark:bg-pitch-green border-2 border-concrete-gray/30 dark:border-concrete-gray/50">
          <span className="font-sans font-bold text-pitch-green dark:text-floodlight-white uppercase">NJ Transit</span>
          <span className="font-mono text-signal-amber font-bold text-xl">14 MIN</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-floodlight-white dark:bg-pitch-green border-2 border-concrete-gray/30 dark:border-concrete-gray/50">
          <span className="font-sans font-bold text-pitch-green dark:text-floodlight-white uppercase">Lot J Shuttle</span>
          <span className="font-mono text-signal-red font-bold text-xl animate-pulse-alert motion-reduce:animate-none">04 MIN</span>
        </div>

        <button
          onClick={getRecommendation}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-pitch-green dark:bg-floodlight-white text-floodlight-white dark:text-pitch-green hover:bg-signal-amber hover:text-pitch-green transition-colors disabled:opacity-50 font-display text-xl uppercase tracking-wider"
        >
          <Clock size={20} />
          <span>{loading ? 'CALCULATING...' : 'AI ADVISOR'}</span>
        </button>

        {recommendation && (
          <div className="p-4 bg-signal-amber/10 border-l-4 border-signal-amber text-pitch-green dark:text-floodlight-white text-sm" aria-live="polite">
            <p className="font-sans font-bold whitespace-pre-wrap">{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  )
}
