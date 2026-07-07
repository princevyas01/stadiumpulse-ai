interface Bucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, Bucket>();
const MAX_TOKENS = 20;
const REFILL_RATE_MS = 60_000;

export function checkRateLimit(sessionId: string, ip: string): { allowed: boolean; remaining: number } {
  const key = `${sessionId}:${ip}`;
  const now = Date.now();
  let bucket = buckets.get(key);

  if (!bucket) {
    bucket = { tokens: MAX_TOKENS, lastRefill: now };
    buckets.set(key, bucket);
  }

  const elapsed = now - bucket.lastRefill;
  const refillCount = Math.floor(elapsed / REFILL_RATE_MS);
  if (refillCount > 0) {
    bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + refillCount);
    bucket.lastRefill = now;
  }

  if (bucket.tokens <= 0) {
    return { allowed: false, remaining: 0 };
  }

  bucket.tokens -= 1;
  return { allowed: true, remaining: bucket.tokens };
}
