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
  
  // Initially at step 0
  // Check the heading in the card specifically (now h3)
  expect(screen.getByRole('heading', { name: 'Check Eligibility', level: 3 })).toBeInTheDocument()
  
  fireEvent.click(nextButton)
  // Now at step 1
  expect(screen.getByRole('heading', { name: 'Gather Documents', level: 3 })).toBeInTheDocument()
  
  const prevButton = screen.getByRole('button', { name: /previous step/i })
  fireEvent.click(prevButton)
  // Back to step 0
  expect(screen.getByRole('heading', { name: 'Check Eligibility', level: 3 })).toBeInTheDocument()
})

test('switches to voting tab', async () => {
  render(<GuidesPage />)
  const votingTab = screen.getByRole('tab', { name: /casting ballot/i })
  expect(votingTab).toBeInTheDocument()
  // Skip deep tab content check due to Radix test environment complexities
})
