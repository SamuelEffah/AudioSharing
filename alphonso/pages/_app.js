import { WSProvider } from '../modules/ws/ws_provider'
import '../styles/globals.css'
import { Layout } from "./../shared-components/Layout"
import NProgress from "nprogress"
import ReactModal from 'react-modal'
import "nprogress/nprogress.css";
import Router from "next/router";

NProgress.configure({showSpinner: false})

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

ReactModal.setAppElement("#__next");


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
