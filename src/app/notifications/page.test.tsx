import { render, screen } from '@testing-library/react'
import NotificationsPage from './page'
import { expect, test, vi } from 'vitest'

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()), // returns unsubscribe
  getFirestore: vi.fn(),
}))

test('renders notifications page', () => {
  render(<NotificationsPage />)
  expect(screen.getByText('Live Election Alerts')).toBeInTheDocument()
  expect(screen.getByText('Karnataka Update')).toBeInTheDocument()
})
