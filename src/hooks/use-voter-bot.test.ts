import { renderHook, act } from '@testing-library/react'
import { useVoterBot } from './use-voter-bot'
import { electionProcessChat } from '@/ai/flows/election-process-chat'
import { vi, expect, describe, it, beforeEach } from 'vitest'
import { ChangeEvent, FormEvent } from 'react'

// Mock the chat flow
vi.mock('@/ai/flows/election-process-chat', () => ({
  electionProcessChat: vi.fn(),
}))

describe('useVoterBot', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock URL methods
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
    global.URL.revokeObjectURL = vi.fn()
  })

  it('initializes with default message', () => {
    const { result } = renderHook(() => useVoterBot())
    expect(result.current.messages[0].role).toBe('bot')
    expect(result.current.messages[0].content).toContain('Hello')
  })

  it('handles message submission success', async () => {
    vi.mocked(electionProcessChat).mockResolvedValue({ answer: 'Mock Answer' })
    const { result } = renderHook(() => useVoterBot())

    act(() => {
      result.current.setInput('Hello')
    })

    await act(async () => {
      const event = { preventDefault: vi.fn() } as unknown as FormEvent
      await result.current.handleSubmit(event)
    })

    expect(electionProcessChat).toHaveBeenCalled()
    expect(result.current.messages).toHaveLength(3)
    expect(result.current.messages[2].content).toBe('Mock Answer')
    expect(result.current.isLoading).toBe(false)
  })

  it('handles message submission error', async () => {
    vi.mocked(electionProcessChat).mockRejectedValue(new Error('Fail'))
    const { result } = renderHook(() => useVoterBot())

    act(() => {
      result.current.setInput('Hello')
    })

    await act(async () => {
      const event = { preventDefault: vi.fn() } as unknown as FormEvent
      await result.current.handleSubmit(event)
    })

    expect(result.current.messages).toHaveLength(3)
    expect(result.current.messages[2].content).toContain('error')
  })

  it('handles image selection', async () => {
    const { result } = renderHook(() => useVoterBot())
    
    const file = new File([''], 'test.png', { type: 'image/png' })
    const event = { target: { files: [file] } } as unknown as ChangeEvent<HTMLInputElement>

    act(() => {
      result.current.handleImageSelect(event)
    })

    expect(result.current.selectedImage).toBe('blob:mock-url')
    expect(global.URL.createObjectURL).toHaveBeenCalled()
  })

  it('clears image and revokes URL', () => {
    const { result } = renderHook(() => useVoterBot())
    
    act(() => {
      result.current.handleImageSelect({ target: { files: [new File([''], 't.png')] } } as unknown as ChangeEvent<HTMLInputElement>)
    })

    act(() => {
      result.current.clearImage()
    })

    expect(result.current.selectedImage).toBe(null)
    expect(global.URL.revokeObjectURL).toHaveBeenCalled()
  })
})
