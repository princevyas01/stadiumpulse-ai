import { z } from 'zod';

export const organizerBriefingRequestSchema = z.object({
  requestId: z.string().uuid().optional(),
});

export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(500, 'Message exceeds 500 character limit'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional(),
  language: z.enum(['en', 'es', 'fr']).optional()
});

export const incidentReportSchema = z.object({
  incident: z.string().min(1).max(1000, 'Incident description exceeds 1000 character limit')
});

export const wayfindingQuerySchema = z.object({
  query: z.string().min(1).max(200, 'Wayfinding query exceeds 200 character limit')
});
