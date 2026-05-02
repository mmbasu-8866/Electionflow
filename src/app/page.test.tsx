import { render, screen } from '@testing-library/react'
import Home from './page'
import { expect, test, vi } from 'vitest'

// Mock DashboardContent to avoid deep rendering issues in simple page test
vi.mock('@/components/dashboard/dashboard-content', () => ({
  DashboardContent: () => <div data-testid="dashboard-content">Dashboard Content</div>
}))

test('Home page renders correctly', () => {
  render(<Home />)
  expect(screen.getByText('Electionflow Assistant')).toBeInTheDocument()
  expect(screen.getByTestId('dashboard-content')).toBeInTheDocument()
})
