import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { VoterBotChatWidget } from './voter-bot-chat-widget'
import { electionProcessChat } from '@/ai/flows/election-process-chat'
import { vi, expect, describe, it, beforeEach } from 'vitest'

// Mock the chat flow
vi.mock('@/ai/flows/election-process-chat', () => ({
  electionProcessChat: vi.fn(),
}))

// Mock ScrollArea to avoid layout issues in tests
vi.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('VoterBotChatWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders initial bot message', () => {
    render(<VoterBotChatWidget />)
    expect(screen.getByText(/Hello! I'm Electionflow/i)).toBeInTheDocument()
  })

  it('sends a message and displays the response', async () => {
    const mockResponse = { answer: 'This is a mock answer.' }
    vi.mocked(electionProcessChat).mockResolvedValue(mockResponse)

    render(<VoterBotChatWidget />)
    
    const input = screen.getByLabelText(/Chat message input/i)
    const sendButton = screen.getByLabelText(/Send message/i)

    fireEvent.change(input, { target: { value: 'How do I vote?' } })
    fireEvent.click(sendButton)

    expect(screen.getByText('How do I vote?')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('This is a mock answer.')).toBeInTheDocument()
    })
  })

  it('handles error response gracefully', async () => {
    vi.mocked(electionProcessChat).mockRejectedValue(new Error('Network error'))

    render(<VoterBotChatWidget />)
    
    const input = screen.getByLabelText(/Chat message input/i)
    fireEvent.change(input, { target: { value: 'Trigger error' } })
    fireEvent.click(screen.getByLabelText(/Send message/i))

    await waitFor(() => {
      expect(screen.getByText(/Sorry, I encountered an error/i)).toBeInTheDocument()
    })
  })

  it('toggles Eli10 mode', () => {
    render(<VoterBotChatWidget />)
    const toggle = screen.getByLabelText(/Toggle Explain Like I'm 10 mode/i)
    
    fireEvent.click(toggle)
    expect(screen.getByPlaceholderText(/Ask a simple question/i)).toBeInTheDocument()
    
    fireEvent.click(toggle)
    expect(screen.getByPlaceholderText(/Ask about trends/i)).toBeInTheDocument()
  })

  it('clears input after sending', async () => {
    vi.mocked(electionProcessChat).mockResolvedValue({ answer: 'Ok' })
    render(<VoterBotChatWidget />)
    
    const input = screen.getByLabelText(/Chat message input/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.click(screen.getByLabelText(/Send message/i))

    expect(input.value).toBe('')
  })

  it('handles image selection and removal', async () => {
    // Mock URL.createObjectURL and revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
    global.URL.revokeObjectURL = vi.fn()

    render(<VoterBotChatWidget />)
    
    const attachButton = screen.getByLabelText(/Attach image/i)
    fireEvent.click(attachButton)

    // Find the hidden file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    fireEvent.change(fileInput, { target: { files: [file] } })

    // Preview should appear
    await waitFor(() => {
      expect(screen.getByAltText(/Preview/i)).toBeInTheDocument()
    })

    // Remove the image
    const removeButton = screen.getByLabelText(/Remove attached image/i)
    fireEvent.click(removeButton)

    expect(screen.queryByAltText(/Preview/i)).not.toBeInTheDocument()
  })

  it('prevents large image uploads', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<VoterBotChatWidget />)
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    const largeFile = new File([''], 'large.png', { type: 'image/png' })
    Object.defineProperty(largeFile, 'size', { value: 6 * 1024 * 1024 }) // 6MB
    
    fireEvent.change(fileInput, { target: { files: [largeFile] } })
    
    expect(alertMock).toHaveBeenCalledWith('Image too large. Please select a file under 5MB.')
    alertMock.mockRestore()
  })
})
