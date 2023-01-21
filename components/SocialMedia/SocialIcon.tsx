import type { NextComponentType, NextPageContext } from 'next'

import { Box, Heading } from '@chakra-ui/react'
import { BsArrowUpRight } from 'react-icons/bs'

interface SocialIconProps {
  lable: string
  url: string
}

const SocialIcon: NextComponentType<NextPageContext, {}, SocialIconProps> = ({
  lable,
  url,
}) => {
  return (
    <Box>
      <Heading
        as="h6"
        size="xs"
        fontFamily="Be Vietnam Pro"
        opacity="0.3"
        fontWeight="600"
        lineHeight="1.5"
        display="flex"
        alignItems="center"
        cursor="pointer"
        _hover={{
          textDecor: 'underline',
        }}
      >
        {lable} <BsArrowUpRight />
      </Heading>
    </Box>
  )
}

export default SocialIcon
