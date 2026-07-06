/**
 * Simple in-memory TTL cache for deterministic Gemini outputs.
 */
export class TTLCache<T> {
  private cache = new Map<string, { value: T; expiry: number }>()

  /**
   * Creates a new TTLCache.
   * @param ttlSeconds The time-to-live for cache entries in seconds.
   */
  constructor(private ttlSeconds: number) {}

  /**
   * Gets a value from the cache if it exists and is not expired.
   * @param key The cache key.
   * @returns The cached value or null if not found/expired.
   */
  get(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null
    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }
    return item.value
  }

  /**
   * Sets a value in the cache.
   * @param key The cache key.
   * @param value The value to cache.
   */
  set(key: string, value: T): void {
    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttlSeconds * 1000,
    })
  }
}

/**
 * aiCache
 */
export const aiCache = new TTLCache<string>(300) // 5 minutes TTL
