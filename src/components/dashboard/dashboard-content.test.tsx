import { render, screen, waitFor } from '@testing-library/react'
import { DashboardContent } from './dashboard-content'
import { expect, test, vi } from 'vitest'
import React, { ReactNode, ComponentType } from 'react'

// Correct mock for next/dynamic
vi.mock('next/dynamic', () => ({
  default: (loader: () => Promise<ComponentType | { default: ComponentType }>) => {
    return function DynamicComponent(props: Record<string, unknown>) {
      const [Component, setComponent] = React.useState<ComponentType | null>(null);
      React.useEffect(() => {
        loader().then((mod) => {
          const Comp = (mod as { default?: ComponentType }).default || (mod as ComponentType);
          setComponent(() => Comp);
        });
      }, []);
      if (!Component) return <div data-testid="loading" />;
      return <Component {...props} />;
    };
  }
}))

// Mock recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  RadialBarChart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  RadialBar: () => <div />,
  PieChart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Pie: () => <div />,
  BarChart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  Tooltip: () => <div />,
  Cell: () => <div />,
  Label: () => <div />,
}))

// Mock subcomponents
vi.mock('@/components/assistant/voter-bot-chat-widget', () => ({
  VoterBotChatWidget: () => <div data-testid="assistant" />
}))

test('DashboardContent renders and loads dynamic components', async () => {
  render(<DashboardContent />)
  
  // Static content
  expect(screen.getByText('Dashboard Overview and Analytics')).toBeInTheDocument()
  
  // Wait for dynamic components
  await waitFor(() => {
    // These strings are from subcomponents like VoteStats, PartyStats, VoterProfile
    expect(screen.getByText('Votes Received')).toBeInTheDocument()
    expect(screen.getByText('Top Party')).toBeInTheDocument()
    expect(screen.getByText("Voter's Profile")).toBeInTheDocument()
  }, { timeout: 5000 })
})
