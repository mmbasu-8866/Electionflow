import { render, screen } from '@testing-library/react'
import PartyCandidatesPage from './page'
import { expect, test } from 'vitest'

test('renders party candidates page', () => {
  render(<PartyCandidatesPage />)
  expect(screen.getByText('Vote Recapitulation - Party')).toBeInTheDocument()
  expect(screen.getByText('03 PDI-P')).toBeInTheDocument()
})
