import dynamic from 'next/dynamic'
import { WayfindingWidget } from '@/components/fan/WayfindingWidget'
import { TransitWidget } from '@/components/fan/TransitWidget'
import { SustainabilityWidget } from '@/components/fan/SustainabilityWidget'
import { ChatbotWidget } from '@/components/fan/ChatbotWidget'

const CrowdMapWidget = dynamic(() => import('@/components/fan/CrowdMapWidget').then(mod => mod.CrowdMapWidget), {
  ssr: false,
  loading: () => <div className="aspect-video bg-neutral-100 animate-pulse rounded-xl" />
})

/**
 * FanPortal
 */
export default function FanPortal() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WayfindingWidget />
          <CrowdMapWidget />
        </div>
        <div className="space-y-6">
          <TransitWidget />
          <SustainabilityWidget />
        </div>
      </div>
      <ChatbotWidget />
    </div>
  )
}
