import dynamic from 'next/dynamic'
import { IncidentAdvisorWidget } from '@/components/ops/IncidentAdvisorWidget'
import { OperationalFeedWidget } from '@/components/ops/OperationalFeedWidget'

const CrowdMapWidget = dynamic(() => import('@/components/fan/CrowdMapWidget').then(mod => mod.CrowdMapWidget), {
  ssr: false,
  loading: () => <div className="aspect-video bg-slate-900 animate-pulse rounded-xl" />
})

export default function OpsPortal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col space-y-6">
        {/* We reuse the CrowdMapWidget but wrap it in a dark mode override container */}
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700 child-dark-override">
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
