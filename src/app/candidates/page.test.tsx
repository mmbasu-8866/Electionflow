/* eslint-disable @next/next/no-img-element */
import { render, screen } from '@testing-library/react'
import CandidatesPage from './page'
import { expect, test, vi } from 'vitest'
import { ReactNode } from 'react'

// Mock components
vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  AvatarImage: ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} />,
  AvatarFallback: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}))

test('renders candidates page with summary and list', () => {
  render(<CandidatesPage />)
  expect(screen.getByText('Vote Recapitulation - Candidates')).toBeInTheDocument()
  expect(screen.getByText('Top Individual Performers')).toBeInTheDocument()
  expect(screen.getByText('1.757.870')).toBeInTheDocument()
  
  // Check list items
  expect(screen.getByText('Ir. Hj. Rosinta Widowati')).toBeInTheDocument()
  expect(screen.getByText('Prof. Dr. Lukas Sembiring')).toBeInTheDocument()
  
  // Check interactive elements
  expect(screen.getByPlaceholderText(/Search Candidates/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Filter/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Refresh/i })).toBeInTheDocument()
})
