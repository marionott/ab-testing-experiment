import { Button, Code, Link, List, Text } from '@vercel/examples-ui'
import Cookies from 'js-cookie'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { COOKIE_NAME } from '../lib/constants'
import { useGA } from '../providers/GoogleAnalyticsProvider'
import styles from '../styles/Home.module.css'

export default function Home() {
  const ga = useGA()

  const [cookie, setCookie] = useState<string | undefined>('')
  const removeCookie = () => {
    Cookies.remove(COOKIE_NAME)
    window.location.reload()
  }

  useEffect(() => {
    setCookie(Cookies.get(COOKIE_NAME))
  }, [])

  useEffect(() => {
    if (ga && cookie) {
      ga?.('set', 'exp', cookie)
    }
    ga?.('send', 'pageview')
  }, [ga, cookie])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>AB testing with Google Optimize</h1>

        <Text className={styles.description}>
          Once you load this page, there&apos;s a new{' '}
          <Code className={styles.code}>{COOKIE_NAME}</Code> cookie set in the
          browser, it has the shape of{' '}
          <Code className={styles.code}>{'${experimentId}.${variantId}'}</Code>
          .
          <br />
          You&apos;re assigned to: <b>{cookie}</b>
        </Text>
        <Text className='mb-4'>
          Based on a predefined experiment you&apos;ll be assigned one of 3
          variants (0, 1, 2), where 0 is the original page
        </Text>
        <Text className='mb-4'>
          The about and marketing pages will render the version of the page that
          matches the variant:
        </Text>
        <List className={styles.grid}>
          <li className={styles.card}>
            <Link href='/about'>
              <h2>/about &rarr;</h2>
            </Link>
          </li>
          <li className={styles.card}>
            <Link href='/marketing'>
              <h2>/marketing &rarr;</h2>
            </Link>
          </li>
        </List>
        <Text className='mb-4'>
          Click the button below if you want to change the current variant (each
          variant has a 33% chance)
        </Text>
        <Button variant='primary' onClick={removeCookie}>
          Remove cookie & reload
        </Button>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
