import Head from 'next/head'

import { Container } from '@chakra-ui/react'

import Header from '../components/Header'
import Gallery from '../components/Gallery'
import About from '../components/About'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Head>
        <title>Meet the cuckers</title>
        <meta name="description" content="Fintract Global" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxW={'7xl'}>
          <Header />
          <Gallery />
          <About />
          <Footer />
        </Container>
      </main>
    </>
  )
}

export default Home
