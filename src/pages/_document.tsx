import { Html, Head, Main, NextScript } from 'next/document'

import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID}`}
        /> */}
        <Script
          id='init-gtm'
          dangerouslySetInnerHTML={{
            __html: `
                (function(w, l) {
                  w[l] = w[l] || [];
                  w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                  });
                })(window, 'dataLayer');
              `
          }}
        />
        <Script
          id='gtm'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');  
            `
          }}
        />
        <Script
          async
          src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_OPTIMIZE_CONTAINER_ID}`}
        />
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe
                src='https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}'
                height='0'
                width='0'
                style='display:none;visibility:hidden'
              />
            `
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
