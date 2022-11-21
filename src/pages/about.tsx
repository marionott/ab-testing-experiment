import { Button } from '@vercel/examples-ui'
import Cookies from 'js-cookie'
import OptimizeLayout from '../components/GoogleOptimizeLayout'
import { COOKIE_NAME } from '../lib/constants'

export default function About() {
  const removeCookie = () => {
    Cookies.remove(COOKIE_NAME)
    window.location.reload()
  }

  return (
    <>
      <h2>About page</h2>
      <p>
        You&apos;re currently on <b>/about</b>
      </p>
      <p>This is the original about page</p>
      <Button variant='secondary' onClick={removeCookie}>
        Remove cookie & reload
      </Button>
    </>
  )
}

About.Layout = OptimizeLayout
