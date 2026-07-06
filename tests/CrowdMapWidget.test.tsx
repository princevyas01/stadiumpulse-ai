import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CrowdMapWidget } from '../components/fan/CrowdMapWidget'

describe('CrowdMapWidget', () => {
  it('renders title and map elements', () => {
    render(<CrowdMapWidget />)
    expect(screen.getByText('Live Crowd Density')).toBeInTheDocument()
    
    // Check if the SVG map is present
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
