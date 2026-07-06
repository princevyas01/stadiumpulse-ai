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
    <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-cyan-900/30 text-cyan-400 rounded-full flex items-center justify-center">
            <RadioReceiver size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Live Feed</h2>
            <p className="text-sm text-slate-400">Operational Intelligence</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={getBriefing}
          disabled={briefingLoading}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-medium rounded-lg border border-slate-600 transition-colors text-sm flex justify-center items-center"
        >
          {briefingLoading ? 'Generating AI Briefing...' : 'Generate Shift Briefing'}
        </button>
        {briefing && (
          <div className="mt-3 p-3 bg-cyan-950/30 border border-cyan-900/50 rounded-lg text-sm text-cyan-100" aria-live="polite">
            <h3 className="font-bold text-cyan-400 mb-1">AI Briefing</h3>
            <p>{briefing}</p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {feed.map(item => (
          <div key={item.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start space-x-3">
            <div className="mt-0.5">
              {item.type === 'alert' && <AlertTriangle size={16} className="text-amber-500" />}
              {item.type === 'resolved' && <CheckCircle size={16} className="text-emerald-500" />}
              {item.type === 'info' && <Info size={16} className="text-blue-400" />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-300">{item.message}</p>
              <p className="text-xs text-slate-500 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
