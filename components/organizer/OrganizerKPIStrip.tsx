import type { TournamentAggregateStats } from '@/lib/mock-data';

interface Props {
  stats: TournamentAggregateStats;
}

export function OrganizerKPIStrip({ stats }: Props) {
  const kpis = [
    { label: 'Estimated Attendance', value: stats.totalAttendanceEstimate.toLocaleString() },
    { label: 'Avg Crowd Density', value: `${stats.averageCrowdDensityPercent}%` },
    { label: 'Active Incidents', value: stats.activeIncidentCount.toString() },
    { label: 'Waste Diverted', value: `${stats.sustainability.wasteDivertedPercent}%` },
  ];

  return (
    <section aria-label="Tournament-wide key metrics" className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white dark:bg-theme-dark rounded-std border border-black/10 dark:border-white/10 p-4 shadow-soft">
          <p className="text-xs font-mono uppercase text-theme-text-secondary opacity-70">{kpi.label}</p>
          <p className="text-2xl font-semibold text-theme-text-primary dark:text-theme-light mt-1">{kpi.value}</p>
        </div>
      ))}
    </section>
  );
}
