import { render, screen, fireEvent } from '@testing-library/react'
import GuidesPage from './page'
import { expect, test } from 'vitest'

test('renders guides page and tabs', () => {
  render(<GuidesPage />)
  expect(screen.getByText('Step-by-Step Election Instructions')).toBeInTheDocument()
  
  // Check that both tabs are present
  expect(screen.getByRole('tab', { name: /registration/i })).toBeInTheDocument()
  expect(screen.getByRole('tab', { name: /casting ballot/i })).toBeInTheDocument()
})

test('navigates through registration steps', () => {
  render(<GuidesPage />)
  const nextButton = screen.getByRole('button', { name: /next step/i })
  fireEvent.click(nextButton)
  // Use getAllByText and check the one in the card (usually larger text or in a heading)
  const elements = screen.getAllByText('Gather Documents')
  expect(elements.length).toBeGreaterThan(0)
})
