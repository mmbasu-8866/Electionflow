/* eslint-disable @next/next/no-img-element */
import { render, screen } from '@testing-library/react'
import { GeographicCoverage } from './geographic-coverage'
import { expect, test, vi } from 'vitest'

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} />
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
