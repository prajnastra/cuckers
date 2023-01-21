import type { NextComponentType } from 'next'

import { Box, Flex, Heading } from '@chakra-ui/react'

import SocialIcon from './SocialIcon'

const SocialMedia: NextComponentType = () => {
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
        Connect
      </Heading>

      <Flex
        flexDir={{
          base: 'column',
          md: 'row',
        }}
        gap="5"
        mt="4"
      >
        <SocialIcon lable="Twitter" url="https://twitter.com" />
        <SocialIcon lable="Twitter" url="https://twitter.com" />
        <SocialIcon lable="Twitter" url="https://twitter.com" />
      </Flex>
    </Box>
  )
}

export default SocialMedia
