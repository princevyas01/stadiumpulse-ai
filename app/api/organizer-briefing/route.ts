import { NextRequest, NextResponse } from 'next/server';
import { organizerBriefingRequestSchema } from '@/lib/schemas';
import { aggregateTournamentStats } from '@/lib/mock-data';
import { generateExecutiveBriefing } from '@/lib/gemini';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('sp_session')?.value ?? 'anonymous';
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

    const { allowed } = checkRateLimit(sessionId, ip);
    if (!allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again shortly.' }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const parsed = organizerBriefingRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const stats = aggregateTournamentStats();
    const briefing = await generateExecutiveBriefing(stats);

    return NextResponse.json({ stats, briefing });
  } catch (error) {
    console.error('organizer-briefing route error:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
