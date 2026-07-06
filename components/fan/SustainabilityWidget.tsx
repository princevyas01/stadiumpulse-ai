"use client"

import { useState, useEffect } from 'react'
import { Leaf, RefreshCcw } from 'lucide-react'

export function SustainabilityWidget() {
  const [stats, setStats] = useState({ waste: 85, energy: 42 })
  const [tip, setTip] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Simulate stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        waste: Math.min(100, prev.waste + Math.random() * 2 - 1),
        energy: Math.max(20, prev.energy + Math.random() * 5 - 2)
      }))
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  const getTip = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/eco-tips', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setTip(data.tip)
    } catch {
      setTip("Use digital tickets and recycle your cups!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-10 w-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center">
          <Leaf size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-800">Sustainability</h2>
          <p className="text-sm text-neutral-500">Live eco impact</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-teal-50 rounded-lg border border-teal-100 text-center">
          <p className="text-sm text-teal-600 font-semibold mb-1">Waste Diverted</p>
          <p className="text-2xl font-black text-teal-700">{stats.waste.toFixed(1)}%</p>
        </div>
        <div className="p-4 bg-teal-50 rounded-lg border border-teal-100 text-center">
          <p className="text-sm text-teal-600 font-semibold mb-1">Renewable Energy</p>
          <p className="text-2xl font-black text-teal-700">{stats.energy.toFixed(1)}%</p>
        </div>
      </div>

      <button
        onClick={getTip}
        disabled={loading}
        className="w-full flex items-center justify-center space-x-2 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
      >
        <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
        <span>Get AI Eco Tip</span>
      </button>

      {tip && (
        <div className="mt-4 p-4 bg-neutral-50 rounded-lg text-sm text-neutral-700 border border-neutral-100 italic" aria-live="polite">
          &quot;{tip}&quot;
        </div>
      )}
    </div>
  )
}
