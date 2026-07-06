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
    <div className="bg-pitch-green border-2 border-concrete-gray/30 p-6 h-full flex flex-col shadow-2xl">
      <div className="flex items-center justify-between mb-6 border-b-2 border-concrete-gray/30 pb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-signal-amber text-pitch-green flex items-center justify-center border-2 border-pitch-green">
            <RadioReceiver size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-display uppercase tracking-wider text-floodlight-white">Live Feed</h2>
            <p className="font-mono text-xs uppercase text-concrete-gray">Operational Intelligence</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={getBriefing}
          disabled={briefingLoading}
          className="w-full py-3 bg-black hover:bg-black/70 text-signal-amber font-display text-xl uppercase tracking-wider border-2 border-concrete-gray/50 transition-colors flex justify-center items-center"
        >
          {briefingLoading ? 'GENERATING...' : 'GENERATE SHIFT BRIEFING'}
        </button>
        {briefing && (
          <div className="mt-3 p-3 bg-signal-amber/10 border-l-4 border-signal-amber text-sm text-floodlight-white font-sans font-bold" aria-live="polite">
            <h3 className="font-mono text-signal-amber mb-1 uppercase tracking-widest text-xs">AI Briefing</h3>
            <p>{briefing}</p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {feed.map(item => (
          <div key={item.id} className="p-3 bg-black border-2 border-concrete-gray/30 flex items-start space-x-3">
            <div className="mt-0.5">
              {item.type === 'alert' && <AlertTriangle size={16} className="text-signal-red" />}
              {item.type === 'resolved' && <CheckCircle size={16} className="text-concrete-gray" />}
              {item.type === 'info' && <Info size={16} className="text-signal-amber" />}
            </div>
            <div className="flex-1">
              <p className="font-sans text-floodlight-white font-medium text-sm">{item.message}</p>
              <p className="font-mono text-xs text-concrete-gray mt-1 font-bold">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
