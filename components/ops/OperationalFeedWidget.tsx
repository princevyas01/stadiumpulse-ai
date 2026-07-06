"use client"

import { useState, useEffect } from 'react'
import { RadioReceiver, AlertTriangle, CheckCircle, Info } from 'lucide-react'

type FeedItem = { id: string; type: 'alert' | 'info' | 'resolved'; message: string; time: string }

function generateFeed(): FeedItem[] {
  const now = new Date()
  return [
    { id: '1', type: 'alert', message: 'Density anomaly detected at Gate C', time: new Date(now.getTime() - 2 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    { id: '2', type: 'resolved', message: 'Medical request Sect 110 fulfilled', time: new Date(now.getTime() - 15 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    { id: '3', type: 'info', message: 'Shift Briefing: Match ends in 45m. Prep shuttles.', time: new Date(now.getTime() - 30 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]
}

/**
 * OperationalFeedWidget
 */
export function OperationalFeedWidget() {
  const [feed, setFeed] = useState<FeedItem[]>(generateFeed())
  const [briefingLoading, setBriefingLoading] = useState(false)
  const [briefing, setBriefing] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const newItems: FeedItem[] = [
        { id: now.getTime().toString(), type: 'alert', message: 'Elevated noise levels in Concourse North', time: now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
      ]
      setFeed(prev => [...newItems, ...prev].slice(0, 10))
    }, 45000)
    return () => clearInterval(interval)
  }, [])

  const getBriefing = async () => {
    setBriefingLoading(true)
    try {
      const res = await fetch('/api/briefing', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setBriefing(data.briefing)
    } catch {
      setBriefing("Focus on crowd dispersion at North Gates. Keep hydration stations stocked.")
    } finally {
      setBriefingLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-theme-dark rounded-std border border-black/10 dark:border-white/10 p-6 md:p-8 h-full flex flex-col shadow-soft">
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-12 w-12 bg-theme-alert-amber/10 text-theme-alert-amber flex items-center justify-center rounded-std border border-theme-alert-amber/20">
          <RadioReceiver size={24} />
        </div>
        <div>
          <h2 className="text-xl font-sans font-semibold text-theme-text-primary dark:text-theme-light">Live Feed</h2>
          <p className="font-sans text-sm text-theme-text-secondary">Operational Intelligence</p>
        </div>
      </div>

      <div className="mb-8">
        <button
          onClick={getBriefing}
          disabled={briefingLoading}
          className="w-full py-3 bg-theme-text-primary dark:bg-theme-light text-white dark:text-theme-dark rounded-std hover:bg-theme-accent dark:hover:bg-theme-accent dark:hover:text-white transition-colors flex justify-center items-center font-sans font-medium text-[15px] disabled:opacity-50"
        >
          {briefingLoading ? 'Generating...' : 'Generate Shift Briefing'}
        </button>
        {briefing && (
          <div className="mt-4 p-5 bg-theme-alert-amber/5 border border-theme-alert-amber/20 rounded-std text-[15px] text-theme-text-primary dark:text-theme-light font-sans" aria-live="polite">
            <h3 className="font-sans text-xs font-semibold text-theme-alert-amber mb-2 uppercase tracking-wide">AI Briefing</h3>
            <p className="leading-relaxed">{briefing}</p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {feed.map(item => (
          <div key={item.id} className="p-4 bg-theme-light dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-std flex items-start space-x-4">
            <div className="mt-0.5">
              {item.type === 'alert' && <AlertTriangle size={18} className="text-theme-alert-red" />}
              {item.type === 'resolved' && <CheckCircle size={18} className="text-theme-alert-green" />}
              {item.type === 'info' && <Info size={18} className="text-theme-alert-amber" />}
            </div>
            <div className="flex-1">
              <p className="font-sans text-[15px] text-theme-text-primary dark:text-theme-light font-medium">{item.message}</p>
              <p className="font-sans text-xs text-theme-text-secondary mt-1.5 font-medium">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
