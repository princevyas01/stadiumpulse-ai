"use client"

import { useMemo, useState, useEffect } from 'react'
import { Activity, AlertTriangle } from 'lucide-react'

// Simulated lightweight pseudo-random walk for crowd density
function generateCrowdData() {
  const regions = ['Gate A', 'Gate B', 'Gate C', 'Concourse North', 'Concourse South', 'Food Court', 'Merch Store']
  return regions.map(name => ({
    name,
    density: Math.floor(Math.random() * 100),
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10
  }))
}

export function CrowdMapWidget() {
  const [data, setData] = useState(generateCrowdData())

  useEffect(() => {
    const interval = setInterval(() => setData(generateCrowdData()), 10000)
    return () => clearInterval(interval)
  }, [])

  const highDensityRegions = useMemo(() => data.filter(d => d.density > 75), [data])

  return (
    <div className="bg-chalk-white dark:bg-black rounded-sm border-2 border-concrete-gray/20 dark:border-concrete-gray/40 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 border-b-2 border-concrete-gray/20 pb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-pitch-green dark:bg-floodlight-white text-floodlight-white dark:text-pitch-green rounded-sm flex items-center justify-center border-2 border-pitch-green dark:border-floodlight-white">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-display uppercase tracking-wider text-pitch-green dark:text-floodlight-white">Live Crowd Density</h2>
            <p className="font-mono text-xs uppercase text-concrete-gray">Real-Time Congestion</p>
          </div>
        </div>
        {highDensityRegions.length > 0 && (
          <div className="flex items-center space-x-2 text-signal-amber bg-signal-amber/10 px-4 py-2 text-sm font-mono font-bold uppercase border-2 border-signal-amber animate-pulse-alert motion-reduce:animate-none" aria-live="polite">
            <AlertTriangle size={18} />
            <span>{highDensityRegions.length} ALERTS</span>
          </div>
        )}
      </div>

      <div className="relative w-full aspect-video bg-pitch-green dark:bg-pitch-green border-4 border-concrete-gray">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-80" preserveAspectRatio="none">
           {/* Stadium Outline (Placeholder) */}
           <rect x="5" y="5" width="90" height="90" rx="0" fill="none" stroke="#565B52" strokeWidth="2" />
           <ellipse cx="50" cy="50" rx="25" ry="40" fill="none" stroke="#565B52" strokeWidth="1" />
           
           {/* Heatmap points */}
           {data.map((region, i) => (
             <circle
               key={i}
               cx={region.x}
               cy={region.y}
               r={region.density / 5}
               fill={region.density > 75 ? '#C1442E' : region.density > 40 ? '#E8A33D' : '#F5F4EF'}
               opacity={0.8}
               className="transition-all duration-1000 ease-in-out"
             />
           ))}
        </svg>
        
        {/* Overlay Labels */}
        {data.map((region, i) => (
          <div
            key={`label-${i}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-pitch-green bg-floodlight-white px-1.5 py-0.5 transition-all duration-1000 ease-in-out uppercase border border-pitch-green whitespace-nowrap"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
          >
            {region.name}
          </div>
        ))}
      </div>

      {highDensityRegions.length > 0 && (
        <div className="mt-4 p-4 bg-signal-amber/10 border-l-4 border-signal-amber">
          <h3 className="text-sm font-mono font-bold text-signal-amber mb-2 uppercase tracking-widest">AI Reroute Suggested</h3>
          <ul className="text-sm font-sans font-medium text-pitch-green dark:text-floodlight-white space-y-2">
            {highDensityRegions.map((region, i) => (
              <li key={i}>■ High traffic at <strong>{region.name}</strong>. Use alternative routes if possible.</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
