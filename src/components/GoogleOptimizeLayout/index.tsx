import Script from 'next/script'
import { ReactNode } from 'react'

interface GoogleOptimizeLayoutProps {
  children: ReactNode
}

function GoogleOptimizeLayout({ children }: GoogleOptimizeLayoutProps) {
  return (
    <>
      <Script
        async
        src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_OPTIMIZE_CONTAINER_ID}`}
      />
      {children}
    </>
  )
}

export default GoogleOptimizeLayout
