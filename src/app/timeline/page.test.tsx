import { render, screen, fireEvent } from '@testing-library/react'
import TimelinePage from './page'
import { expect, test } from 'vitest'

test('renders timeline page and filters events', () => {
  render(<TimelinePage />)
  expect(screen.getByText('Election Cycle Tracker')).toBeInTheDocument()
  
  const filterInput = screen.getByPlaceholderText(/filter by keyword/i)
  fireEvent.change(filterInput, { target: { value: 'Deadline' } })
  
  expect(screen.getByText('Registration Deadline')).toBeInTheDocument()
  expect(screen.queryByText('Early Voting Starts')).not.toBeInTheDocument()
})
