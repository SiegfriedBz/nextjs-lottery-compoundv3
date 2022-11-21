import Head from "next/head"
import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <Head>
          <title>Decentralized NoLoss Lottery</title>
          <meta name='description' content='Decentralized NoLoss Lottery' />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </MoralisProvider>
  )
}

export default MyApp
