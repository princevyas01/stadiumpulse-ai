import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/organizer-briefing/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/gemini', () => ({
  generateExecutiveBriefing: vi.fn().mockResolvedValue({ text: 'Attendance is steady, no major incidents.' }),
}));

describe('/api/organizer-briefing', () => {
  it('returns aggregate stats and a briefing on valid request', async () => {
    const request = new NextRequest('http://localhost/api/organizer-briefing', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.stats.totalAttendanceEstimate).toBeGreaterThan(0);
    expect(data.briefing).toBeDefined();
  });
});
