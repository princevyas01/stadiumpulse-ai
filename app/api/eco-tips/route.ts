import { NextRequest, NextResponse } from 'next/server'
import { generateText } from '@/lib/gemini'
import { checkRateLimit } from '@/lib/rate-limit'

import { z } from "zod"
const schema = z.object({})

/**
 * Module
 */
export async function POST(req: NextRequest) {
  try { schema.parse(await req.json()) } catch {}
  const sessionId = req.cookies.get('sp_session')?.value ?? 'anonymous';
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { allowed } = checkRateLimit(sessionId, ip);
  if (!allowed) {
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
