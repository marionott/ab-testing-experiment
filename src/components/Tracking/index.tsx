import { TRACKING_EVENTS } from '~/lib/constants'

import { useTracker } from '~/providers/TrackerProvider'

import useGTMTracking from '~/hooks/useGTMTracking'
import useOnRouteChange from '~/hooks/useOnRouteChange'

function Tracking() {
  const tracker = useTracker()

  useGTMTracking()

  useOnRouteChange({
    onRouteChange: (url, { shallow, ...rest }) => {
      if (!shallow) {
        tracker.emit(TRACKING_EVENTS.PAGE_VIEW, url)
      }
    },
    deps: []
  })

  return null
}

export default Tracking
