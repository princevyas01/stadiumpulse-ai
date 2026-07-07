import { NextRequest, NextResponse } from 'next/server'
import { generateText } from '@/lib/gemini'
import { checkRateLimit } from '@/lib/rate-limit'
import { aiCache } from '@/lib/cache'
import { sanitizeInput } from '@/lib/sanitize'
import { wayfindingQuerySchema } from '@/lib/schemas'



/**
 * Module
 */
export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get('sp_session')?.value ?? 'anonymous';
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { allowed } = checkRateLimit(sessionId, ip);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const { query } = wayfindingQuerySchema.parse(body)
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
