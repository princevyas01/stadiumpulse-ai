"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AccessibilityContextType {
  highContrast: boolean
  largeText: boolean
  toggleHighContrast: () => void
  toggleLargeText: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)

  // Avoid hydration mismatch by waiting for mount
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const toggleHighContrast = () => setHighContrast(prev => !prev)
  const toggleLargeText = () => setLargeText(prev => !prev)

  return (
    <AccessibilityContext.Provider value={{ highContrast, largeText, toggleHighContrast, toggleLargeText }}>
      <div className={`${highContrast ? 'high-contrast' : ''} ${largeText ? 'large-text' : ''}`}>
        {mounted ? children : null}
      </div>
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
