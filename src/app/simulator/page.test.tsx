import { render, screen } from '@testing-library/react'
import SimulatorPage from './page'
import { expect, test, vi, beforeEach, describe } from 'vitest'
import { useAuth } from '@/components/auth-provider'

vi.mock('@/components/auth-provider', () => ({
  useAuth: vi.fn(),
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()), // returns unsubscribe
  getFirestore: vi.fn(),
}))

describe('SimulatorPage', () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({ user: { uid: '123' } } as any)
  })

  test('renders simulator page', () => {
    render(<SimulatorPage />)
    expect(screen.getByText('Mock Voting Simulator')).toBeInTheDocument()
    expect(screen.getByText('Modern Progressive Alliance')).toBeInTheDocument()
  })
})
