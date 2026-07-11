import { GoogleGenAI } from '@google/genai'

const apiKey = process.env.GEMINI_API_KEY

/**
 * ai
 */
export const ai = new GoogleGenAI(apiKey ? { apiKey } : {})

/**
 * Generates text content using Gemini 2.5 Flash.
 * @param prompt The user prompt.
 * @param systemInstruction Optional system instruction.
 * @returns The generated text string.
 */
export async function generateText(prompt: string, systemInstruction?: string) {
  if (!apiKey) {
    return "This is a placeholder response. Please set GEMINI_API_KEY to enable AI features."
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: systemInstruction ? { systemInstruction } : undefined,
    })
    
    return response.text
  } catch {
    throw new Error("Failed to generate content")
  }
}

/**
 * Streams text content using Gemini 2.5 Flash.
 * @param prompt The user prompt.
 * @returns A ReadableStream of the text chunks.
 */
export async function streamText(prompt: string): Promise<ReadableStream> {
  if (!apiKey) {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("This is a placeholder response. Please set GEMINI_API_KEY."));
        controller.close();
      }
    });
    return stream;
  }

  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: prompt,
    })

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of responseStream) {
          if (chunk.text) {
            controller.enqueue(new TextEncoder().encode(chunk.text));
          }
        }
        controller.close();
      }
    });

    return stream;
  } catch {
    throw new Error("Failed to stream content");
  }
}

export async function generateExecutiveBriefing(stats: import("./mock-data").TournamentAggregateStats) {
  const prompt = `You are writing a 10-second executive briefing for tournament organizers overseeing a FIFA World Cup 2026 host stadium.

Current stats:
- Estimated attendance: ${stats.totalAttendanceEstimate}
- Average crowd density: ${stats.averageCrowdDensityPercent}%
- Active incidents: ${stats.activeIncidentCount}
- Waste diverted: ${stats.sustainability.wasteDivertedPercent}%
- Energy usage: ${stats.sustainability.energyUsageKwh} kWh
- Water usage: ${stats.sustainability.waterUsageLiters} L

Write a plain-language executive summary in 3-5 sentences, no bullet points, no markdown, that an organizer could read in 10 seconds before a decision meeting. Flag anything that needs attention. Interpret the numbers, don't just restate them.`;

  const text = await generateText(prompt);
  return { text };
}

import { NextRequest, NextResponse } from 'next/server'
import type { ZodSchema } from 'zod'
import { sanitizeInput } from './sanitize'
import { checkRateLimit } from './rate-limit'
import { verifyCsrfToken } from './csrf'

interface GeminiRequestParams<TInput, TOutput> {
  request: NextRequest
  schema: ZodSchema<TInput>
  buildPrompt: (input: TInput) => string
  parseResponse: (text: string) => TOutput
  requireCsrf?: boolean
}

/**
 * handleGeminiRequest
 * Shared pipeline for every AI-backed API route: CSRF check, rate limit,
 * validate, sanitize, call Gemini, return typed response, generic error handling.
 */
export async function handleGeminiRequest<TInput, TOutput>({
  request,
  schema,
  buildPrompt,
  parseResponse,
  requireCsrf = true,
}: GeminiRequestParams<TInput, TOutput>): Promise<NextResponse> {
  try {
    if (requireCsrf) {
      const cookieToken = request.cookies.get('sp_csrf')?.value
      const headerToken = request.headers.get('x-csrf-token')
      const csrfValid = cookieToken === headerToken && (await verifyCsrfToken(cookieToken))
      if (!csrfValid) {
        return NextResponse.json({ error: 'Invalid or missing CSRF token' }, { status: 403 })
      }
    }

    const sessionId = request.cookies.get('sp_session')?.value ?? 'anonymous'
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
    const { allowed } = checkRateLimit(sessionId, ip)
    if (!allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again shortly.' }, { status: 429 })
    }

    const rawBody = await request.json().catch(() => ({}))
    const parsed = schema.safeParse(rawBody)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const sanitizedInput = Object.fromEntries(
      Object.entries(parsed.data as Record<string, unknown>).map(([key, value]) => [
        key,
        typeof value === 'string' ? sanitizeInput(value) : value,
      ])
    ) as TInput

    const prompt = buildPrompt(sanitizedInput)
    const text = await generateText(prompt)
    const result = parseResponse(text ?? '')

    return NextResponse.json(result)
  } catch (error) {
    console.error('Gemini request error:', error instanceof Error ? error.message : 'unknown error')
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
