import { Text } from '@vercel/examples-ui'
import OptimizeLayout from '../components/GoogleOptimizeLayout'

export default function About() {
  return (
    <>
      <h2>About page</h2>
      <p>
        You&apos;re currently on <b>/about</b>
      </p>
      <p>This is the original about page</p>
    </>
  )
}

About.Layout = OptimizeLayout
