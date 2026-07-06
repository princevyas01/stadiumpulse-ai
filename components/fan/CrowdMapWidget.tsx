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
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-neutral-100 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center">
            <Activity size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-800 dark:text-slate-100">Live Crowd Density</h2>
            <p className="text-sm text-neutral-500 dark:text-slate-400">Real-time stadium congestion map</p>
          </div>
        </div>
        {highDensityRegions.length > 0 && (
          <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full text-sm font-medium" aria-live="polite">
            <AlertTriangle size={16} />
            <span>{highDensityRegions.length} Congested Areas</span>
          </div>
        )}
      </div>

      <div className="relative w-full aspect-video bg-neutral-900 dark:bg-slate-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-slate-700">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-80" preserveAspectRatio="none">
           {/* Stadium Outline (Placeholder) */}
           <rect x="5" y="5" width="90" height="90" rx="20" fill="none" stroke="#333" strokeWidth="2" />
           <ellipse cx="50" cy="50" rx="25" ry="40" fill="none" stroke="#444" strokeWidth="1" />
           
           {/* Heatmap points */}
           {data.map((region, i) => (
             <circle
               key={i}
               cx={region.x}
               cy={region.y}
               r={region.density / 5}
               fill={region.density > 75 ? '#ef4444' : region.density > 40 ? '#eab308' : '#22c55e'}
               opacity={0.6}
               className="transition-all duration-1000 ease-in-out"
             />
           ))}
        </svg>
        
        {/* Overlay Labels */}
        {data.map((region, i) => (
          <div
            key={`label-${i}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-white bg-black/50 px-1.5 rounded backdrop-blur-sm transition-all duration-1000 ease-in-out"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
          >
            {region.name}
          </div>
        ))}
      </div>

      {highDensityRegions.length > 0 && (
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg">
          <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-1">AI Reroute Suggestions</h3>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            {highDensityRegions.map((region, i) => (
              <li key={i}>• High traffic at <strong>{region.name}</strong>. Use alternative routes if possible.</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
