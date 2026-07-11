import { NextRequest, NextResponse } from 'next/server'
import { organizerBriefingRequestSchema } from '@/lib/schemas'
import { aggregateTournamentStats } from '@/lib/mock-data'
import { generateExecutiveBriefing } from '@/lib/gemini'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyCsrfToken } from '@/lib/csrf'

export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json().catch(() => ({}))
    const parsed = organizerBriefingRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const stats = aggregateTournamentStats()
    const briefing = await generateExecutiveBriefing(stats)

    return NextResponse.json({ stats, briefing })
  } catch (error) {
    console.error('organizer-briefing route error:', error instanceof Error ? error.message : 'unknown')
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
