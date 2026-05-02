import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './input'
import { expect, test, vi } from 'vitest'

test('Input renders correctly', () => {
  render(<Input placeholder="Enter name" />)
  expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument()
})

test('Input handles change', () => {
  const onChange = vi.fn()
  render(<Input onChange={onChange} />)
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'test' } })
  expect(onChange).toHaveBeenCalled()
})
