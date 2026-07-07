import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import OrganizerPage from '@/app/organizer/page';

global.fetch = vi.fn().mockResolvedValue({
  json: async () => ({
    stats: {
      totalAttendanceEstimate: 45000,
      averageCrowdDensityPercent: 62,
      activeIncidentCount: 2,
      sustainability: { wasteDivertedPercent: 71, energyUsageKwh: 1200, waterUsageLiters: 8000 },
      gateShuttleGap: [{ gateId: 'Gate A', projectedDemand: 400, currentCapacity: 350, gapPercent: 12 }],
      generatedAt: new Date().toISOString(),
    },
    briefing: 'Attendance is steady, no major incidents.',
  }),
}) as any;

describe('OrganizerPage', () => {
  it('renders the KPI strip and briefing after loading', async () => {
    render(<OrganizerPage />);
    await waitFor(() => expect(screen.getByText(/Estimated Attendance/i)).toBeInTheDocument());
    expect(await screen.findByText(/Attendance is steady/i)).toBeInTheDocument();
  });
});
