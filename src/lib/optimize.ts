import config from '../../config/optimize.json'

export type ExperimentVariant = {
  name: string
  id: number
  weight: number
}

export type Experiment = {
  name: string
  id: string
  variants: ExperimentVariant[]
}

export function getCurrentExperiment(name: string): Experiment | null {
  const experiments: Experiment[] = config
  return experiments?.find((exp) => exp.name === name) ?? null
}
