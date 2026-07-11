import { NextRequest } from 'next/server'
import { handleGeminiRequest } from '@/lib/gemini'
import { incidentReportSchema } from '@/lib/schemas'

export async function POST(request: NextRequest) {
  return handleGeminiRequest({
    request,
    schema: incidentReportSchema,
    buildPrompt: (input) =>
      `You are the AI Incident Advisor for stadium operations. Incident reported: "${input.incident}". Provide a JSON response with exactly two keys: 1. "checklist": an array of 3 concise, actionable strings for staff to follow. 2. "escalation": a single string recommending the escalation level (e.g. "Low - Monitor", "High - Dispatch Security") with a brief reason. Return ONLY valid JSON.`,
    parseResponse: (text) => {
      try {
        const cleaned = text.replace(/```json|```/g, '').trim()
        return JSON.parse(cleaned)
      } catch {
        return {
          checklist: ['Assess immediate danger', 'Contact dispatch', 'Document findings'],
          escalation: 'High - unable to parse AI response, fallback to manual protocol.',
        }
      }
    },
  })
}
