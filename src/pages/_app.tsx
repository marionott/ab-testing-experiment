import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Tracking from '~/components/Tracking'
import { TRACKING_EVENTS } from '~/lib/constants'
import TrackerProvider, { useTracker } from '~/providers/TrackerProvider'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()
  const tracker = useTracker()

  useEffect(() => {
    tracker.emit(TRACKING_EVENTS.PAGE_VIEW, asPath)
  }, [])

  return (
    <TrackerProvider>
      <Component {...pageProps} />
      <Tracking key='tracking' />
    </TrackerProvider>
  )
}
