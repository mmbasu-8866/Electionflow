import { render, screen } from '@testing-library/react'
import GuidesPage from './page'
import { expect, test } from 'vitest'

test('renders guides page and instructions', () => {
  render(<GuidesPage />)
  expect(screen.getByText('How to Vote: A Step-by-Step Guide')).toBeInTheDocument()
  
  // Check that accordion items are present
  expect(screen.getByText('Voter Registration')).toBeInTheDocument()
  expect(screen.getByText('Research Candidates')).toBeInTheDocument()
  expect(screen.getByText('Locate Your Polling Place')).toBeInTheDocument()
  expect(screen.getByText('Cast Your Ballot')).toBeInTheDocument()
})

test('renders additional help card', () => {
  render(<GuidesPage />)
  expect(screen.getByText('Still have questions?')).toBeInTheDocument()
})
