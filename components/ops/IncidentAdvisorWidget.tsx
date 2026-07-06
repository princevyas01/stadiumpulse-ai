"use client"

import { useState } from 'react'
import { AlertOctagon, Send, Loader2 } from 'lucide-react'

/**
 * IncidentAdvisorWidget
 */
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
    <div className="bg-white dark:bg-theme-dark rounded-std border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-soft">
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-12 w-12 bg-theme-alert-red/10 text-theme-alert-red flex items-center justify-center rounded-std border border-theme-alert-red/20">
          <AlertOctagon size={24} />
        </div>
        <div>
          <h2 className="text-xl font-sans font-semibold text-theme-text-primary dark:text-theme-light">Incident Advisor</h2>
          <p className="font-sans text-sm text-theme-text-secondary">Immediate SOP Generator</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={incident}
          onChange={(e) => setIncident(e.target.value)}
          placeholder="e.g. Unattended bag at Sec 112..."
          className="w-full bg-theme-light dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 rounded-std text-theme-text-primary dark:text-theme-light font-sans text-[15px] placeholder:text-theme-text-secondary focus:outline-none focus:border-theme-alert-red focus:ring-1 focus:ring-theme-alert-red resize-none h-24 mb-4 transition-colors"
          aria-label="Incident Description"
        />
        <button
          type="submit"
          disabled={loading || !incident.trim()}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-theme-alert-red text-white rounded-std hover:bg-theme-alert-red/90 transition-colors disabled:opacity-50 font-sans font-medium text-[15px]"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          <span>Generate Action Plan</span>
        </button>
      </form>

      {response && (
        <div className="bg-theme-light dark:bg-white/5 p-6 rounded-std border border-black/5 dark:border-white/5" aria-live="polite">
          <div className="mb-6">
            <h3 className="font-sans text-[15px] font-semibold text-theme-text-primary dark:text-theme-light mb-4">Action Checklist</h3>
            <ul className="space-y-3">
              {response.checklist.map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="h-4 w-4 rounded-sm border border-theme-text-secondary flex-shrink-0 mr-3 mt-1"></div>
                  <span className="font-sans text-[15px] text-theme-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-theme-alert-red/5 border-l-2 border-theme-alert-red rounded-r-std">
             <h3 className="font-sans text-xs font-semibold text-theme-alert-red uppercase tracking-wide mb-1">Escalation Rec</h3>
             <p className="font-sans text-[15px] text-theme-text-primary dark:text-theme-light font-medium">{response.escalation}</p>
          </div>
        </div>
      )}
    </div>
  )
}
