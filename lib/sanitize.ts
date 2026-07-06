/**
 * sanitizeInput
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  
  // Basic sanitization to prevent common prompt injection patterns
  const sanitized = input
    .replace(/ignore previous instructions/gi, '')
    .replace(/system prompt/gi, '')
    .replace(/you are now/gi, '')
    .replace(/[<>]/g, '') // strip basic HTML tags
    .trim()
    
  return sanitized.slice(0, 500) // limit length
}
