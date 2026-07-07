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
    const prompt = `You are a transit advisor for a fictional Global Soccer Tournament 2026 match at MetLife Stadium. 
    The match ends at 10:00 PM. Based on current simulated traffic patterns (heavy), give a 2-sentence recommendation to a fan on when they should leave their seat to catch the NJ Transit train or Shuttle to avoid the peak rush. Keep it short and helpful.`

    const recommendation = await generateText(prompt)
    return NextResponse.json({ recommendation })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch recommendation' }, { status: 500 })
  }
}
