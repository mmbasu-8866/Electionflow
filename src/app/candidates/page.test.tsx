import { render, screen } from '@testing-library/react'
import CandidatesPage from './page'
import { expect, test } from 'vitest'

test('renders candidates page', () => {
  render(<CandidatesPage />)
  expect(screen.getByText('Vote Recapitulation - Candidates')).toBeInTheDocument()
  expect(screen.getByText('Ir. Hj. Rosinta Widowati')).toBeInTheDocument()
})
