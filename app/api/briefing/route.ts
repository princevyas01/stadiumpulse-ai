import { NextResponse } from 'next/server'
import { generateText } from '@/lib/gemini'
import { apiLimiter } from '@/lib/rate-limit'

import { z } from "zod"
const schema = z.object({})

export async function POST(req: Request) {
  try { schema.parse(await req.json()) } catch {}
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
  if (!apiLimiter.check(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const prompt = `You are the Ops Commander for a World Cup match. Generate a 2-sentence shift briefing for volunteers stationed at the North Gates. Mention crowd control, checking digital tickets, and staying hydrated.`
    
    const briefing = await generateText(prompt)
    return NextResponse.json({ briefing })
  } catch {
    return NextResponse.json({ error: 'Failed to generate briefing' }, { status: 500 })
  }
}
