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
    <div className="bg-white dark:bg-theme-dark rounded-std border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-soft">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-theme-light dark:bg-white/5 text-theme-text-primary dark:text-theme-light rounded-std flex items-center justify-center border border-black/5 dark:border-white/5">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-xl font-sans font-semibold text-theme-text-primary dark:text-theme-light">Live Crowd Density</h2>
            <p className="font-sans text-sm text-theme-text-secondary">Real-Time Congestion</p>
          </div>
        </div>
        {highDensityRegions.length > 0 && (
          <div className="flex items-center space-x-2 text-theme-alert-amber bg-theme-alert-amber/10 px-4 py-2 text-sm font-sans font-medium rounded-std border border-theme-alert-amber/20" aria-live="polite">
            <AlertTriangle size={18} />
            <span>{highDensityRegions.length} Active Alerts</span>
          </div>
        )}
      </div>

      <div className="relative w-full aspect-video bg-theme-light dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-std overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-80" preserveAspectRatio="none">
           {/* Stadium Outline (Placeholder) */}
           <rect x="5" y="5" width="90" height="90" rx="4" fill="none" stroke="currentColor" className="text-theme-text-secondary/30" strokeWidth="1" />
           <ellipse cx="50" cy="50" rx="25" ry="40" fill="none" stroke="currentColor" className="text-theme-text-secondary/30" strokeWidth="1" />
           
           {/* Heatmap points */}
           {data.map((region, i) => (
             <circle
               key={i}
               cx={region.x}
               cy={region.y}
               r={region.density / 5}
               fill={region.density > 75 ? '#B23B2C' : region.density > 40 ? '#C98A3D' : '#4A7A5E'}
               opacity={0.7}
               className="transition-all duration-1000 ease-in-out"
             />
           ))}
        </svg>
        
        {/* Overlay Labels */}
        {data.map((region, i) => (
          <div
            key={`label-${i}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-[10px] font-sans font-medium text-theme-text-primary bg-white/90 dark:bg-theme-dark/90 dark:text-theme-light px-1.5 py-0.5 rounded transition-all duration-1000 ease-in-out border border-black/5 dark:border-white/5 whitespace-nowrap shadow-sm"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
          >
            {region.name}
          </div>
        ))}
      </div>

      {highDensityRegions.length > 0 && (
        <div className="mt-6 p-5 bg-theme-alert-amber/5 border border-theme-alert-amber/20 rounded-std">
          <h3 className="text-[15px] font-sans font-semibold text-theme-alert-amber mb-3">AI Reroute Suggested</h3>
          <ul className="text-[14px] font-sans text-theme-text-primary dark:text-theme-light space-y-2">
            {highDensityRegions.map((region, i) => (
              <li key={i} className="flex items-start">
                <span className="text-theme-alert-amber mr-2 mt-0.5">•</span>
                <span>High traffic at <strong className="font-semibold">{region.name}</strong>. Use alternative routes if possible.</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
