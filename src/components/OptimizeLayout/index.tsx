import { FC } from 'react'
import Script from 'next/script'
import { Layout, Page } from '@vercel/examples-ui'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import { GoogleAnalyticsProvider } from '../../providers/GoogleAnalyticsProvider'

function throwIfSSR() {
  throw new Error('Using GA during SSR is not allowed')
}

function gaHandler() {
  const dataLayer = ((window as any).dataLayer =
    (window as any).dataLayer || [])

  dataLayer.push(arguments)
}

const OptimizeLayout: FC<LayoutProps> = ({ children, ...props }) => {
  const ga = typeof window === 'undefined' ? throwIfSSR : gaHandler

  return (
    <Layout {...props}>
      <Page>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID}`}
          onLoad={() => {
            //@ts-ignore
            window.dataLayer = window.dataLayer || []
            function gtag() {
              //@ts-ignore
              dataLayer.push(arguments)
            }

            //@ts-ignore
            gtag('js', new Date())
            //@ts-ignore
            gtag('config', process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID)
          }}
        />
        <Script
          src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_OPTIMIZE_CONTAINER_ID}`}
        />
        <GoogleAnalyticsProvider value={ga}>{children}</GoogleAnalyticsProvider>
      </Page>
    </Layout>
  )
}

export default OptimizeLayout
