import { render, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import Home from '../app/page'
import FanPortal from '../app/fan/page'
import OpsPortal from '../app/ops/page'
import OrganizerPage from '../app/organizer/page'

expect.extend(toHaveNoViolations)

// Mock fetch for relative URLs
global.fetch = vi.fn().mockResolvedValue({
  json: async () => ({
    stats: {
      totalAttendanceEstimate: 45000,
      averageCrowdDensityPercent: 62,
      activeIncidentCount: 2,
      sustainability: { wasteDivertedPercent: 71, energyUsageKwh: 1200, waterUsageLiters: 8000 },
      gateShuttleGap: [{ gateId: 'Gate A', projectedDemand: 400, currentCapacity: 350, gapPercent: 12 }],
    },
    briefing: 'Attendance is steady, no major incidents.'
  })
}) as any;

// Mock next/link to prevent Link component state updates
vi.mock('next/link', () => {
  return {
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
      return <a href={href}>{children}</a>
    }
  }
})

// Mock next/dynamic to avoid dynamic loading state updates
vi.mock('next/dynamic', () => {
  return {
    default: () => {
      return function DummyDynamic() {
        return <div data-testid="dynamic-mock">Dynamic Widget</div>
      }
    }
  }
})

describe('Accessibility tests', () => {
  it('Home page should have no accessibility violations', async () => {
    let container: HTMLElement
    await act(async () => {
      const result = render(<Home />)
      container = result.container
    })
    const results = await axe(container!)
    expect(results).toHaveNoViolations()
  })

  it('Fan Portal should have no accessibility violations', async () => {
    let container: HTMLElement
    await act(async () => {
      const result = render(<FanPortal />)
      container = result.container
    })
    const results = await axe(container!)
    expect(results).toHaveNoViolations()
  })

  it('Ops Portal should have no accessibility violations', async () => {
    let container: HTMLElement
    await act(async () => {
      const result = render(<OpsPortal />)
      container = result.container
    })
    const results = await axe(container!)
    expect(results).toHaveNoViolations()
  })

  it('Organizer view should have no accessibility violations', async () => {
    let container: HTMLElement
    await act(async () => {
      const result = render(<OrganizerPage />)
      container = result.container
    })
    const results = await axe(container!)
    expect(results).toHaveNoViolations()
  })
})
