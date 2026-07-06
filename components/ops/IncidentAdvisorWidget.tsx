"use client"

import { useState } from 'react'
import { AlertOctagon, Send, Loader2 } from 'lucide-react'

export function IncidentAdvisorWidget() {
  const [incident, setIncident] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<{ checklist: string[], escalation: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!incident.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incident })
      })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setResponse(data)
    } catch {
      setResponse({
        checklist: ["Assess immediate danger", "Contact dispatch"],
        escalation: "High - Unable to reach AI Advisor. Fallback to manual protocols."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-pitch-green border-2 border-concrete-gray/30 p-6 shadow-2xl">
      <div className="flex items-center space-x-3 mb-6 border-b-2 border-concrete-gray/30 pb-4">
        <div className="h-12 w-12 bg-signal-red text-chalk-white flex items-center justify-center border-2 border-pitch-green">
          <AlertOctagon size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-display uppercase tracking-wider text-floodlight-white">Incident Advisor</h2>
          <p className="font-mono text-xs uppercase text-signal-amber">Immediate SOP Generator</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={incident}
          onChange={(e) => setIncident(e.target.value)}
          placeholder="LOG INCIDENT (e.g. UNATTENDED BAG SEC 112)..."
          className="w-full bg-black border-2 border-concrete-gray/50 p-4 text-floodlight-white font-mono uppercase placeholder:text-concrete-gray/50 focus:outline-none focus:border-signal-red focus:ring-0 resize-none h-24 mb-3"
          aria-label="Incident Description"
        />
        <button
          type="submit"
          disabled={loading || !incident.trim()}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-signal-red text-chalk-white hover:bg-signal-red/80 transition-colors disabled:opacity-50 font-display text-xl uppercase tracking-wider"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          <span>Generate Action Plan</span>
        </button>
      </form>

      {response && (
        <div className="bg-black p-4 border-2 border-concrete-gray/30" aria-live="polite">
          <div className="mb-4">
            <h3 className="font-mono text-sm font-bold text-signal-amber mb-3 uppercase tracking-widest">Action Checklist</h3>
            <ul className="space-y-3">
              {response.checklist.map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="h-5 w-5 bg-pitch-green border-2 border-signal-amber flex-shrink-0 mr-3 mt-0.5"></div>
                  <span className="font-sans text-floodlight-white font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 bg-signal-red/10 border-l-4 border-signal-red">
             <h3 className="font-mono text-xs font-bold text-signal-red uppercase tracking-widest mb-1">Escalation Rec</h3>
             <p className="font-sans text-floodlight-white font-bold">{response.escalation}</p>
          </div>
        </div>
      )}
    </div>
  )
}
