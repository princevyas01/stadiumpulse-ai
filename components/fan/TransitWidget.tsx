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
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
          <Train size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-800">Transit ETA</h2>
          <p className="text-sm text-neutral-500">Plan your departure</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg border border-neutral-100">
          <span className="font-medium text-neutral-700">NJ Transit to Penn Station</span>
          <span className="text-emerald-600 font-bold">14 min</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg border border-neutral-100">
          <span className="font-medium text-neutral-700">Lot J Shuttle</span>
          <span className="text-emerald-600 font-bold">4 min</span>
        </div>

        <button
          onClick={getRecommendation}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 py-2.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          <Clock size={18} />
          <span>{loading ? 'Calculating...' : 'Get AI Departure Advice'}</span>
        </button>

        {recommendation && (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-sm border border-emerald-100" aria-live="polite">
            <p className="font-medium whitespace-pre-wrap">{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  )
}
