export type FeedItem = { id: string; type: 'alert' | 'info' | 'resolved'; message: string; time: string }

export function generateFeed(): FeedItem[] {
  const now = new Date()
  return [
    { id: '1', type: 'alert', message: 'Density anomaly detected at Gate C', time: new Date(now.getTime() - 2 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    { id: '2', type: 'resolved', message: 'Medical request Sect 110 fulfilled', time: new Date(now.getTime() - 15 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    { id: '3', type: 'info', message: 'Shift Briefing: Match ends in 45m. Prep shuttles.', time: new Date(now.getTime() - 30 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]
}

export function generateCrowdData() {
  const regions = ['Gate A', 'Gate B', 'Gate C', 'Concourse North', 'Concourse South', 'Food Court', 'Merch Store']
  return regions.map(name => ({
    name,
    density: Math.floor(Math.random() * 100),
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10
  }))
}

export function generateSustainabilityMetrics() {
  return {
    wasteDivertedPercent: 85 + Math.random() * 2 - 1,
    energyUsageKwh: 4200 + Math.random() * 50 - 20,
    waterUsageLiters: 15000 + Math.random() * 200 - 100
  }
}

export interface TournamentAggregateStats {
  totalAttendanceEstimate: number;
  averageCrowdDensityPercent: number;
  activeIncidentCount: number;
  sustainability: {
    wasteDivertedPercent: number;
    energyUsageKwh: number;
    waterUsageLiters: number;
  };
  gateShuttleGap: Array<{
    gateId: string;
    projectedDemand: number;
    currentCapacity: number;
    gapPercent: number;
  }>;
  generatedAt: string;
}

export function aggregateTournamentStats(): TournamentAggregateStats {
  const crowd = generateCrowdData();
  const incidents = generateFeed();
  const sustainability = generateSustainabilityMetrics();

  const averageCrowdDensityPercent =
    crowd.reduce((sum, point) => sum + point.density, 0) / crowd.length;

  const gateShuttleGap = crowd.slice(0, 4).map((point, index) => {
    const projectedDemand = Math.round(point.density * 12);
    const currentCapacity = Math.round(projectedDemand * (0.6 + Math.random() * 0.5));
    const gapPercent = Math.round(
      ((projectedDemand - currentCapacity) / projectedDemand) * 100
    ) || 0;
    return {
      gateId: `Gate ${String.fromCharCode(65 + index)}`,
      projectedDemand,
      currentCapacity,
      gapPercent,
    };
  });

  return {
    totalAttendanceEstimate: Math.round(averageCrowdDensityPercent * 820),
    averageCrowdDensityPercent: Math.round(averageCrowdDensityPercent),
    activeIncidentCount: incidents.filter((i) => i.type === 'alert').length,
    sustainability: {
      wasteDivertedPercent: Math.round(sustainability.wasteDivertedPercent * 10) / 10,
      energyUsageKwh: Math.round(sustainability.energyUsageKwh),
      waterUsageLiters: Math.round(sustainability.waterUsageLiters),
    },
    gateShuttleGap,
    generatedAt: new Date().toISOString(),
  };
}
