import { NextResponse } from 'next/server'
import { generateText } from '@/lib/gemini'
import { apiLimiter } from '@/lib/rate-limit'

import { z } from "zod"
const schema = z.object({})

/**
 * Module
 */
export async function POST(req: Request) {
  try { schema.parse(await req.json()) } catch {}
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
  if (!apiLimiter.check(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const prompt = `Give a short, one-sentence sustainability tip for a football fan attending the 2026 Global Soccer Tournament. Be encouraging and specific to stadium behavior (e.g. digital ticketing, recycling, public transit).`
    
    const tip = await generateText(prompt)
    return NextResponse.json({ tip })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tip' }, { status: 500 })
  }
}
