"use client"

import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

interface ToastProps {
  message: string
  onDismiss: () => void
  durationMs?: number
}

export function Toast({ message, onDismiss, durationMs = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, durationMs)
    return () => clearTimeout(timer)
  }, [onDismiss, durationMs])

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 bg-theme-text-primary dark:bg-theme-light text-white dark:text-theme-dark rounded-std shadow-soft px-5 py-4 flex items-center space-x-3 max-w-sm"
    >
      <CheckCircle size={20} className="text-theme-alert-green flex-shrink-0" />
      <p className="font-sans text-[14px] leading-snug">{message}</p>
    </div>
  )
}
