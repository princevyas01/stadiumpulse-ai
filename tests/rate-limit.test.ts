import { describe, it, expect } from 'vitest'
import { RateLimiter } from '../lib/rate-limit'

describe('RateLimiter', () => {
  it('should allow requests within capacity', () => {
    const limiter = new RateLimiter(5, 1)
    expect(limiter.check('ip1')).toBe(true)
    expect(limiter.check('ip1')).toBe(true)
  })

  it('should block requests exceeding capacity instantly', () => {
    const limiter = new RateLimiter(2, 1)
    expect(limiter.check('ip2')).toBe(true)
    expect(limiter.check('ip2')).toBe(true)
    expect(limiter.check('ip2')).toBe(false)
  })
})
