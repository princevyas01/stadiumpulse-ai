import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { TTLCache } from '../lib/cache'

describe('TTLCache', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('caches and retrieves value', () => {
    const cache = new TTLCache<string>(10)
    cache.set('key1', 'value1')
    expect(cache.get('key1')).toBe('value1')
  })

  it('expires value after TTL', () => {
    const cache = new TTLCache<string>(10)
    cache.set('key1', 'value1')
    
    vi.advanceTimersByTime(11000)
    
    expect(cache.get('key1')).toBeNull()
  })
})
