import Head from 'next/head'

import { Stack } from '@chakra-ui/react'

import ImageSidebar from '../../components/ImageSidebar'
import NFTMinter from '../../components/NFTMinter'

const banner = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80`

const MintNFT = () => {
  return (
    <>
      <Head>
        <title>Mint NFT</title>
        <meta name="description" content="Fintract Global" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
          <NFTMinter />
          <ImageSidebar url={'/banner.svg'} />
        </Stack>
      </main>
    </>
  )
}

export default MintNFT
