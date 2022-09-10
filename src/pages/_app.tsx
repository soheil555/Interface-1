import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import theme from '../theme'
import { MetaMask } from '@web3-react/metamask'
import { metaMaskHooks, metaMask } from '../connectors/metaMask'
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core'

// Fonts
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import '@fontsource/work-sans/500.css'
import '@fontsource/work-sans/700.css'

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Axoswap</title>
      </Head>
      <Web3ReactProvider connectors={connectors}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Web3ReactProvider>
    </>
  )
}

export default MyApp
