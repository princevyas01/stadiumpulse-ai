import { NextResponse } from 'next/server'
import { streamText } from '@/lib/gemini'
import { apiLimiter } from '@/lib/rate-limit'
import { sanitizeInput } from '@/lib/sanitize'
import { z } from 'zod'

const schema = z.object({
  message: z.string().min(1),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional()
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
    const { message, history } = schema.parse(body)
    const sanitizedMsg = sanitizeInput(message)

    let historyText = ''
    if (history && history.length > 0) {
      historyText = history.map(h => `${h.role}: ${h.content}`).join('\n') + '\n'
    }

    const prompt = `You are a helpful, multilingual AI Concierge for the 2026 Global Soccer Tournament. 
    You must auto-detect the language of the user's message and reply in the SAME language (English, Spanish, or French).
    Keep replies brief, polite, and stadium-focused (e.g. food, tickets, rules, gates).
    
    Conversation history:
    ${historyText}
    user: ${sanitizedMsg}
    assistant:`

    const stream = await streamText(prompt)
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
