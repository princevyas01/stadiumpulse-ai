"use client"

import { useAccessibility } from './AccessibilityContext'
import { Type, Moon, Sun, Accessibility } from 'lucide-react'

export function AccessToggle() {
  const { highContrast, largeText, toggleHighContrast, toggleLargeText } = useAccessibility()

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={toggleLargeText}
        className={`p-2 border-2 ${largeText ? 'bg-signal-amber text-pitch-green border-signal-amber' : 'bg-chalk-white dark:bg-black text-concrete-gray dark:text-floodlight-white border-concrete-gray'} hover:bg-signal-amber hover:text-pitch-green transition-colors`}
        aria-label="Toggle Large Text"
        title="Toggle Large Text"
      >
        <Type size={20} />
      </button>
      <button 
        onClick={toggleHighContrast}
        className={`p-2 border-2 ${highContrast ? 'bg-pitch-green text-signal-amber border-signal-amber' : 'bg-chalk-white dark:bg-black text-concrete-gray dark:text-floodlight-white border-concrete-gray'} hover:bg-signal-amber hover:text-pitch-green transition-colors`}
        aria-label="Toggle High Contrast"
        title="Toggle High Contrast"
      >
        {highContrast ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <button
        onClick={() => alert("Mobility Assistance Requested. Staff dispatched to your location.")}
        className="p-2 border-2 bg-signal-red/10 text-signal-red border-signal-red hover:bg-signal-red hover:text-chalk-white transition-colors"
        aria-label="Request Mobility Assistance"
        title="Request Mobility Assistance"
      >
        <Accessibility size={20} />
      </button>
    </div>
  )
}
