import { render, screen, fireEvent } from '@testing-library/react'
import GlossaryPage from './page'
import { expect, test } from 'vitest'

test('renders glossary page and searches terms', () => {
  render(<GlossaryPage />)
  expect(screen.getByText('Terminology & Concepts')).toBeInTheDocument()
  
  const searchInput = screen.getByPlaceholderText(/search terms/i)
  fireEvent.change(searchInput, { target: { value: 'Gerrymander' } })
  
  expect(screen.getByText('Gerrymander')).toBeInTheDocument()
  expect(screen.queryByText('Absentee Ballot')).not.toBeInTheDocument()
})
