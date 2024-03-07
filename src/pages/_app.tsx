import {theme} from '../chakra/theme'
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return (<ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>);
}
