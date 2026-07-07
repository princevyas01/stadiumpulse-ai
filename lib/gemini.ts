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
  const prompt = `You are writing a 10-second executive briefing for tournament organizers overseeing a Global Soccer Tournament 2026 host stadium.

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
