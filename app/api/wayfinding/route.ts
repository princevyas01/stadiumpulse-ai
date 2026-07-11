import { NextRequest, NextResponse } from 'next/server'
import { handleGeminiRequest } from '@/lib/gemini'
import { wayfindingQuerySchema } from '@/lib/schemas'
import { aiCache } from '@/lib/cache'

export async function POST(request: NextRequest) {
  let body: any = {}
  try {
    body = await request.clone().json()
  } catch {}

  const parsed = wayfindingQuerySchema.safeParse(body)
  let cacheKey = ''
  if (parsed.success) {
    cacheKey = `wayfinding-${parsed.data.query.toLowerCase()}`
    const cachedResponse = aiCache.get(cacheKey)
    if (cachedResponse) {
      return NextResponse.json({ directions: cachedResponse })
    }
  }

  const response = await handleGeminiRequest({
    request,
    schema: wayfindingQuerySchema,
    buildPrompt: (input) =>
      `You are a helpful wayfinding assistant for a fictional stadium (MetLife Stadium, NJ, FIFA World Cup 2026). The user is asking for directions: "${input.query}". Provide a concise, 2-3 step natural language direction. Mention a nearby amenity (like a food stand or restroom). Keep it under 3 sentences.`,
    parseResponse: (text) => {
      return { directions: text }
    },
  })

  if (parsed.success && response.status === 200) {
    try {
      const responseClone = response.clone()
      const data = await responseClone.json()
      if (data && data.directions) {
        aiCache.set(cacheKey, data.directions)
      }
    } catch {}
  }

  return response
}
