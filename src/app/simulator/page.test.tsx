import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SimulatorPage from './page'
import { expect, test, vi, beforeEach, describe } from 'vitest'
import { useAuth } from '@/components/auth-provider'
import { toast } from '@/hooks/use-toast'
import { QuerySnapshot, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

vi.mock('@/components/auth-provider', () => ({
  useAuth: vi.fn(),
}))

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  limit: vi.fn(),
  onSnapshot: vi.fn((q, cb) => {
    // Immediate callback to simulate firestore data
    const mockDoc = {
      data: () => ({ candidateId: "c1" })
    } as unknown as QueryDocumentSnapshot<DocumentData>;
    
    cb({
      size: 1,
      forEach: (iterCb: (doc: QueryDocumentSnapshot<DocumentData>) => void) => iterCb(mockDoc)
    } as unknown as QuerySnapshot<DocumentData>);
    return vi.fn();
  }),
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
    
    // Data check based on our mock
    expect(screen.getByText(/1 Votes/)).toBeInTheDocument()
  })

  test('handles voting click', async () => {
    render(<SimulatorPage />)
    
    const voteButtons = screen.getAllByRole('button', { name: /Cast your vote/i })
    fireEvent.click(voteButtons[0])

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/votes', expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"candidateId":"c1"'),
      }))
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

  test('handles vote failure', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    } as unknown as Response)
    
    render(<SimulatorPage />)
    const voteButtons = screen.getAllByRole('button', { name: /Cast your vote/i })
    fireEvent.click(voteButtons[0])

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ title: 'Submission Failed' }))
    })
  })
})
