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
    <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-10 w-10 bg-rose-900/30 text-rose-400 rounded-full flex items-center justify-center">
          <AlertOctagon size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">AI Incident Advisor</h2>
          <p className="text-sm text-slate-400">Describe the situation for immediate SOPs</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={incident}
          onChange={(e) => setIncident(e.target.value)}
          placeholder="e.g. Unattended bag found near Section 112, row G..."
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none h-24 mb-3"
          aria-label="Incident Description"
        />
        <button
          type="submit"
          disabled={loading || !incident.trim()}
          className="w-full flex items-center justify-center space-x-2 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          <span>Get Action Plan</span>
        </button>
      </form>

      {response && (
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800" aria-live="polite">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-indigo-400 mb-2 uppercase tracking-wider">Action Checklist</h3>
            <ul className="space-y-2">
              {response.checklist.map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="h-5 w-5 rounded bg-slate-800 border border-slate-600 flex-shrink-0 mr-3 mt-0.5"></div>
                  <span className="text-sm text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-lg">
             <h3 className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">Escalation Recommendation</h3>
             <p className="text-sm text-rose-200 font-medium">{response.escalation}</p>
          </div>
        </div>
      )}
    </div>
  )
}
