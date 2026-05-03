import { render, screen } from '@testing-library/react'
import { GeographicCoverage } from './geographic-coverage'
import { expect, test, vi } from 'vitest'
import React from 'react'

interface ImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: ImageProps) => <img {...props} alt={props.alt} />
}))

test('GeographicCoverage renders map and header', () => {
  render(<GeographicCoverage />)
  expect(screen.getByText('Geographic Coverage')).toBeInTheDocument()
  expect(screen.getByText('94.2% Counted')).toBeInTheDocument()
  expect(screen.getByAltText(/geographic heatmap/i)).toBeInTheDocument()
})

test('GeographicCoverage zoom buttons have labels', () => {
  render(<GeographicCoverage />)
  expect(screen.getByLabelText('Zoom in map')).toBeInTheDocument()
  expect(screen.getByLabelText('Zoom out map')).toBeInTheDocument()
})

test('GeographicCoverage has decorative elements', () => {
  const { container } = render(<GeographicCoverage />)
  // Check for pulsing divs (decorative)
  const pulsingElements = container.querySelectorAll('.animate-pulse')
  expect(pulsingElements.length).toBeGreaterThan(0)
})
