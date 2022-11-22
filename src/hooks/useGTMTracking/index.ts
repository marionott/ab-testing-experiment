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
    window.dataLayer.push(event)
  }

  const eventReducer = (event: string, eventPayload: any) => {
    switch (event) {
      case TRACKING_EVENTS.EXPERIMENT_IMPRESSION:
        console.log('EXPERIMENT IMPRESSION')
        pushToDataLayer({
          event: 'optimize.callback',
          name: experiments[0].id,
          callback: (value) => {
            console.log({ value })
          }
        })

        pushToDataLayer({
          event: TRACKING_EVENTS.EXPERIMENT_IMPRESSION,
          experiment_id: eventPayload?.id,
          variant_id: eventPayload?.variantId,
          send_to: 'GA_MEASUREMENT_ID'
        })
        break
      case TRACKING_EVENTS.PAGE_VIEW:
        // const intervalId = setInterval(() => {
        //   console.log('interval')
        //   //@ts-ignore
        //   if (window?.google_optimize !== undefined) {
        //     // Set the variant to the state.
        //     console.log(
        //       //@ts-ignore
        //       window?.google_optimize?.get?.(experiments[0].id)
        //     )
        //     clearInterval(intervalId)
        //   }
        // }, 100)

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
