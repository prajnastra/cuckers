import type { NextComponentType, NextPageContext } from 'next'

import { Box, Heading, Text } from '@chakra-ui/react'

interface NavItemProps {
  lable: string
  subLable: string
  url: string
}

const NavItem: NextComponentType<NextPageContext, {}, NavItemProps> = ({
  lable,
  subLable,
  url,
}) => {
  return (
    <Box>
      <Heading
        as="h6"
        size="sm"
        fontFamily="Be Vietnam Pro"
        opacity="0.3"
        fontWeight="600"
        lineHeight="1.5"
        textDecor="underline"
      >
        {lable}
      </Heading>
      <Text fontFamily="Be Vietnam Pro" fontSize="xs">
        {subLable}
      </Text>
    </Box>
  )
}

export default NavItem
