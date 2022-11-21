import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
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
        </Head>

        <body className='preload'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
