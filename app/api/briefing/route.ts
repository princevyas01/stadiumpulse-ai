import { NextRequest } from 'next/server'
import { z } from 'zod'
import { handleGeminiRequest } from '@/lib/gemini'
import { aggregateTournamentStats } from '@/lib/mock-data'

const emptyRequestSchema = z.object({}).passthrough()

export async function POST(request: NextRequest) {
  return handleGeminiRequest({
    request,
    schema: emptyRequestSchema,
    buildPrompt: () => {
      const stats = aggregateTournamentStats()
      return `You are the Ops Commander for a FIFA World Cup 2026 match. Generate a 2-3 sentence shift briefing for volunteers stationed at the North Gates based on the following current real-time stats:
- Estimated attendance: ${stats.totalAttendanceEstimate}
- Average crowd density: ${stats.averageCrowdDensityPercent}%
- Active incidents: ${stats.activeIncidentCount}

Mention crowd control, checking digital tickets, and staying hydrated. Interpret the numbers, don't just restate them.`
    },
    parseResponse: (text) => ({ briefing: text }),
    requireCsrf: false, // read-only, no state change
  })
}
