import type { NextComponentType } from 'next'

import { Box } from '@chakra-ui/react'

import Card from './Card'

let url = 'https://raw.githubusercontent.com/iSG-Labs/bucket/main/lil_peter.png'

const Gallery: NextComponentType = () => {
  return (
    <Box
      display="grid"
      p={{
        base: '0rem 1rem',
        md: '0rem 2rem',
        lg: '0rem 3rem',
      }}
      gridTemplateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      gridGap={6}
    >
      <Card imageURL={url} lable="Lil Peter" />
      <Card imageURL={url} lable="Lil Peter" />
      <Card imageURL={url} lable="Lil Peter" />
      <Card imageURL={url} lable="Lil Peter" />
      <Card imageURL={url} lable="Lil Peter" />
      <Card imageURL={url} lable="Lil Peter" />
    </Box>
  )
}

export default Gallery
