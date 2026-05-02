import { render, screen } from '@testing-library/react'
import RegionPage from './page'
import { expect, test, vi } from 'vitest'

// Mock the GoogleMap component to avoid js-api-loader issues in vitest
vi.mock('@/components/ui/google-map', () => ({
  GoogleMap: ({ className }: { className?: string }) => <div data-testid="mock-google-map" className={className} />
}))

test('renders region page', () => {
  render(<RegionPage />)
  expect(screen.getByText('Region & Voting Centers')).toBeInTheDocument()
  expect(screen.getByText('Central High School Gym')).toBeInTheDocument()
  expect(screen.getByTestId('mock-google-map')).toBeInTheDocument()
})
