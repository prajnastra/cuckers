import type { NextComponentType } from 'next'

import { Stack, Heading } from '@chakra-ui/react'

const Header: NextComponentType = () => {
  return (
    <Stack height="40vh" justify="center" p="1rem 20rem">
      <Heading
        as="h4"
        size="md"
        textAlign="center"
        fontFamily="Be Vietnam Pro"
        opacity="0.3"
        fontWeight="600"
      >
        Meet The Cuckers
      </Heading>
      <Heading
        as="h2"
        size="lg"
        textAlign="center"
        fontFamily="Be Vietnam Pro"
        fontWeight="500"
        lineHeight="1.4"
      >
        The Original NFT for the Cuckers Community
      </Heading>
    </Stack>
  )
}

export default Header
