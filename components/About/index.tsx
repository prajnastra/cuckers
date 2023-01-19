import type { NextComponentType } from 'next'

import { Box, Heading, Text } from '@chakra-ui/react'

const About: NextComponentType = () => {
  return (
    <Box
      m="5rem 0"
      p={{
        base: '0rem 1rem',
        md: '0rem 2rem',
        lg: '0rem 3rem',
      }}
    >
      <Heading
        as="h4"
        size="md"
        fontFamily="Be Vietnam Pro"
        opacity="0.3"
        fontWeight="600"
        lineHeight="2"
      >
        About
      </Heading>
      <Text fontSize="md" fontFamily="Be Vietnam Pro" lineHeight="1.4">
        Join our exclusive community of early supporters by purchasing a limited
        edition Meet The Cuckers NFT. These will represent your membership in
        The Cuckers community. Don't miss out on the opportunity to be among the
        first 1000 members of our prestigious group, immortalized on the
        blockchain.
      </Text>
    </Box>
  )
}

export default About
