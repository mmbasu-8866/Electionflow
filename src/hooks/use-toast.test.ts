import { renderHook, act } from '@testing-library/react'
import { useToast, toast } from './use-toast'
import { expect, it, describe } from 'vitest'

describe('useToast', () => {
  it('should add a toast', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      toast({ title: 'Test Toast', description: 'Description' })
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts[0].title).toBe('Test Toast')
  })

  it('should dismiss a toast', () => {
    const { result } = renderHook(() => useToast())
    
    let toastId = ''
    act(() => {
      const t = toast({ title: 'To Dismiss' })
      toastId = t.id
    })

    expect(result.current.toasts[0].open).toBe(true)

    act(() => {
      result.current.dismiss(toastId)
    })

    expect(result.current.toasts[0].open).toBe(false)
  })
})
