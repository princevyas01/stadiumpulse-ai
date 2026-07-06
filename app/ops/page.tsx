import dynamic from 'next/dynamic'
import { IncidentAdvisorWidget } from '@/components/ops/IncidentAdvisorWidget'
import { OperationalFeedWidget } from '@/components/ops/OperationalFeedWidget'

const CrowdMapWidget = dynamic(() => import('@/components/fan/CrowdMapWidget').then(mod => mod.CrowdMapWidget), {
  ssr: false,
  loading: () => <div className="aspect-video bg-black animate-pulse" />
})

export default function OpsPortal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col space-y-6">
        {/* We reuse the CrowdMapWidget but wrap it in a dark mode override container */}
        <div className="bg-pitch-green overflow-hidden shadow-2xl border-4 border-black dark">
          <CrowdMapWidget />
        </div>
        <IncidentAdvisorWidget />
      </div>
      <div className="space-y-6">
        <OperationalFeedWidget />
      </div>
    </div>
  )
}
