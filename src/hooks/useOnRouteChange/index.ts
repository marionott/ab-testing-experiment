import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface TransitionOptions {
  shallow?: boolean
}

export interface useOnRouteChangeProps {
  onRouteChange: (path: string, options?: TransitionOptions) => void
  onRouteWillChange?: (path: string, options?: TransitionOptions) => void
  deps: any[]
}
export default function useOnRouteChange({
  onRouteChange,
  onRouteWillChange,
  deps = [],
}: useOnRouteChangeProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (_, params) => {
      onRouteChange(router.asPath, params)
    }

    const handleRouteWillChange = (_, params) => {
      onRouteWillChange?.(router.asPath, params)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    onRouteWillChange &&
      router.events.on('beforeHistoryChange', handleRouteWillChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      onRouteWillChange &&
        router.events.off('beforeHistoryChange', handleRouteWillChange)
    }
  }, deps)
}
