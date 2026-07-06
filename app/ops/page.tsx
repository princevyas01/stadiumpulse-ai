import dynamic from 'next/dynamic'
import { IncidentAdvisorWidget } from '@/components/ops/IncidentAdvisorWidget'
import { OperationalFeedWidget } from '@/components/ops/OperationalFeedWidget'

const CrowdMapWidget = dynamic(() => import('@/components/fan/CrowdMapWidget').then(mod => mod.CrowdMapWidget), {
  ssr: false,
  loading: () => <div className="aspect-video bg-theme-dark animate-pulse rounded-std" />
})

export default function OpsPortal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 flex flex-col space-y-8">
        <div className="dark">
          <CrowdMapWidget />
        </div>
        <IncidentAdvisorWidget />
      </div>
      <div className="space-y-8">
        <OperationalFeedWidget />
      </div>
    </div>
  )
}
