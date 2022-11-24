import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { TRACKING_EVENTS } from '~/lib/constants'
import experiments from 'config/optimize.json'
import { useTracker } from '~/providers/TrackerProvider'

declare global {
  interface Window {
    dataLayer: any[]
    OnetrustActiveGroups: any
    OneTrust: any
  }
}

export default function useGTMTracking() {
  const router = useRouter()
  const tracker = useTracker()

  const getPageData = (): {
    pageType?: string
    page_title?: string
    page_path?: string
  } => {
    const route = router.route

    switch (route) {
      case '/':
      default:
        return {
          pageType: 'homepage',
          page_title: 'homepage'
        }
    }
  }

  const pushToDataLayer = (event: any) => {
    // Uncomment to debug
    // console.log(event)
    window?.dataLayer?.push(event)
  }

  const eventReducer = (event: string, eventPayload: any) => {
    switch (event) {
      case TRACKING_EVENTS.EXPERIMENT_IMPRESSION:
        pushToDataLayer({
          event: TRACKING_EVENTS.EXPERIMENT_IMPRESSION,
          experiment_id: eventPayload?.id,
          variant_id: eventPayload?.variantId,
          send_to: 'GA_MEASUREMENT_ID'
        })
        break
      case TRACKING_EVENTS.PAGE_VIEW:
        pushToDataLayer({
          event: 'optimize.activate'
        })

        pushToDataLayer({
          event,
          ...getPageData()
        })
        break
    }
  }

  useEffect(() => {
    tracker.on('*', eventReducer)
    return () => {
      tracker.off('*', eventReducer)
    }
  }, [router])
}
