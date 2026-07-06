"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AccessibilityContextType {
  highContrast: boolean
  largeText: boolean
  toggleHighContrast: () => void
  toggleLargeText: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

/**
 * AccessibilityProvider
 */
export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)

  // Handle high contrast (dark mode) on HTML element
  const toggleHighContrast = () => setHighContrast(prev => !prev)
  const toggleLargeText = () => setLargeText(prev => !prev)

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [highContrast])

  // Handle large text on HTML element
  useEffect(() => {
    if (largeText) {
      document.documentElement.classList.add('large-text')
    } else {
      document.documentElement.classList.remove('large-text')
    }
  }, [largeText])

  return (
    <AccessibilityContext.Provider value={{ highContrast, largeText, toggleHighContrast, toggleLargeText }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

/**
 * useAccessibility
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
