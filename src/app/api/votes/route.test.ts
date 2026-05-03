import { expect, it, describe, vi } from 'vitest'
import { POST } from './route'
import { addDoc } from 'firebase/firestore'

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(() => 'mock-timestamp'),
  getFirestore: vi.fn(),
}))

vi.mock('@/lib/firebase-server', () => ({
  serverDb: {},
}))

import { DocumentReference } from 'firebase/firestore'

describe('POST /api/votes', () => {
  it('returns 400 if candidateId is missing', async () => {
    const request = new Request('http://localhost/api/votes', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    const response = await POST(request)
    const data = await response.json()
    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid request data')
  })

  it('saves a vote and returns ok', async () => {
    vi.mocked(addDoc).mockResolvedValueOnce({ id: '123' } as DocumentReference)
    const request = new Request('http://localhost/api/votes', {
      method: 'POST',
      body: JSON.stringify({ candidateId: 'cand1', userId: 'user1' }),
    })
    const response = await POST(request)
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(data.ok).toBe(true)
    expect(addDoc).toHaveBeenCalled()
  })

  it('saves a vote with null userId', async () => {
    vi.mocked(addDoc).mockResolvedValueOnce({ id: '123' } as DocumentReference)
    const request = new Request('http://localhost/api/votes', {
      method: 'POST',
      body: JSON.stringify({ candidateId: 'cand1' }),
    })
    const response = await POST(request)
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(data.ok).toBe(true)
  })

  it('returns 500 on error', async () => {
    vi.mocked(addDoc).mockRejectedValueOnce(new Error('Firebase error'))
    const request = new Request('http://localhost/api/votes', {
      method: 'POST',
      body: JSON.stringify({ candidateId: 'cand1' }),
    })
    const response = await POST(request)
    const data = await response.json()
    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error')
  })
})
