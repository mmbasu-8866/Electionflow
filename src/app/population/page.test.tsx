import { render, screen } from '@testing-library/react'
import PopulationPage from './page'
import { expect, test, vi } from 'vitest'
import { ReactNode } from 'react'

interface LabelProps {
  viewBox?: {
    cx: number
    cy: number
  }
}

// Mock recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  BarChart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  Cell: () => <div />,
  PieChart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Pie: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Label: (props: { content?: (props: LabelProps) => ReactNode }) => {
    if (typeof props.content === 'function') {
      return <div>{props.content({ viewBox: { cx: 100, cy: 100 } })}</div>
    }
    return <div />
  },
}))

test('renders population page and data', () => {
  render(<PopulationPage />)
  expect(screen.getByText('Population & Voter Data')).toBeInTheDocument()
  expect(screen.getByText('Total Population')).toBeInTheDocument()
  expect(screen.getByText('5.8M')).toBeInTheDocument()
  
  // Check stat cards
  expect(screen.getByText('Registered Voters')).toBeInTheDocument()
  expect(screen.getAllByText('4.2M').length).toBeGreaterThan(0)
  
  // Check charts
  expect(screen.getByText('District Participation')).toBeInTheDocument()
  expect(screen.getByText('Demographic Breakdown')).toBeInTheDocument()
  
  // Check mock label output
  expect(screen.getByText('Active Voters')).toBeInTheDocument()
})
