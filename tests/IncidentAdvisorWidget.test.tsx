import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { IncidentAdvisorWidget } from '../components/ops/IncidentAdvisorWidget'

global.fetch = vi.fn()

describe('IncidentAdvisorWidget', () => {
  it('renders input and button', () => {
    render(<IncidentAdvisorWidget />)
    expect(screen.getByPlaceholderText(/e.g. Unattended bag/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('submits form and displays checklist', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        checklist: ['Step 1', 'Step 2'], 
        escalation: 'High Priority' 
      })
    } as Response)

    render(<IncidentAdvisorWidget />)
    const input = screen.getByPlaceholderText(/e.g. Unattended bag/i)
    fireEvent.change(input, { target: { value: 'Spill at Section 102' } })
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('Step 1')).toBeInTheDocument()
      expect(screen.getByText('High Priority')).toBeInTheDocument()
    })
  })
})
