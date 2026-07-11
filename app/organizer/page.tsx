'use client';

import { useEffect, useState } from 'react';
import { OrganizerKPIStrip } from '@/components/organizer/OrganizerKPIStrip';
import { ExecutiveBriefingCard } from '@/components/organizer/ExecutiveBriefingCard';
import { ResourceAllocationChart } from '@/components/organizer/ResourceAllocationChart';
import type { TournamentAggregateStats } from '@/lib/mock-data';
import { getCsrfToken } from '@/lib/getCsrfToken';

export default function OrganizerPage() {
  const [stats, setStats] = useState<TournamentAggregateStats | null>(null);
  const [briefing, setBriefing] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      const res = await fetch('/api/organizer-briefing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!cancelled) {
        setStats(data.stats);
        setBriefing(data.briefing?.text ?? data.briefing ?? '');
        setIsLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="p-2 md:p-4 w-full">
      <h1 className="text-3xl font-bold font-display text-theme-text-primary dark:text-theme-light mb-1">Organizer Command View</h1>
      <p className="text-sm font-sans text-theme-text-secondary opacity-70 mb-6">Tournament-wide overview for FIFA World Cup 2026 organizers.</p>
      {stats && <OrganizerKPIStrip stats={stats} />}
      <ExecutiveBriefingCard briefing={briefing} isLoading={isLoading} />
      {stats && <ResourceAllocationChart gateShuttleGap={stats.gateShuttleGap} />}
    </div>
  );
}
