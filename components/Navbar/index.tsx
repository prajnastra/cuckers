import type { NextComponentType } from 'next'

import { Box, Heading } from '@chakra-ui/react'

import NavItem from './NavItem'

const Navbar: NextComponentType = () => {
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
        Utility
      </Heading>

      <Box
        display="grid"
        mt="5"
        w={{
          base: '100%',
          md: '50%',
        }}
        gridTemplateColumns={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
        }}
        gridGap={4}
      >
        <NavItem
          lable="Network"
          subLable="Join like minded people"
          url="https://google.com"
        />

        <NavItem
          lable="Network"
          subLable="Join like minded people"
          url="https://google.com"
        />

        <NavItem
          lable="Network"
          subLable="Join like minded people"
          url="https://google.com"
        />

        <NavItem
          lable="Network"
          subLable="Join like minded people"
          url="https://google.com"
        />

        <NavItem
          lable="Network"
          subLable="Join like minded people"
          url="https://google.com"
        />
      </Box>
    </Box>
  )
}

export default Navbar
