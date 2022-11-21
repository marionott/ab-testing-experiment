import { Button, Text } from '@vercel/examples-ui'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import experiments from '../../../config/optimize.json'
import OptimizeLayout from '../../components/GoogleOptimizeLayout'
import { COOKIE_NAME } from '../../lib/constants'
import {
  Experiment,
  ExperimentVariant,
  getCurrentExperiment
} from '../../lib/optimize'
import { useGA } from '../../providers/GoogleAnalyticsProvider'

interface OptimizeProps {
  experiment: Experiment
  variant: ExperimentVariant
}

export default function About({ optimize }: { optimize: OptimizeProps }) {
  const { experiment, variant } = optimize ?? {}

  const ga = useGA()

  const removeCookie = () => {
    Cookies.remove(COOKIE_NAME)
    window.location.reload()
  }

  useEffect(() => {
    const cookie = Cookies.get(COOKIE_NAME)
    if (ga && cookie) {
      ga('set', 'exp', cookie)
    }

    ga('event', 'experiment_impression', {
      experiment_id: experiment?.id,
      variant_id: variant?.id,
      send_to: 'GA_MEASUREMENT_ID'
    })
  }, [ga])

  return (
    <>
      <Text variant='h2' className='mb-6'>
        About Page
      </Text>
      <Text className='text-lg mb-4'>
        You&apos;re currently looking at the variant <b>{variant?.name}</b> in
        the experiment <b>{experiment?.name}</b>
      </Text>
      <Text className='mb-4'>
        Click the button below to register an event with GA for this variant:
      </Text>
      <Button variant='secondary' onClick={removeCookie}>
        Remove cookie & reload
      </Button>
    </>
  )
}

About.Layout = OptimizeLayout

export async function getStaticPaths() {
  const experiment = getCurrentExperiment(experiments[0].name)

  const defaultParams = {
    fallback: false
  }

  if (!experiment?.variants) {
    return {
      ...defaultParams,
      paths: []
    }
  }

  return {
    ...defaultParams,
    paths: experiment.variants.map((v) => ({
      params: { variant: `${experiment.id}.${v.id}` }
    }))
  }
}

//@ts-ignore
export async function getStaticProps({ params }) {
  const experiment = getCurrentExperiment(experiments[0].name)
  const [, variantId] = `${params?.variant}`?.split('.')

  const defaultProps = {}

  if (!experiment?.name && !experiment?.variants) return defaultProps

  // Here you could fetch any data related only to the variant
  return {
    props: {
      ...defaultProps,
      ...(experiment?.name &&
        experiment?.variants && {
          optimize: {
            // Only send the experiment data required by the page
            experiment,
            variant: experiment.variants.find((v) => String(v.id) === variantId)
          }
        })
    }
  }
}
