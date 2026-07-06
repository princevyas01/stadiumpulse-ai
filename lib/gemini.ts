import { GoogleGenAI } from '@google/genai'

const apiKey = process.env.GEMINI_API_KEY

export const ai = new GoogleGenAI(apiKey ? { apiKey } : {})

/**
 * Generates text content using Gemini 2.5 Flash.
 * @param prompt The user prompt.
 * @param systemInstruction Optional system instruction.
 * @returns The generated text string.
 */
export async function generateText(prompt: string, systemInstruction?: string) {
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Returning placeholder response.")
    return "This is a placeholder response. Please set GEMINI_API_KEY to enable AI features."
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: systemInstruction ? { systemInstruction } : undefined,
    })
    
    return response.text
  } catch (e) {
    console.error("Gemini API Error:", e)
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
      model: 'gemini-2.5-flash',
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
  } catch (e) {
    console.error("Gemini Streaming Error:", e);
    throw new Error("Failed to stream content");
  }
}
