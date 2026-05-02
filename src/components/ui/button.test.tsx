import { render, screen } from '@testing-library/react'
import { Button } from './button'
import { expect, test } from 'vitest'

test('Button renders correctly', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
})

test('Button applies variant classes', () => {
  render(<Button variant="destructive">Delete</Button>)
  const button = screen.getByRole('button', { name: /delete/i })
  expect(button).toHaveClass('bg-destructive')
})
