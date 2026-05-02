import { render, screen, fireEvent } from '@testing-library/react'
import GlossaryPage from './page'
import { expect, test } from 'vitest'

test('renders glossary page and searches terms', () => {
  render(<GlossaryPage />)
  expect(screen.getByText('Terminology & Concepts')).toBeInTheDocument()
  
  const searchInput = screen.getByPlaceholderText(/search terms/i)
  
  // Search by term
  fireEvent.change(searchInput, { target: { value: 'Gerrymander' } })
  expect(screen.getByText('Gerrymander')).toBeInTheDocument()
  expect(screen.queryByText('Absentee Ballot')).not.toBeInTheDocument()

  // Search by definition
  fireEvent.change(searchInput, { target: { value: 'current holder' } })
  expect(screen.getByText('Incumbent')).toBeInTheDocument()
})

test('shows empty state when no terms match', () => {
  render(<GlossaryPage />)
  const searchInput = screen.getByPlaceholderText(/search terms/i)
  fireEvent.change(searchInput, { target: { value: 'nonexistentterm' } })
  
  expect(screen.getByText('No terms found')).toBeInTheDocument()
})
