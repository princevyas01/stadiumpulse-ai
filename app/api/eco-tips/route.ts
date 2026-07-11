import { NextRequest } from 'next/server'
import { z } from 'zod'
import { handleGeminiRequest } from '@/lib/gemini'

const emptyRequestSchema = z.object({}).passthrough()

export async function POST(request: NextRequest) {
  return handleGeminiRequest({
    request,
    schema: emptyRequestSchema,
    buildPrompt: () =>
      `Give a short, one-sentence sustainability tip for a football fan attending the FIFA World Cup 2026. Be encouraging and specific to stadium behavior (e.g. digital ticketing, recycling, public transit).`,
    parseResponse: (text) => ({ tip: text }),
    requireCsrf: false, // read-only, no state change
  })
}
