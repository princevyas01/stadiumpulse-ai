import { NextRequest, NextResponse } from 'next/server'
import { streamText } from '@/lib/gemini'
import { checkRateLimit } from '@/lib/rate-limit'
import { sanitizeInput } from '@/lib/sanitize'
import { chatMessageSchema } from '@/lib/schemas'

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get('sp_session')?.value ?? 'anonymous';
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { allowed } = checkRateLimit(sessionId, ip);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const { message, history } = chatMessageSchema.parse(body)
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
