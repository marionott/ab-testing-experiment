import experiments from 'config/optimize.json'
import { useEffect } from 'react'
import { TRACKING_EVENTS } from '~/lib/constants'
import { useTracker } from '~/providers/TrackerProvider'
import { useRouter } from 'next/router'

export default function Page({ children }) {
  const { asPath } = useRouter()
  const tracker = useTracker()

  useEffect(() => {
    // tracker.emit(TRACKING_EVENTS.PAGE_VIEW, asPath)
    tracker.emit(TRACKING_EVENTS.EXPERIMENT_IMPRESSION, {
      id: experiments[0].id,
      variantId: `${experiments[0].id}.${experiments[0].variants[0].id}`
    })
  }, [])

  return <div>{children}</div>
}
