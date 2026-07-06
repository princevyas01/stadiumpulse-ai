export class RateLimiter {
  private tokens: Map<string, number> = new Map()
  private lastRefill: Map<string, number> = new Map()

  constructor(private capacity: number, private refillRatePerSecond: number) {}

  check(ip: string): boolean {
    const now = Date.now()
    const last = this.lastRefill.get(ip) || now
    const tokens = this.tokens.get(ip) ?? this.capacity

    const timePassed = (now - last) / 1000
    const newTokens = Math.min(this.capacity, tokens + timePassed * this.refillRatePerSecond)

    if (newTokens >= 1) {
      this.tokens.set(ip, newTokens - 1)
      this.lastRefill.set(ip, now)
      return true
    }

    this.tokens.set(ip, newTokens)
    this.lastRefill.set(ip, now)
    return false
  }
}

// Global instance to persist across API calls in development (though serverless may clear it)
export const apiLimiter = new RateLimiter(10, 1) // 10 tokens, 1 per second
