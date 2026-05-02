import { render, screen } from '@testing-library/react'
import NotificationsPage from './page'
import { expect, test, vi } from 'vitest'

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  onSnapshot: vi.fn((q, cb) => {
    cb({
      empty: false,
      docs: [
        { id: '10', data: () => ({ title: 'Mock Alert', message: 'Mock Message', type: 'alert', time: '1m ago' }) }
      ]
    })
    return vi.fn()
  }), // returns unsubscribe
  getFirestore: vi.fn(),
}))

test('renders notifications page with mock data', () => {
  render(<NotificationsPage />)
  expect(screen.getByText('Live Election Alerts')).toBeInTheDocument()
  expect(screen.getByText('Mock Alert')).toBeInTheDocument()
  expect(screen.getByText('Mock Message')).toBeInTheDocument()
})

test('displays live monitoring status', () => {
  render(<NotificationsPage />)
  expect(screen.getByLabelText(/Live Monitoring Active/i)).toBeInTheDocument()
})
