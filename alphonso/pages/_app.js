import { WSProvider } from '../modules/ws/ws_provider'
import '../styles/globals.css'
import { Layout } from "./../shared-components/Layout"

function MyApp({ Component, pageProps }) {

  if (
    typeof window === "undefined" &&
    !Component.getInitialProps
  ) {
    return null;
  }
  return (
  <WSProvider>
  <Layout>
   <Component {...pageProps} />
  </Layout>
  </WSProvider>
  )
}

export default MyApp
