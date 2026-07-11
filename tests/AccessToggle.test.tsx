import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AccessToggle } from '../components/shared/AccessToggle'
import { AccessibilityProvider } from '../components/shared/AccessibilityContext'

describe('AccessToggle', () => {
  it('renders accessibility buttons', () => {
    render(
      <AccessibilityProvider>
        <AccessToggle />
      </AccessibilityProvider>
    )
    expect(screen.getByRole('button', { name: /Toggle Large Text/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Toggle High Contrast/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Request Mobility Assistance/i })).toBeInTheDocument()
  })

  it('shows an accessible toast on mobility assistance request', () => {
    render(
      <AccessibilityProvider>
        <AccessToggle />
      </AccessibilityProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: /Request Mobility Assistance/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/Mobility assistance requested/i)
  })
})
