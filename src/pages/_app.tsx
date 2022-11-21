import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { GoogleAnalyticsProvider } from '../providers/GoogleAnalyticsProvider'

function throwIfSSR() {
  throw new Error('Using GA during SSR is not allowed')
}

function gaHandler() {
  const dataLayer = ((window as any).dataLayer =
    (window as any).dataLayer || [])

  dataLayer.push(arguments)
}

export default function App({ Component, pageProps }: AppProps) {
  const ga = typeof window === 'undefined' ? throwIfSSR : gaHandler

  return (
    <GoogleAnalyticsProvider value={ga}>
      <Component {...pageProps} />
    </GoogleAnalyticsProvider>
  )
}
