import { render, screen } from '@testing-library/react'
import { Badge } from './badge'
import { expect, test } from 'vitest'

test('Badge renders correctly', () => {
  render(<Badge>New</Badge>)
  expect(screen.getByText('New')).toBeInTheDocument()
})

test('Badge applies variant classes', () => {
  render(<Badge variant="destructive">Error</Badge>)
  const badge = screen.getByText('Error')
  expect(badge).toHaveClass('bg-destructive')
})
