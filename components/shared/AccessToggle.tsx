"use client"

import { useAccessibility } from './AccessibilityContext'
import { Type, Moon, Sun, Accessibility } from 'lucide-react'

export function AccessToggle() {
  const { highContrast, largeText, toggleHighContrast, toggleLargeText } = useAccessibility()

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={toggleLargeText}
        className={`p-2 rounded-md border ${largeText ? 'bg-blue-600 text-white' : 'bg-white text-neutral-600'} hover:opacity-80 transition-opacity`}
        aria-label="Toggle Large Text"
        title="Toggle Large Text"
      >
        <Type size={20} />
      </button>
      <button 
        onClick={toggleHighContrast}
        className={`p-2 rounded-md border ${highContrast ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600'} hover:opacity-80 transition-opacity`}
        aria-label="Toggle High Contrast"
        title="Toggle High Contrast"
      >
        {highContrast ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <button
        onClick={() => alert("Mobility Assistance Requested. Staff dispatched to your location.")}
        className="p-2 rounded-md border bg-red-50 text-red-600 border-red-200 hover:bg-red-100 transition-colors"
        aria-label="Request Mobility Assistance"
        title="Request Mobility Assistance"
      >
        <Accessibility size={20} />
      </button>
    </div>
  )
}
