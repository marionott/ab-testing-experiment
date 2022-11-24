import experiments from 'config/optimize.json'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { COOKIE_NAME, TRACKING_EVENTS } from '~/lib/constants'
import { useTracker } from '~/providers/TrackerProvider'

export default function useGoogleOptimizeExperiments() {
  const tracker = useTracker()
  const { asPath } = useRouter()

  const isOnExperimentRoute = () => {
    return experiments?.find((exp) => {
      return exp?.matchers?.includes(asPath)
    })
  }

  useEffect(() => {
    const cookie = Cookies.get(COOKIE_NAME)

    if (cookie) {
      const shouldTrackEvent = isOnExperimentRoute()

      if (shouldTrackEvent) {
        const [experimentId] = cookie?.split?.('.')
        tracker.emit(TRACKING_EVENTS.EXPERIMENT_IMPRESSION, {
          id: experimentId,
          variantId: cookie
        })
      }
    }
  }, [asPath])
}
