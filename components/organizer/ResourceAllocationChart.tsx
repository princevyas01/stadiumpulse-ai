"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { TournamentAggregateStats } from '@/lib/mock-data';

interface Props {
  gateShuttleGap: TournamentAggregateStats['gateShuttleGap'];
}

export function ResourceAllocationChart({ gateShuttleGap }: Props) {
  const flagged = gateShuttleGap.find((g) => g.gapPercent > 20);

  return (
    <section aria-label="Shuttle capacity vs demand by gate" className="mt-6 bg-white dark:bg-theme-dark rounded-std border border-black/10 dark:border-white/10 p-6 shadow-soft">
      <p className="text-xs font-mono uppercase text-theme-text-secondary opacity-70 mb-4">Shuttle Capacity vs Demand</p>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={gateShuttleGap}>
            <XAxis dataKey="gateId" fontSize={12} stroke="#888888" />
            <YAxis fontSize={12} stroke="#888888" />
            <Tooltip />
            <Bar dataKey="projectedDemand" fill="#B8823A" radius={[4, 4, 0, 0]} name="Demand" />
            <Bar dataKey="currentCapacity" fill="#4A7A5E" radius={[4, 4, 0, 0]} name="Capacity" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {flagged && (
        <p className="text-sm mt-4 font-medium text-theme-alert-red">
          ⚠️ {flagged.gateId} shuttle capacity is {flagged.gapPercent}% below projected demand.
        </p>
      )}
    </section>
  );
}
