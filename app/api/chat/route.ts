import { NextRequest, NextResponse } from 'next/server'
import { chatMessageSchema } from '@/lib/schemas'
import { sanitizeInput } from '@/lib/sanitize'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyCsrfToken } from '@/lib/csrf'
import { streamText } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  const cookieToken = request.cookies.get('sp_csrf')?.value
  const headerToken = request.headers.get('x-csrf-token')
  const csrfValid = cookieToken === headerToken && (await verifyCsrfToken(cookieToken))
  if (!csrfValid) {
    return NextResponse.json({ error: 'Invalid or missing CSRF token' }, { status: 403 })
  }

  const sessionId = request.cookies.get('sp_session')?.value ?? 'anonymous'
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = checkRateLimit(sessionId, ip)
  if (!allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 })
  }

  const rawBody = await request.json().catch(() => ({}))
  const parsed = chatMessageSchema.safeParse(rawBody)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const sanitizedMessage = sanitizeInput(parsed.data.message)
  
  let historyText = ''
  if (parsed.data.history && parsed.data.history.length > 0) {
    historyText = parsed.data.history.map(h => `${h.role}: ${h.content}`).join('\n') + '\n'
  }

  const prompt = `You are a multilingual AI concierge for fans at a FIFA World Cup 2026 host stadium. Detect the language of this message and reply in the same language (support English, Spanish, French).
  
  Conversation history:
  ${historyText}
  user: ${sanitizedMessage}
  assistant:`

  try {
    const stream = await streamText(prompt)
    return new NextResponse(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache, no-transform' } })
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
