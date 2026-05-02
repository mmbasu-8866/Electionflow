import { render, screen } from '@testing-library/react'
import PartyCandidatesPage from './page'
import { expect, test } from 'vitest'

test('renders party candidates page', () => {
  render(<PartyCandidatesPage />)
  expect(screen.getByText('Vote Recapitulation - Parties')).toBeInTheDocument()
  expect(screen.getByText('PDI-P')).toBeInTheDocument()
})
