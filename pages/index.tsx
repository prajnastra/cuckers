import Head from 'next/head'

import { Container } from '@chakra-ui/react'

import Header from '../components/Header'

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
        </Container>
      </main>
    </>
  )
}

export default Home
