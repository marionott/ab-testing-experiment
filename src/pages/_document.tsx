import { Html, Head, Main, NextScript } from 'next/document'

import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID}`}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID}');`
          }}
        />
        <script
          async
          src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_OPTIMIZE_CONTAINER_ID}`}
        />
        {/* <Script
          async
          onLoad={() => {
            console.log('SCRIPT LOADING!!!')
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
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
