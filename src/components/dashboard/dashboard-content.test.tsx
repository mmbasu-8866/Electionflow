import { render, screen } from '@testing-library/react'
import { DashboardContent } from './dashboard-content'
import { expect, test, vi } from 'vitest'

// Mock subcomponents
vi.mock('@/components/assistant/voter-bot-chat-widget', () => ({
  VoterBotChatWidget: () => <div data-testid="voter-bot-chat-widget" />
}))

// Mock recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  RadialBarChart: ({ children }: any) => <div>{children}</div>,
  RadialBar: () => <div />,
  PieChart: ({ children }: any) => <div>{children}</div>,
  Pie: () => <div />,
  BarChart: ({ children }: any) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  Tooltip: () => <div />,
  Cell: () => <div />,
  Label: () => <div />,
}))

test('DashboardContent renders correctly', () => {
  render(<DashboardContent />)
  expect(screen.getByText('Votes Received')).toBeInTheDocument()
  expect(screen.getByText('Top Party')).toBeInTheDocument()
  expect(screen.getByText('Top Candidates')).toBeInTheDocument()
  expect(screen.getByTestId('voter-bot-chat-widget')).toBeInTheDocument()
})
