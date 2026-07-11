"use client"

import { useState, useEffect } from 'react'
import { getCsrfToken } from '@/lib/getCsrfToken'
import { Leaf, RefreshCcw } from 'lucide-react'

/**
 * SustainabilityWidget
 */
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
      const res = await fetch('/api/eco-tips', { method: 'POST', headers: { 'x-csrf-token': getCsrfToken() } })
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
    <div className="bg-white dark:bg-theme-dark rounded-std border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-soft">
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-12 w-12 bg-theme-light dark:bg-white/5 text-theme-text-primary dark:text-theme-light rounded-std flex items-center justify-center border border-black/5 dark:border-white/5">
          <Leaf size={24} />
        </div>
        <div>
          <h2 className="text-xl font-sans font-semibold text-theme-text-primary dark:text-theme-light">Sustainability</h2>
          <p className="font-sans text-sm text-theme-text-secondary">Live Eco Metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-theme-light dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-std text-center">
          <p className="font-sans text-theme-text-secondary mb-1 text-sm">Waste Diverted</p>
          <p className="font-sans font-semibold text-3xl text-theme-text-primary dark:text-theme-light">{stats.waste.toFixed(1)}<span className="text-xl text-theme-text-secondary ml-1">%</span></p>
        </div>
        <div className="p-4 bg-theme-light dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-std text-center">
          <p className="font-sans text-theme-text-secondary mb-1 text-sm">Renewable Energy</p>
          <p className="font-sans font-semibold text-3xl text-theme-text-primary dark:text-theme-light">{stats.energy.toFixed(1)}<span className="text-xl text-theme-text-secondary ml-1">%</span></p>
        </div>
      </div>

      <button
        onClick={getTip}
        disabled={loading}
        className="w-full flex items-center justify-center space-x-2 py-3 bg-theme-text-primary dark:bg-theme-light text-theme-light dark:text-theme-dark rounded-std hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent transition-colors disabled:opacity-50 font-sans font-medium text-[15px]"
      >
        <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
        <span>Get AI Eco Tip</span>
      </button>

      {tip && (
        <div className="mt-4 p-5 bg-theme-light dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-std text-theme-text-primary dark:text-theme-light text-[15px] italic" aria-live="polite">
          &quot;{tip}&quot;
        </div>
      )}
    </div>
  )
}
