import { render, screen } from '@testing-library/react'
import { Label } from './label'
import { expect, test } from 'vitest'

test('Label renders correctly', () => {
  render(<Label>Username</Label>)
  expect(screen.getByText('Username')).toBeInTheDocument()
})
