import { ReactNode, useEffect } from 'react'
import { IdProvider } from '@wonderflow/react-components'
import { ThemeProvider } from 'next-themes'
import NextProgress from 'next-progress'
import { useRouter } from 'next/router'
import NextScript from 'next/script'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'

import '@docsearch/css'
import '@wonderflow/react-components/themes.css'
import '@wonderflow/react-components/core.css'
import '@/styles/app.css'
import '@/styles/docsearch.css'
import '@/styles/shame.css'

const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider defaultTheme="system" disableTransitionOnChange>
    <IdProvider>
      {children}
    </IdProvider>
  </ThemeProvider>
)

const App = ({ Component, pageProps }: any) => {
  const router = useRouter()

  const setScrollSmooth = (value: string) => {
    document.documentElement.dataset.htmlSmooth = value
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () => { setScrollSmooth('false') })
    router.events.on('routeChangeComplete', () => { setScrollSmooth('true') })
    router.events.on('routeChangeError', () => { setScrollSmooth('true') })

    return () => {
      router.events.off('routeChangeStart', () => { setScrollSmooth('false') })
      router.events.off('routeChangeComplete', () => { setScrollSmooth('true') })
      router.events.off('routeChangeError', () => { setScrollSmooth('true') })
    }
  }, [router])

  return (
    <Providers>
      <Head>
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <NextScript id="docsearch-core" src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js" strategy="beforeInteractive" />
      <NextProgress delay={300} color="var(--cta-default)" options={{ showSpinner: false, minimum: 0.3 }} />
      <AnimatePresence
        exitBeforeEnter
        initial={false}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </Providers>
  )
}

export default App
