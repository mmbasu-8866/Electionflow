/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react'
import { DashboardContent } from './dashboard-content'
import { expect, test, vi } from 'vitest'
import React, { ReactNode } from 'react'

// Correct mock for next/dynamic
vi.mock('next/dynamic', () => ({
  default: (loader: () => Promise<any>) => {
    return function DynamicComponent(props: any) {
      const [Component, setComponent] = React.useState<any>(null);
      React.useEffect(() => {
        loader().then((mod: any) => {
          const Comp = mod.VoteStats || mod.PartyStats || mod.VoterProfile || mod.VoterBotChatWidget || mod;
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
  expect(screen.getByText('Top Candidates')).toBeInTheDocument()
  
  // Wait for dynamic components
  await waitFor(() => {
    expect(screen.getByText('Votes Received')).toBeInTheDocument()
    expect(screen.getByText('Top Party')).toBeInTheDocument()
    expect(screen.getByText("Voter's Profile")).toBeInTheDocument()
  }, { timeout: 5000 })
})
