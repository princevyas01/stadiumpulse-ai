"use client"

import { useAccessibility } from './AccessibilityContext'
import { Type, Moon, Sun, Accessibility } from 'lucide-react'

export function AccessToggle() {
  const { highContrast, largeText, toggleHighContrast, toggleLargeText } = useAccessibility()

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={toggleLargeText}
        className={`p-2 rounded-[8px] border transition-colors ${largeText ? 'bg-theme-accent text-white border-theme-accent' : 'bg-transparent text-theme-text-secondary border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 hover:text-theme-text-primary dark:hover:text-theme-light'}`}
        aria-label="Toggle Large Text"
        title="Toggle Large Text"
      >
        <Type size={18} />
      </button>
      <button 
        onClick={toggleHighContrast}
        className={`p-2 rounded-[8px] border transition-colors ${highContrast ? 'bg-theme-accent text-white border-theme-accent' : 'bg-transparent text-theme-text-secondary border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 hover:text-theme-text-primary dark:hover:text-theme-light'}`}
        aria-label="Toggle High Contrast"
        title="Toggle High Contrast"
      >
        {highContrast ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button
        onClick={() => alert("Mobility Assistance Requested. Staff dispatched to your location.")}
        className="p-2 rounded-[8px] border bg-theme-alert-red/10 text-theme-alert-red border-theme-alert-red/20 hover:bg-theme-alert-red hover:text-white transition-colors"
        aria-label="Request Mobility Assistance"
        title="Request Mobility Assistance"
      >
        <Accessibility size={18} />
      </button>
    </div>
  )
}
