import { Button } from '@vercel/examples-ui'
import Cookies from 'js-cookie'
import Script from 'next/script'
import { ReactNode } from 'react'
import { COOKIE_NAME } from '../../lib/constants'

interface GoogleOptimizeLayoutProps {
  children: ReactNode
}

function GoogleOptimizeLayout({ children }: GoogleOptimizeLayoutProps) {
  const removeCookie = () => {
    Cookies.remove(COOKIE_NAME)
    window.location.reload()
  }

  return (
    <>
      <Script
        async
        src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_OPTIMIZE_CONTAINER_ID}`}
      />
      {children}
      <Button variant='secondary' onClick={removeCookie}>
        Remove cookie & reload
      </Button>
    </>
  )
}

export default GoogleOptimizeLayout
