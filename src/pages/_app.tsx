import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import Page from '~/components/Page'
import Tracking from '~/components/Tracking'
import useGoogleOptimizeExperiments from '~/hooks/useGoogleOptimizeExperiments'
import AppProviders from '~/providers/AppProviders'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const { asPath, isFallback } = useRouter()
  const key = asPath.split('?')?.[0]

  useGoogleOptimizeExperiments()

  return (
    <React.StrictMode>
      <AppProviders>
        {isFallback ? (
          <div>loading</div>
        ) : (
          <Page key={key} {...pageProps}>
            <Component {...pageProps} />
          </Page>
        )}
        <Tracking key='tracking' />
      </AppProviders>
    </React.StrictMode>
  )
}
