import { NextRequest } from 'next/server'
import { z } from 'zod'
import { handleGeminiRequest } from '@/lib/gemini'

const emptyRequestSchema = z.object({}).passthrough()

export async function POST(request: NextRequest) {
  return handleGeminiRequest({
    request,
    schema: emptyRequestSchema,
    buildPrompt: () =>
      `You are a transit advisor for a fictional FIFA World Cup 2026 match at MetLife Stadium. The match ends at 10:00 PM. Based on current simulated traffic patterns (heavy), give a 2-sentence recommendation to a fan on when they should leave their seat to catch the NJ Transit train or Shuttle to avoid the peak rush. Keep it short and helpful.`,
    parseResponse: (text) => ({ recommendation: text }),
    requireCsrf: false, // read-only, no state change
  })
}
