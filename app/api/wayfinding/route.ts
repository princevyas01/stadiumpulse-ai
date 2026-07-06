import { NextResponse } from 'next/server'
import { generateText } from '@/lib/gemini'
import { apiLimiter } from '@/lib/rate-limit'
import { aiCache } from '@/lib/cache'
import { sanitizeInput } from '@/lib/sanitize'
import { z } from 'zod'

const schema = z.object({
  query: z.string().min(1)
})

/**
 * Module
 */
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
  if (!apiLimiter.check(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const { query } = schema.parse(body)
    const sanitizedQuery = sanitizeInput(query)

    const prompt = `You are a helpful wayfinding assistant for a fictional stadium (MetLife Stadium, NJ, Global Soccer Tournament 2026).
    The user is asking for directions: "${sanitizedQuery}".
    Provide a concise, 2-3 step natural language direction. Mention a nearby amenity (like a food stand or restroom). Keep it under 3 sentences.`

    const cacheKey = `wayfinding-${sanitizedQuery.toLowerCase()}`
    const cachedResponse = aiCache.get(cacheKey)
    if (cachedResponse) {
      return NextResponse.json({ directions: cachedResponse })
    }

    const directions = await generateText(prompt)
    if (directions) aiCache.set(cacheKey, directions)
    return NextResponse.json({ directions })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
