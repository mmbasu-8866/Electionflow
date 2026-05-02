import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SimulatorPage from './page'
import { expect, test, vi, beforeEach, describe } from 'vitest'
import { useAuth } from '@/components/auth-provider'
import { toast } from '@/hooks/use-toast'

vi.mock('@/components/auth-provider', () => ({
  useAuth: vi.fn(),
}))

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()), // returns unsubscribe
  getFirestore: vi.fn(),
}))

// Mock fetch
global.fetch = vi.fn()

import { User } from 'firebase/auth'

describe('SimulatorPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuth).mockReturnValue({ 
      user: { uid: '123' } as User, 
      loading: false 
    })
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as unknown as Response)
  })

  test('renders simulator page with candidates', () => {
    render(<SimulatorPage />)
    expect(screen.getByText('Mock Voting Simulator')).toBeInTheDocument()
    expect(screen.getByText('Modern Progressive Alliance')).toBeInTheDocument()
    expect(screen.getByText('Traditional Values Party')).toBeInTheDocument()
  })

  test('handles voting click', async () => {
    render(<SimulatorPage />)
    
    const voteButtons = screen.getAllByRole('button', { name: /Cast your vote/i })
    fireEvent.click(voteButtons[0])

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/votes', expect.any(Object))
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ title: 'Vote Cast!' }))
    })
  })

  test('requires auth for voting', async () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false })
    render(<SimulatorPage />)
    
    const voteButtons = screen.getAllByRole('button', { name: /Cast your vote/i })
    fireEvent.click(voteButtons[0])

    expect(toast).toHaveBeenCalledWith(expect.objectContaining({ title: 'Auth Required' }))
  })
})
