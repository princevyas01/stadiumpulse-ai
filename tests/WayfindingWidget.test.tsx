import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { WayfindingWidget } from '../components/fan/WayfindingWidget'

global.fetch = vi.fn()

describe('WayfindingWidget', () => {
  it('renders input and button', () => {
    render(<WayfindingWidget />)
    expect(screen.getByPlaceholderText(/How do I get to/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('submits form and displays directions', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ directions: 'Go straight and turn left at the restrooms.' })
    } as Response)

    render(<WayfindingWidget />)
    const input = screen.getByPlaceholderText(/How do I get to/i)
    fireEvent.change(input, { target: { value: 'Gate C' } })
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('Go straight and turn left at the restrooms.')).toBeInTheDocument()
    })
  })
})
