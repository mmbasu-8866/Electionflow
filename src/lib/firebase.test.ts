import { initAnalytics, app } from './firebase'
import { isSupported, getAnalytics, Analytics } from 'firebase/analytics'
import { vi, expect, describe, it, beforeEach } from 'vitest'

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(),
  isSupported: vi.fn(),
}))

describe('initAnalytics', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize analytics if supported and in browser', async () => {
    vi.mocked(isSupported).mockResolvedValue(true)
    vi.mocked(getAnalytics).mockReturnValue({} as unknown as Analytics)
    
    // browser environment is default in jsdom
    const analytics = await initAnalytics()
    
    expect(isSupported).toHaveBeenCalled()
    expect(getAnalytics).toHaveBeenCalledWith(app)
    expect(analytics).toBeDefined()
  })

  it('should return null if analytics not supported', async () => {
    vi.mocked(isSupported).mockResolvedValue(false)
    
    const analytics = await initAnalytics()
    expect(analytics).toBeNull()
  })

  it('should return null if window is undefined', async () => {
    // Save original window
    const originalWindow = global.window
    // @ts-expect-error - testing environment manipulation
    delete global.window
    
    const analytics = await initAnalytics()
    expect(analytics).toBeNull()
    
    // Restore
    global.window = originalWindow
  })
})
