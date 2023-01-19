import type { NextComponentType } from 'next'

import { Box, Heading, Text } from '@chakra-ui/react'

const Footer: NextComponentType = () => {
  return (
    <Box
      m="5rem 0"
      p={{
        base: '0rem 1rem',
        md: '0rem 2rem',
        lg: '0rem 3rem',
      }}
    >
      <Text
        fontSize="md"
        fontFamily="Be Vietnam Pro"
        lineHeight="1.4"
        opacity="0.3"
      >
        The Cuckers 2022 @ Cuckerville
      </Text>
    </Box>
  )
}

export default Footer
