import { describe, it, expect } from 'vitest'
import { checkRateLimit } from '../lib/rate-limit'

describe('RateLimiter', () => {
  it('allows requests within capacity', () => {
    const result1 = checkRateLimit('sess-1', '1.1.1.1')
    expect(result1.allowed).toBe(true)
  })

  it('blocks requests over capacity', () => {
    let result = { allowed: true }
    for (let i = 0; i < 21; i++) {
      result = checkRateLimit('sess-2', '2.2.2.2')
    }
    expect(result.allowed).toBe(false)
  })
})
