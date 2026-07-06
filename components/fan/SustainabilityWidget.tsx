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
    <div className="bg-chalk-white dark:bg-black rounded-sm border-2 border-concrete-gray/20 dark:border-concrete-gray/40 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6 border-b-2 border-concrete-gray/20 pb-4">
        <div className="h-12 w-12 bg-pitch-green dark:bg-floodlight-white text-floodlight-white dark:text-pitch-green rounded-sm flex items-center justify-center border-2 border-pitch-green dark:border-floodlight-white">
          <Leaf size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-display uppercase tracking-tight text-pitch-green dark:text-floodlight-white">Sustainability</h2>
          <p className="font-mono text-xs uppercase text-concrete-gray">Live Eco Metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-floodlight-white dark:bg-pitch-green border-2 border-concrete-gray/30 dark:border-concrete-gray/50 text-center">
          <p className="font-sans font-bold text-concrete-gray dark:text-floodlight-white uppercase mb-1 text-sm">Waste Diverted</p>
          <p className="font-display text-4xl text-pitch-green dark:text-signal-amber">{stats.waste.toFixed(1)}<span className="text-2xl">%</span></p>
        </div>
        <div className="p-4 bg-floodlight-white dark:bg-pitch-green border-2 border-concrete-gray/30 dark:border-concrete-gray/50 text-center">
          <p className="font-sans font-bold text-concrete-gray dark:text-floodlight-white uppercase mb-1 text-sm">Renewable Energy</p>
          <p className="font-display text-4xl text-pitch-green dark:text-signal-amber">{stats.energy.toFixed(1)}<span className="text-2xl">%</span></p>
        </div>
      </div>

      <button
        onClick={getTip}
        disabled={loading}
        className="w-full flex items-center justify-center space-x-2 py-3 bg-pitch-green dark:bg-floodlight-white text-floodlight-white dark:text-pitch-green hover:bg-signal-amber hover:text-pitch-green transition-colors disabled:opacity-50 font-display text-xl uppercase tracking-wider"
      >
        <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
        <span>Get AI Eco Tip</span>
      </button>

      {tip && (
        <div className="mt-4 p-4 bg-signal-amber/10 border-l-4 border-signal-amber text-pitch-green dark:text-floodlight-white font-sans font-bold text-sm" aria-live="polite">
          &quot;{tip}&quot;
        </div>
      )}
    </div>
  )
}
