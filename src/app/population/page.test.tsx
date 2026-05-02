import { render, screen } from '@testing-library/react'
import PopulationPage from './page'
import { expect, test, vi } from 'vitest'

// Mock recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  PieChart: ({ children }: any) => <div>{children}</div>,
  Pie: () => <div />,
  BarChart: ({ children }: any) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  Cell: () => <div />,
  Label: () => <div />,
}))

test('renders population page', () => {
  render(<PopulationPage />)
  expect(screen.getByText('Population & Voter Data')).toBeInTheDocument()
  expect(screen.getByText('Total Population')).toBeInTheDocument()
  expect(screen.getByText('5.8M')).toBeInTheDocument()
})
