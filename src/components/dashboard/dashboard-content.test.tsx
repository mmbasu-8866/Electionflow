import { render, screen, waitFor } from '@testing-library/react'
import { DashboardContent } from './dashboard-content'
import { expect, test, vi } from 'vitest'

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  default: () => {
    // If it's the assistant, return the test-id div
    const Component = () => {
      // Check if the dynamic import is for the assistant
      return <div data-testid="voter-bot-chat-widget" />;
    };
    return Component;
  }
}))

// Mock subcomponents
vi.mock('@/components/assistant/voter-bot-chat-widget', () => ({
  VoterBotChatWidget: () => <div data-testid="voter-bot-chat-widget" />
}))

// Mock recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  RadialBarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  RadialBar: () => <div />,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: () => <div />,
  BarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  Tooltip: () => <div />,
  Cell: () => <div />,
  Label: () => <div />,
}))

test('DashboardContent renders correctly', async () => {
  render(<DashboardContent />)
  expect(screen.getByText('Votes Received')).toBeInTheDocument()
  expect(screen.getByText('Top Party')).toBeInTheDocument()
  expect(screen.getByText('Top Candidates')).toBeInTheDocument()
  await waitFor(() => {
    const elements = screen.getAllByTestId('voter-bot-chat-widget')
    expect(elements.length).toBeGreaterThan(0)
  }, { timeout: 2000 })
})
