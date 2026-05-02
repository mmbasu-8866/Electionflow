import { render, screen } from '@testing-library/react'
import PopulationPage from './page'
import { expect, test, vi } from 'vitest'

// Mock recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: () => <div />,
  BarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  Cell: () => <div />,
  Label: () => <div />,
}))

test('renders population page', async () => {
  render(<PopulationPage />)
  expect(screen.getByText('Population & Voter Data')).toBeInTheDocument()
  expect(screen.getByText('Total Population')).toBeInTheDocument()
  expect(screen.getByText('5.8M')).toBeInTheDocument()
  // Wait for dynamic charts if needed, although they are mocked
})
