import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import Home from '../app/page'
import FanPortal from '../app/fan/page'
import OpsPortal from '../app/ops/page'

expect.extend(toHaveNoViolations)

describe('Accessibility tests', () => {
  it('Home page should have no accessibility violations', async () => {
    const { container } = render(<Home />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Fan Portal should have no accessibility violations', async () => {
    const { container } = render(<FanPortal />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Ops Portal should have no accessibility violations', async () => {
    const { container } = render(<OpsPortal />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
