import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Router from 'next/router'
import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import UserProvider from 'components/UserContext'
import * as gtag from 'lib/gtag'

import { GlobalStyle } from 'design'
import { customTheme } from 'design/theme'

import 'assets/css/prism.css'
import 'design/tailwind.css'

let timeout: any

const start = () => {
  timeout = setTimeout(NProgress.start, 300)
}

const done = () => {
  clearTimeout(timeout)
  NProgress.done()
}

Router.events.on('routeChangeStart', start)
Router.events.on('routeChangeComplete', done)
Router.events.on('routeChangeError', done)

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <ThemeProvider theme={customTheme}>
      <UserProvider>
        <CSSReset />
        <GlobalStyle />
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
