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
    const prompt = `You are the Ops Commander for a Global Soccer Tournament match. Generate a 2-sentence shift briefing for volunteers stationed at the North Gates. Mention crowd control, checking digital tickets, and staying hydrated.`
    
    const briefing = await generateText(prompt)
    return NextResponse.json({ briefing })
  } catch {
    return NextResponse.json({ error: 'Failed to generate briefing' }, { status: 500 })
  }
}
