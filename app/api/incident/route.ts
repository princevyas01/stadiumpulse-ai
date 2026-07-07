import { NextRequest, NextResponse } from 'next/server'
import { ai } from '@/lib/gemini'
import { checkRateLimit } from '@/lib/rate-limit'
import { sanitizeInput } from '@/lib/sanitize'
import { incidentReportSchema } from '@/lib/schemas'



/**
 * Module
 */
export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get('sp_session')?.value ?? 'anonymous';
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { allowed } = checkRateLimit(sessionId, ip);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const { incident } = incidentReportSchema.parse(body)
    const sanitizedIncident = sanitizeInput(incident)

    const prompt = `You are the AI Incident Advisor for stadium operations. 
    Incident reported: "${sanitizedIncident}"
    
    Provide a JSON response with exactly two keys:
    1. "checklist": an array of 3 concise, actionable strings for staff to follow.
    2. "escalation": a single string recommending the escalation level (e.g. "Low - Monitor", "High - Dispatch Security") with a brief reason.
    
    Return ONLY valid JSON.`

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        checklist: ["Assess immediate danger", "Contact dispatch", "Document findings"],
        escalation: "Unknown - API Key missing"
      })
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    })
    
    const data = JSON.parse(response.text || '{}')
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
