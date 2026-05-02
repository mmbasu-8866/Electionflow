import { render, screen } from '@testing-library/react'
import TimelinePage from './page'
import { expect, test } from 'vitest'

test('renders timeline page and events', () => {
  render(<TimelinePage />)
  expect(screen.getByText('Election Cycle Timeline')).toBeInTheDocument()
  
  // Check for specific events
  expect(screen.getByText('Voter Registration Opens')).toBeInTheDocument()
  expect(screen.getByText('General Election Day')).toBeInTheDocument()
})

test('renders calendar sync card', () => {
  render(<TimelinePage />)
  expect(screen.getByText('Sync to Calendar')).toBeInTheDocument()
})
