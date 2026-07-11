import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/organizer-briefing/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/gemini', () => ({
  generateExecutiveBriefing: vi.fn().mockResolvedValue({ text: 'Attendance is steady, no major incidents.' }),
}));

vi.mock('@/lib/csrf', () => ({
  verifyCsrfToken: vi.fn(async (token) => token === 'valid-token'),
}));

describe('/api/organizer-briefing', () => {
  it('rejects request without a valid CSRF token with 403', async () => {
    const request = new NextRequest('http://localhost/api/organizer-briefing', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: new Headers({ 'x-csrf-token': 'invalid-token' }),
    });
    // mock cookies
    Object.defineProperty(request, 'cookies', {
      value: { get: (name: string) => (name === 'sp_csrf' ? { value: 'invalid-token' } : null) }
    });

    const response = await POST(request);
    expect(response.status).toBe(403);
    const data = await response.json();
    expect(data.error).toBe('Invalid or missing CSRF token');
  });

  it('returns aggregate stats and a briefing on valid request', async () => {
    const request = new NextRequest('http://localhost/api/organizer-briefing', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: new Headers({ 'x-csrf-token': 'valid-token' }),
    });
    // mock cookies
    Object.defineProperty(request, 'cookies', {
      value: { get: (name: string) => (name === 'sp_csrf' ? { value: 'valid-token' } : null) }
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.stats.totalAttendanceEstimate).toBeGreaterThan(0);
    expect(data.briefing).toBeDefined();
  });
});
