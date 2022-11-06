import Head from "next/head"
import styles from "../styles/Home.module.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Game from "../components/Game"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Decentralized NoLoss Lottery</title>
        <meta name='description' content='Decentralized NoLoss Lottery' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='p-5 bg-gradient-to-r from-violet-900 to-violet-700'>
        <Game />
      </main>
      <Footer />
    </div>
  )
}
