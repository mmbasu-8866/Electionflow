import { expect, test } from 'vitest'
import { cn } from './utils'

test('cn combines class names', () => {
  expect(cn('a', 'b')).toBe('a b')
  expect(cn('a', { b: true, c: false })).toBe('a b')
  expect(cn('a', ['b', 'c'])).toBe('a b c')
})

test('cn merges tailwind classes', () => {
  expect(cn('px-2 py-2', 'p-4')).toBe('p-4')
})
