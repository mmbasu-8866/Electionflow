import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { VoterBotChatWidget } from './voter-bot-chat-widget'
import { electionProcessChat } from '@/ai/flows/election-process-chat'
import { vi, expect, describe, it } from 'vitest'

// Mock the chat flow
vi.mock('@/ai/flows/election-process-chat', () => ({
  electionProcessChat: vi.fn(),
}))

describe('VoterBotChatWidget', () => {
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

  it('toggles Eli10 mode', () => {
    render(<VoterBotChatWidget />)
    const toggle = screen.getByLabelText(/Toggle Explain Like I'm 10 mode/i)
    
    fireEvent.click(toggle)
    expect(screen.getByPlaceholderText(/Ask a simple question/i)).toBeInTheDocument()
    
    fireEvent.click(toggle)
    expect(screen.getByPlaceholderText(/Ask about trends/i)).toBeInTheDocument()
  })
})
